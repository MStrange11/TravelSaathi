import "./css/TripStyles.css";
import TripData from "./TripData";
import Trip1 from "../assets/5.jpg";
import Trip2 from "../assets/8.jpg";
import Trip3 from "../assets/6.jpg";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";


function Trip() {
  return (
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique
        destinations using Google Maps.</p>
      <div className="tripcard grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

        <TripData
          image={assets.i5}
          heading="Go Solo"
          text="Find Best Hotels"
        />


        <TripData
          image={assets.i5}
          heading="Go Group"
          text="Find Best Hotels"
        />
        
        <TripData
          image={assets.i5}
          heading="Your Groups"
          text="Find Best Hotels"
        />
      </div>
    </div>

  );
}

export default Trip;
