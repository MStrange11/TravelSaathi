import { useNavigate } from "react-router-dom";
import "./css/TripStyles.css";

function TripData(props) {
  const navigate = useNavigate()
  return (
    <div className="t-card" onClick={() => { navigate(`${props.heading.replace(/\s+/g, '')}`),scrollTo(0,0) }}>
      <div className="t-image">
        <img src={props.image} alt="image" />
      </div>
      <h4>{props.heading}</h4>
      <p>{props.text}</p>
    </div >
  );
}

export default TripData;
