import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type React from 'react';
import CustomCursor from './custom-cursor';
import SnowBackground from './snow-background';

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
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
      {!isDevMode && <CustomCursor />}
      <SnowBackground />
    </>
  );
};

export default Layout;
