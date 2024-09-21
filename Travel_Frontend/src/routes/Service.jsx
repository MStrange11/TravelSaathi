import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/night.jpg";
import Footer from "../components/Footer";
import Trip from "../components/Trip";
import { assets } from "../assets/assets";
function Service() {
  return (
    <>
      {/* <Navbar/> */}
      <Hero
        cName="hero-mid"
        src={assets.i12}
        title="Our Services"
      />
      <Trip />
      <Footer />
    </>
  );
}

export default Service;
