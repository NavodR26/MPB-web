"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const teaTypes = [
  {
    name: "Ceylon Black Tea",
    description: "Known for its bold flavor and rich aroma, perfect for a classic cup of tea.",
    image: "/tea-types/black-tea.jpg",
    brewingTip: "Steep for 3-5 minutes in boiling water for the best flavor.",
    origin: "Nuwara Eliya, Sri Lanka",
    characteristics: ["Full-bodied", "Robust", "Malty", "Bright"]
  },
  {
    name: "Ceylon Green Tea",
    description: "Light and refreshing, packed with antioxidants for a healthy lifestyle.",
    image: "/tea-types/green-tea.jpg",
    brewingTip: "Steep for 2-3 minutes in water at 80°C to avoid bitterness.",
    origin: "Kandy Region, Sri Lanka",
    characteristics: ["Grassy", "Fresh", "Subtle", "Aromatic"]
  },
  {
    name: "Ceylon White Tea",
    description: "Delicate and subtle, made from the youngest tea leaves for a premium experience.",
    image: "/tea-types/white-tea.jpg",
    brewingTip: "Steep for 4-6 minutes in water at 75°C for a delicate flavor.",
    origin: "Uva Highland, Sri Lanka",
    characteristics: ["Delicate", "Honey-like", "Floral", "Exclusive"]
  },
  {
    name: "Ceylon Oolong Tea",
    description: "A perfect balance between black and green tea, with a unique floral aroma.",
    image: "/tea-types/oolong-tea.jpg",
    brewingTip: "Steep for 3-5 minutes in water at 85°C for a balanced taste.",
    origin: "Dimbula, Sri Lanka",
    characteristics: ["Complex", "Floral", "Smooth", "Balanced"]
  },
];

export default function TeaTastingExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedTea, setSelectedTea] = useState(null);

  // Handle tea card click for mobile detailed view
  const handleTeaClick = (index) => {
    if (window.innerWidth < 768) {
      setSelectedTea(selectedTea === index ? null : index);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Discover the World of Ceylon Tea
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the unique flavors and aromas of our finest teas, sourced directly from Sri Lanka renowned tea estates.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {teaTypes.map((tea, index) => (
            <motion.div
              key={index}
              className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                selectedTea === index ? "ring-2 ring-green-500 dark:ring-green-400" : ""
              }`}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => handleTeaClick(index)}
            >
              <div className="relative h-48 w-full mb-0 overflow-hidden">
                <Image
                  src={tea.image}
                  alt={tea.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transform hover:scale-110 transition-transform duration-700"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-4 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full">
                  {tea.origin}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">{tea.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">{tea.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tea.characteristics.map((trait, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      {trait}
                    </span>
                  ))}
                </div>
                
                <div className="group relative">
                  <button className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Brewing Tip
                  </button>
                  <div className="absolute hidden group-hover:block left-0 right-0 md:left-auto md:w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-3 rounded-lg shadow-lg text-sm text-gray-600 dark:text-gray-300 mt-2 z-10 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p>{tea.brewingTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
