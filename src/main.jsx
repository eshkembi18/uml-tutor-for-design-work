// Pre-render theme sync: apply user's saved theme or system preference
try {
  const saved = localStorage.getItem('theme');
  let dark;
  if (saved === 'dark') dark = true;
  else if (saved === 'light') dark = false;
  else dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const classDark = 'theme-dark';
  const classLight = 'theme-light';
  document.documentElement.classList.remove(classDark, classLight);
  document.documentElement.classList.add(dark ? classDark : classLight);
} catch (e) {
  /* ignore when localStorage or window not available */
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
