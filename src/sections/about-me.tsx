import Button from '@/components/button';

export type AboutMeProps = {
  title: string;
  description: string;
  years: number;
  hours: number;
  projectCount: number;
};

const AboutMe = ({
  title,
  description,
  years,
  hours,
  projectCount,
}: AboutMeProps) => {
  return (
    <div className="flex flex-col justify-between gap-20 py-24 md:flex-row">
      <div className="flex flex-col items-start gap-5">
        <h2 className="h1 whitespace-break-spaces">{title}</h2>
        <p className="paragraph-sm font-normal">{description}</p>
        <Button>Contact me</Button>
      </div>

      <div className="mt-5 flex w-full min-w-[200px] flex-row items-center justify-center gap-12 md:mt-28 md:min-w-0 md:flex-col md:items-end">
        <div>
          <p className={numberClass}>{years}+</p>
          <p className={textClass}>Years of experience</p>
        </div>
        <div>
          <p className={numberClass}>{projectCount}+</p>
          <p className={textClass}>Projects completed</p>
        </div>
        <div>
          <p className={numberClass}>{hours}K+</p>
          <p className={textClass}>Hours of work</p>
        </div>
      </div>
    </div>
  );
};

const numberClass = 'h2 text-center md:text-end';
const textClass = 'paragraph-sm  md:text-end text-center';

export default AboutMe;
