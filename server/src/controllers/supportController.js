const SupportTicket = require('../models/SupportTicket');
const User = require('../models/User');

/**
 * Create a new support ticket
 */
const createTicket = async (req, res, next) => {
  try {
    const { firebaseUID, email } = req.user;
    const { subject, category, priority, description, tags } = req.body;

    // Get user details
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create ticket
    const ticket = new SupportTicket({
      userId: user._id,
      userEmail: email,
      userName: user.displayName || email.split('@')[0],
      subject,
      category,
      priority: priority || 'medium',
      description,
      tags: tags || [],
      status: 'open'
    });

    await ticket.save();

    console.log(`✅ Support ticket created: ${ticket.ticketNumber} by ${email}`);

    res.status(201).json({
      ticket: {
        _id: ticket._id,
        ticketNumber: ticket.ticketNumber,
        subject: ticket.subject,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        description: ticket.description,
        createdAt: ticket.createdAt
      },
      message: 'Support ticket created successfully'
    });
  } catch (error) {
    console.error('❌ Error creating support ticket:', error);
    next(error);
  }
};

/**
 * Get user's tickets
 */
const getUserTickets = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;

    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { status, category, page = 1, limit = 10 } = req.query;

    // Build query
    const query = { userId: user._id };
    if (status) query.status = status;
    if (category) query.category = category;

    const skip = (page - 1) * limit;

    const [tickets, total] = await Promise.all([
      SupportTicket.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      SupportTicket.countDocuments(query)
    ]);

    res.json({
      tickets,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching user tickets:', error);
    next(error);
  }
};

/**
 * Get ticket by ID
 */
const getTicketById = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { ticketId } = req.params;

    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ticket = await SupportTicket.findById(ticketId);
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check if user owns this ticket
    if (ticket.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ ticket });
  } catch (error) {
    console.error('❌ Error fetching ticket:', error);
    next(error);
  }
};

/**
 * Add response to ticket
 */
const addTicketResponse = async (req, res, next) => {
  try {
    const { firebaseUID, email } = req.user;
    const { ticketId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check if user owns this ticket
    if (ticket.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Add response
    ticket.responses.push({
      responderId: user._id,
      responderName: user.displayName || email.split('@')[0],
      responderEmail: email,
      isAdmin: false,
      message: message.trim()
    });

    // Update status if it was resolved
    if (ticket.status === 'resolved' || ticket.status === 'closed') {
      ticket.status = 'open';
    }

    await ticket.save();

    console.log(`✅ Response added to ticket ${ticket.ticketNumber}`);

    res.json({
      ticket,
      message: 'Response added successfully'
    });
  } catch (error) {
    console.error('❌ Error adding ticket response:', error);
    next(error);
  }
};

/**
 * Get all tickets (Admin only)
 */
const getAllTickets = async (req, res, next) => {
  try {
    const { status, category, priority, search, page = 1, limit = 20 } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { ticketNumber: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [tickets, total, statusCounts] = await Promise.all([
      SupportTicket.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      SupportTicket.countDocuments(query),
      SupportTicket.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    // Format status counts
    const stats = {
      open: 0,
      in_progress: 0,
      waiting_response: 0,
      resolved: 0,
      closed: 0
    };
    statusCounts.forEach(item => {
      stats[item._id] = item.count;
    });

    res.json({
      tickets,
      stats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching all tickets:', error);
    next(error);
  }
};

/**
 * Update ticket status (Admin only)
 */
const updateTicketStatus = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status, assignedTo } = req.body;

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (status) {
      ticket.status = status;
      
      if (status === 'resolved' && !ticket.resolvedAt) {
        ticket.resolvedAt = Date.now();
      }
      if (status === 'closed' && !ticket.closedAt) {
        ticket.closedAt = Date.now();
      }
    }

    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (assignedUser) {
        ticket.assignedTo = assignedTo;
        ticket.assignedToName = assignedUser.displayName || assignedUser.email;
      }
    }

    await ticket.save();

    console.log(`✅ Ticket ${ticket.ticketNumber} status updated to ${status}`);

    res.json({
      ticket,
      message: 'Ticket updated successfully'
    });
  } catch (error) {
    console.error('❌ Error updating ticket:', error);
    next(error);
  }
};

/**
 * Add admin response to ticket
 */
const addAdminResponse = async (req, res, next) => {
  try {
    const { firebaseUID, email } = req.user;
    const { ticketId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const user = await User.findOne({ firebaseUID });
    const ticket = await SupportTicket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Add admin response
    ticket.responses.push({
      responderId: user._id,
      responderName: user.displayName || 'Support Team',
      responderEmail: email,
      isAdmin: true,
      message: message.trim()
    });

    // Update status if it was open
    if (ticket.status === 'open') {
      ticket.status = 'in_progress';
    }

    await ticket.save();

    console.log(`✅ Admin response added to ticket ${ticket.ticketNumber}`);
    console.log(`📊 Total responses now: ${ticket.responses.length}`);
    console.log(`📝 Latest response:`, ticket.responses[ticket.responses.length - 1]);

    res.json({
      ticket,
      message: 'Response added successfully'
    });
  } catch (error) {
    console.error('❌ Error adding admin response:', error);
    next(error);
  }
};

module.exports = {
  createTicket,
  getUserTickets,
  getTicketById,
  addTicketResponse,
  getAllTickets,
  updateTicketStatus,
  addAdminResponse
};
