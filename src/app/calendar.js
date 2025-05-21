"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, ArrowLeft, ArrowRight, Info, Gavel, X, Clock, Calendar as CalendarIcon, Hammer } from "lucide-react";

// Helper function to format date display
const formatDateDisplay = (dateString) => {
  if (!dateString) return "N/A";
  
  const [month, day, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function AuctionCalendar() {
  const [auctionDates, setAuctionDates] = useState([]);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentSaleDetails, setCurrentSaleDetails] = useState(null);
  const [months, setMonths] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Weekdays starting with Monday
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const generateMonths = (year) => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(year, i, 1);
      return {
        name: date.toLocaleString('default', { month: 'long' }) + " " + year,
        days: new Date(year, i + 1, 0).getDate(),
        startDay: (new Date(year, i, 1).getDay() + 6) % 7,
        monthIndex: i,
        year: year,
      };
    });
  };

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonths(generateMonths(today.getFullYear()));
    setSelectedMonthIndex(today.getMonth());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzUWvmI_jr30CVlwinun1Sxj1aJliEpN-27LucD_Ci-pxC0g2_5Z2w2faYC2gqflsl9/exec"
        );
        const data = await response.json();
        setAuctionDates(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedMonth = months[selectedMonthIndex] || {};

  const hasAuction = (day) => {
    const formattedDate = `${selectedMonth.monthIndex + 1}/${day}/${selectedMonth.year}`;
    return auctionDates.some(auction => auction.date === formattedDate);
  };

  const getAuctionDetails = (day) => {
    const formattedDate = `${selectedMonth.monthIndex + 1}/${day}/${selectedMonth.year}`;
    const matchingAuctions = auctionDates.filter(auction => auction.date === formattedDate);
    
    // Group by saleNo since a sale might have multiple days
    const grouped = {};
    matchingAuctions.forEach(auction => {
      if (!grouped[auction.saleNo]) {
        grouped[auction.saleNo] = {
          saleNo: auction.saleNo,
          saleYear: auction.saleYear,
          days: [],
          catalogueDate: auction.catalogueDate
        };
      }
      grouped[auction.saleNo].days.push({
        date: auction.date,
        dayType: auction.dayType
      });
    });
    
    return Object.values(grouped);
  };

  const getDayOfWeek = (day) => {
    return (new Date(selectedMonth.year, selectedMonth.monthIndex, day).getDay() + 6) % 7;
  };

  const navigateMonth = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === "prev") {
        if (selectedMonthIndex > 0) {
          setSelectedMonthIndex((prev) => prev - 1);
        } else {
          const newYear = year - 1;
          setYear(newYear);
          setMonths(generateMonths(newYear));
          setSelectedMonthIndex(11);
        }
      } else {
        if (selectedMonthIndex < 11) {
          setSelectedMonthIndex((prev) => prev + 1);
        } else {
          const newYear = year + 1;
          setYear(newYear);
          setMonths(generateMonths(newYear));
          setSelectedMonthIndex(0);
        }
      }
      setIsAnimating(false);
    }, 200);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-200 dark:border-gray-700">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
          <Calendar className="mr-2 text-green-600" /> Auction Calendar
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 dark:text-green-400 transition-colors duration-200"
          >
            <ArrowLeft />
          </button>
          <h3 className="text-xl font-semibold w-44 text-center bg-white dark:bg-gray-800 py-1 px-2 rounded-lg shadow-sm">
            {selectedMonth.name}
          </h3>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 dark:text-green-400 transition-colors duration-200"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <motion.div
        key={`${selectedMonthIndex}-${year}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${isAnimating ? "opacity-70" : "opacity-100"} bg-white dark:bg-gray-800 rounded-lg shadow-md p-4`}
      >
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekdays.map((day, index) => (
            <div
              key={day}
              className={`text-center font-bold py-2 rounded ${
                index === 6 
                  ? "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
                  : "text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50"
              }`}
            >
              {day}
            </div>
          ))}

          {Array.from({ length: selectedMonth.startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12 bg-gray-50 dark:bg-gray-800 rounded" />
          ))}

          {Array.from({ length: selectedMonth.days }, (_, i) => i + 1).map((day) => {
            const isAuctionDay = hasAuction(day);
            const isToday =
              new Date().getDate() === day &&
              new Date().getMonth() === selectedMonth.monthIndex &&
              new Date().getFullYear() === selectedMonth.year;
            const dayOfWeek = getDayOfWeek(day);
            const isSunday = dayOfWeek === 6;

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const details = getAuctionDetails(day);
                  if (details.length) {
                    setSelectedDate(day);
                    setCurrentSaleDetails(details);
                  }
                }}
                className={`relative h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all border ${
                  isAuctionDay
                    ? "border-amber-300 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/30 shadow-md"
                    : isSunday
                    ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40"
                    : "border-transparent bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/60"
                } ${isToday ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}`}
              >
                <span
                  className={`${
                    isAuctionDay 
                      ? "font-bold text-amber-700 dark:text-amber-300" 
                      : isSunday
                      ? "font-medium text-red-600 dark:text-red-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {day}
                </span>
                {isAuctionDay && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1 shadow-lg">
                    <Gavel className="h-3 w-3 text-white" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="bg-amber-500 rounded-full p-1 mr-2">
            <Gavel className="h-4 w-4 text-white" />
          </div>
          <span className="text-gray-700 dark:text-gray-300">Auction Day</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded mr-2"></div>
          <span className="text-gray-700 dark:text-gray-300">Sunday</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded border-2 border-blue-500 dark:border-blue-400 mr-2"></div>
          <span className="text-gray-700 dark:text-gray-300">Today</span>
        </div>
      </div>

      {/* Auction Details Modal */}
      {currentSaleDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setCurrentSaleDetails(null)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-700 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setCurrentSaleDetails(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 p-5 text-white">
              <div className="flex items-center">
                
                <div>
                  <h3 className="text-xl font-bold">Auction Details</h3>
                  <p className="text-sm opacity-90">
                    {selectedMonth.name.split(" ")[0]} {selectedDate}, {selectedMonth.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {currentSaleDetails.map((sale, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gray-50/50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  {/* Sale Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium py-1 px-2 rounded-md mb-1">
                        Sale #{sale.saleNo} • {sale.saleYear}
                      </span>
                    </div>
                  </div>

                  {/* Auction Days */}
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Clock className="flex-shrink-0 mt-0.5 mr-2 text-gray-500 dark:text-gray-400" size={16} />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auction Days</p>
                        <ul className="space-y-1">
                          {sale.days.map((day, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                              {day.dayType}: {formatDateDisplay(day.date)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Catalogue Closing */}
                    <div className="flex items-start">
                      <CalendarIcon className="flex-shrink-0 mt-0.5 mr-2 text-gray-500 dark:text-gray-400" size={16} />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Catalogue Closing</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDateDisplay(sale.catalogueDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <button
                onClick={() => setCurrentSaleDetails(null)}
                className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}