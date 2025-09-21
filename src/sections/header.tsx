/** biome-ignore-all lint/performance/noImgElement: <background images lazy loading> */
import { useGSAP } from '@gsap/react';
import { useNavigate } from '@tanstack/react-router';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import QrCodeIcon from '@/assets/icons/qrcode-ico.svg?react';
import Button from '@/components/button';
import Tooltip from '@/components/tooltip';
import { checkIsMobile } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const MOBILE_TITLE_OFFSET = -230;
const DESKTOP_TITLE_OFFSET = -320;
const MOBILE_SCALE = 1.0;
const DESKTOP_BG_SCALE = 1.2;
const DESKTOP_FRONT_SCALE = 1.1;

const Header = () => {
  const navigate = useNavigate();
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

  const nextLanguage = i18n.language === 'en' ? 'ru' : 'en';

  const toggleLanguage = () => {
    const currentLang = i18n.language || i18n.languages?.[0] || 'en';
    const newValue = currentLang.startsWith('ru') ? 'en' : 'ru';
    i18n.changeLanguage(newValue);
  };

  const isMobile = checkIsMobile();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true,
          pinSpacing: false,
          trigger: '#header',
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
            scale: isMobile ? MOBILE_SCALE : DESKTOP_BG_SCALE,
          },
          'start'
        )
        .to(
          '#front',
          {
            ease: 'sine.inOut',
            y: -100,
            scale: isMobile ? MOBILE_SCALE : DESKTOP_FRONT_SCALE,
          },
          'start'
        )
        .to(
          '#title',
          {
            ease: 'power2.out',
            y: isMobile ? MOBILE_TITLE_OFFSET : DESKTOP_TITLE_OFFSET,
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
            opacity: 0,
            x: 30,
          },
          'start'
        );
    },
    { scope: '#header' }
  );

  const onClick = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '#about-me', offsetY: 150 },
    });
  };

  const handleQrCodeClick = () => {
    // @ts-expect-error
    navigate({ to: '/qr' });
  };

  return (
    <section
      aria-label="Главная секция"
      className="relative h-screen w-screen"
      id="header"
    >
      <header className="absolute top-1/3 z-30 flex w-full flex-col items-center gap-5">
        <h1
          className="h1 text-center text-5xl sm:text-6xl md:text-7xl"
          id="title"
        >
          {i18n.t('personal.name')}
        </h1>
        <Button id="about-me-button" onClick={onClick}>
          {i18n.t('button.about')}
        </Button>
      </header>
      <img
        alt="argonaut"
        className="absolute z-20 h-full w-full object-cover object-top"
        decoding="async"
        height="1080"
        id="front"
        loading="eager"
        src="/images/front.webp"
        width="1920"
      />
      <img
        alt="bg clouds"
        className="absolute z-10 h-full w-full rotate-180 object-cover object-top"
        decoding="async"
        height="1080"
        id="bg"
        loading="eager"
        src="/images/bg.webp"
        width="1920"
      />
      <nav
        aria-label="Settings and navigation"
        className="absolute top-10 right-10 z-30 flex items-center gap-3"
        id="tools"
      >
        <Tooltip text={i18n.t('tooltip.qrcode')}>
          <Button
            aria-label={'Link to HDR QR code'}
            className="flex size-8 items-center justify-center rounded-full p-0 text-md uppercase"
            onClick={handleQrCodeClick}
          >
            <QrCodeIcon className="size-5 text-secondary" />
          </Button>
        </Tooltip>

        <Tooltip text={i18n.t('tooltip.language')}>
          <Button
            aria-label={`Toggle language to ${nextLanguage}`}
            className="h-8 w-8 rounded-full p-0 text-md uppercase"
            onClick={toggleLanguage}
          >
            {nextLanguage}
          </Button>
        </Tooltip>
        <Tooltip text={i18n.t('tooltip.theme')}>
          <Button
            aria-label="Toggle theme"
            className="flex size-8 rounded-full px-0"
            onClick={toggleTheme}
          >
            <div className="theme-button size-8" />
          </Button>
        </Tooltip>
      </nav>
    </section>
  );
};

export default Header;
