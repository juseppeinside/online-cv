import { act, render, screen } from '@testing-library/react';
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import MyExperience from '../my-experiense';

declare const jest: {
  fn: () => jest.MockedFunction<(...args: unknown[]) => unknown>;
  mock: (moduleName: string, factory?: () => unknown) => void;
  clearAllMocks: () => void;
};

const COMPANY_REGEX = /Company [ABC]/;
const POSITION_REGEX = /Frontend|Middle|Junior/;
const PRESENT_RUSSIAN = /По настоящее время/;
const PRESENT_ENGLISH = /Present/;

const mockExperience = [
  {
    id: 1,
    company: 'Company A',
    position: 'developer',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
  },
  {
    id: 2,
    company: 'Company B',
    position: 'middle',
    startDate: '2022-06-01',
    endDate: null,
  },
  {
    id: 3,
    company: 'Company C',
    position: 'junior',
    startDate: '2021-03-10',
    endDate: '2022-05-30',
  },
];

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

jest.mock('@/components/section-wrapper', () => {
  const MockSectionWrapper = React.forwardRef<
    HTMLDivElement,
    {
      Icon: React.ComponentType;
      title: string;
      children: React.ReactNode;
    }
  >(({ Icon, title, children }, ref) => (
    <section data-testid="section-wrapper" ref={ref}>
      <div data-testid="section-icon">
        <Icon />
      </div>
      <h2 data-testid="section-title">{title}</h2>
      {children}
    </section>
  ));
  MockSectionWrapper.displayName = 'MockSectionWrapper';
  return MockSectionWrapper;
});

jest.mock('@/assets/icons/case-ico.svg?react', () => {
  const MockIcon = () => <div data-testid="case-icon">Case Icon</div>;
  MockIcon.displayName = 'MockIcon';
  return MockIcon;
});

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
            present: 'По настоящее время',
            experience: {
              developer: 'Frontend Разработчик',
              middle: 'Middle Frontend Разработчик',
              junior: 'Junior Frontend Разработчик',
              intern: 'Intern Frontend Разработчик',
            },
            section: {
              experience: 'мой опыт',
            },
          },
        },
        en: {
          translation: {
            present: 'Present',
            experience: {
              developer: 'Frontend Developer',
              middle: 'Middle Frontend Developer',
              junior: 'Junior Frontend Developer',
              intern: 'Intern Frontend Developer',
            },
            section: {
              experience: 'My experience',
            },
          },
        },
      },
    });
  }
  return render(<I18nextProvider i18n={i18next}>{component}</I18nextProvider>);
};

describe('MyExperience', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders section title correctly', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(screen.getByText('мой опыт')).toBeInTheDocument();
    });

    it('renders all experience items', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(screen.getByText('Company A')).toBeInTheDocument();
      expect(screen.getByText('Company B')).toBeInTheDocument();
      expect(screen.getByText('Company C')).toBeInTheDocument();
    });

    it('renders section icon', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(screen.getByTestId('case-icon')).toBeInTheDocument();
    });

    it('applies correct CSS classes to experience items', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      const companyNames = screen.getAllByText(COMPANY_REGEX);
      for (const name of companyNames) {
        expect(name).toHaveClass('h3');
      }

      const positions = screen.getAllByText(POSITION_REGEX);
      for (const position of positions) {
        expect(position).toHaveClass('h2');
      }

      const timeElements = screen.getAllByRole('time');
      for (const time of timeElements) {
        expect(time).toHaveClass('paragraph-sm');
      }
    });
  });

  describe('Date formatting with dayjs', () => {
    it('formats start dates correctly in Russian', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(screen.getByText('Янв. 2023 - Янв. 2024')).toBeInTheDocument();
      expect(
        screen.getByText('Июнь 2022 - По настоящее время')
      ).toBeInTheDocument();
      expect(screen.getByText('Март 2021 - Май 2022')).toBeInTheDocument();
    });

    it('formats start dates correctly in English', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />, 'en');

      expect(screen.getByText('Jan 2023 - Jan 2024')).toBeInTheDocument();
      expect(screen.getByText('Jun 2022 - Present')).toBeInTheDocument();
      expect(screen.getByText('Mar 2021 - May 2022')).toBeInTheDocument();
    });

    it('capitalizes first letter of formatted dates', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      const timeElements = screen.getAllByRole('time');
      for (const timeElement of timeElements) {
        const text = timeElement.textContent || '';
        if (text.includes(' - ')) {
          const [startDate] = text.split(' - ');
          if (startDate?.[0]) {
            expect(startDate[0]).toBe(startDate[0].toUpperCase());
          }
        }
      }
    });

    it('handles different date formats correctly', () => {
      const experienceWithDifferentDates = [
        {
          id: 1,
          company: 'Test Company',
          position: 'developer',
          startDate: '2024-12-25',
          endDate: '2025-01-01',
        },
      ];

      renderWithI18n(
        <MyExperience experience={experienceWithDifferentDates} />
      );

      expect(screen.getByText('Дек. 2024 - Янв. 2025')).toBeInTheDocument();
    });
  });

  describe('End date handling', () => {
    it('displays "По настоящее время" for null end dates in Russian', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(screen.getByText(PRESENT_RUSSIAN)).toBeInTheDocument();
    });

    it('displays "Present" for null end dates in English', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />, 'en');

      expect(screen.getByText(PRESENT_ENGLISH)).toBeInTheDocument();
    });

    it('displays formatted end date when endDate is provided', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(screen.getByText('Янв. 2023 - Янв. 2024')).toBeInTheDocument();
      expect(screen.getByText('Март 2021 - Май 2022')).toBeInTheDocument();
    });

    it('sets correct dateTime attribute for time elements', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      const timeElements = screen.getAllByRole('time');

      const EXPECTED_DATETIME_1 = '2023-01-15/2024-01-15';
      const EXPECTED_DATETIME_2 = '2022-06-01/present';
      const EXPECTED_DATETIME_3 = '2021-03-10/2022-05-30';

      expect(timeElements[0]).toHaveAttribute('dateTime', EXPECTED_DATETIME_1);
      expect(timeElements[1]).toHaveAttribute('dateTime', EXPECTED_DATETIME_2);
      expect(timeElements[2]).toHaveAttribute('dateTime', EXPECTED_DATETIME_3);
    });
  });

  describe('Position translations', () => {
    it('displays Russian position translations', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(screen.getByText('Frontend Разработчик')).toBeInTheDocument();
      expect(
        screen.getByText('Middle Frontend Разработчик')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Junior Frontend Разработчик')
      ).toBeInTheDocument();
    });

    it('displays English position translations', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />, 'en');

      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Middle Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Junior Frontend Developer')).toBeInTheDocument();
    });

    it('updates position translations when language changes', () => {
      const { rerender } = renderWithI18n(
        <MyExperience experience={mockExperience} />,
        'ru'
      );

      expect(screen.getByText('Frontend Разработчик')).toBeInTheDocument();

      act(() => {
        i18next.changeLanguage('en');
      });

      rerender(
        <I18nextProvider i18n={i18next}>
          <MyExperience experience={mockExperience} />
        </I18nextProvider>
      );

      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    it('handles missing translation keys gracefully', () => {
      const experienceWithUnknownPosition = [
        {
          id: 1,
          company: 'Test Company',
          position: 'unknown_position',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
        },
      ];

      renderWithI18n(
        <MyExperience experience={experienceWithUnknownPosition} />
      );

      expect(
        screen.getByText('experience.unknown_position')
      ).toBeInTheDocument();
    });
  });

  describe('GSAP animations', () => {
    it('calls useGSAP with correct parameters', () => {
      const { useGSAP } = require('@gsap/react');
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(useGSAP).toHaveBeenCalledTimes(1);
      expect(useGSAP).toHaveBeenCalledWith(expect.any(Function), {
        scope: expect.any(Object),
      });
    });

    it('creates timeline with correct scrollTrigger parameters for first animation', () => {
      const gsap = require('gsap');
      renderWithI18n(<MyExperience experience={mockExperience} />);

      expect(gsap.gsap.timeline).toHaveBeenCalledWith({
        scrollTrigger: {
          trigger: expect.any(Object),
          start: 'top 80%',
          end: 'bottom 100%',
          scrub: 0.5,
        },
      });
    });

    it('creates timeline with correct scrollTrigger parameters for second animation', () => {
      const gsap = require('gsap');
      renderWithI18n(<MyExperience experience={mockExperience} />);

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
      renderWithI18n(<MyExperience experience={mockExperience} />);

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
      renderWithI18n(<MyExperience experience={mockExperience} />);

      const timeline = gsap.gsap.timeline.mock.results[1].value;
      expect(timeline.to).toHaveBeenCalledWith(expect.any(Object), {
        y: -150,
        opacity: 0,
      });
    });
  });

  describe('Different props', () => {
    it('renders correctly with empty experience array', () => {
      renderWithI18n(<MyExperience experience={[]} />);

      expect(screen.getByText('мой опыт')).toBeInTheDocument();
      expect(screen.queryByText('Company A')).toBeNull();
    });

    it('renders correctly with single experience item', () => {
      const singleExperience = mockExperience.slice(0, 1);
      renderWithI18n(<MyExperience experience={singleExperience} />);

      expect(screen.getByText('Company A')).toBeInTheDocument();
      expect(screen.getByText('Frontend Разработчик')).toBeInTheDocument();
      expect(screen.getByText('Янв. 2023 - Янв. 2024')).toBeInTheDocument();
    });

    it('handles experience items with only start date', () => {
      const experienceWithOnlyStartDate = [
        {
          id: 1,
          company: 'Current Company',
          position: 'developer',
          startDate: '2024-01-01',
          endDate: null,
        },
      ];

      renderWithI18n(<MyExperience experience={experienceWithOnlyStartDate} />);

      expect(screen.getByText('Current Company')).toBeInTheDocument();
      expect(screen.getByText(PRESENT_RUSSIAN)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      const mainHeading = screen.getByRole('heading', {
        level: 2,
        name: 'мой опыт',
      });
      expect(mainHeading).toBeInTheDocument();

      const companyHeadings = screen.getAllByRole('heading', { level: 3 });
      const EXPECTED_COMPANY_COUNT = 3;
      const EXPECTED_POSITION_COUNT = 4;

      expect(companyHeadings).toHaveLength(EXPECTED_COMPANY_COUNT);
      expect(companyHeadings[0]).toHaveTextContent('Company A');
      expect(companyHeadings[1]).toHaveTextContent('Company B');
      expect(companyHeadings[2]).toHaveTextContent('Company C');

      const positionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(positionHeadings).toHaveLength(EXPECTED_POSITION_COUNT);
    });

    it('has proper time elements with dateTime attributes', () => {
      renderWithI18n(<MyExperience experience={mockExperience} />);

      const timeElements = screen.getAllByRole('time');
      const EXPECTED_TIME_ELEMENTS_COUNT = 3;
      expect(timeElements).toHaveLength(EXPECTED_TIME_ELEMENTS_COUNT);

      for (const timeElement of timeElements) {
        expect(timeElement).toHaveAttribute('dateTime');
      }
    });
  });

  describe('Edge cases', () => {
    it('handles invalid date strings gracefully', () => {
      const experienceWithInvalidDates = [
        {
          id: 1,
          company: 'Test Company',
          position: 'developer',
          startDate: 'invalid-date',
          endDate: '2023-12-31',
        },
      ];

      renderWithI18n(<MyExperience experience={experienceWithInvalidDates} />);

      expect(screen.getByText('Test Company')).toBeInTheDocument();
    });

    it('handles very old dates correctly', () => {
      const experienceWithOldDates = [
        {
          id: 1,
          company: 'Old Company',
          position: 'intern',
          startDate: '1990-01-01',
          endDate: '1990-12-31',
        },
      ];

      renderWithI18n(<MyExperience experience={experienceWithOldDates} />);

      expect(screen.getByText('Янв. 1990 - Дек. 1990')).toBeInTheDocument();
    });

    it('handles future dates correctly', () => {
      const experienceWithFutureDates = [
        {
          id: 1,
          company: 'Future Company',
          position: 'developer',
          startDate: '2030-01-01',
          endDate: '2030-12-31',
        },
      ];

      renderWithI18n(<MyExperience experience={experienceWithFutureDates} />);

      expect(screen.getByText('Янв. 2030 - Дек. 2030')).toBeInTheDocument();
    });
  });
});
