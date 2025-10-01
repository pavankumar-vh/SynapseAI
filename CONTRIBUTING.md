# 🤝 Contributing to SynapseAI

First off, thank you for considering contributing to SynapseAI! It's people like you that make SynapseAI such a great tool.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism gracefully
- Focus on what is best for the community

---

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/SynapseAI.git
   cd SynapseAI
   ```
3. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Set up development environment** (see [SETUP.md](SETUP.md))

---

## 💡 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear descriptive title**
- **Detailed description** of the issue
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

**Bug Report Template:**

```markdown
## Bug Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable.

## Environment
- OS: [e.g. Windows 11]
- Node: [e.g. 18.17.0]
- Browser: [e.g. Chrome 120]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear descriptive title**
- **Detailed description** of the enhancement
- **Rationale** - why this would be useful
- **Possible implementation** (optional)

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Easy issues for beginners
- `help wanted` - Issues that need assistance
- `documentation` - Documentation improvements

---

## 🔄 Development Workflow

### 1. Set Up Your Environment

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed

### 4. Test Your Changes

```bash
# Test backend
cd server
npm test

# Test frontend
cd client
npm test
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Messages](#commit-messages) for conventions.

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

Go to the repository on GitHub and create a Pull Request.

---

## 📝 Coding Standards

### JavaScript/React

- Use **ES6+** syntax
- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful variable names**
- Keep functions **small and focused**
- Add **JSDoc comments** for complex functions

**Example:**

```javascript
/**
 * Calculate user's remaining credits after generation
 * @param {number} currentCredits - User's current credit balance
 * @param {number} cost - Cost of the generation
 * @returns {number} Remaining credits
 */
const calculateRemainingCredits = (currentCredits, cost) => {
  return Math.max(0, currentCredits - cost);
};
```

### File Naming

- **Components**: PascalCase (e.g., `UserDashboard.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_CONSTANTS.js`)

### Code Organization

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── services/        # API services
├── utils/           # Utility functions
├── hooks/           # Custom hooks
└── context/         # React context
```

### CSS/Styling

- Use **Tailwind CSS** utility classes
- Create custom classes only when necessary
- Follow **mobile-first** approach
- Maintain **dark theme** consistency

---

## 💬 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(auth): add password reset functionality"

# Bug fix
git commit -m "fix(dashboard): resolve credit display issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style
git commit -m "style(navbar): improve responsive layout"

# Refactor
git commit -m "refactor(api): simplify error handling"
```

### Breaking Changes

```bash
git commit -m "feat(api)!: change response format

BREAKING CHANGE: API responses now return data in 'payload' instead of 'data'"
```

---

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review of your code completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console.logs in production code
- [ ] All tests passing
- [ ] No merge conflicts

### PR Title

Use same format as commit messages:

```
feat(support): add ticket priority filtering
fix(admin): resolve user credit update issue
```

### PR Description Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing done.

## Screenshots (if applicable)
Add screenshots here.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
- [ ] All tests pass locally
```

### Review Process

1. **Automated checks** will run (linting, tests)
2. **Maintainers will review** your code
3. **Address feedback** if requested
4. **Approval** from at least one maintainer required
5. **Merge** by maintainer after approval

---

## 🐛 Issue Guidelines

### Creating Issues

**Good Issue Title:**
```
feat: Add export functionality for generation history
fix: Support tickets not loading for some users
```

**Bad Issue Title:**
```
doesn't work
help
bug
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `wontfix` - Won't be worked on
- `duplicate` - Duplicate of another issue

---

## 🏆 Recognition

Contributors will be:

- Added to [Contributors](#contributors) section in README
- Mentioned in release notes
- Given credit in changelog

---

## 💼 Areas Needing Contribution

### High Priority

- [ ] Unit tests for critical functions
- [ ] E2E tests with Playwright/Cypress
- [ ] API documentation with Swagger
- [ ] Performance optimization
- [ ] Accessibility improvements (WCAG 2.1)

### Medium Priority

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Multi-language support (i18n)
- [ ] Custom AI model integration

### Documentation

- [ ] Video tutorials
- [ ] API usage examples
- [ ] Architecture diagrams
- [ ] Contributing guide improvements
- [ ] FAQ section

---

## 🤔 Questions?

- 💬 **Discord**: [Join our server](https://discord.gg/synapseai)
- 📧 **Email**: dev@synapseai.com
- 🐛 **GitHub Issues**: [Create an issue](https://github.com/pavankumar-vh/SynapseAI/issues)

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

---

## 🙏 Thank You!

Your contributions make SynapseAI better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**

Made with ❤️ by the SynapseAI Team
