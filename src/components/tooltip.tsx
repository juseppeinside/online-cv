import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const id = `tooltip-${React.useId()}`;

  const { contextSafe } = useGSAP();

  const handleMouseEnter = contextSafe(() => {
    gsap.to(`#${id}`, {
      opacity: 1,
      display: 'block',
      top: '140%',
      ease: 'sine.inOut',
      duration: 0.15,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(`#${id}`, {
      opacity: 0,
      display: 'none',
      top: '100%',
      ease: 'sine.inOut',
      duration: 0.15,
    });
  });

  return (
    <div
      aria-hidden
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="absolute top-full left-1/2 z-10 mx-auto hidden translate-x-[-50%] rounded-lg bg-background-primary p-2 opacity-0"
        id={id}
      >
        <p className="text-secondary text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
