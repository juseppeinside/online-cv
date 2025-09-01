import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import ContactIcon from '@/assets/icons/contact-ico.svg?react';
import SectionWrapper from '@/components/section-wrapper';
import { formatContactCode } from '@/lib/contact-adapter';

export type ContactsProps = {
  contacts: {
    code: string;
    url: string;
    name: string;
  }[];
};

const Contacts = ({ contacts }: ContactsProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

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
        x: 150,
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
      className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[repeat(2,200px)] sm:gap-10"
      id="slide-up"
      key={contact.code}
    >
      <h2 className="h2 text-start uppercase sm:text-end">{contact.name}</h2>
      <p className="">{formatContactCode(contact.name, contact.code)}</p>
    </div>
  ));

  return (
    <SectionWrapper Icon={ContactIcon} ref={containerRef} title="Contacts">
      <div className="flex flex-col gap-10">{contactsList}</div>
    </SectionWrapper>
  );
};

export default Contacts;
