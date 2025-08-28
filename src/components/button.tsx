import { cn } from '@/lib/utils';

const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        'cursor-none cursor-pointer rounded-3xl bg-primary px-6 py-1 font-semibold text-2xl text-secondary md:cursor-none',
        className
      )}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
