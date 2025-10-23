import React, { useState, useRef } from "react";
import servicesData from "../../data/services.json";
import { StarIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const ServiceCard = ({ service, scrollToForm }) => {
  const { serviceName, description, image, price, slotsAvailable, rating } =
    service;

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-[1.02] h-full">
      <div className="w-full md:w-2/5 flex-shrink-0">
        <img
          src={image}
          alt={serviceName}
          className="h-48 sm:h-56 md:h-full w-full object-cover"
        />
      </div>
      <div className="p-4 md:p-6 flex flex-col justify-between w-full md:w-3/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            {serviceName}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">{description}</p>
        </div>
        <div className="flex flex-wrap justify-evenly md:justify-start items-center gap-2 mt-3">
          <span className="px-2 py-1 text-sm sm:text-lg font-semibold rounded-full bg-indigo-100 text-indigo-800">
            ${price}
          </span>
          <span className="px-2 py-1 text-sm sm:text-lg font-semibold rounded-full bg-green-100 text-green-800">
            {slotsAvailable} slots
          </span>
          <StarRating rating={rating} />
        </div>
        <button
          onClick={scrollToForm}
          className="mt-4 w-full md:w-auto px-4 py-2 text-sm sm:text-base font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-[#ffc251] hover:text-black transition-colors duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const BookingForm = React.forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Booking successful!");
    setFormData({ name: "", email: "" });
  };

  return (
    <section
      ref={ref}
      className="flex justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#ffc251]"
    >
      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-2xl flex flex-col justify-center items-center">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Start Your Booking
        </h2>
        <p className="text-center text-base sm:text-lg mb-6">
          Enter your details below to reserve your spot.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label
              htmlFor="name"
              className="block text-base sm:text-lg font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-base sm:text-lg font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg sm:text-xl font-semibold text-white bg-indigo-600 rounded-lg hover:bg-[#ffc251] hover:text-black transition-colors duration-300 shadow-md"
          >
            Book Now
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </section>
  );
});

const Services = () => {
  const formRef = useRef();

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Premium Services
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-12 max-w-3xl mx-auto">
            Discover the range of professional services we offer, designed to
            meet your every need with excellence and care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {servicesData && servicesData.length > 0 ? (
              servicesData.map((service) => (
                <ServiceCard
                  key={service.serviceId}
                  service={service}
                  scrollToForm={scrollToForm}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">
                No services available at this time.
              </p>
            )}
          </div>
        </div>
      </section>
      <BookingForm ref={formRef} />
    </div>
  );
};

export default Services;
