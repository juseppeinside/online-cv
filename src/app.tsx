import React from 'react';
import configJSON from '../app-config.json' with { type: 'json' };
import AboutMe, { type AboutMeProps } from './sections/about-me';
import Contacts, { type ContactsProps } from './sections/contacts';
import End from './sections/end';
import FirstScreen, { type FirstScreenProps } from './sections/first-screen';
import MyExperience, { type MyExperienceProps } from './sections/my-experiense';
import MyStack, { type MyStackProps } from './sections/my-stack';

const appConfig = Promise.resolve(configJSON);

type AppConfigType = {
  firstScreen: FirstScreenProps;
  myStack: MyStackProps;
  aboutMe: AboutMeProps;
  myExperience: MyExperienceProps;
  myContacts: ContactsProps;
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
    <div className="relative text-primary">
      <FirstScreen {...data.firstScreen} />
      <div className="sticky h-full w-full rounded-t-[40px] bg-background px-5">
        <AboutMe {...data.aboutMe} />
        <MyStack {...data.myStack} />
        <MyExperience {...data.myExperience} />
        <Contacts {...data.myContacts} />
        <End />
      </div>
    </div>
  );
};

export default App;
