// Normalizes the API Base URL by stripping any trailing slashes
// and defaults to Render in production if not explicitly set
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://meghnila.onrender.com' : 'http://localhost:5000');

export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');
