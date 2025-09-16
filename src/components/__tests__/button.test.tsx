import { render, screen } from '@testing-library/react';
import Button from '../button';

declare const jest: {
  fn: () => jest.MockedFunction<(...args: unknown[]) => unknown>;
  mock: (moduleName: string, factory?: () => unknown) => void;
};

jest.mock('@/lib/utils', () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(' '),
  isDevMode: process.env.VITE_DEV_MODE === 'true',
}));

describe('Button', () => {
  it('renders with correct props', () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies custom CSS classes through className', () => {
    render(<Button className="custom-class">Test Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies button-hover-effect class when disableHover is not set', () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-hover-effect');
  });

  it('does not apply button-hover-effect class when disableHover is set to true', () => {
    render(<Button disableHover>Test Button</Button>);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('button-hover-effect');
  });

  it('applies cursor-none class when isDevMode is false', () => {
    const originalEnv = process.env.VITE_DEV_MODE;
    process.env.VITE_DEV_MODE = 'false';

    render(<Button>Test Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-none');

    process.env.VITE_DEV_MODE = originalEnv;
  });

  it('passes additional HTML attributes', () => {
    render(
      <Button data-testid="custom-button" disabled>
        Test Button
      </Button>
    );

    const button = screen.getByTestId('custom-button');
    expect(button).toBeDisabled();
  });

  it('handles onClick events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);

    const button = screen.getByRole('button');
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
