export const WEB_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5174'
  : 'https://scheduler-web-mu.vercel.app';
