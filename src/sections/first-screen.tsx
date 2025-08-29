import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/button';

export type FirstScreenProps = {
  title: string;
};

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FirstScreen = ({ title }: FirstScreenProps) => {
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true,
          pinSpacing: false,
          trigger: '#firstScreen',
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
        },
      });
      tl.to('#bg', {
        ease: 'sine.inOut',
        scale: 1.2,
      });
      tl.to('#front', {
        ease: 'sine.inOut',
        y: 200,
      });
    },
    { scope: '#firstScreen' }
  );

  const onClick = () => {
    gsap.to(window, { duration: 1, scrollTo: '#about-me' });
  };

  return (
    <section className="relative h-screen w-screen" id="firstScreen">
      <div className="absolute top-1/3 z-30 flex w-full flex-col items-center gap-5">
        <h1 className="h1 text-[90px] text-secondary">{title}</h1>
        <Button onClick={onClick}>About me</Button>
      </div>
      <div
        className="absolute z-20 h-full w-full bg-[url(../../public/front.png)] bg-cover bg-top bg-no-repeat"
        id="front"
      />
      <div
        className="absolute z-10 h-full w-full rotate-180 bg-[url(../../public/bg.png)] bg-cover bg-top bg-no-repeat"
        id="bg"
      />
    </section>
  );
};

export default FirstScreen;
