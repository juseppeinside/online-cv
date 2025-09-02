import React from 'react';
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
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <section
      className={cn(
        'mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-10 py-10 md:py-24',
        className
      )}
      {...other}
    >
      {Icon && (
        <div className="flex items-center gap-2" id="slide-up" ref={wrapperRef}>
          <Icon />
          <h2 className="h2 font-semibold text-xl uppercase">{title}</h2>
        </div>
      )}
      {children}
    </section>
  );
};

export default SectionWrapper;
