import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './lib/i18n.ts';

import App from './app.tsx';
import Layout from './components/layout.tsx';
import { createSquares, removePreloader } from './components/preloader.tsx';

// biome-ignore lint/style/noNonNullAssertion: <react rules>
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);

const SQUARES_DELAY = 1000;

requestAnimationFrame(() => {
  createSquares();
  setTimeout(removePreloader, SQUARES_DELAY);
});
