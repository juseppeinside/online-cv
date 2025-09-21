import { useGSAP } from '@gsap/react';
import { useLocation } from '@tanstack/react-router';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import { checkIsMobile } from '@/lib/utils';
import CustomCursor from './custom-cursor';
import Scrollbar from './scrollbar';
import SnowBackground from './snow-background';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

type LayoutProps = {
  children: React.ReactNode;
};

const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

const Layout = ({ children }: LayoutProps) => {
  const isMobile = checkIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  }, []);

  React.useLayoutEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme) {
      document.body.classList.value = theme;
    } else {
      document.body.classList.value = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
        ? 'dark'
        : 'light';
    }
  }, []);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
      {isHomePage && !isMobile && <Scrollbar />}
      {!(isDevMode || isMobile) && <CustomCursor />}
      {isHomePage && !isMobile && <SnowBackground />}
    </>
  );
};

export default Layout;
