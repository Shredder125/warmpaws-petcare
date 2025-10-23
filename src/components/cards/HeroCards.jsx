import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import servicesData from "../../data/services.json";

const StarRating = ({ rating }) => (
  <div className="flex items-center space-x-0.5">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const HeroCard = ({ service }) => {
  const [showFull, setShowFull] = useState(false);
  const words = service.description.split(" ");
  const shortDescription = words.slice(0, 10).join(" ");

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-transform transform hover:-translate-y-2 bg-white/90 backdrop-blur-md flex flex-col h-full">
      <div className="relative h-48">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"></div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800">
          {service.serviceName}
        </h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed flex-1">
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
        <div className="flex justify-between items-center mt-4">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold shadow-md text-sm">
            ${service.price} / session
          </span>
          <div className="flex items-center gap-1">
            <StarRating rating={service.rating} />
            <span className="text-gray-600 text-sm font-medium">
              {service.rating}
            </span>
          </div>
        </div>
        <p className="mt-1 text-gray-500 text-sm">
          Slots Available: <b>{service.slotsAvailable}</b>
        </p>
        <div className="flex gap-3 mt-5">
          <Link
            to={`/services/${service.serviceId}`}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", { name, email });
  };

  return (
    <section className="flex justify-center py-16">
      <div className="w-full md:w-3/4 p-6 bg-[#ffc251] rounded-xl shadow-2xl flex flex-col md:flex-row justify-evenly items-center gap-6">
        <div className="flex flex-col justify-center items-center text-center md:w-1/2">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Start Your Booking !!!
          </h2>
          <p className="text-gray-700 text-lg">
            Fill out the form to secure your session. Our team will review and
            confirm promptly.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 md:w-1/2 w-full">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-[#dde1e4] hover:text-black transition-colors shadow-md">
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default function HeroCards() {
  return (
    <div className="bg-linear-to-b from-blue-50 to-blue-100 py-10 px-4">
      <h2 className="text-5xl font-bold text-center mb-10">
        Winter Care Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-stretch">
        {servicesData.map((service) => (
          <HeroCard key={service.serviceId} service={service} />
        ))}
      </div>
    </div>
  );
}
