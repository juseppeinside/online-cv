import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import Button from '@/components/button';
import SectionWrapper from '@/components/section-wrapper';

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
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 40%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });

      tl.from('#slide-up', {
        y: 150,
        opacity: 0,
        stagger: 0.05,
      });

      tl2.to(containerRef.current, {
        y: -150,
        opacity: 0,
        stagger: 0.02,
      });
    },
    { scope: containerRef }
  );

  return (
    <SectionWrapper className="flex-row" id="about-me" ref={containerRef}>
      <div className="flex flex-col items-start gap-5">
        <h2 className="h1 whitespace-break-spaces" id="slide-up">
          {title}
        </h2>
        <p className="paragraph-sm font-normal" id="slide-up">
          {description}
        </p>
        <div id="slide-up">
          <Button>Contact me</Button>
        </div>
      </div>

      <div className="mt-5 flex w-full min-w-[200px] flex-row items-center justify-center gap-12 md:mt-28 md:min-w-0 md:flex-col md:items-end">
        <div id="slide-up">
          <p className={numberClass}>{years}+</p>
          <p className={textClass}>Years of experience</p>
        </div>
        <div id="slide-up">
          <p className={numberClass}>{projectCount}+</p>
          <p className={textClass}>Projects completed</p>
        </div>
        <div id="slide-up">
          <p className={numberClass}>{hours}K+</p>
          <p className={textClass}>Hours of work</p>
        </div>
      </div>
    </SectionWrapper>
  );
};

const numberClass = 'h2 text-center md:text-end';
const textClass = 'paragraph-sm md:text-end text-center';

export default AboutMe;
