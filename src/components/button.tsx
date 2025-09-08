import { cn, isDevMode } from '@/lib/utils';

const Button = ({
  className,
  children,
  ...other
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={cn(
        'cursor-pointer rounded-lg bg-primary px-6 py-1 font-semibold text-2xl text-secondary',
        !isDevMode && 'cursor-none',
        className
      )}
      type="button"
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
