'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaCalendarAlt, FaChevronDown, FaSearch, FaExclamationCircle } from 'react-icons/fa';
import { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [latestReport, setLatestReport] = useState(null);
  const [previousReports, setPreviousReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);

  // Voice command additions
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening
  } = useSpeechRecognition();

  // Process voice commands
  useEffect(() => {
    if (!transcript) return;

    const processCommand = () => {
      const cmd = transcript.toLowerCase();
      
      // 1. Download command
      if (cmd.includes('download')) {
        const saleNo = transcript.match(/\d+/)?.[0]?.padStart(3, '0');
        const report = reports.find(r => r.formattedSaleNo === saleNo);
        
        if (report) {
          const link = document.createElement('a');
          link.href = report.downloadUrl;
          link.download = report.name;
          link.click();
          toast.success(`Downloading ${report.name}`);
        } else {
          toast.error(`Report ${saleNo} not found`);
        }
      }
      
      // 2. Preview command
      else if (cmd.includes('preview') || cmd.includes('show')) {
        const saleNo = transcript.match(/\d+/)?.[0]?.padStart(3, '0');
        const report = saleNo 
          ? reports.find(r => r.formattedSaleNo === saleNo)
          : reports[0];
        
        if (report) {
          setLatestReport(report);
          setIsPdfLoading(true);
          setPdfError(null);
          toast.success(`Showing ${report.name}`);
        }
      }

      resetTranscript();
    };

    processCommand();
  }, [transcript, reports, resetTranscript]);

  // Fetch reports from API
  const fetchReports = async () => {
    setIsLoading(true);
    setPdfError(null);
    try {
      const response = await fetch('/api/getReports');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setReports(data);
      
      // Set latest report (first item after sorting)
      if (data.length > 0) {
        setLatestReport(data[0]);
        setPreviousReports(data.slice(1));
      }
      
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchReports, 300000);
    return () => clearInterval(intervalId);
  }, []);

  // Filter reports based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      if (reports.length > 0) {
        setLatestReport(reports[0]);
        setPreviousReports(reports.slice(1));
      }
    } else {
      const filtered = reports.filter(report => 
        report.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setLatestReport(filtered[0] || null);
      setPreviousReports(filtered.slice(1));
    }
  }, [searchTerm, reports]);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Voice command button component
  const VoiceCommandButton = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => listening ? stopListening() : startListening()}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg ${
          listening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
        disabled={!browserSupportsSpeechRecognition}
      >
        {listening ? (
          <>
            <FaStop className="text-lg" /> 
            <span className="hidden sm:inline">Listening...</span>
          </>
        ) : (
          <>
            <FaMicrophone className="text-lg" />
            <span className="hidden sm:inline">Voice Commands</span>
          </>
        )}
      </button>
      
      {!browserSupportsSpeechRecognition && (
        <div className="absolute -bottom-2 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Unsupported
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-900"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Tea Market Reports
      </motion.h1>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg border border-red-200 flex items-center mb-8">
          <FaExclamationCircle className="text-red-600 mr-3 text-xl" />
          <div>
            <h3 className="font-semibold text-red-700">Error Loading Reports</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchReports}
              className="mt-2 text-red-700 underline hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && (
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
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
          </div>

          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-green-900">
                MPBL Tea Market Report
              </h1>
              <p className="text-green-700 mt-1">
                Published Weekly • Every Wednesday 7:00 PM IST
              </p>
            </div>
          </div>

          {/* Latest Report Preview */}
          {latestReport && (
            <div className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
              <div className="bg-green-700 text-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {latestReport.name.replace('.pdf', '')}
                  </h2>
                  <div className="flex items-center text-sm bg-green-600 px-3 py-1 rounded-full">
                    <FaCalendarAlt className="mr-2" />
                    <span>Latest Report • Sale No. {latestReport.formattedSaleNo}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {isPdfLoading && (
                  <div className="w-full h-72 md:h-96 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
                  </div>
                )}
                <iframe
                  src={latestReport.previewUrl}
                  className={`w-full h-72 md:h-96 rounded-lg border border-gray-200 ${isPdfLoading ? 'hidden' : 'block'}`}
                  title="Latest Report Preview"
                  onLoad={() => setIsPdfLoading(false)}
                  onError={() => {
                    setIsPdfLoading(false);
                    setPdfError('Failed to load PDF preview');
                  }}
                />
                {pdfError && (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <FaExclamationCircle className="text-yellow-600 inline-block mr-2" />
                    <span className="text-yellow-700">{pdfError}</span>
                    <div className="mt-2">
                      <a 
                        href={`https://drive.google.com/file/d/${latestReport.id}/view`} 
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
                      Published on {formatDate(latestReport.modifiedTime)}
                    </p>
                  </div>
                  
                  <a
                    href={latestReport.downloadUrl}
                    download={latestReport.name}
                    className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg group"
                  >
                    <FaDownload className="mr-2 group-hover:animate-bounce" />
                    <span>Download Report</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Previous Reports Dropdown */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-green-800">
                Previous Reports
              </h2>
              <div className="text-sm text-gray-500">
                {previousReports.length} report{previousReports.length !== 1 ? 's' : ''} available
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-between items-center border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                disabled={previousReports.length === 0}
              >
                <span className="text-green-700 font-medium">
                  {isDropdownOpen ? 'Hide previous reports' : 'Show previous reports'}
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
                {isDropdownOpen && previousReports.length > 0 && (
                  <motion.div
                    className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto border border-green-100"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {previousReports.map((report) => (
                      <div
                        key={report.id}
                        className="p-4 border-b border-green-100 hover:bg-green-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-green-800">
                              Sale No. {report.formattedSaleNo}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDate(report.modifiedTime)}
                            </p>
                          </div>
                          <a
                            href={report.downloadUrl}
                            download={report.name}
                            className="text-green-600 hover:text-green-800 text-sm flex items-center"
                          >
                            <FaDownload className="mr-1" />
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Voice command button */}
      <VoiceCommandButton />
      
      {/* Voice command hints */}
      {listening && (
        <div className="fixed bottom-20 right-6 bg-white p-3 rounded-lg shadow-md border border-gray-200 max-w-xs">
          <h4 className="font-medium mb-1">Try saying:</h4>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li>Download Sale Number 005</li>
            <li>Show Sale Number 003</li>
            <li>Preview latest report</li>
          </ul>
        </div>
      )}
    </div>
  );
}