import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './custom-cursor';
import SnowBackground from './snow-background';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div className="relative z-10 bg-secondary" id="smooth-content">
        {children}
      </div>
      <SnowBackground />
      <CustomCursor />
    </div>
  );
};

export default Layout;
