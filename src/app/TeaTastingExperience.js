"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const teaTypes = [
  {
    name: "Ceylon Black Tea",
    description: "Known for its bold flavor and rich aroma, perfect for a classic cup of tea.",
    image: "/tea-types/black-tea.jpg",
    brewingTip: "Steep for 3-5 minutes in boiling water for the best flavor.",
    origin: "Nuwara Eliya, Sri Lanka",
    characteristics: ["Full-bodied", "Robust", "Malty", "Bright"],
    color: "#d4a269"
  },
  {
    name: "Ceylon Green Tea",
    description: "Light and refreshing, packed with antioxidants for a healthy lifestyle.",
    image: "/tea-types/green-tea.jpg",
    brewingTip: "Steep for 2-3 minutes in water at 80°C to avoid bitterness.",
    origin: "Kandy Region, Sri Lanka",
    characteristics: ["Grassy", "Fresh", "Subtle", "Aromatic"],
    color: "#7cb342"
  },
  {
    name: "Ceylon White Tea",
    description: "Delicate and subtle, made from the youngest tea leaves for a premium experience.",
    image: "/tea-types/white-tea.jpg",
    brewingTip: "Steep for 4-6 minutes in water at 75°C for a delicate flavor.",
    origin: "Uva Highland, Sri Lanka",
    characteristics: ["Delicate", "Honey-like", "Floral", "Exclusive"],
    color: "#e0dfcf"
  },
  {
    name: "Ceylon Oolong Tea",
    description: "A perfect balance between black and green tea, with a unique floral aroma.",
    image: "/tea-types/oolong-tea.jpg",
    brewingTip: "Steep for 3-5 minutes in water at 85°C for a balanced taste.",
    origin: "Dimbula, Sri Lanka",
    characteristics: ["Complex", "Floral", "Smooth", "Balanced"],
    color: "#c28e51"
  },
];

export default function TeaTastingExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedTea, setSelectedTea] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTeaClick = (index) => {
    if (isMobile) {
      setSelectedTea(selectedTea === index ? null : index);
    } else {
      setExpandedInfo(expandedInfo === index ? null : index);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut"
      }
    })
  };

  const hoverVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  const expandedCardVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="relative inline-block text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Discover the World of <span className="text-green-600 dark:text-green-400">Ceylon Tea</span>
            <motion.div 
              className="absolute -z-10 bottom-1 left-0 w-full h-3 bg-green-200/50 dark:bg-green-900/30 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the unique flavors and aromas of our finest teas, sourced directly from Sri Lanka renowned tea estates.
          </p>
        </motion.div>

        {/* Tea Cards Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {teaTypes.map((tea, index) => (
            <div key={index} className="relative">
              <motion.div
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  ...cardVariants,
                  ...hoverVariants
                }}
                whileHover={!isMobile ? "hover" : {}}
                className={`relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700 ${
                  selectedTea === index ? "ring-2 ring-green-500 dark:ring-green-400" : ""
                } ${expandedInfo === index ? "shadow-xl" : "shadow-md"}`}
                onClick={() => handleTeaClick(index)}
              >
                {/* Tea Type Indicator */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 z-10"
                  style={{ backgroundColor: tea.color }}
                ></div>

                {/* Tea Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={tea.image}
                    alt={tea.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority={index < 2} // Prioritize loading first two images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-green-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {tea.origin}
                  </span>
                </div>
                
                {/* Tea Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
                    {tea.name}
                    <motion.span 
                      className="ml-2 inline-flex items-center"
                      initial={{ rotate: 0 }}
                      animate={expandedInfo === index ? { rotate: 180 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {!isMobile && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-green-600 dark:text-green-400"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      )}
                    </motion.span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                    {tea.description}
                  </p>
                  
                  {/* Characteristics Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tea.characteristics.map((trait, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-3 py-1 rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  
                  {/* Brewing Tip Tooltip */}
                  <div className="group relative inline-block">
                    <button 
                      className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium hover:text-green-700 dark:hover:text-green-300 transition-colors"
                      aria-label="Brewing tip"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 10V3L4 14h7v7l9-11h-7z" 
                        />
                      </svg>
                      Brewing Tip
                    </button>
                    <div className="absolute hidden group-hover:block left-0 right-0 md:left-auto md:right-0 md:w-64 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-xl text-sm text-gray-600 dark:text-gray-200 mt-2 z-10 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start gap-3">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 10V3L4 14h7v7l9-11h-7z" 
                          />
                        </svg>
                        <p>{tea.brewingTip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Expanded Info Panel (Desktop only) */}
              {!isMobile && (
                <AnimatePresence>
                  {expandedInfo === index && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={expandedCardVariants}
                      className="mt-2 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                      <div className="p-6">
                        <h4 className="font-medium text-green-700 dark:text-green-400 mb-3">About {tea.name}</h4>
                        <div className="prose prose-sm dark:prose-invert">
                          <p>
                            Ceylon {tea.name.split(' ')[1]} is cultivated in the {tea.origin.split(',')[0]} region, 
                            known for its {tea.characteristics[0].toLowerCase()} flavor profile and {tea.characteristics[1].toLowerCase()} character.
                          </p>
                          <h5 className="mt-4 text-gray-800 dark:text-gray-200">Perfect Brewing</h5>
                          <p className="italic">{tea.brewingTip}</p>
                          <h5 className="mt-4 text-gray-800 dark:text-gray-200">Health Benefits</h5>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Supports immune function</li>
                            <li>Rich in antioxidants</li>
                            <li>Promotes cardiovascular health</li>
                            <li>Natural source of gentle energy</li>
                          </ul>
                        </div>
                        <div className="mt-6 text-right">
                          <button 
                            className="inline-flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
                          >
                            Learn More
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}