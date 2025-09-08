import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import IconCursor from '@/assets/icons/cursor-ico.svg?react';
import { checkIsMobile } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

const CURSOR_X_OFFSET = 11;
const CURSOR_Y_OFFSET = 11;

const GSAP_CONFIG = {
  ease: 'power2.out',
  duration: 0.25,
  opacity: 1,
} as const;

const CustomCursor = () => {
  const isMobile = checkIsMobile();
  const svgRef = React.useRef<HTMLDivElement>(null);

  useGSAP((_, contextSafe) => {
    if (isMobile) {
      return;
    }

    const showCursor = contextSafe?.(() => {
      if (!svgRef.current) {
        return;
      }
      gsap.to(svgRef.current, { autoAlpha: 1, duration: 0.2 });
    });

    const hideCursor = contextSafe?.(() => {
      if (!svgRef.current) {
        return;
      }
      gsap.to(svgRef.current, { autoAlpha: 0, duration: 0.2 });
    });

    const handleMouseMove = contextSafe?.((e: MouseEvent) => {
      if (!svgRef.current) {
        return;
      }

      const { clientX, clientY } = e;

      gsap.to(svgRef.current, {
        ...GSAP_CONFIG,
        x: clientX + CURSOR_X_OFFSET,
        y: clientY + CURSOR_Y_OFFSET,
        duration: 0.2,
      });

      // если вдруг он скрыт — показать
      showCursor?.();
    });

    if (handleMouseMove && showCursor && hideCursor) {
      document.addEventListener('mousemove', handleMouseMove);

      document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget) {
          hideCursor?.();
        }
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  });

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 pointer-events-none fixed top-0 left-0 z-[9999] hidden opacity-0 md:block"
      ref={svgRef}
    >
      <IconCursor className="size-6 text-primary" />
    </div>
  );
};

export default React.memo(CustomCursor);
