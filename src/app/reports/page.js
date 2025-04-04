// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaDownload, FaCalendarAlt, FaChevronDown, FaSearch, FaExclamationCircle, FaFilePdf } from "react-icons/fa";

// export default function Reports() {
//   const [reports, setReports] = useState([]);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [isPdfLoading, setIsPdfLoading] = useState(true);
//   const [pdfError, setPdfError] = useState(null);

//   const fetchReports = async () => {
//     setIsLoading(true);
//     setPdfError(null);
//     try {
//       const response = await fetch("/api/getReports");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       if (data.error) {
//         throw new Error(data.error);
//       }

//       setReports(data);
//       setFilteredReports(data);
//       setSelectedReport(data[0] || null);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching reports:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//     const intervalId = setInterval(fetchReports, 300000); // Refresh every 5 minutes
//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredReports(reports);
//     } else {
//       setFilteredReports(
//         reports.filter(report => 
//           report.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//   }, [searchTerm, reports]);

//   const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

//   const handleReportSelect = (report) => {
//     setSelectedReport(report);
//     setIsDropdownOpen(false);
//     setIsPdfLoading(true);
//     setPdfError(null);
//   };

//   const formatReportDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return new Intl.DateTimeFormat('en-US', { 
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       }).format(date);
//     } catch {
//       return dateString;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return "N/A";
//     const units = ['B', 'KB', 'MB', 'GB'];
//     let size = bytes;
//     let unitIndex = 0;
//     while (size >= 1024 && unitIndex < units.length - 1) {
//       size /= 1024;
//       unitIndex++;
//     }
//     return `${size.toFixed(1)} ${units[unitIndex]}`;
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 }
//   };

//   return (
//     <motion.div 
//       className="p-4 md:p-8 bg-gradient-to-b from-green-50 to-white min-h-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.h1 
//         className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-green-900"
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         Weekly Tea Market Reports
//       </motion.h1>

//       {isLoading && (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
//         </div>
//       )}

//       {error && (
//         <motion.div 
//           className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg border border-red-200 flex items-center mb-8"
//           variants={itemVariants}
//         >
//           <FaExclamationCircle className="text-red-600 mr-3 text-xl flex-shrink-0" />
//           <div>
//             <h3 className="font-semibold text-red-700">Error Loading Reports</h3>
//             <p className="text-red-600">{error}</p>
//             <button 
//               onClick={fetchReports} 
//               className="mt-2 text-red-700 underline hover:text-red-800"
//             >
//               Try Again
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {!isLoading && !error && (
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="max-w-4xl mx-auto"
//         >
//           <motion.div variants={itemVariants} className="mb-6">
//             <div className="relative max-w-md mx-auto">
//               <FaSearch className="absolute left-3 top-3 text-green-600" />
//               <input
//                 type="text"
//                 placeholder="Search reports..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none transition"
//               />
//             </div>
//           </motion.div>

//           {selectedReport && (
//             <motion.div
//               variants={itemVariants}
//               className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden border border-green-100"
//             >
//               <div className="bg-green-700 text-white p-4">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl md:text-2xl font-bold">
//                     {selectedReport.name.replace(".pdf", "")}
//                   </h2>
//                   <div className="flex items-center text-sm bg-green-600 px-3 py-1 rounded-full">
//                     <FaCalendarAlt className="mr-2" />
//                     <span>Updated: {formatReportDate(selectedReport.modifiedTime)}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 {isPdfLoading && (
//                   <div className="w-full h-72 md:h-96 flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
//                   </div>
//                 )}
//                 <iframe
//                   src={selectedReport.previewUrl}
//                   className={`w-full h-72 md:h-96 rounded-lg border border-gray-200 ${isPdfLoading ? 'hidden' : 'block'}`}
//                   title="PDF Preview"
//                   onLoad={() => setIsPdfLoading(false)}
//                   onError={() => {
//                     setIsPdfLoading(false);
//                     setPdfError("Failed to load PDF preview");
//                   }}
//                 />
//                 {pdfError && (
//                   <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//                     <FaExclamationCircle className="text-yellow-600 inline-block mr-2" />
//                     <span className="text-yellow-700">{pdfError}</span>
//                     <div className="mt-2">
//                       <a 
//                         href={selectedReport.viewUrl} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-green-600 underline hover:text-green-800"
//                       >
//                         Open in Google Drive
//                       </a>
//                     </div>
//                   </div>
//                 )}
                
//                 <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div>
//                     <h3 className="font-medium text-gray-700 mb-1">Report Details</h3>
//                     <p className="text-sm text-gray-500">
//                       Last updated: {formatReportDate(selectedReport.modifiedTime)}
//                       <br />
//                       File size: {formatFileSize(selectedReport.size)}
//                     </p>
//                   </div>
                  
//                   <div className="flex gap-3">
//                     <a
//                       href={selectedReport.viewUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-center bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-md hover:shadow-lg border border-green-200"
//                     >
//                       <FaFilePdf className="mr-2" />
//                       <span>Open in Viewer</span>
//                     </a>
//                     <a
//                       href={selectedReport.downloadUrl}
//                       download={selectedReport.name}
//                       className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg group"
//                     >
//                       <FaDownload className="mr-2 group-hover:animate-bounce" />
//                       <span>Download</span>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           <motion.div variants={itemVariants}>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl md:text-2xl font-bold text-green-800">
//                 Previous Reports
//               </h2>
//               <div className="text-sm text-gray-500">
//                 {filteredReports.length > 1 ? 
//                   `${filteredReports.length - 1} previous report${filteredReports.length > 2 ? 's' : ''}` : 
//                   "No previous reports"
//                 }
//               </div>
//             </div>
            
//             <div className="relative mb-8">
//               <button
//                 onClick={handleDropdownToggle}
//                 className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-between items-center border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
//                 disabled={filteredReports.length <= 1}
//               >
//                 <span className="text-green-700 font-medium">
//                   {isDropdownOpen ? "Close selection" : "Select a previous report"}
//                 </span>
//                 <motion.div
//                   animate={{ rotate: isDropdownOpen ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-green-600"
//                 >
//                   <FaChevronDown />
//                 </motion.div>
//               </button>

//               <AnimatePresence>
//                 {isDropdownOpen && filteredReports.length > 1 && (
//                   <motion.div
//                     className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {filteredReports
//                       .filter(report => report.id !== selectedReport?.id)
//                       .map((report, index) => (
//                         <motion.div
//                           key={report.id}
//                           className="border-b border-green-100 last:border-b-0 hover:bg-green-50 transition-colors"
//                           whileHover={{ x: 5 }}
//                         >
//                           <button
//                             className="p-4 w-full text-left flex items-center justify-between group"
//                             onClick={() => handleReportSelect(report)}
//                           >
//                             <div>
//                               <h3 className="text-lg font-medium text-green-800">
//                                 {report.name.replace(".pdf", "")}
//                               </h3>
//                               <p className="text-sm text-gray-500 mt-1">
//                                 {formatReportDate(report.modifiedTime)} • {formatFileSize(report.size)}
//                               </p>
//                             </div>
//                             <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
//                               <FaDownload className="text-green-600 mr-2" />
//                               <span className="text-green-600 text-sm">Select</span>
//                             </div>
//                           </button>
//                         </motion.div>
//                       ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>
          
//           <motion.div 
//             variants={itemVariants}
//             className="bg-green-50 rounded-lg p-6 border border-green-200"
//           >
//             <h3 className="font-semibold text-green-800 mb-2">About Tea Market Reports</h3>
//             <p className="text-green-700 mb-4">
//               These weekly reports provide insights into current tea market trends, pricing, 
//               and forecasts. They are essential for stakeholders in the tea industry.
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
//               <span className="text-sm text-green-600">
//                 Reports are updated every Thursday
//               </span>
//               <button className="bg-white text-green-700 border border-green-300 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors">
//                 Subscribe to Updates
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }








"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaCalendarAlt, FaChevronDown, FaSearch, FaExclamationCircle, FaFilePdf, FaSync } from "react-icons/fa";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);

  const fetchReports = async () => {
    setIsLoading(true);
    setPdfError(null);
    try {
      // Add a cache-busting query parameter
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/getReports?t=${timestamp}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      if (data.length === 0) {
        console.warn("No reports found");
      }

      setReports(data);
      setFilteredReports(data);
      setSelectedReport(data[0] || null);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching reports:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    const intervalId = setInterval(fetchReports, 300000); // Refresh every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredReports(reports);
    } else {
      setFilteredReports(
        reports.filter(report => 
          report.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, reports]);

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const handleReportSelect = (report) => {
    setSelectedReport(report);
    setIsDropdownOpen(false);
    setIsPdfLoading(true);
    setPdfError(null);
  };

  const formatReportDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const handlePdfError = () => {
    setIsPdfLoading(false);
    setPdfError("Failed to load PDF preview. You can still download or view the report.");
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
    setPdfError(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      )}

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
              onClick={fetchReports} 
              className="mt-2 text-red-700 underline flex items-center hover:text-red-800"
            >
              <FaSync className="mr-1" /> Try Again
            </button>
          </div>
        </motion.div>
      )}

      {!isLoading && !error && reports.length === 0 && (
        <motion.div 
          className="max-w-2xl mx-auto bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex items-center mb-8"
          variants={itemVariants}
        >
          <FaExclamationCircle className="text-yellow-600 mr-3 text-xl flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-700">No Reports Available</h3>
            <p className="text-yellow-600">No tea market reports were found. Please check back later.</p>
            <button 
              onClick={fetchReports} 
              className="mt-2 text-yellow-700 underline flex items-center hover:text-yellow-800"
            >
              <FaSync className="mr-1" /> Refresh
            </button>
          </div>
        </motion.div>
      )}

      {!isLoading && !error && reports.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
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

          {selectedReport && (
            <motion.div
              variants={itemVariants}
              className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden border border-green-100"
            >
              <div className="bg-green-700 text-white p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">
                    {selectedReport.name.replace(".pdf", "")}
                  </h2>
                  <div className="flex items-center text-sm bg-green-600 px-3 py-1 rounded-full max-w-max">
                    <FaCalendarAlt className="mr-2" />
                    <span>Updated: {formatReportDate(selectedReport.modifiedTime)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {isPdfLoading && (
                  <div className="w-full h-72 md:h-96 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
                  </div>
                )}
                
                {/* Add error handling for iframe load/error events */}
                <iframe
                  src={`${selectedReport.previewUrl}&t=${new Date().getTime()}`}
                  className={`w-full h-72 md:h-96 rounded-lg border border-gray-200 ${isPdfLoading ? 'hidden' : 'block'}`}
                  title="PDF Preview"
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                />
                
                {pdfError && (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <FaExclamationCircle className="text-yellow-600 inline-block mr-2" />
                    <span className="text-yellow-700">{pdfError}</span>
                    <div className="mt-2">
                      <a 
                        href={selectedReport.viewUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 underline hover:text-green-800"
                      >
                        Open in Google Drive
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">Report Details</h3>
                    <p className="text-sm text-gray-500">
                      Last updated: {formatReportDate(selectedReport.modifiedTime)}
                      <br />
                      File size: {formatFileSize(selectedReport.size)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedReport.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-md hover:shadow-lg border border-green-200"
                    >
                      <FaFilePdf className="mr-2" />
                      <span>Open in Viewer</span>
                    </a>
                    <a
                      href={selectedReport.downloadUrl}
                      download={selectedReport.name}
                      className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg group"
                    >
                      <FaDownload className="mr-2 group-hover:animate-bounce" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-green-800">
                Previous Reports
              </h2>
              <div className="text-sm text-gray-500">
                {filteredReports.length > 1 ? 
                  `${filteredReports.length - 1} previous report${filteredReports.length > 2 ? 's' : ''}` : 
                  "No previous reports"
                }
              </div>
            </div>
            
            <div className="relative mb-8">
              <button
                onClick={handleDropdownToggle}
                className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-between items-center border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                disabled={filteredReports.length <= 1}
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
                {isDropdownOpen && filteredReports.length > 1 && (
                  <motion.div
                    className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredReports
                      .filter(report => report.id !== selectedReport?.id)
                      .map((report) => (
                        <motion.div
                          key={report.id}
                          className="border-b border-green-100 last:border-b-0 hover:bg-green-50 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <button
                            className="p-4 w-full text-left flex items-center justify-between group"
                            onClick={() => handleReportSelect(report)}
                          >
                            <div>
                              <h3 className="text-lg font-medium text-green-800">
                                {report.name.replace(".pdf", "")}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {formatReportDate(report.modifiedTime)} • {formatFileSize(report.size)}
                              </p>
                            </div>
                            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <FaDownload className="text-green-600 mr-2" />
                              <span className="text-green-600 text-sm">Select</span>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
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
                Reports are updated every Thursday
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