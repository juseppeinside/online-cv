import gsap from 'gsap';

export const removePreloader = () => {
  const preloader = document.getElementById('preloader');

  if (preloader) {
    gsap.to(preloader, {
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => preloader.remove(),
    });
  }
};
