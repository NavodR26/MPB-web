// src/app/gallery/page.js
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiInfo, FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Define your gallery data statically for reliability
const galleryData = [
  {
    folder: '01',
    title: 'CIPM Sri Lanka Training Program',
    date: '2025-03-29',
    description: 'MPBL members participated in a leadership training program held at CIPM Sri Lanka. The session provided valuable insights into leadership, teamwork, and professional development, enhancing their skills and knowledge.',
    images: [
      '/gallery/01/01.jpg',
      '/gallery/01/02.jpg',
      '/gallery/01/03.jpg'
    ]
  },
  {
    folder: '02',
    title: 'WOMEN\'S DAY 2025 - Medical Screening Session',
    date: '2025-03-14',
    description: 'In celebration of International Women\'s Day 2025, Mercantile Produce Brokers (Pvt) Ltd conducted a medical screening session for our female employees. It was done in collaboration with Asiri Central (Pvt) Ltd on 14th March 2025 at the MPBL Board Room, where it carried out an essential screening session that included BMI, breast screening, random blood sugar, and vision checking. Finally employees got a one-to-one session with the medical doctor to discuss their health-related concerns.',
    images: [
      '/gallery/02/001.jpg',
      '/gallery/02/002.jpg'
    ]
  }
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const openLightbox = (eventIndex, imageIndex) => {
    setSelectedImage({
      event: galleryData[eventIndex],
      image: galleryData[eventIndex].images[imageIndex],
      eventIndex,
      imageIndex
    });
    setCurrentIndex(imageIndex);
  };

  const navigateImages = (direction) => {
    const eventImages = galleryData[selectedImage.eventIndex].images;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + eventImages.length) % eventImages.length;
    } else {
      newIndex = (currentIndex + 1) % eventImages.length;
    }
    
    setCurrentIndex(newIndex);
    setSelectedImage({
      ...selectedImage,
      image: eventImages[newIndex]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>MPBL - Gallery</title>
        <meta name="description" content="View our events and programs gallery" />
      </Head>

      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments from our events, training programs, and community initiatives
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid gap-12">
          {galleryData.map((event, eventIndex) => (
            <motion.div
              key={event.folder}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Event Header */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{event.title}</h2>
                    {event.date && (
                      <div className="flex items-center mt-2 text-gray-600">
                        <FiCalendar className="mr-2" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {event.images.length} Photos
                  </div>
                </div>
                
                {event.description && (
                  <div className="mt-4 flex">
                    <FiInfo className="flex-shrink-0 mt-1 mr-2 text-blue-500" />
                    <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                  </div>
                )}
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-100 p-1">
                {event.images.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group cursor-pointer"
                    onClick={() => openLightbox(eventIndex, imgIndex)}
                  >
                    <img
                      src={image}
                      alt={`${event.title} - ${imgIndex + 1}`}
                      className="w-full h-64 object-cover"
                      loading={imgIndex > 2 ? "lazy" : "eager"}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 text-3xl transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <FiX className="text-3xl" />
            </button>
            
            <div className="max-w-6xl w-full h-full flex items-center relative" onClick={e => e.stopPropagation()}>
              {/* Navigation Arrows */}
              {galleryData[selectedImage.eventIndex].images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 text-white hover:text-gray-300 z-10 p-2 bg-black bg-opacity-50 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages('prev');
                    }}
                  >
                    <FiChevronLeft className="text-3xl" />
                  </button>
                  <button
                    className="absolute right-4 text-white hover:text-gray-300 z-10 p-2 bg-black bg-opacity-50 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages('next');
                    }}
                  >
                    <FiChevronRight className="text-3xl" />
                  </button>
                </>
              )}
              
              <motion.div
                key={selectedImage.image}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col"
              >
                <div className="flex-grow flex items-center justify-center">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.event.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                </div>
                <div className="p-4 bg-gray-800 text-white text-center">
                  <h3 className="text-xl font-bold">{selectedImage.event.title}</h3>
                  {selectedImage.event.date && (
                    <p className="text-gray-400">{formatDate(selectedImage.event.date)}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-300">
                    Image {currentIndex + 1} of {galleryData[selectedImage.eventIndex].images.length}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;