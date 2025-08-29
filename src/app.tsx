import React from 'react';
import configJSON from '../app-config.json' with { type: 'json' };
import AboutMe, { type AboutMeProps } from './sections/about-me';
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
    <div className="bg-secondary">
      {/* <Bg /> */}
      {/* <div className="h-screen w-screen bg-gray-100" /> */}
      <div className="mx-auto max-w-[1200px] px-5">
        <AboutMe {...fetchJSON.aboutMe} />
        <MyStack {...fetchJSON.myStack} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
        <AboutMe {...fetchJSON.aboutMe} />
      </div>
    </div>
  );
};

export default App;
