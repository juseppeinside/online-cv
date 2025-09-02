import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import Button from '@/components/button';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FirstScreen = () => {
  const { i18n } = useTranslation();

  const toggleTheme = () => {
    let theme = localStorage.getItem('theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    const newThemeValue = theme === 'dark' ? 'light' : 'dark';

    document.body.classList.value = newThemeValue;
    localStorage.setItem('theme', newThemeValue);
  };

  const toggleLanguage = () => {
    const newValue = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newValue);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true,
          pinSpacing: false,
          trigger: '#first-screen',
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
        },
      });

      tl.add('start')
        .to(
          '#bg',
          {
            ease: 'sine.inOut',
            scale: 1.2,
          },
          'start'
        )
        .to(
          '#front',
          {
            ease: 'sine.inOut',
            y: -100,
            scale: 1.1,
          },
          'start'
        )
        .to(
          '#title',
          {
            ease: 'power2.out',
            y: -300,
          },
          'start'
        )
        .to(
          '#about-me-button',
          {
            ease: 'power2.out',
            opacity: 0,
          },
          'start'
        )
        .to(
          '#tools',
          {
            ease: 'power2.out',
            opacity: 1,
            x: 300,
          },
          'start'
        );
    },
    { scope: '#first-screen' }
  );

  const onClick = () => {
    gsap.to(window, { duration: 1, scrollTo: '#about-me' });
  };

  return (
    <section className="relative h-screen w-screen" id="first-screen">
      <div className="absolute top-1/3 z-30 flex w-full flex-col items-center gap-5">
        <h1 className="h1 text-[90px]" id="title">
          {i18n.t('personal.name')}
        </h1>
        <Button id="about-me-button" onClick={onClick}>
          {i18n.t('button.about')}
        </Button>
      </div>
      <div
        className="absolute z-20 h-full w-full bg-[url(src/assets/images/front.webp)] bg-cover bg-top bg-no-repeat"
        id="front"
      />
      <div
        className="absolute z-10 h-full w-full rotate-180 bg-[url(src/assets/images/bg.png)] bg-cover bg-top bg-no-repeat"
        id="bg"
      />
      <div
        className="absolute top-10 right-10 z-30 flex items-center gap-3"
        id="tools"
      >
        <Button
          className="h-8 w-8 rounded-full bg-background p-0 text-md text-primary uppercase"
          onClick={toggleLanguage}
        >
          {i18n.t('language')}
        </Button>
        <div className="h-8 w-8 rounded-full bg-background">
          <Button
            className="theme-button flex h-8 w-8 px-0"
            onClick={toggleTheme}
          />
        </div>
      </div>
    </section>
  );
};

export default FirstScreen;
