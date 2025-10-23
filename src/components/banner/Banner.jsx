import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const slides = [
  {
    image: "https://i.ibb.co/hJCxpnGH/pexels-ron-lach-9985932.jpg",
    title: "Cozy Winter Care for Your Pets",
    description: "Keep your furry friends warm and happy this winter.",
  },
  {
    image: "https://i.ibb.co/RGcZtgJP/pexels-babydov-7788657.jpg",
    title: "Stylish Winter Outfits",
    description: "Custom coats, sweaters, and accessories for every pet.",
  },
  {
    image:
      "https://i.ibb.co/39XmfjZ5/pexels-pranidchakan-boonrom-101111-1350591.jpg",
    title: "Winter Grooming & Spa",
    description: "Gentle care to protect your pet’s coat during chilly days.",
  },
  {
    image:
      "https://i.ibb.co/39XmfjZ5/pexels-pranidchakan-boonrom-101111-1350591.jpg",
    title: "Paw Protection & Hydration",
    description: "Prevent cracks and dryness with our winter paw treatments.",
  },
  {
    image: "https://i.ibb.co/yFPqwM92/pexels-yaroslav-shuraev-8498543.jpg",
    title: "Warm Winter Walks & Play",
    description: "Fun outdoor activities to keep your pets active and cozy.",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleExploreNow = () => {
    if (user) {
      navigate("/services");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-10 md:px-20 ">
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg ">
                  {slide.title}
                </h2>
                <p className="text-white text-sm md:text-lg mb-6 drop-shadow-md">
                  {slide.description}
                </p>
                <button
                  onClick={handleExploreNow}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg transition-all duration-300 transform
                  hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-500
                  hover:text-white/90 hover:shadow-xl hover:scale-105"
                >
                  Explore Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
