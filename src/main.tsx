import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './lib/i18n.ts';

import App from './app.tsx';
import Layout from './components/layout.tsx';
import { removePreloader } from './components/preloader.tsx';

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <react rules>
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <App />
      </Layout>
    </QueryClientProvider>
  </StrictMode>
);

const ANIMATION_DURATION = 100;

requestAnimationFrame(() => {
  setTimeout(() => {
    removePreloader();
  }, ANIMATION_DURATION);
});
