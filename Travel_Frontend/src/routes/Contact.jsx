import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ContactImg from "../assets/2.jpg";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <>
      {/* <Navbar/> */}
      <Hero 
      title="Contact Us"
       cName="hero-mid"
       src={ContactImg}
       />
       <ContactForm/>
       <Footer/>
    </>
  );
}

export default Contact;
