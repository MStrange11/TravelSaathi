import Destination from "../components/Destination";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Trip from "../components/Trip";
import { assets } from "../assets/assets";

function Home() {
  return (
    <>
      {/* <Navbar/> */}
      <Hero
      cName="hero"
      src={assets.i12}
      title="Your Journey Your Story"
      text="Choose Your Favourite Destination"
      buttonText="Travel Plan"
      url="/services"
      btnClass="show"/>
      <Destination/>
      <Footer/>
    </>
  );
}

export default Home;
