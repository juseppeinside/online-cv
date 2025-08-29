import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import Button from '@/components/button';

export type AboutMeProps = {
  title: string;
  description: string;
  years: number;
  hours: number;
  projectCount: number;
};

const AboutMe = ({
  title,
  description,
  years,
  hours,
  projectCount,
}: AboutMeProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'about-me-in',
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      tl.from('.slide-up', {
        y: 150,
        opacity: 0,
        stagger: 0.05,
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 50%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });

      tl.to(containerRef.current, {
        y: -150,
        opacity: 0,
        stagger: 0.02,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="sticky mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-20 py-24 md:flex-row"
      id="about-me"
      ref={containerRef}
    >
      <div className="flex flex-col items-start gap-5">
        <h2 className="h1 slide-up whitespace-break-spaces">{title}</h2>
        <p className="paragraph-sm slide-up font-normal">{description}</p>
        <div className="slide-up">
          <Button>Contact me</Button>
        </div>
      </div>

      <div className="mt-5 flex w-full min-w-[200px] flex-row items-center justify-center gap-12 md:mt-28 md:min-w-0 md:flex-col md:items-end">
        <div className="slide-up">
          <p className={numberClass}>{years}+</p>
          <p className={textClass}>Years of experience</p>
        </div>
        <div className="slide-up">
          <p className={numberClass}>{projectCount}+</p>
          <p className={textClass}>Projects completed</p>
        </div>
        <div className="slide-up">
          <p className={numberClass}>{hours}K+</p>
          <p className={textClass}>Hours of work</p>
        </div>
      </div>
    </section>
  );
};

const numberClass = 'h2 text-center md:text-end';
const textClass = 'paragraph-sm  md:text-end text-center';

export default AboutMe;
