import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import HeartIcon from '@/assets/icons/heart-ico.svg?react';
import StarIcon from '@/assets/icons/star-ico.svg?react';
import logger from '@/lib/logger';

//TODO: Вынести в отдельный API
const repoPromise = fetch('https://api.github.com/repos').then((res) => {
  try {
    if (!res.ok) {
      throw new Error('Ошибка загрузки');
    }
    return res.json();
  } catch (error) {
    logger.error('Error fetching repo >>>', error);
    return null;
  }
});

const End = () => {
  const repo = React.use(repoPromise);

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
        stagger: {
          each: 1,
          repeat: -1,
          yoyo: true,
        },
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
    <div
      className="flex h-72 w-full flex-col items-center justify-center gap-4"
      ref={wrapperRef}
    >
      <p className="inline-block text-center">
        make with{' '}
        <span className="inline-block" ref={svgRef}>
          <HeartIcon className="inline-block h-4 w-4 align-middle text-red-500" />
        </span>{' '}
        for dear HRs
      </p>
      <p>this resume on github</p>
      {repo && (
        <div className="flex items-center gap-1">
          <StarIcon className="h-4 w-4" />
          <p>{repo.stargazers_count}</p>
        </div>
      )}
    </div>
  );
};

export default End;
