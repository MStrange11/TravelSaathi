import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../components/css/HotelView.css';
import img1 from '../assets/le_meurice.jpg';
import img2 from '../assets/le_meurice1.jpg';
import img3 from '../assets/le_meurice2.jpg';
import img4 from '../assets/le_meurice3.jpg';
import img5 from '../assets/le_meurice4.jpg';
import Footer from '../components/Footer'
import axiosInstance from '../components/axiosInstance';
import HotelImages2 from './HotelImages2';

function HotelView() {
  const { Hotel_Name } = useParams();
  const hotel_name = Hotel_Name
  const [hotelDetails, setHotelDetails] = useState({});
  console.log(hotel_name)
  // const images = [img1, img2, img3, img4, img5];

  const fetchHotel = async () => {
    try {
      const response = await axiosInstance.get(`hotels/${hotel_name}`)
      if (response.data) {
        console.log(response.data);
        setHotelDetails(response.data);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }
  useEffect(() => {
    fetchHotel()
  }, [hotel_name])


  return (
    <>

      <div className="hotel-layout-container">
        <div className="hotel-main-image">
          <HotelImages2
            hotelName={hotel_name}
            number={0}
          />
        </div>
        <div className="hotel-side-images">
          <HotelImages2
            hotelName={hotel_name}
            number={1}
          />
          <HotelImages2
            hotelName={hotel_name}
            number={2}
          />
          <HotelImages2
            hotelName={hotel_name}
            number={3}
          />
          <HotelImages2
            hotelName={hotel_name}
            number={4}
          />
        </div>
        <div className="hotel-info">
          <h1>{hotelDetails.hotel_name}</h1>
          <p>{hotelDetails.address}</p>
          <div className="">
            <span>{hotelDetails.hotel_rating}/5</span>
          </div>
        </div>
      </div>

      <div className="hotel-container">
        {/* Description Section */}
        <h1 className='description_head'>Description</h1>
        <div className="description">

          <p>
            {hotelDetails.description}
          </p>
        </div>
        {/* Attraction */}
        {hotelDetails.attractions ? <><h1 className='description_head'>Attraction</h1>
          <div className="description">

            <p>
              {hotelDetails.attractions}
            </p>
          </div></> : <></>}




        {/* Facilities */}
        <h1 className='description_head'>Facilities</h1>
        <div className="description">
          <p>
            {hotelDetails.hotel_facilities}
          </p>
        </div>
      </div>
      <Footer />

    </>
  );
}

export default HotelView;
