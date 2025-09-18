import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MULTIPLIER = 100;

const Scrollbar = () => {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#header',
      start: 'bottom 100%',
      end: 'bottom top',
      onEnter: () => {
        gsap.to('#scroll', {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to('#scroll', {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to('#track', {
          height: `${self.progress * MULTIPLIER}%`,
          duration: 0.1,
          ease: 'none',
          scrub: 1,
        });
      },
    });
  });

  return (
    <div
      className="-translate-y-1/2 fixed top-1/2 right-2 z-10 h-[15%] w-3 rounded-md bg-primary/60 opacity-0 md:right-6"
      id="scroll"
    >
      <div className="w-full rounded-md bg-primary" id="track" />
    </div>
  );
};

export default Scrollbar;
