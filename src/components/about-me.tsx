import { Button } from './ui/button';

const AboutMe = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="h1 leading-16">
          Frontend <br />
          Developer
        </h2>
        <p className="">
          Hello! I'm Nick Name, an experienced Frontend web developer from Saint
          Petersburg. With over 6 years of experience, I help people grow their
          businesses by providing modern and effective web solutions.
        </p>
        <Button>Contact me</Button>
      </div>

      <div className="flex w-[300px] flex-col gap-5">
        <div>
          <p>6+</p>
          <p>Years of experience</p>
        </div>
        <div>
          <p>10+</p>
          <p>Projects completed</p>
        </div>
        <div>
          <p>10K+</p>
          <p>Hours of work</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
