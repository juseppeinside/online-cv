import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const CURSOR_X_OFFSET = 10;
const CURSOR_Y_OFFSET = 5;
const TABLET_BREAKPOINT = 768;

const CustomCursor = () => {
  const svgRef = useRef<HTMLDivElement>(null);

  useGSAP((_, contextSafe) => {
    if (window.innerWidth < TABLET_BREAKPOINT) {
      return;
    }

    const handleMouseMove = contextSafe?.((e: MouseEvent) => {
      if (!svgRef.current) {
        return;
      }

      const { clientX, clientY } = e;

      gsap.to(svgRef.current, {
        x: clientX + CURSOR_X_OFFSET,
        y: clientY + CURSOR_Y_OFFSET,
        ease: 'power2.out',
        duration: 0.25,
        opacity: 1,
      });
    });

    if (handleMouseMove) {
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  });

  const fillColor = '#C4C4C4';
  const strokeColor = '#303030';

  const cursor = (
    <svg
      fill="none"
      height="35"
      viewBox="0 0 17 17"
      width="35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Custom cursor</title>
      <path
        d="M3.66469 3.38977C3.4415 3.29888 3.27143 3.32188 3.17446 3.39485C3.08144 3.46498 2.98705 3.63387 3.03323 3.99415L3.03391 3.99716L4.03181 12.9431C4.06776 13.2337 4.15762 13.3577 4.24084 13.4056C4.32367 13.4531 4.46895 13.4657 4.71289 13.3663L7.71222 11.5839L7.85718 11.4983L7.96614 11.6259L9.21011 13.0769L9.21264 13.081C9.27708 13.1601 9.32387 13.2157 9.38526 13.2592C9.39962 13.2694 9.41592 13.2783 9.43347 13.2876L9.4951 10.7116L4.78503 5.48985L4.77891 5.48237C4.72024 5.4105 4.65879 5.30856 4.66942 5.19273C4.6754 5.1281 4.70429 5.06781 4.75216 5.02237C4.79726 4.9797 4.85061 4.95911 4.89586 4.94936C4.9836 4.93052 5.07666 4.94524 5.15658 4.97242C5.23989 5.00077 5.32628 5.04778 5.40761 5.11228L11.4373 9.80617L14.2409 9.24867C14.3811 9.21806 14.4704 9.17581 14.5199 9.13714C14.5667 9.10065 14.5667 9.07774 14.5667 9.07212C14.5665 9.05922 14.5586 9.01649 14.4908 8.94679C14.4237 8.87781 14.3114 8.79788 14.1419 8.71571L14.1382 8.71337L3.66469 3.38977Z"
        fill={fillColor}
        stroke={strokeColor}
        stroke-width="0.4"
      />
    </svg>
  );

  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 pointer-events-none fixed top-0 left-0 z-[9999] hidden opacity-0 md:block"
      ref={svgRef}
    >
      {cursor}
    </div>
  );
};

export default CustomCursor;
