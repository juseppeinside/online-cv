import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MyStackIcon from '@/assets/icons/my-stack-ico.svg?react';
import SectionWrapper from '@/components/section-wrapper';
import { stackIcons } from '@/lib/stack-icons';

gsap.registerPlugin(ScrollTrigger);

export type MyStackProps = {
  blocks: {
    title: string;
    items: string[];
  }[];
};

const MyStack = ({ blocks }: MyStackProps) => {
  const { i18n } = useTranslation();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      });

      tl.from('#slide-up', {
        opacity: 0,
        y: 40,
        ease: 'none',
        stagger: 0.4,
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
      });
    },
    { scope: containerRef }
  );
  const stack = blocks.map(({ title, items }) => (
    <div className="grid gap-10 sm:grid-cols-2" id="slide-up" key={title}>
      <h3 className="h2">{i18n.t(`stack.${title}`)}</h3>
      <div className="flex flex-wrap gap-11">
        {items.map((i) => {
          const IconComponent = stackIcons[i as keyof typeof stackIcons];

          return (
            <div className="flex items-center gap-3" id="slide-up" key={i}>
              {IconComponent && <IconComponent className="h-10 w-10" />}
              <p className="font-medium text-4xl">{i}</p>
            </div>
          );
        })}
      </div>
    </div>
  ));

  return (
    <SectionWrapper
      Icon={MyStackIcon}
      ref={containerRef}
      title={i18n.t('section.stack')}
    >
      <div className="flex flex-col gap-20">{stack}</div>
    </SectionWrapper>
  );
};

export default MyStack;
