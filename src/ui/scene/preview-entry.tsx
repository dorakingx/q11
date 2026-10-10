/** Mount for scene-preview.html (dev only). */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Preview } from './Preview';

const rootEl = document.getElementById('root');
if (rootEl !== null) {
  createRoot(rootEl).render(
    <StrictMode>
      <Preview />
    </StrictMode>,
  );
}
