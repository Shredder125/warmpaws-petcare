import React from "react";
import { Link } from "react-router-dom";
import servicesData from "../../data/services.json";
import { StarIcon } from "@heroicons/react/24/solid";

const StarRating = ({ rating }) => (
  <div className="flex items-center space-x-0.5">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-500" : "text-gray-300"
        }`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const ServiceCard = ({ service }) => {
  const {
    serviceId,
    serviceName,
    description,
    image,
    price,
    slotsAvailable,
    rating,
  } = service;

  return (
    <div className="h-[400px] flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-[1.02]">
      <div className="md:w-2/5 flex-shrink-0">
        <img
          src={image}
          alt={serviceName}
          className="h-40 md:h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 md:p-6 flex flex-col justify-between md:w-3/5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {serviceName}
          </h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="flex flex-wrap justify-evenly items-center gap-2 mt-3">
          <span className="px-2 py-1 text-lg font-semibold rounded-full bg-indigo-100 text-indigo-800">
            ${price}
          </span>
          <span className="px-2 py-1 text-lg font-semibold rounded-full bg-green-100 text-green-800">
            {slotsAvailable} slots
          </span>
          <StarRating rating={rating} />
        </div>
        <Link
          to={`/services/${serviceId}`}
          className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow 
                     hover:bg-[#ffc251] hover:text-black transition-colors duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};
const BookingForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking form submitted!");
  };

  return (
    <section className="flex justify-center">
      <div className="w-full h-[600px] p-6 bg-[#ffc251] rounded-xl shadow-2xl flex justify-evenly items-center">
       <div className="flex flex-col justify-center items-center text-center">
         <h2 className="text-5xl font-bold text-gray-900 text-center mb-6">
          Start Your Booking !!!
        </h2>
        <p className="text-2xl">Choose your service and reserve your spot in just a few clicks.</p>
       </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-2xl font-medium text-gray-700 mb-4"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full md:w-[700px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-2xl font-medium text-gray-700 mb-4"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg 
                       hover:bg-[#ffc251] hover:text-black transition-colors duration-300 shadow-md"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Premium Services
          </h1>
          <p className="text-gray-500 text-sm md:text-lg mb-12 max-w-3xl mx-auto">
            Discover the range of professional services we offer, designed to
            meet your every need with excellence and care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData && servicesData.length > 0 ? (
              servicesData.map((service) => (
                <ServiceCard key={service.serviceId} service={service} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">
                No services available at this time.
              </p>
            )}
          </div>
        </div>
      </section>
      <BookingForm />
    </div>
  );
};

export default Services;
