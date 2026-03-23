import SideBar from "../Layout/SideBar";
import NavBar from "../Layout/NavBar";
import HeroSection from "../Components/HeroSection";
import Gallary from "../components/Gallary";

const HomePage = () => {
  return (
    <section className="w-full h-screen flex">
      <div className="w-16 h-screen ">
        <SideBar />
      </div>
      <div className="w-full h-screen px-4  py-2">
        <NavBar />
        
        <section className="px-4 flex flex-col items-center justify-center mt-12 mx-auto">
          <HeroSection />
          <Gallary />
        </section>
      </div>
    </section>
  );
};

export default HomePage;