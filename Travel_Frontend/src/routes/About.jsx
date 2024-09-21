import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/night.jpg";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import { assets } from "../assets/assets";


function About() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero
        cName="hero-mid"
        src={assets.i14}
        title="About Us"
        
      />
      <AboutUs />
      <Footer/>
    </>
  );
}

export default About;
