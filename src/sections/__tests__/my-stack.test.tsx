import { act, render, screen } from '@testing-library/react';
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import MyStack from '../my-stack';

declare const jest: {
  fn: () => jest.MockedFunction<(...args: unknown[]) => unknown>;
  mock: (moduleName: string, factory?: () => unknown) => void;
  clearAllMocks: () => void;
};

const TECHNOLOGY_REGEX = /React|TypeScript|JavaScript|Node\.js|PostgreSQL|Jest/;
const BLOCK_TITLES_REGEX = /Frontend|Backend|База данных|Тесты/;
const EXPECTED_SUBHEADINGS_COUNT = 4;
const EXPECTED_ICONS_COUNT = 6;

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn().mockImplementation((...args: unknown[]) => {
    // biome-ignore lint/nursery/noShadow: <gsap mock test>
    const callback = args[0] as (...args: unknown[]) => unknown;
    React.useEffect(() => {
      if (typeof callback === 'function') {
        callback();
      }
    }, [callback]);
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
      registerPlugin: jest.fn(),
    },
    registerPlugin: jest.fn(),
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

jest.mock('@/lib/utils', () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(' '),
  isDevMode: process.env.VITE_DEV_MODE === 'true',
}));

jest.mock('@/lib/stack-icons', () => {
  const MockIcon = () => <div data-testid="mock-icon">Mock Icon</div>;
  MockIcon.displayName = 'MockIcon';

  return {
    stackIcons: {
      React: MockIcon,
      TypeScript: MockIcon,
      JavaScript: MockIcon,
      'Node.js': MockIcon,
      PostgreSQL: MockIcon,
      Jest: MockIcon,
    },
  };
});

jest.mock('@/assets/icons/my-stack-ico.svg?react', () => {
  const MockIcon = () => <div data-testid="my-stack-icon">My Stack Icon</div>;
  MockIcon.displayName = 'MockIcon';
  return MockIcon;
});

const mockProps = {
  blocks: [
    {
      title: 'frontend',
      items: ['React', 'TypeScript', 'JavaScript'],
    },
    {
      title: 'backend',
      items: ['Node.js'],
    },
    {
      title: 'database',
      items: ['PostgreSQL'],
    },
    {
      title: 'test',
      items: ['Jest'],
    },
  ],
};

const renderWithI18n = (component: React.ReactElement, language = 'ru') => {
  if (i18next.isInitialized) {
    i18next.changeLanguage(language);
  } else {
    i18next.init({
      lng: language,
      fallbackLng: 'ru',
      resources: {
        ru: {
          translation: {
            stack: {
              frontend: 'Frontend',
              backend: 'Backend',
              database: 'База данных',
              test: 'Тесты',
              tools: 'Инструменты',
            },
            section: {
              stack: 'мой стек',
            },
          },
        },
        en: {
          translation: {
            stack: {
              frontend: 'Frontend',
              backend: 'Backend',
              database: 'Database',
              test: 'Test',
              tools: 'Tools',
            },
            section: {
              stack: 'My stack',
            },
          },
        },
      },
    });
  }
  return render(<I18nextProvider i18n={i18next}>{component}</I18nextProvider>);
};

describe('MyStack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders section title correctly', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      expect(screen.getByText('мой стек')).toBeInTheDocument();
    });

    it('renders all technology blocks', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('База данных')).toBeInTheDocument();
      expect(screen.getByText('Тесты')).toBeInTheDocument();
    });

    it('renders all technology items', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
      expect(screen.getByText('Jest')).toBeInTheDocument();
    });

    it('renders technology icons when available', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      expect(screen.getAllByTestId('mock-icon')).toHaveLength(
        EXPECTED_ICONS_COUNT
      );
    });

    it('renders section icon', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      expect(screen.getByTestId('my-stack-icon')).toBeInTheDocument();
    });

    it('applies correct CSS classes to technology items', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      const technologyItems = screen.getAllByText(TECHNOLOGY_REGEX);

      for (const item of technologyItems) {
        expect(item).toHaveClass('font-medium', 'text-4xl');
      }
    });

    it('applies correct CSS classes to block titles', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      const blockTitles = screen.getAllByText(BLOCK_TITLES_REGEX);

      for (const title of blockTitles) {
        expect(title).toHaveClass('h2', 'uppercase');
      }
    });

    it('applies correct aria-label to technology lists', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      expect(
        screen.getByLabelText('Технологии в категории Frontend')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('Технологии в категории Backend')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('Технологии в категории База данных')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('Технологии в категории Тесты')
      ).toBeInTheDocument();
    });
  });

  describe('Translations', () => {
    it('displays Russian translations when language is set to ru', () => {
      renderWithI18n(<MyStack {...mockProps} />, 'ru');

      expect(screen.getByText('мой стек')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('База данных')).toBeInTheDocument();
      expect(screen.getByText('Тесты')).toBeInTheDocument();
    });

    it('displays English translations when language is set to en', () => {
      renderWithI18n(<MyStack {...mockProps} />, 'en');

      expect(screen.getByText('My stack')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('Database')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('updates aria-labels when language changes', () => {
      const { rerender } = renderWithI18n(<MyStack {...mockProps} />, 'ru');

      expect(
        screen.getByLabelText('Технологии в категории Frontend')
      ).toBeInTheDocument();

      act(() => {
        i18next.changeLanguage('en');
      });

      rerender(
        <I18nextProvider i18n={i18next}>
          <MyStack {...mockProps} />
        </I18nextProvider>
      );

      expect(
        screen.getByLabelText('Технологии в категории Frontend')
      ).toBeInTheDocument();
    });
  });

  describe('GSAP animations', () => {
    it('calls useGSAP with correct parameters', () => {
      const { useGSAP } = require('@gsap/react');
      renderWithI18n(<MyStack {...mockProps} />);

      expect(useGSAP).toHaveBeenCalledTimes(2);
      expect(useGSAP).toHaveBeenCalledWith(expect.any(Function), {
        scope: expect.any(Object),
      });
    });

    it('creates timeline with correct scrollTrigger parameters for first animation', () => {
      const gsap = require('gsap');
      renderWithI18n(<MyStack {...mockProps} />);

      expect(gsap.gsap.timeline).toHaveBeenCalledWith({
        scrollTrigger: {
          trigger: expect.any(Object),
          start: 'top 80%',
          end: 'bottom 70%',
          scrub: 0.5,
        },
      });
    });

    it('creates timeline with correct scrollTrigger parameters for second animation', () => {
      const gsap = require('gsap');
      renderWithI18n(<MyStack {...mockProps} />);

      expect(gsap.gsap.timeline).toHaveBeenCalledWith({
        scrollTrigger: {
          trigger: expect.any(Object),
          start: 'bottom 50%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });
    });

    it('calls from method with correct parameters for slide-up elements', () => {
      const gsap = require('gsap');
      renderWithI18n(<MyStack {...mockProps} />);

      const timeline = gsap.gsap.timeline.mock.results[0].value;
      expect(timeline.from).toHaveBeenCalledWith('#slide-up', {
        opacity: 0,
        y: 40,
        ease: 'none',
        stagger: 0.4,
      });
    });

    it('calls to method with correct parameters for container', () => {
      const gsap = require('gsap');
      renderWithI18n(<MyStack {...mockProps} />);

      const timeline = gsap.gsap.timeline.mock.results[1].value;
      expect(timeline.to).toHaveBeenCalledWith(expect.any(Object), {
        y: -150,
        opacity: 0,
      });
    });
  });

  describe('Different props', () => {
    it('renders correctly with empty blocks array', () => {
      const emptyProps = { blocks: [] };
      renderWithI18n(<MyStack {...emptyProps} />);

      expect(screen.getByText('мой стек')).toBeInTheDocument();
      expect(screen.queryByText('Frontend')).toBeNull();
    });

    it('renders correctly with single block', () => {
      const singleBlockProps = {
        blocks: [
          {
            title: 'frontend',
            items: ['React'],
          },
        ],
      };
      renderWithI18n(<MyStack {...singleBlockProps} />);

      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders correctly with items without icons', () => {
      const propsWithoutIcons = {
        blocks: [
          {
            title: 'frontend',
            items: ['UnknownTech'],
          },
        ],
      };
      renderWithI18n(<MyStack {...propsWithoutIcons} />);

      expect(screen.getByText('UnknownTech')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-icon')).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithI18n(<MyStack {...mockProps} />);

      const mainHeading = screen.getByRole('heading', {
        level: 2,
        name: 'мой стек',
      });
      expect(mainHeading).toBeInTheDocument();

      const subHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(subHeadings).toHaveLength(EXPECTED_SUBHEADINGS_COUNT);
    });
  });
});
