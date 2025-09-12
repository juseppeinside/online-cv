import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeartIcon from '@/assets/icons/heart-ico.svg?react';
import StarIcon from '@/assets/icons/star-ico.svg?react';
import { useGithubStars } from '@/hooks/use-github-stars';
import { cn, isDevMode } from '@/lib/utils';

const End = () => {
  const { data: stars, isFetching } = useGithubStars(
    'juseppeinside',
    'online-cv'
  );

  const { i18n } = useTranslation();

  const svgRef = React.useRef<HTMLSpanElement | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  useGSAP(
    (context) => {
      gsap.to(svgRef.current, {
        repeat: -1,
        yoyo: true,
        ease: 'bounce',
        scale: 0.9,
        scrub: true,
      });

      if (!isVisible) {
        context?.revert();
      }
    },
    { scope: svgRef, dependencies: [isVisible] }
  );

  return (
    <footer
      className="flex h-72 w-full flex-col items-center justify-center gap-4"
      ref={wrapperRef}
    >
      <p className="inline-block text-center">
        {i18n.t('end.before')}
        <span className="inline-block px-1" ref={svgRef}>
          <HeartIcon
            aria-hidden="true"
            className="inline-block h-4 w-4 align-middle text-red-500"
          />
        </span>
        {i18n.t('end.after')}
      </p>
      <a
        aria-label="Посмотреть исходный код резюме на GitHub"
        className={cn(
          'cursor-none underline hover:text-blue-400',
          isDevMode && 'cursor-pointer'
        )}
        href={import.meta.env.VITE_URL_GITHUB_CV_LINK}
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        {i18n.t('end.text')}
      </a>
      {stars && !isFetching && (
        <div className="flex items-center gap-1">
          <StarIcon aria-hidden="true" className="h-4 w-4" />
          <p>{stars}</p>
        </div>
      )}
    </footer>
  );
};

export default End;
