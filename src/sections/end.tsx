import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import HeartIcon from '@/assets/icons/heart-ico.svg?react';

const End = () => {
  const textRef = React.useRef<HTMLParagraphElement | null>(null);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useGSAP(
    (context) => {
      gsap.to(textRef.current, {
        repeat: -1,
        yoyo: true,
        ease: 'bounce',
        stagger: {
          each: 1,
          repeat: -1,
          yoyo: true,
        },
        scale: 0.9,
        scrub: true,
      });

      if (!isVisible) {
        context?.revert();
      }
    },
    { scope: textRef, dependencies: [isVisible] }
  );

  return (
    <div
      className="flex h-72 w-full flex-col items-center justify-center gap-4"
      ref={ref}
    >
      <p className="inline-block text-center">
        make with{' '}
        <span className="inline-block" ref={textRef}>
          <HeartIcon className="inline-block h-4 w-4 align-middle text-red-500" />
        </span>{' '}
        for dear HRs
      </p>
      <p>this resume on github</p>
    </div>
  );
};

export default End;
