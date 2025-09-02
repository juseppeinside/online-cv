import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n.ts';
import App from './app.tsx';
import Layout from './components/layout.tsx';

// biome-ignore lint/style/noNonNullAssertion: <react rules>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);
