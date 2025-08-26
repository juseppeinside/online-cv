import AboutMe from './components/about-me';

function App() {
  return (
    <div>
      {/* <Bg /> */}
      <div className="h-screen w-screen bg-gray-100" />
      <div className="mx-auto w-[1200px] px-5">
        <AboutMe />
      </div>
    </div>
  );
}

export default App;
