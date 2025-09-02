import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/button';
import SectionWrapper from '@/components/section-wrapper';

export type AboutMeProps = {
  years: number;
  hours: number;
  projectCount: number;
};

const AboutMe = ({ years, hours, projectCount }: AboutMeProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { i18n } = useTranslation();

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

  const handleClickToContact = () => {
    gsap.to(window, { duration: 1, scrollTo: '#contacts' });
  };

  return (
    <SectionWrapper ref={containerRef}>
      <div className="flex flex-col gap-10 md:flex-row" id="about-me">
        <div className="flex flex-col items-start gap-5">
          <h2 className="h1 whitespace-break-spaces" id="slide-up">
            {i18n.t('about.title')}
          </h2>
          <p className="paragraph-sm font-normal" id="slide-up">
            {i18n.t('personal.description')}
          </p>
          <div id="slide-up">
            <Button onClick={handleClickToContact}>
              {i18n.t('button.contacts')}
            </Button>
          </div>
        </div>

        <div className="mt-5 flex w-full flex-row items-center justify-center gap-12 md:mt-28 md:flex-col md:items-end">
          <div id="slide-up">
            <p className={numberClass}>{years}+</p>
            <p className={textClass}>{i18n.t('about.years')}</p>
          </div>
          <div id="slide-up">
            <p className={numberClass}>{projectCount}+</p>
            <p className={textClass}>{i18n.t('about.projects')}</p>
          </div>
          <div id="slide-up">
            <p className={numberClass}>{hours}K+</p>
            <p className={textClass}>{i18n.t('about.hours')}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const numberClass = 'h2 text-center md:text-end';
const textClass = 'paragraph-sm md:text-end text-center';

export default AboutMe;
