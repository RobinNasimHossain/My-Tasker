import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import TaskBoard from "./components/Task/TaskBoard";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <div className="flex flex-col justify-center items-center">
          <Hero />
          <TaskBoard />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
