import { fireEvent, render, screen } from '@testing-library/react';
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import AboutMe from '../about-me';

declare const jest: {
  fn: () => jest.MockedFunction<(...args: unknown[]) => unknown>;
  mock: (moduleName: string, factory?: () => unknown) => void;
  clearAllMocks: () => void;
};

const NUMBER_REGEX = /\d+\+/;
const TEXT_REGEX = /Лет опыта|Проектов завершено|Часов отработано/;
const DESCRIPTION_REGEX = /Привет! Меня зовут Максим/;

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn().mockImplementation((...args: unknown[]) => {
    // biome-ignore lint/nursery/noShadow: <gsap mock test>
    const callbackFn = args[0] as (...args: unknown[]) => unknown;
    React.useEffect(() => {
      if (typeof callbackFn === 'function') {
        callbackFn();
      }
    }, [callbackFn]);
  }),
}));

jest.mock('gsap', () => {
  const mockTimeline = {
    from: jest.fn(),
    to: jest.fn(),
  };

  return {
    gsap: {
      timeline: jest.fn().mockReturnValue(mockTimeline),
      to: jest.fn(),
    },
    timeline: jest.fn().mockReturnValue(mockTimeline),
    to: jest.fn(),
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(),
  },
}));

jest.mock('@/lib/utils', () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(' '),
  isDevMode: process.env.VITE_DEV_MODE === 'true',
}));

const mockProps = {
  years: 6,
  hours: 10,
  projectCount: 50,
};

const renderWithI18n = (component: React.ReactElement) => {
  if (!i18next.isInitialized) {
    i18next.init({
      lng: 'ru',
      fallbackLng: 'ru',
      resources: {
        ru: {
          translation: {
            about: {
              title: 'Frontend\nРазработчик',
              years: 'Лет опыта',
              projects: 'Проектов завершено',
              hours: 'Часов отработано',
            },
            personal: {
              description:
                'Привет! Меня зовут Максим, опытный Frontend-разработчик из Санкт-Петербурга. Имея более 6 лет опыта, я помогаю людям развивать их бизнес, предоставляя современные и эффективные веб-решения.',
            },
            button: {
              contacts: 'Свяжитесь со мной',
            },
          },
        },
      },
    });
  }
  return render(<I18nextProvider i18n={i18next}>{component}</I18nextProvider>);
};

describe('AboutMe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Statistics rendering', () => {
    it('displays correct statistics values', () => {
      renderWithI18n(<AboutMe {...mockProps} />);

      expect(screen.getByText('6+')).toBeInTheDocument();
      expect(screen.getByText('50+')).toBeInTheDocument();
      expect(screen.getByText('10K+')).toBeInTheDocument();
    });

    it('displays translated labels for statistics', () => {
      renderWithI18n(<AboutMe {...mockProps} />);

      expect(screen.getByText('Лет опыта')).toBeInTheDocument();
      expect(screen.getByText('Проектов завершено')).toBeInTheDocument();
      expect(screen.getByText('Часов отработано')).toBeInTheDocument();
    });

    it('applies correct CSS classes for numbers and text', () => {
      renderWithI18n(<AboutMe {...mockProps} />);

      const numberElements = screen.getAllByText(NUMBER_REGEX);
      const textElements = screen.getAllByText(TEXT_REGEX);

      for (const element of numberElements) {
        expect(element).toHaveClass('h2', 'text-center', 'md:text-end');
      }

      for (const element of textElements) {
        expect(element).toHaveClass(
          'paragraph-sm',
          'md:text-end',
          'text-center'
        );
      }
    });

    it('displays title and description', () => {
      renderWithI18n(<AboutMe {...mockProps} />);

      expect(
        screen.getByText((_, element) => {
          return element?.textContent === 'Frontend\nРазработчик';
        })
      ).toBeInTheDocument();
      expect(screen.getByText(DESCRIPTION_REGEX)).toBeInTheDocument();
    });

    it('displays contact button', () => {
      renderWithI18n(<AboutMe {...mockProps} />);

      const button = screen.getByRole('button', { name: 'Свяжитесь со мной' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Event handlers', () => {
    it('calls gsap.to when contact button is clicked', () => {
      const gsap = require('gsap');
      renderWithI18n(<AboutMe {...mockProps} />);

      const button = screen.getByRole('button', { name: 'Свяжитесь со мной' });
      fireEvent.click(button);

      expect(gsap.gsap.to).toHaveBeenCalledWith(window, {
        duration: 1,
        scrollTo: '#contacts',
      });
    });
  });

  describe('GSAP animations', () => {
    it('creates timeline with correct scrollTrigger parameters', () => {
      const gsap = require('gsap');
      renderWithI18n(<AboutMe {...mockProps} />);

      expect(gsap.gsap.timeline).toHaveBeenCalledWith({
        scrollTrigger: {
          trigger: expect.any(Object),
          start: 'top 80%',
          end: 'bottom 100%',
          scrub: 1,
        },
      });
    });

    it('creates second timeline with correct scrollTrigger parameters', () => {
      const gsap = require('gsap');
      renderWithI18n(<AboutMe {...mockProps} />);

      expect(gsap.gsap.timeline).toHaveBeenCalledWith({
        scrollTrigger: {
          trigger: expect.any(Object),
          start: 'bottom 40%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });
    });

    it('calls from method with correct parameters for slide-up elements', () => {
      const gsap = require('gsap');
      renderWithI18n(<AboutMe {...mockProps} />);

      const timeline = gsap.gsap.timeline.mock.results[0].value;
      expect(timeline.from).toHaveBeenCalledWith('#slide-up', {
        y: 150,
        opacity: 0,
        stagger: 0.05,
      });
    });

    it('calls to method with correct parameters for container', () => {
      const gsap = require('gsap');
      renderWithI18n(<AboutMe {...mockProps} />);

      const timeline = gsap.gsap.timeline.mock.results[0].value;
      expect(timeline.to).toHaveBeenCalledWith(expect.any(Object), {
        y: -150,
        opacity: 0,
        stagger: 0.02,
      });
    });

    it('calls useGSAP with correct scope', () => {
      const { useGSAP } = require('@gsap/react');
      renderWithI18n(<AboutMe {...mockProps} />);

      expect(useGSAP).toHaveBeenCalledWith(expect.any(Function), {
        scope: expect.any(Object),
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label for statistics', () => {
      renderWithI18n(<AboutMe {...mockProps} />);

      const statisticsSection = screen.getByLabelText(
        'Статистика опыта работы'
      );
      expect(statisticsSection).toBeInTheDocument();
    });

    it('has correct id for section', () => {
      renderWithI18n(<AboutMe {...mockProps} />);

      const section = screen.getByRole('article').closest('section');
      expect(section).toHaveAttribute('id', 'about-me');
    });
  });

  describe('Different props', () => {
    it('correctly displays different statistics values', () => {
      const customProps = {
        years: 10,
        hours: 25,
        projectCount: 100,
      };

      renderWithI18n(<AboutMe {...customProps} />);

      expect(screen.getByText('10+')).toBeInTheDocument();
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('25K+')).toBeInTheDocument();
    });
  });
});
