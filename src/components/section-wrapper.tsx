type SectionWrapperProps = {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
} & React.HTMLAttributes<HTMLElement>;

const SectionWrapper = ({
  title,
  Icon,
  children,
  ...other
}: SectionWrapperProps) => {
  return (
    <section className="flex flex-col justify-between gap-10 py-24" {...other}>
      <div className="flex items-center gap-2">
        <Icon />
        <h2 className="h2 font-semibold text-xl">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default SectionWrapper;
