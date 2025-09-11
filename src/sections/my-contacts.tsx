import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ContactIcon from '@/assets/icons/contact-ico.svg?react';
import SectionWrapper from '@/components/section-wrapper';
import { formatContactCode } from '@/lib/contact-adapter';

export type MyContactsProps = {
  contacts: {
    code: string;
    url: string;
    name: string;
  }[];
};

const MyContacts = ({ contacts }: MyContactsProps) => {
  const { i18n } = useTranslation();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tlStart = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 100%',
          scrub: 0.5,
        },
      });

      tlStart.from('#slide-up', {
        opacity: 0,
        y: 150,
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

  const contactsList = contacts.map((contact) => (
    <div
      className="grid grid-cols-1 items-center gap-6 after:col-span-full after:block after:h-0.5 after:w-full after:bg-primary after:content-[''] last:after:hidden sm:grid-cols-[repeat(2,minmax(0,1fr))]"
      id="slide-up"
      key={contact.code}
    >
      <h2 className="h2 uppercase">{i18n.t(`contacts.${contact.name}`)}</h2>
      <p className="text-2xl">
        {formatContactCode(contact.name, contact.code)}
      </p>
    </div>
  ));

  return (
    <SectionWrapper
      Icon={ContactIcon}
      id="contacts"
      ref={containerRef}
      title={i18n.t('section.contacts')}
    >
      <div className="flex flex-col gap-10">{contactsList}</div>
    </SectionWrapper>
  );
};

export default MyContacts;
