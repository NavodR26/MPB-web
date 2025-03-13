


"use client";
import { motion, useInView } from "framer-motion";
import {  useRef,useState, useEffect } from "react";
import { Calendar, ArrowLeft, ArrowRight, Info } from "lucide-react";


// Months data with start day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const months = [
  { name: "January 2025", days: 31, startDay: 3 }, // January 2025 starts on Wednesday (3)
  { name: "February 2025", days: 28, startDay: 6 }, // February 2025 starts on Saturday (6)
  { name: "March 2025", days: 31, startDay: 6 }, // March 2025 starts on Saturday (6)
  { name: "April 2025", days: 30, startDay: 2 }, // April 2025 starts on Tuesday (2)
  { name: "May 2025", days: 31, startDay: 4 }, // May 2025 starts on Thursday (4)
  { name: "June 2025", days: 30, startDay: 0 }, // June 2025 starts on Sunday (0)
];

export default function AuctionCalendar() {
  const [auctionDates, setAuctionDates] = useState([]);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentSaleDetails, setCurrentSaleDetails] = useState(null);
  const [todayHighlighted, setTodayHighlighted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
    return date === today.getDate();
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
      }, 300);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (selectedMonthIndex < months.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedMonthIndex(selectedMonthIndex + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Auction Calendar</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevMonth}
            disabled={selectedMonthIndex === 0}
            className={`p-2 rounded-full ${selectedMonthIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-100'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-lg font-semibold text-gray-700 w-40 text-center">
            {selectedMonth.name}
          </h3>
          
          <button 
            onClick={nextMonth}
            disabled={selectedMonthIndex === months.length - 1}
            className={`p-2 rounded-full ${selectedMonthIndex === months.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-100'}`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className={`transform transition-all duration-300 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {/* Weekday Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div 
              key={day} 
              className={`text-center font-bold py-2 ${index === 0 || index === 6 ? 'text-red-500' : 'text-gray-700'}`}
            >
              {day}
            </div>
          ))}

          {/* Empty Days for Start of Month */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="text-center p-4 rounded-lg"></div>
          ))}

          {/* Calendar Days */}
          {daysInMonth.map((day) => {
            const auction = hasAuction(day);
            const today = isToday(day);
            
            return (
              <div
                key={day}
                className={`relative text-center p-4 rounded-lg cursor-pointer transition-all duration-300 border
                  ${auction 
                    ? 'border-green-300 hover:border-green-500' 
                    : 'border-gray-200 hover:bg-gray-100'}
                  ${today ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                `}
                onClick={() => handleDateClick(day)}
              >
                <span className={`text-lg ${auction ? 'font-semibold' : ''}`}>
                  {day}
                </span>
                
                {auction && (
                  <div className="absolute bottom-1 left-0 right-0 mx-auto">
                    <div className="flex justify-center space-x-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Legend */}
      <div className="flex items-center justify-center mt-6 mb-2 text-sm text-gray-600">
        <div className="flex items-center mr-4">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span>Auction Day</span>
        </div>
        {todayHighlighted && (
          <div className="flex items-center">
            <div className="h-3 w-3 border border-blue-500 rounded-full mr-2"></div>
            <span>Today</span>
          </div>
        )}
      </div>

      {/* Sale Details Modal */}
      {selectedDate && currentSaleDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-300 max-w-md w-full animate-fadeIn">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">
                Auction Details
              </h3>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-green-800 font-semibold">
                {selectedMonth.name.split(" ")[0]} {selectedDate}, {selectedMonth.name.split(" ")[1]}
              </p>
              <p className="text-green-700 text-lg font-bold mt-1">
                Sale #{currentSaleDetails[0].saleNo} - {currentSaleDetails[0].title}
              </p>
            </div>
            
            {currentSaleDetails.length > 1 && (
              <div className="mb-4">
                <p className="text-gray-600 italic">
                  This is a multi-day auction event
                </p>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setSelectedDate(null);
                  setCurrentSaleDetails(null);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
