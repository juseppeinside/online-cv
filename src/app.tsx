import React from 'react';
import configJSON from '../app-config.json' with { type: 'json' };
import AboutMe, { type AboutMeProps } from './sections/about-me';
import FirstScreen, { type FirstScreenProps } from './sections/first-screen';
import MyStack, { type MyStackProps } from './sections/my-stack';

const appConfig = Promise.resolve(configJSON);

type AppConfigType = {
  firstScreen: FirstScreenProps;
  myStack: MyStackProps;
  aboutMe: AboutMeProps;
};

const App = () => {
  const data = React.use(appConfig) as AppConfigType;

  React.useEffect(() => {
    const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';
    document.documentElement.setAttribute(
      'data-dev-mode',
      isDevMode.toString()
    );
  }, []);

  return (
    <div className="relative">
      <FirstScreen {...data.firstScreen} />
      <section className="sticky h-full w-full rounded-t-[40px] bg-secondary px-5">
        <AboutMe {...data.aboutMe} />
        <MyStack {...data.myStack} />
        <AboutMe {...data.aboutMe} />
        <AboutMe {...data.aboutMe} />
        <AboutMe {...data.aboutMe} />
        <AboutMe {...data.aboutMe} />
        <AboutMe {...data.aboutMe} />
      </section>
    </div>
  );
};

export default App;
