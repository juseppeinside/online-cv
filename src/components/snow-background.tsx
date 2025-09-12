import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const SNOWFLAKE_COUNT = 30;
const MIN_SIZE = 2;
const MAX_SIZE = 5;
const MIN_DURATION = 10;
const MAX_DURATION = 30;
const MIN_OPACITY = 0.3;
const MAX_OPACITY = 0.8;
const ROTATION_DEGREES = 360;
const FALL_OFFSET = 50;
const DRIFT_RANGE = 50;
const DRIFT_OFFSET = 30;
const MAX_DELAY = 0;
const SWING_AMPLITUDE = 20;
const SWING_DURATION = 0;
const TIME_FACTOR = 0.001;

const SnowBackground = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) {
      return;
    }

    gsap.set(containerRef.current, { opacity: 0 });

    ScrollTrigger.create({
      trigger: '#first-screen',
      start: 'bottom 100%',
      end: 'bottom top',
      onEnter: () => {
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });

    if (!containerRef.current) {
      return;
    }

    const snowflakes = containerRef.current.querySelectorAll('.snowflake');

    snowflakes.forEach((snowflake, index) => {
      const element = snowflake;
      const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;

      gsap.set(element, {
        width: size,
        height: size,
        opacity: Math.random() * (MAX_OPACITY - MIN_OPACITY) + MIN_OPACITY,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * ROTATION_DEGREES,
      });

      const timeline = gsap.timeline({ repeat: -1 });

      timeline.to(element, {
        y: window.innerHeight + FALL_OFFSET,
        x: `+=${Math.random() * DRIFT_RANGE - DRIFT_OFFSET}`,
        rotation: `+=${Math.random() * ROTATION_DEGREES}`,
        duration: Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION,
        ease: 'none',
        delay: Math.random() * MAX_DELAY,
        onComplete: () => {
          gsap.set(element, {
            y: 0,
            x: Math.random() * window.innerWidth,
          });
        },
      });

      gsap.to(element, {
        x: `+=${Math.sin(Date.now() * TIME_FACTOR + index) * SWING_AMPLITUDE}`,
        duration: SWING_DURATION,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
      ref={containerRef}
    >
      {new Array(SNOWFLAKE_COUNT).fill(0).map((_, index) => (
        <div
          className="snowflake absolute rounded-full bg-primary/90"
          key={`snowflake-${Date.now()}-${index}`}
        />
      ))}
    </div>
  );
};

export default SnowBackground;
