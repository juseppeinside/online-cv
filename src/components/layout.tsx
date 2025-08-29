import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './custom-cursor';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

type LayoutProps = {
  children: React.ReactNode;
};

const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

const Layout = ({ children }: LayoutProps) => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
      {!isDevMode && <CustomCursor />}
    </div>
  );
};

export default Layout;
