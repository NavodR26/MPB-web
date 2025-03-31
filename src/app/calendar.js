"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, ArrowLeft, ArrowRight, Info, Gavel } from "lucide-react";

// Months data with start day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const months = [
  { name: "January 2025", days: 31, startDay: 3 },
  { name: "February 2025", days: 28, startDay: 6 },
  { name: "March 2025", days: 31, startDay: 6 },
  { name: "April 2025", days: 30, startDay: 2 },
  { name: "May 2025", days: 31, startDay: 4 },
  { name: "June 2025", days: 30, startDay: 0 },
  { name: "July 2025", days: 31, startDay: 2 },
  { name: "August 2025", days: 31, startDay: 5 },
  { name: "September 2025", days: 30, startDay: 1 },
  { name: "October 2025", days: 31, startDay: 3 },
  { name: "November 2025", days: 30, startDay: 6 },
  { name: "December 2025", days: 31, startDay: 1 },
];

export default function AuctionCalendar() {
  const [auctionDates, setAuctionDates] = useState([]);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentSaleDetails, setCurrentSaleDetails] = useState(null);
  const [todayHighlighted, setTodayHighlighted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Set initial month to current month
  useEffect(() => {
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    setSelectedMonthIndex(currentMonthIndex);
  }, []);

  const selectedMonth = months[selectedMonthIndex];

  // Fetch auction dates from the backend
  useEffect(() => {
    const fetchAuctionDates = async () => {
      try {
        const response = await fetch("https://mpb-web-production.up.railway.app/api/auction-dates");
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        setAuctionDates(data);
      } catch (error) {
        console.error("Error fetching auction dates:", error);
      }
    };

    fetchAuctionDates();
  }, []);

  // Highlight today's date if calendar is showing current month/year
  useEffect(() => {
    const today = new Date();
    const isCurrentMonthYear = 
      selectedMonth.name.includes(today.getFullYear().toString()) && 
      selectedMonth.name.includes(today.toLocaleString('default', { month: 'long' }));
    
    setTodayHighlighted(isCurrentMonthYear);
  }, [selectedMonth]);

  // Generate calendar days
  const daysInMonth = Array.from({ length: selectedMonth.days }, (_, i) => i + 1);
  const startDay = selectedMonth.startDay;

  // Check if a date has an auction
  const hasAuction = (date) => {
    const monthIndex = months.findIndex((m) => m.name === selectedMonth.name) + 1;
    const formattedDate = `${monthIndex.toString().padStart(2, "0")}/${date.toString().padStart(2, "0")}/2025`;
    return auctionDates.some((auction) => auction.date === formattedDate);
  };

  // Check if a date is today
  const isToday = (date) => {
    if (!todayHighlighted) return false;
    const today = new Date();
    return date === today.getDate() && 
           selectedMonth.name.includes(today.getFullYear().toString()) &&
           selectedMonth.name.includes(today.toLocaleString('default', { month: 'long' }));
  };

  // Get auction details for a date
  const getAuctionDetails = (date) => {
    const monthIndex = months.findIndex((m) => m.name === selectedMonth.name) + 1;
    const formattedDate = `${monthIndex.toString().padStart(2, "0")}/${date.toString().padStart(2, "0")}/2025`;
    return auctionDates.filter((auction) => auction.date === formattedDate);
  };

  // Handle date click
  const handleDateClick = (date) => {
    const auctionDetails = getAuctionDetails(date);
    if (auctionDetails.length > 0) {
      setSelectedDate(date);
      setCurrentSaleDetails(auctionDetails);
    }
  };

  // Navigate to previous month
  const prevMonth = () => {
    if (selectedMonthIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedMonthIndex(selectedMonthIndex - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (selectedMonthIndex < months.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedMonthIndex(selectedMonthIndex + 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Auction Calendar</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevMonth}
            disabled={selectedMonthIndex === 0}
            className={`p-2 rounded-full ${
              selectedMonthIndex === 0 
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 w-40 text-center">
            {selectedMonth.name}
          </h3>
          
          <button 
            onClick={nextMonth}
            disabled={selectedMonthIndex === months.length - 1}
            className={`p-2 rounded-full ${
              selectedMonthIndex === months.length - 1 
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        key={selectedMonthIndex}
        className={`${isAnimating ? 'opacity-70' : 'opacity-100'}`}
      >
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
          {/* Weekday Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div 
              key={day} 
              className={`text-center text-sm sm:text-base font-bold py-2 ${
                index === 0 || index === 6 
                  ? 'text-red-500 dark:text-red-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {day}
            </div>
          ))}

          {/* Empty Days for Start of Month */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="text-center p-2 sm:p-3 rounded-lg"></div>
          ))}

          {/* Calendar Days */}
          {daysInMonth.map((day) => {
            const auction = hasAuction(day);
            const today = isToday(day);
            
            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative text-center p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                  auction 
                    ? 'border-amber-300 dark:border-amber-600 hover:border-amber-500 dark:hover:border-amber-400' 
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${
                  today ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-gray-800' : ''
                }`}
                onClick={() => handleDateClick(day)}
              >
                <span className={`text-sm sm:text-base ${
                  auction ? 'font-semibold text-amber-700 dark:text-amber-300' : 
                  today ? 'font-semibold text-blue-600 dark:text-blue-300' :
                  'text-gray-700 dark:text-gray-200'
                }`}>
                  {day}
                </span>
                
                {auction && (
                  <div className="absolute bottom-0 left-0 right-0 mx-auto flex justify-center">
                    <Gavel className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Calendar Legend */}
      <div className="flex flex-wrap items-center justify-center mt-4 mb-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 gap-2 sm:gap-4">
        <div className="flex items-center">
          <Gavel className="h-3 w-3 text-amber-700 dark:text-amber-400 mr-2" />
          <span>Auction Day</span>
        </div>
        {todayHighlighted && (
          <div className="flex items-center">
            <div className="h-3 w-3 border border-blue-500 dark:border-blue-400 rounded-full mr-2"></div>
            <span>Today</span>
          </div>
        )}
      </div>

      {/* Sale Details Modal */}
      {selectedDate && currentSaleDetails && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-300 dark:border-gray-600 max-w-md w-full"
          >
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Auction Details
              </h3>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg mb-4">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                {selectedMonth.name.split(" ")[0]} {selectedDate}, {selectedMonth.name.split(" ")[1]}
              </p>
              <p className="text-green-700 dark:text-green-300 text-lg font-bold mt-1">
                Sale #{currentSaleDetails[0].saleNo} - {currentSaleDetails[0].title}
              </p>
            </div>
            
            {currentSaleDetails.length > 1 && (
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  This is a multi-day auction event
                </p>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedDate(null);
                  setCurrentSaleDetails(null);
                }}
                className="bg-green-600 dark:bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition duration-300 flex items-center"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}