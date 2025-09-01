import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import HeartIcon from '@/assets/icons/heart-ico.svg?react';

const End = () => {
  const textRef = React.useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      gsap.to(textRef.current, {
        repeat: -1,
        yoyo: true,
        ease: 'sine.out',
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
        },
        scale: 0.9,
        scrub: true,
      });
    },
    { scope: textRef }
  );

  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center gap-4">
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
