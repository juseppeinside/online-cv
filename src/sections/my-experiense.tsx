import { useGSAP } from '@gsap/react';
import dayjs from 'dayjs';
import { gsap } from 'gsap';
import React from 'react';
import CaseIcon from '@/assets/icons/case-ico.svg?react';
import SectionWrapper from '@/components/section-wrapper';

export type MyExperienceProps = {
  experience: {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
  }[];
};

const MyExperience = ({ experience }: MyExperienceProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM YYYY');
  };

  useGSAP(
    () => {
      const tlStart = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      });

      tlStart.from('#slide-up', {
        opacity: 0,
        y: 40,
        ease: 'none',
        stagger: 0.4,
      });

      const tlEnd = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 50%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });

      tlEnd.to(containerRef.current, {
        y: -150,
        opacity: 0,
      });
    },
    { scope: containerRef }
  );

  return (
    <SectionWrapper Icon={CaseIcon} ref={containerRef} title="My Experience">
      <div className="flex flex-col gap-20">
        {experience.map((item) => (
          <div className="flex flex-col gap-1" id="slide-up" key={item.id}>
            <h3 className="h3">{item.company}</h3>
            <h2 className="h2">{item.position}</h2>
            <p className="paragraph-sm">
              {formatDate(item.startDate)} -{' '}
              {item.endDate ? formatDate(item.endDate) : 'Present'}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default MyExperience;
