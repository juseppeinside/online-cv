import gsap from 'gsap';

const SQUARES_COUNT = 100;

export const createSquares = () => {
  const squaresGrid = document.getElementById('squares-grid');
  if (squaresGrid) {
    for (let i = 0; i < SQUARES_COUNT; i++) {
      const square = document.createElement('div');
      square.className = 'square';
      square.style.clipPath = 'inset(0)';
      squaresGrid.appendChild(square);
    }
  }
};

export const removePreloader = () => {
  const preloader = document.getElementById('preloader');
  const squares = document.querySelectorAll('.square');

  if (preloader && squares.length > 0) {
    gsap.set(squares, { opacity: 0 });

    gsap.to(squares, {
      opacity: 0.1,
      duration: 0.05,
      stagger: {
        amount: 1.5,
        from: 'random',
      },
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(preloader, {
          opacity: 0.1,
          duration: 0.3,
          onComplete: () => preloader.remove(),
        });
      },
    });
  }
};
