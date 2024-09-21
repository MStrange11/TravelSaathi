import "./css/HeroStyles.css";
import { assets } from "../assets/assets";
function Hero(props) {
  return (
    <>
      <div className={props.cName}>
        <img src={props.src} alt="" />
        <div className="hero-text">
          <h1>{props.title}</h1>
          <p>{props.text}</p>
          <a href={props.url} className={props.btnClass}>{props.buttonText}</a>
        </div>
      </div>
    </>
  );
}

export default Hero;
