import { useEffect, useRef } from "react";
import { assets } from "../assets/assets_frontend/assets";

const testimonialsData = [
  {
    name: "Riya Sharma",
    role: "Patient",
    image: assets.profile_pic,
    review:
      "Medinexa made booking appointments so easy. I found a great doctor within minutes!",
  },
  {
    name: "Amit Roy",
    role: "Patient",
    image: assets.profile_pic,
    review:
      "The platform is smooth and reliable. Highly recommend for anyone looking for quick healthcare access.",
  },
  {
    name: "Dr. Priya Singh",
    role: "Dermatologist",
    image: assets.profile_pic,
    review:
      "Managing appointments has become much easier with Medinexa.",
  },
  {
    name: "Rahul Verma",
    role: "Patient",
    image: assets.profile_pic,
    review:
      "Great UI and very fast booking experience. Loved it!",
  },
];

const Testimonials = () => {
  const sliderRef = useRef();

  // 🔥 Auto Scroll
  useEffect(() => {
    const slider = sliderRef.current;

    let scrollAmount = 0;

    const autoScroll = setInterval(() => {
      if (!slider) return;

      scrollAmount += 320;

      if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0;
      }

      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 2500);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-20">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What Our <span className="text-blue-600">Users Say</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Real experiences from patients and doctors using Medinexa.
        </p>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
      >

        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[320px] bg-white/80 backdrop-blur-lg 
            border border-gray-200 rounded-2xl p-6 shadow-md 
            hover:shadow-xl transition duration-300 flex flex-col gap-4"
          >

            {/* USER */}
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={item.image}
                alt={item.name}
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>

            {/* REVIEW */}
            <p className="text-gray-600 text-sm leading-relaxed">
              “{item.review}”
            </p>

            {/* RATING */}
            <div className="text-yellow-500">
              ⭐ ⭐ ⭐ ⭐ ⭐
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Testimonials;