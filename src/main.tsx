import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './lib/i18n.ts';
import gsap from 'gsap';
import App from './app.tsx';
import Layout from './components/layout.tsx';

// biome-ignore lint/style/noNonNullAssertion: <react rules>
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);

const removePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    gsap.to(preloader, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => preloader.remove(),
    });
  }
};

requestAnimationFrame(removePreloader);
