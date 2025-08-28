import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

gsap.registerPlugin(useGSAP);

const CURSOR_X_OFFSET = 11;
const CURSOR_Y_OFFSET = 11;
const TABLET_BREAKPOINT = 768;
const CURSOR_FILL_COLOR = '#C4C4C4';
const CURSOR_STROKE_COLOR = '#303030';

const GSAP_CONFIG = {
  ease: 'power2.out',
  duration: 0.25,
  opacity: 1,
} as const;

const CURSOR_PATH =
  'M3.66469 3.38977C3.4415 3.29888 3.27143 3.32188 3.17446 3.39485C3.08144 3.46498 2.98705 3.63387 3.03323 3.99415L3.03391 3.99716L4.03181 12.9431C4.06776 13.2337 4.15762 13.3577 4.24084 13.4056C4.32367 13.4531 4.46895 13.4657 4.71289 13.3663L7.71222 11.5839L7.85718 11.4983L7.96614 11.6259L9.21011 13.0769L9.21264 13.081C9.27708 13.1601 9.32387 13.2157 9.38526 13.2592C9.39962 13.2694 9.41592 13.2783 9.43347 13.2876L9.4951 10.7116L4.78503 5.48985L4.77891 5.48237C4.72024 5.4105 4.65879 5.30856 4.66942 5.19273C4.6754 5.1281 4.70429 5.06781 4.75216 5.02237C4.79726 4.9797 4.85061 4.95911 4.89586 4.94936C4.9836 4.93052 5.07666 4.94524 5.15658 4.97242C5.23989 5.00077 5.32628 5.04778 5.40761 5.11228L11.4373 9.80617L14.2409 9.24867C14.3811 9.21806 14.4704 9.17581 14.5199 9.13714C14.5667 9.10065 14.5667 9.07774 14.5667 9.07212C14.5665 9.05922 14.5586 9.01649 14.4908 8.94679C14.4237 8.87781 14.3114 8.79788 14.1419 8.71571L14.1382 8.71337L3.66469 3.38977Z';

const SPARKS_PATH =
  'M2.19322 4.31309C2.19684 4.34785 2.19234 4.38293 2.17991 4.4156L2.18016 4.41654C2.17214 4.43817 2.16047 4.4581 2.14638 4.47598L2.09607 4.52261L1.86312 4.67307C1.80908 4.70871 1.76384 4.75692 1.7314 4.81294C1.71527 4.84081 1.70231 4.87025 1.69303 4.90086L1.67583 4.99631L1.66057 5.27106L1.65963 5.2713C1.65763 5.31836 1.64135 5.36412 1.6121 5.40104C1.58288 5.43784 1.54207 5.46427 1.49682 5.47697C1.45178 5.48951 1.40397 5.48778 1.36007 5.4717C1.33796 5.46353 1.31678 5.45188 1.2985 5.43747L1.25162 5.38622L1.10116 5.15327C1.06593 5.09898 1.01816 5.05386 0.962234 5.0213C0.934128 5.00507 0.903976 4.99158 0.873118 4.98223L0.777664 4.96504L0.503868 4.94953C0.480516 4.94771 0.457616 4.94276 0.436152 4.93409L0.374774 4.89678C0.339326 4.86755 0.313654 4.82814 0.301484 4.78383L0.294401 4.715C0.295533 4.69225 0.299888 4.66937 0.307947 4.64778C0.316032 4.62619 0.327655 4.60626 0.341732 4.58834L0.392033 4.54172L0.624739 4.39031C0.67928 4.35517 0.725134 4.30807 0.757899 4.25208L0.757649 4.25113C0.790169 4.19495 0.809896 4.13229 0.814163 4.06751L0.813914 4.06656L0.829421 3.79277L0.829172 3.79182C0.832888 3.74486 0.850891 3.70001 0.881223 3.66392L0.882167 3.66367L0.919109 3.62765C0.932842 3.61729 0.947916 3.60868 0.963766 3.6017C0.995547 3.58772 1.03022 3.58133 1.0649 3.58305C1.09948 3.58477 1.13317 3.59459 1.16335 3.61157C1.19308 3.62836 1.21959 3.65133 1.23887 3.67949L1.23818 3.68068L1.39009 3.91528L1.39034 3.91622C1.4263 3.9691 1.47454 4.01234 1.53015 4.04391C1.58568 4.07543 1.6474 4.09428 1.71114 4.09809L1.98493 4.1136C2.0197 4.11571 2.05352 4.12557 2.08363 4.14307C2.11391 4.16074 2.14018 4.18557 2.15921 4.21501C2.17819 4.24442 2.18954 4.27828 2.19322 4.31309ZM3.85947 1.95751C3.87417 2.01311 3.87109 2.07217 3.85155 2.12627L3.8525 2.12602C3.84249 2.15288 3.82784 2.17754 3.81038 2.19978L3.74885 2.25745L3.40975 2.47638L3.40881 2.47663C3.32366 2.53243 3.25325 2.60787 3.20212 2.69591C3.15106 2.78384 3.12087 2.88222 3.11456 2.9837L3.11481 2.98464L3.09267 3.38241L3.09198 3.38361C3.08882 3.44477 3.06598 3.50293 3.02695 3.55029C2.99028 3.59412 2.9415 3.62635 2.88628 3.64101C2.83088 3.65565 2.77189 3.65197 2.71821 3.6319C2.66452 3.61192 2.61827 3.57583 2.58583 3.52851L2.36691 3.1894C2.31139 3.10441 2.23639 3.0334 2.14857 2.98247C2.06044 2.93146 1.96133 2.90072 1.85959 2.89421L1.85864 2.89446L1.46276 2.87183C1.40372 2.86685 1.34746 2.84458 1.3013 2.80743C1.25726 2.77052 1.2257 2.72102 1.21127 2.66557L1.21102 2.66463C1.19633 2.60916 1.19907 2.55056 1.21919 2.49681C1.22932 2.46982 1.2434 2.44446 1.26106 2.42211L1.32353 2.36418L1.66194 2.14645C1.74756 2.09082 1.8193 2.015 1.87051 1.92667C1.90903 1.86066 1.93589 1.78864 1.94961 1.71385L1.95877 1.63769L1.9809 1.23992C1.98372 1.19691 1.99659 1.15511 2.01835 1.1179C2.04022 1.0806 2.07059 1.04833 2.10687 1.0248C2.14315 1.00128 2.18483 0.986478 2.22781 0.981724C2.27061 0.977025 2.31389 0.982875 2.35428 0.99779C2.40848 1.01774 2.45531 1.05417 2.48785 1.10188L2.48854 1.10068L2.70678 1.44098L2.70703 1.44192C2.76278 1.52381 2.83661 1.59207 2.92242 1.64156C2.98686 1.67867 3.05703 1.70546 3.12978 1.71907L3.2038 1.72779L3.61081 1.75051C3.66902 1.7544 3.72439 1.7772 3.7692 1.8147C3.81288 1.85205 3.84476 1.90195 3.85947 1.95751Z';

const isDesktop = () => window.innerWidth >= TABLET_BREAKPOINT;

const CustomCursor = () => {
  const svgRef = React.useRef<HTMLDivElement>(null);
  const sparksRef = React.useRef<SVGPathElement>(null);
  const [isHoveringButton, setIsHoveringButton] = React.useState(false);

  const handleMouseEnter = React.useCallback(() => {
    setIsHoveringButton(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHoveringButton(false);
  }, []);

  useGSAP((_, contextSafe) => {
    if (!isDesktop()) {
      return;
    }

    const handleMouseMove = contextSafe?.((e: MouseEvent) => {
      if (!svgRef.current) {
        return;
      }

      const { clientX, clientY } = e;

      gsap.to(svgRef.current, {
        ...GSAP_CONFIG,
        x: clientX + CURSOR_X_OFFSET,
        y: clientY + CURSOR_Y_OFFSET,
      });
    });

    if (handleMouseMove) {
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  });

  React.useEffect(() => {
    if (!isDesktop()) {
      return;
    }

    const buttons = document.querySelectorAll('button');

    for (const button of buttons) {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      for (const button of buttons) {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  React.useEffect(() => {
    if (!sparksRef.current) {
      return;
    }

    if (isHoveringButton) {
      gsap.fromTo(
        sparksRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(sparksRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [isHoveringButton]);

  const cursor = React.useMemo(
    () => (
      <path
        d={CURSOR_PATH}
        fill={CURSOR_FILL_COLOR}
        stroke={CURSOR_STROKE_COLOR}
        strokeWidth="0.4"
      />
    ),
    []
  );

  const sparks = React.useMemo(
    () => (
      <path
        d={SPARKS_PATH}
        fill="yellow"
        ref={sparksRef}
        stroke="orange"
        strokeWidth="0.2"
        style={{ opacity: 0 }}
      />
    ),
    []
  );

  const shouldRender = React.useMemo(() => isDesktop(), []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 pointer-events-none fixed top-0 left-0 z-[9999] hidden opacity-0 md:block"
      ref={svgRef}
    >
      <svg
        fill="none"
        height="35"
        viewBox="0 0 17 17"
        width="35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Custom cursor</title>
        {cursor}
        {sparks}
      </svg>
    </div>
  );
};

export default React.memo(CustomCursor);
