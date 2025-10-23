import React from "react";
import { FaCarrot, FaAppleAlt, FaBone, FaPepperHot } from "react-icons/fa";

const HealthyPetTreats = () => {
  const treats = [
    {
      title: "Nutritious Snacks",
      description:
        "Give your pets wholesome snacks rich in vitamins and minerals to keep them healthy and energetic.",
      icon: <FaCarrot size={30} className="text-green-400" />,
    },
    {
      title: "Fruit Treats",
      description:
        "Apples, blueberries, and carrots can be fun and safe treats for your furry friends.",
      icon: <FaAppleAlt size={30} className="text-red-400" />,
    },
    {
      title: "Protein Boost",
      description:
        "High-quality protein treats, like lean meat jerky or homemade biscuits, support strong muscles.",
      icon: <FaBone size={30} className="text-yellow-500" />,
    },
    {
      title: "Spice-Free Fun",
      description:
        "Avoid spicy or processed foods. Stick to pet-safe ingredients to ensure their safety.",
      icon: <FaPepperHot size={30} className="text-orange-400" />,
    },
  ];

  return (
    <section className="py-12 bg-linear-to-r from-yellow-50 via-white to-yellow-50 dark:from-slate-900 dark:via-yellow-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-yellow-700 dark:text-yellow-300 mb-6">
          Healthy Treats for Your Pets
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Delicious and safe treats that keep your pets happy, healthy, and engaged!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treats.map((treat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="mb-4">{treat.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {treat.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{treat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthyPetTreats;
