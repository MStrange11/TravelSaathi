import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import "../components/css/GoSolo.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../components/axiosInstance";
import HotelImages from "./HotelImages"; // Import the HotelImages component

function GoSolo() {
    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // To track if more pages are available
    const navigate = useNavigate();


    const fetchHotels = async (page) => {
        try {
            const response = await axiosInstance.get(`/hotels?page=${page}&limit=10`); // Adjust endpoint as needed

            if (response.data.results) {
                console.log(response.data.results);
                setHotels((prev) => [...prev, ...response.data.results]); // Append new data
            } else {
                setHasMore(false); // No more data to fetch
            }
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    useEffect(() => {
        fetchHotels(currentPage);
    }, [currentPage]);

    const loadMore = () => {
        if (hasMore) {
            setCurrentPage((prev) => prev + 1); // Load next page
        }
    };

    const handleSearch = () => {
        axiosInstance.post('hotels/', { search: search })
            .then(
                (res) => {
                    console.log(res.data)
                    setHotels(res.data)
                }
            )
            .catch((err) => {
                console.log(err);

            })
    }

    return (
        <section className="bg-white max-md:pl-2 pt-36 h-screen">
            
            <div className="w-full h-full px-10 pt-[91px] pb-[76px] flex-col justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
                    {hotels.map((hotel, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                            onClick={() => {
                                navigate(`/${hotel.hotel_name.replace(/\s+/g, '_')}`);
                                scrollTo(0, 0);
                            }}
                        >
                            <div className="w-[260px] h-[360px] shadow-2xl cursor-pointer">
                                {/* Display the hotel image */}
                                <HotelImages hotelName={hotel.hotel_name} />
                                <div className="w-full bg-white text-center py-4 rounded-b-[32px]">
                                    <span className="text-black text-[24px] font-normal">{hotel.hotel_name}</span>
                                    <div className="text-black text-[16px] font-normal">{hotel.city_name}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {hasMore && (
                    <button
                        className="mt-6 px-4 py-2 bg-[#00B4cc] text-white rounded"
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                )}
            </div>
        </section>
    );
}

export default GoSolo;
