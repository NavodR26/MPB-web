"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Calendar from "./calendar";
import NewsFeed from "./newsfeed";
import { useEffect, useState, useRef } from "react";
import TeaTastingExperience from "./TeaTastingExperience";

const images = [
  {
    src: "/homepge_pics/image1.jpg",
    alt: "Tea Tasting Experience",
    targetId: "tea-tasting-experience",
    description: "Experience premium tea tastings in our dedicated tea room"
  },
  {
    src: "/homepge_pics/image2.jpg",
    alt: "Upcoming Auction Dates",
    targetId: "upcoming-auction-dates",
    description: "Stay informed about global tea auction schedules"
  },
  {
    src: "/homepge_pics/image3.jpg",
    alt: "World Tea Market Updates",
    targetId: "world-tea-market-updates",
    description: "Get the latest insights from tea markets worldwide"
  },
];

// Skeleton loader for testimonials
const TestimonialSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((item) => (
      <div key={item} className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
        <div className="flex justify-center mb-4 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-200"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-5 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>
    ))}
  </div>
);

// Custom animated counter hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime;
          const startValue = 0;
          
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - startValue) + startValue));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [end, duration]);
  
  return [count, nodeRef];
};

// Enhanced Testimonials Section Component
const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  // Fetch reviews from Google Apps Script API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxFZJNq_rsc-LutZa_qOZpUW1sW0_D5UmUMh2WXdwPZ01vqNBI4JAUH2x4G23C5vuQu/exec"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data.reverse()); // Reverse to show latest reviews first
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle navigation for reviews
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= reviews.length ? 0 : prevIndex + 3));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, reviews.length - 3) : prevIndex - 3));
  };

  return (
    <motion.section 
      className="w-full py-20 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/homepge_pics/tea-leaf-pattern.png')] bg-repeat opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>

        {/* Write a Review Button */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href="https://forms.gle/jez6Utofw4BQyzuDA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-green-500/30"
          >
            Write a Review
          </a>
        </motion.div>

        {/* Reviews Display */}
        <div className="relative">
          {loading ? (
            <TestimonialSkeleton />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => {setLoading(true); fetchReviews();}}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Try Again
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg text-center relative backdrop-blur-sm bg-white/90 border border-gray-100"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  >
                    {/* Quote icon */}
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 013 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                      </svg>
                    </div>
                    
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-2xl ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    
                    <div className="mb-6 h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-100">
                      <p className="text-gray-600 italic">{review.comment}</p>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold mr-3">
                        {review.name.charAt(0)}
                      </div>
                      <p className="text-green-700 font-semibold">{review.name}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination dots */}
          {!loading && !error && reviews.length > 3 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * 3)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    Math.floor(currentIndex / 3) === idx ? "bg-green-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review set ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {!loading && !error && reviews.length > 3 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 z-10"
                aria-label="Previous reviews"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 z-10"
                aria-label="Next reviews"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
};

// Hero Section Component
function HeroSection() {
  // Function to handle smooth scrolling
  const scrollToSection = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      >
        <source src="/homepge_pics/Business_Stock_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
        Mercantile Produce Brokers (Pvt) Ltd
        </h1>
        <motion.p
          className="text-2xl text-gray-200 font-semibold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-3xl text-green-300 font-extrabold tracking-wide">
            Established in 1983
          </span>
        </motion.p>
      </motion.div>

{/* Compact BSP Floating Button */}
<div className="fixed bottom-8 right-8 z-50 group">
  <a 
    href="https://apps.merctea.lk/bsp/" 
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
    aria-label="Open BSP Portal"
  >
    {/* BSP Text with Icon */}
    <div className="relative">
      <svg 
        className="w-6 h-6 text-white absolute -top-3 -left-3 opacity-80" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <span className="text-white font-bold text-sm tracking-tight">BSP</span>
    </div>
    
    {/* Pulsing Animation */}
    <span className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-70 transition-opacity duration-500"></span>
  </a>
  
  {/* Tooltip */}
  <div className="absolute right-16 bottom-3 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg flex items-center">
    Broker Trade Portal
    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
  </div>
</div>

      {/* Tea Images Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-6 mt-10">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-300 
                       bg-white/20 backdrop-blur-lg p-2 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection(image.targetId)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="rounded-lg object-cover"
              width={250}
              height={250}
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center">
                {image.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Scroll Icon */}
      <motion.div
        onClick={() => scrollToSection("tea-tasting-experience")}
        className="absolute bottom-8 z-10 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}


// Enhanced Calendar Section
const EnhancedCalendarSection = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);
  
  return (
    <motion.section 
      id="upcoming-auction-dates" 
      className="w-full py-20 bg-gradient-to-b from-gray-100 to-gray-200 relative"
      style={{ scale }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-16 bg-[url('/wave-pattern.svg')] bg-repeat-x opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Upcoming Tea Auction Dates
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stay updated with our comprehensive calendar of Sri Lanka Tea auctions. 
            Plan your purchases strategically with our accurate scheduling information.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
        >
          <Calendar />
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced News Feed Section
const EnhancedNewsFeedSection = () => {
  return (
    <section id="world-tea-market-updates" className="w-full py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -bottom-36 -right-36 w-72 h-72 rounded-full bg-green-100 opacity-30"></div>
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-green-200 opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">LATEST INSIGHTS</span>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            World Tea Market Updates
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get real-time insights into global tea markets, price trends, and industry news to make informed decisions.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
        >
          <NewsFeed />
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Book Appointment Section
const EnhancedBookingSection = () => {
  return (
    <motion.section 
      className="w-full py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/homepge_pics/tea-background.jpg" // Make sure this image exists
          alt="Tea background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-700/90"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm text-green-200 rounded-full text-sm font-medium mb-4">EXCLUSIVE EXPERIENCE</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Book a Tea Room Session
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Experience the finest Ceylon Tea with a personalized tea-tasting session guided by our tea masters. 
            Discover flavors, aromas, and traditions passed down through generations.
          </p>
          
          <motion.a
            href="https://forms.gle/hf2WwPXjgz3VbfQB9"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-white px-8 py-4 text-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            
            <span className="font-semibold transition-all group-hover:ms-8">
              Book Your Experience Now
            </span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced Home Component
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Tea Tasting Experience Section */}
      <TeaTastingExperience id="tea-tasting-experience" />

      {/* Enhanced Calendar Section */}
      <EnhancedCalendarSection />

      {/* Enhanced Real-Time News Feed Section */}
      <EnhancedNewsFeedSection />

      {/* Enhanced Testimonials Section */}
      <TestimonialsSection />

      {/* Enhanced Book Appointment Section */}
      <EnhancedBookingSection />
    </main>
  );
}

