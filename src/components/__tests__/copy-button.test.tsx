import { fireEvent, render, screen } from '@testing-library/react';
import CopyButton from '../copy-button';

declare const jest: {
  fn: () => jest.MockedFunction<(...args: unknown[]) => unknown>;
  mock: (moduleName: string, factory?: () => unknown) => void;
  clearAllMocks: () => void;
  // biome-ignore lint/suspicious/noExplicitAny: <gsap mock test>
  mocked: (fn: any) => any;
  spyOn: (
    object: object,
    method: string
  ) => {
    mockImplementation: (fn: () => void) => void;
    mockRestore: () => void;
  };
};

// Mock GSAP
const mockTimeline = {
  to: jest.fn().mockReturnThis(),
  // biome-ignore lint/suspicious/noThenProperty: <gsap mock test>
  then: jest.fn().mockResolvedValue(undefined as never),
};

jest.mock('gsap', () => ({
  gsap: {
    // @ts-expect-error <gsap mock test>
    timeline: jest.fn(() => mockTimeline),
  },
}));

jest.mock('@gsap/react', () => ({
  useGSAP: () => ({
    contextSafe: (fn: () => void) => fn,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      t: (key: string) => key,
    },
  }),
}));

jest.mock('@/lib/utils', () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(' '),
}));

// Mock SVG icons
jest.mock('@/assets/icons/check-copy-ico.svg?react', () => {
  return function CheckCopyIcon(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div data-testid="check-copy-ico" {...props} />;
  };
});

jest.mock('@/assets/icons/copy-ico.svg?react', () => {
  return function CopyIcon(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div data-testid="copy-ico" {...props} />;
  };
});

// Mock clipboard API
const mockWriteText = jest.fn().mockResolvedValue(undefined as never);
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

const copyIconRegex = /^#copy-/;
const checkIconRegex = /^#copy-button-/;

describe('CopyButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct props', () => {
    render(<CopyButton value="test value" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'copy.button');
  });

  it('uses custom aria-label when provided', () => {
    render(<CopyButton ariaLabel="Custom label" value="test value" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies custom className', () => {
    render(<CopyButton className="custom-class" value="test value" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders both copy and check icons', () => {
    render(<CopyButton value="test value" />);

    const copyIcon = screen.getByTestId('copy-ico');
    const checkIcon = screen.getByTestId('check-copy-ico');

    expect(copyIcon).toBeInTheDocument();
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon).toHaveClass('opacity-0');
  });

  it('copies text to clipboard on click', () => {
    const testValue = 'test clipboard value';
    render(<CopyButton value={testValue} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockWriteText).toHaveBeenCalledWith(testValue);
  });

  it('allows multiple clicks', () => {
    const testValue = 'test value';
    render(<CopyButton value={testValue} />);

    const button = screen.getByRole('button');

    // First click
    fireEvent.click(button);
    expect(mockWriteText).toHaveBeenCalledTimes(1);

    // Second click should also work
    fireEvent.click(button);
    expect(mockWriteText).toHaveBeenCalledTimes(2);
  });

  it('creates GSAP timeline on click', () => {
    render(<CopyButton value="test value" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockTimeline.to).toHaveBeenCalled();
  });

  it('animates copy icon opacity to 0', () => {
    render(<CopyButton value="test value" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockTimeline.to).toHaveBeenCalledWith(
      expect.stringMatching(copyIconRegex),
      {
        opacity: 0,
        ease: 'expo.inOut',
        duration: 0.2,
      }
    );
  });

  it('animates check icon opacity to 1', () => {
    render(<CopyButton value="test value" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockTimeline.to).toHaveBeenCalledWith(
      expect.stringMatching(checkIconRegex),
      {
        opacity: 1,
        ease: 'expo.inOut',
        duration: 0.2,
      }
    );
  });

  it('animates check icon back to opacity 0 after delay', () => {
    render(<CopyButton value="test value" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockTimeline.to).toHaveBeenCalledWith(
      expect.stringMatching(checkIconRegex),
      {
        opacity: 0,
        ease: 'expo.inOut',
        duration: 0.2,
      },
      '+=2'
    );
  });

  it('animates copy icon back to opacity 1 and resets pressed state', () => {
    render(<CopyButton value="test value" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockTimeline.to).toHaveBeenCalledWith(
      expect.stringMatching(copyIconRegex),
      {
        opacity: 1,
        ease: 'expo.inOut',
        duration: 0.2,
      }
    );

    expect(mockTimeline.then).toHaveBeenCalled();
  });

  it('passes additional props to Button component', () => {
    render(
      <CopyButton data-testid="copy-button" disabled value="test value" />
    );

    const button = screen.getByTestId('copy-button');
    expect(button).toBeDisabled();
  });
});
