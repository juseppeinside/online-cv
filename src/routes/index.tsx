import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import Layout from '@/components/layout';
import configJSON from '../../app-config.json' with { type: 'json' };
import AboutMe, { type AboutMeProps } from '../sections/about-me';
import Footer from '../sections/footer';
import Header from '../sections/header';
import MyContacts, { type MyContactsProps } from '../sections/my-contacts';
import MyExperience, {
  type MyExperienceProps,
} from '../sections/my-experiense';
import MyStack, { type MyStackProps } from '../sections/my-stack';

const appConfig = Promise.resolve(configJSON);

type AppConfigType = {
  aboutMe: AboutMeProps;
  myStack: MyStackProps;
  myExperience: MyExperienceProps;
  myContacts: MyContactsProps;
};

const HomePage = () => {
  const data = React.use(appConfig) as AppConfigType;

  React.useEffect(() => {
    const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';
    document.documentElement.setAttribute(
      'data-dev-mode',
      isDevMode.toString()
    );
  }, []);

  return (
    <Layout>
      <div className="relative text-primary">
        <Header />
        <main className="sticky h-full w-full rounded-t-[40px] bg-background px-5">
          <AboutMe {...data.aboutMe} />
          <MyStack {...data.myStack} />
          <MyExperience {...data.myExperience} />
          <MyContacts {...data.myContacts} />
        </main>
        <Footer />
      </div>
    </Layout>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});
