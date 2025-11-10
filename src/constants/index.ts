// API endpoints and configuration constants
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  // Add your API endpoints here
}

// App constants
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Snackact UI',
  VERSION: import.meta.env.VITE_APP_VERSION || '0.0.0',
}
