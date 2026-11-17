import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LangProvider } from './lib/i18n';
import './index.css';

// Equipos muy limitados: se quitan los efectos caros antes del primer pintado.
const cores = navigator.hardwareConcurrency || 8;
const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
if (cores <= 2 || memory <= 2 || (cores <= 4 && memory <= 4)) document.documentElement.classList.add('lite');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
);
