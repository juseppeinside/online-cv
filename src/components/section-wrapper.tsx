import type React from 'react';
import { cn } from '@/lib/utils';

type SectionWrapperProps = {
  title?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  ref?: React.RefObject<HTMLElement | null>;
  id?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const SectionWrapper = ({
  title,
  Icon,
  children,
  className,
  ...other
}: SectionWrapperProps) => {
  return (
    <section
      aria-label={title}
      className={cn(
        'mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-10 px-3 py-10 md:px-8 md:py-24',
        className
      )}
      {...other}
    >
      {Icon && (
        <div className="flex items-center gap-2" id="slide-up">
          <Icon />
          <h2 className="h2 select-none font-semibold text-xl uppercase">
            {title}
          </h2>
        </div>
      )}
      {children}
    </section>
  );
};

export default SectionWrapper;
