import MyStackIcon from '@/assets/icons/my-stack-icon.svg?react';
import SectionWrapper from '@/components/section-wrapper';

const testIcon = <div className="h-[24px] w-[20px] bg-red-500" />;

export type MyStackProps = {
  blocks: [
    {
      title: string;
      items: string[];
    },
  ];
};

const MyStack = ({ blocks }: MyStackProps) => {
  return (
    <SectionWrapper Icon={MyStackIcon} title="MY STACK">
      <div className="flex flex-col gap-20">
        {blocks.map(({ title, items }) => (
          <div className="grid gap-10 sm:grid-cols-2" key={title}>
            <h3 className="h2">{title}</h3>
            <div className="flex flex-wrap gap-11">
              {items.map((i) => (
                <div className="flex items-center gap-3" key={i}>
                  {testIcon}
                  <p className="font-medium text-4xl">{i}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default MyStack;
