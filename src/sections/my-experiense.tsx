import { useGSAP } from '@gsap/react';
import dayjs from 'dayjs';
import { gsap } from 'gsap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CaseIcon from '@/assets/icons/case-ico.svg?react';
import SectionWrapper from '@/components/section-wrapper';
import 'dayjs/locale/ru';

const regEx = /^./;

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
  const { i18n } = useTranslation();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const formatDate = (dateString: string) => {
    return dayjs(dateString).locale(i18n.language).format('MMM YYYY');
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

  const list = experience.map((item) => {
    const startDate = formatDate(item.startDate).replace(regEx, (char) =>
      char.toUpperCase()
    );
    const endDate = item.endDate
      ? formatDate(item.endDate).replace(regEx, (char) => char.toUpperCase())
      : i18n.t('present');

    return (
      <div className="flex flex-col gap-1" id="slide-up" key={item.id}>
        <h3 className="h3">{item.company}</h3>
        <h2 className="h2">{i18n.t(`experience.${item.position}`)}</h2>
        <p className="paragraph-sm">{`${startDate} - ${endDate}`}</p>
      </div>
    );
  });

  return (
    <SectionWrapper
      Icon={CaseIcon}
      ref={containerRef}
      title={i18n.t('section.experience')}
    >
      <div className="flex flex-col gap-20">{list}</div>
    </SectionWrapper>
  );
};

export default MyExperience;
