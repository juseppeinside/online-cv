import type React from 'react';
import { cn, isDevMode } from '@/lib/utils';

export type ButtonProps = {
  disableHover?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className,
  children,
  disableHover,
  ...other
}: ButtonProps) => (
  <button
    className={cn(
      'cursor-pointer rounded-lg bg-primary px-6 py-1 font-semibold text-2xl text-secondary',
      !disableHover && 'button-hover-effect',
      !isDevMode && 'cursor-none',
      className
    )}
    type="button"
    {...other}
  >
    {children}
  </button>
);

export default Button;
