import React from 'react';
import configJSON from '../app-config.json' with { type: 'json' };
import SnowBackground from './components/snow-background';
import AboutMe, { type AboutMeProps } from './sections/about-me';
import FirstScreen from './sections/first-screen';
import MyStack, { type MyStackProps } from './sections/my-stack';

const appConfig = Promise.resolve(configJSON);

type AppConfigType = {
  myStack: MyStackProps;
  aboutMe: AboutMeProps;
};

const App = () => {
  const fetchJSON = React.use(appConfig) as AppConfigType;

  React.useEffect(() => {
    const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';
    document.documentElement.setAttribute(
      'data-dev-mode',
      isDevMode.toString()
    );
  }, []);

  return (
    <div>
      <FirstScreen />
      <div className="relative mx-auto max-w-[1200px] rounded-t-4xl bg-secondary px-5">
        <AboutMe {...fetchJSON.aboutMe} />
        <MyStack {...fetchJSON.myStack} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
        <SnowBackground />
      </div>
    </div>
  );
};

export default App;
