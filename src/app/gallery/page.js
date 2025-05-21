
"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GalleryPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://script.google.com/macros/s/AKfycbw27vU8dfCwVl-FbAbKS4VNiPll4zE_LrzxqutyuRchj_NtKSeC_fP-MhxT217MVmsrHQ/exec";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}?t=${Date.now()}`);
        if (!response.ok)
          throw new Error(`Failed to load gallery (${response.status})`);
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Gallery loading error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";
    try {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url('/gallery/gallery%20bk.jpg')` }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg"
        >
          MPBL Gallery
        </motion.h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
            <p className="text-white font-medium">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-600 font-semibold mb-4">
              Error loading gallery
            </div>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {event.images.length > 0 ? (
                  <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showArrows={true}
                    interval={5000}
                    stopOnHover={true}
                    swipeable={true}
                    dynamicHeight={false}
                    className="carousel-container"
                  >
                    {event.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative h-64 w-full cursor-default"
                      >
                        <img
                          src={image.fullsize}
                          alt={`Event Image ${imgIndex}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = image.thumbnail;
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No images available</span>
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-bold text-green-900 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {event.description || "No description available."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .carousel-container .control-arrow {
          background-color: rgba(0, 0, 0, 0.3) !important;
          height: 50px;
          top: calc(50% - 25px) !important;
          border-radius: 4px;
          margin: 0 10px;
        }
        .carousel-container .control-arrow:hover {
          background-color: rgba(0, 0, 0, 0.5) !important;
        }
        .carousel-container .control-next {
          right: 0 !important;
        }
        .carousel-container .control-prev {
          left: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
