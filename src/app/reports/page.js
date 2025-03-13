"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaCalendarAlt, FaChevronDown, FaSearch, FaExclamationCircle } from "react-icons/fa";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/getReports");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
        setFilteredReports(data);
        if (data.length > 0) {
          // Automatically select the latest report (last in the array)
          setSelectedReport(data[data.length - 1]);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching reports:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReports();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(report => 
        report.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  }, [searchTerm, reports]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleReportSelect = (report) => {
    setSelectedReport(report);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const formatReportDate = (reportName) => {
    // Extract date from report name (assuming format like "Tea Report - 2023-05-12.pdf")
    const dateMatch = reportName.match(/\d{4}-\d{2}-\d{2}/);
    if (dateMatch) {
      const date = new Date(dateMatch[0]);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    }
    return reportName.replace(".pdf", "");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 bg-gradient-to-b from-green-50 to-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-green-900"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Weekly Tea Market Reports
      </motion.h1>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <motion.div 
          className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg border border-red-200 flex items-center mb-8"
          variants={itemVariants}
        >
          <FaExclamationCircle className="text-red-600 mr-3 text-xl flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-700">Error Loading Reports</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-red-700 underline hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {!isLoading && !error && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Search Bar */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="relative max-w-md mx-auto">
              <FaSearch className="absolute left-3 top-3 text-green-600" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none transition"
              />
            </div>
          </motion.div>

          {/* Latest Report Preview */}
          {selectedReport && (
            <motion.div
              variants={itemVariants}
              className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden border border-green-100"
            >
              <div className="bg-green-700 text-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {formatReportDate(selectedReport.name)}
                  </h2>
                  <div className="flex items-center text-sm bg-green-600 px-3 py-1 rounded-full">
                    <FaCalendarAlt className="mr-2" />
                    <span>Latest Report</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <iframe
                  src={selectedReport.path}
                  className="w-full h-72 md:h-96 rounded-lg border border-gray-200"
                  title="PDF Preview"
                />
                
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">Report Details</h3>
                    <p className="text-sm text-gray-500">
                      {selectedReport.name.includes("-") ? "Published on" : "Weekly report from"} {formatReportDate(selectedReport.name)}
                    </p>
                  </div>
                  
                  <a
                    href={selectedReport.path}
                    download
                    className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg group"
                  >
                    <FaDownload className="mr-2 group-hover:animate-bounce" />
                    <span>Download Report</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Previous Reports */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-green-800">
                Previous Reports
              </h2>
              <div className="text-sm text-gray-500">
                {filteredReports.length > 0 ? 
                  `${filteredReports.length} report${filteredReports.length > 1 ? 's' : ''} available` : 
                  "No reports found"
                }
              </div>
            </div>
            
            <div className="relative mb-8">
              <button
                onClick={handleDropdownToggle}
                className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-between items-center border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <span className="text-green-700 font-medium">
                  {isDropdownOpen ? "Close selection" : "Select a previous report"}
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-green-600"
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredReports.length > 0 ? (
                      filteredReports
                        .slice()
                        .reverse() // Show most recent first
                        .filter(report => report !== selectedReport) // Exclude currently selected report
                        .map((report, index) => (
                          <motion.div
                            key={index}
                            className="border-b border-green-100 last:border-b-0 hover:bg-green-50 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <button
                              className="p-4 w-full text-left flex items-center justify-between group"
                              onClick={() => handleReportSelect(report)}
                            >
                              <div>
                                <h3 className="text-lg font-medium text-green-800">
                                  {formatReportDate(report.name)}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {report.name.replace(".pdf", "")}
                                </p>
                              </div>
                              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaDownload className="text-green-600 mr-2" />
                                <span className="text-green-600 text-sm">Select</span>
                              </div>
                            </button>
                          </motion.div>
                        ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No reports found matching {searchTerm}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Info Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-green-50 rounded-lg p-6 border border-green-200"
          >
            <h3 className="font-semibold text-green-800 mb-2">About Tea Market Reports</h3>
            <p className="text-green-700 mb-4">
              These weekly reports provide insights into current tea market trends, pricing, 
              and forecasts. They are essential for stakeholders in the tea industry.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <span className="text-sm text-green-600">
                Reports are updated every Thursday !
              </span>
              <button className="bg-white text-green-700 border border-green-300 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors">
                Subscribe to Updates
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}