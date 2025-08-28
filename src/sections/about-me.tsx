import Button from '@/components/button';

const AboutMe = () => {
  return (
    <div className="flex flex-col justify-between gap-20 py-24 md:flex-row">
      <div className="flex flex-col items-start gap-5">
        <h2 className="h1 text-primary">
          Frontend <br />
          Developer
        </h2>
        <p className="paragraph-sm font-normal text-primary">
          Hello! I'm Nick Name, an experienced Frontend web developer from Saint
          Petersburg. With over 6 years of experience, I help people grow their
          businesses by providing modern and effective web solutions.
        </p>
        <Button>Contact me</Button>
      </div>

      <div className="mt-5 flex w-full min-w-[200px] flex-row items-center justify-center gap-12 md:mt-28 md:min-w-0 md:flex-col md:items-end">
        <div>
          <p className={numberClass}>6+</p>
          <p className={textClass}>Years of experience</p>
        </div>
        <div>
          <p className={numberClass}>10+</p>
          <p className={textClass}>Projects completed</p>
        </div>
        <div>
          <p className={numberClass}>10K+</p>
          <p className={textClass}>Hours of work</p>
        </div>
      </div>
    </div>
  );
};

const numberClass = 'h2 text-center md:text-end text-primary';
const textClass = 'paragraph-sm  md:text-end text-center text-primary';

export default AboutMe;
