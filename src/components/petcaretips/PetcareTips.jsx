import React from "react";
import winterTips from "../../data/Petcaretips.json";

const WinterCareTips = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-10">
          {" "}
          Winter Care Tips for Pets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {winterTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start gap-3"
            >
              <span className="text-blue-500 text-2xl font-bold">•</span>
              <p className="text-gray-700 text-xl">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WinterCareTips;
