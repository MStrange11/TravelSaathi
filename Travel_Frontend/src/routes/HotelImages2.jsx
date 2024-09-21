import axios from 'axios';
import React, { useState, useEffect } from 'react';

const HotelImages = ({ hotelName, number }) => {
  const [image, setImage] = useState([]); // Change to hold a single image

  useEffect(() => {
    const fetchHotelImages = async () => {
      // const apiKey = 'AIzaSyAI1YydI9K65NYQE-_FEwumnT6qm55xpoo';//divya
      // const apiKey = 'AIzaSyDQju1EqMtFmQfJtcFARl9Em2zTvz8ISlA';//divya2
      // const apiKey = 'AIzaSyCoeN8NfBPgttr_dPsXw2hS2t9Ts75enEg';//manan
      // const apiKey = 'AIzaSyA1u_tc4srIPE1LtqDiw2t-efX36SRdwbo';//manan2

      // const cseId = '802b3b1cf9cfc4539'; //divya
      // const cseId = 'a3a57633652da4ae1'; //divya2
      // const cseId = 'b424f2397b58e4675';//manan
      // const cseId = 'e2ad66d1091b04602'; //manan2

      try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: apiKey,
            cx: cseId,
            q: `${hotelName} hotel`,
            searchType: 'image',
          }
        });

        // Set the first image URL only
        if (response.data.items && response.data.items.length > 0) {
          setImage(response.data.items[number].link);
          console.log(response.data.items[number].link)


        }
      } catch (error) {
        console.error('Error fetching hotel images:', error);
      }
    };

    fetchHotelImages();
  }, [hotelName]);

  return (
    <div>
      {image ? (
        <img src={image} alt={`Image of ${hotelName}`} className='' />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};


export default HotelImages;
