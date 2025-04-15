/// <reference types="vite/client" />
const baseUrl = import.meta.env.REACT_APP_API_URL;

if (import.meta.env.MODE === 'development') {
    console.log('开发环境');
  }