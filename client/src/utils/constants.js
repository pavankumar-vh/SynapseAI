// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Credit costs for each tool
export const CREDIT_COSTS = {
  SOCIAL_MEDIA: 10,
  BLOG_IDEAS: 15,
  CODE_EXPLAINER: 20,
  FULL_BLOG: 30,
};

// Tool types
export const TOOL_TYPES = {
  SOCIAL_MEDIA: 'social_media',
  BLOG_IDEAS: 'blog_ideas',
  CODE_EXPLAINER: 'code_explainer',
  FULL_BLOG: 'full_blog',
};

// Tone options for social media generator
export const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'friendly', label: 'Friendly' }
];

// Programming languages for code explainer
export const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'other', label: 'Other' }
];

// Pagination
export const ITEMS_PER_PAGE = 10;

// Credit warning threshold
export const LOW_CREDIT_THRESHOLD = 10;


