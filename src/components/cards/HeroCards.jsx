import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import servicesData from "../../data/services.json";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "animate.css";

const StarRating = ({ rating }) => (
  <div className="flex items-center space-x-0.5">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const HeroCard = ({ service }) => {
  const [showFull, setShowFull] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  if (!service) return null;

  const words = service.description ? service.description.split(" ") : [];
  const shortDescription = words.slice(0, 10).join(" ");

  const handleViewDetails = () => {
    navigate(isLoggedIn ? "/services" : "/login");
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-transform transform hover:-translate-y-2 bg-white/90 backdrop-blur-md flex flex-col h-full animate__animated animate__fadeIn">
      <div className="relative h-48 sm:h-56 md:h-60 lg:h-64">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{service.serviceName}</h3>
        <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed flex-1">
          {showFull ? service.description : shortDescription}
          {words.length > 10 && (
            <span
              onClick={() => setShowFull(!showFull)}
              className="text-blue-500 cursor-pointer ml-1 font-semibold"
            >
              {showFull ? " See Less" : "... See More"}
            </span>
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2 sm:gap-0">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold shadow-md text-sm sm:text-base">
            ${service.price} / session
          </span>
          <div className="flex items-center gap-1">
            <StarRating rating={service.rating} />
            <span className="text-gray-600 text-sm font-medium">{service.rating}</span>
          </div>
        </div>
        <p className="mt-1 text-gray-500 text-sm sm:text-base">
          Slots Available: <b>{service.slotsAvailable}</b>
        </p>
        <div className="flex gap-3 mt-5">
          <button
            onClick={handleViewDetails}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroCards = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10">Winter Care Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-center items-stretch">
        {servicesData && servicesData.length > 0 ? (
          servicesData.map((service) => (
            <HeroCard key={service.serviceId} service={service} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">Loading services...</p>
        )}
      </div>
    </div>
  );
};

export default HeroCards;
