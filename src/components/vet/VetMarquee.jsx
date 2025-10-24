import React, { useState } from "react";
import { motion } from "framer-motion";
import vets from "../../data/Vet.json";
import "animate.css";

const VetMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedVets = [...vets, ...vets];

  return (
    <div className="bg-linear-to-b from-blue-50 to-blue-100 py-6 overflow-hidden animate__animated animate__zoomIn">
      <h2 className="text-5xl font-bold text-center mb-6 ">
        Meet Our Expert Vets
      </h2>

      <div
        className="relative w-full overflow-hidden flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-3"
          animate={{
            x: isPaused ? 0 : "-40%",
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,
              ease: "linear",
            },
          }}
        >
          {duplicatedVets.map((vet, index) => (
            <div
              key={index}
              className="min-w-[15rem] h-[22rem] bg-linear-to-br from-blue-50 via-white to-blue-100 rounded-3xl overflow-hidden shrink-0 flex flex-col"
            >
              <div className="relative h-32">
                <img
                  src={vet.image}
                  alt={vet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"></div>
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {vet.name}
                  </h3>
                  <p className="text-gray-600 text-sm my-3">{vet.career}</p>
                  <p className="text-gray-700 text-sm font-medium">
                    <span className="text-xl font-bold text-amber-600">{vet.experience}</span> of Experience.
                  </p>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span className="px-2 py-1 rounded-full bg-linear-to-r from-blue-400 to-indigo-500 text-white font-semibold text-sm">
                    $ {vet.consultationFees}
                  </span>

                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.047 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
                    </svg>
                    <span className="text-gray-600 text-sm font-medium">
                      {vet.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default VetMarquee;
