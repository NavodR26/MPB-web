"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./SaleTicker.module.css";
import { motion, AnimatePresence } from "framer-motion";

const TEA_TYPES = [
  { key: "UH", emoji: "🌄", name: "Uva High" },
  { key: "WH", emoji: "⛰️", name: "Western High" },
  { key: "H", emoji: "🏔️", name: "High Grown" },
  { key: "UM", emoji: "🌤️", name: "Uva Medium" },
  { key: "WM", emoji: "🏞️", name: "Western Medium" },
  { key: "M", emoji: "🌅", name: "Medium Grown" },
  { key: "L", emoji: "🌾", name: "Low Grown" },
  { key: "BT", emoji: "🍂", name: "Black Tea" }
];

export default function SaleTicker() {
  const [latestData, setLatestData] = useState([]);
  const [saleInfo, setSaleInfo] = useState({});
  const [selectedTea, setSelectedTea] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedElevation, setSelectedElevation] = useState(null);
  const tickerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formatting helpers
  const formatPrice = (price) => parseFloat(price || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  const formatDiff = (diff) => Math.abs(parseFloat(diff || 0)).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  const getDiffIndicator = (diff) => {
    const numDiff = parseFloat(diff || 0);
    if (numDiff > 0) return "▲";
    if (numDiff < 0) return "▼";
    return "━";
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxH2D33RiPhxwUAejefUjyQ7-5e3UETcylMwAyC9Cu1p14eqRmBi_tGrr1tV8tr3d-r/exec',
        { cache: 'no-store' }
      );
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const result = await response.json();
      if (!result.success) throw new Error("API returned unsuccessful response");
      
      // Set sale info
      setSaleInfo({
        currentSaleNo: result.currentSaleNo,
        lastUpdated: result.lastUpdated
      });
      
      // Filter and format data
      const filteredData = result.latestSaleData
        .filter(item => item.TOTAL_AVG !== null)
        .map(item => ({
          ...item,
          TOTAL_AVG: formatPrice(item.TOTAL_AVG),
          PRICE_DIFF_LKR: item.PRICE_DIFF_LKR !== null ? formatDiff(item.PRICE_DIFF_LKR) : "0.00",
          changeDirection: Math.sign(parseFloat(item.PRICE_DIFF_LKR || 0))
        }));
      
      // Sort by elevation order
      const elevationOrder = ["UH", "WH", "H", "UM", "WM", "M", "L", "BT"];
      filteredData.sort((a, b) => 
        elevationOrder.indexOf(a.ELEVATION) - elevationOrder.indexOf(b.ELEVATION)
      );
      
      setLatestData(filteredData);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load latest tea prices. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [fetchData]);

  // Animation for ticker
  useEffect(() => {
    if (!tickerRef.current || latestData.length === 0) return;

    const ticker = tickerRef.current;
    let animationFrame;
    let startPos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        startPos -= speed;
        if (startPos <= -ticker.scrollWidth / 2) {
          startPos = 0;
        }
        ticker.style.transform = `translateX(${startPos}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [latestData, isPaused]);

  // Find tea data by elevation
  const getTeaByElevation = (elevation) => {
    return latestData.find(item => item.ELEVATION === elevation);
  };

  if (isLoading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading tea auction data...</p>
    </div>
  );
  
  if (error) return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <p>{error}</p>
      <button onClick={fetchData} className={styles.retryButton}>
        Retry
      </button>
    </div>
  );
  
  if (latestData.length === 0) return (
    <div className={styles.noDataContainer}>
      <p>No tea auction data available</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Public Tea Auction Averages  | Source - CBA (WES)</h2>
        <div className={styles.controls}>
          <div className={styles.dropdown}>
            <button 
              className={styles.dropdownButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedElevation ? 
                `${TEA_TYPES.find(t => t.key === selectedElevation)?.emoji || '🍵'} 
                 ${TEA_TYPES.find(t => t.key === selectedElevation)?.name || selectedElevation}` 
                : "Select Elevation"}
              <span className={styles.dropdownArrow}>▼</span>
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                {TEA_TYPES.map(type => (
                  <button
                    key={type.key}
                    onClick={() => {
                      setSelectedElevation(type.key);
                      setIsDropdownOpen(false);
                      const teaData = getTeaByElevation(type.key);
                      if (teaData) setSelectedTea(teaData);
                    }}
                    className={styles.dropdownItem}
                  >
                    {type.emoji} {type.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={fetchData}
            className={styles.refreshButton}
            aria-label="Refresh data"
          >
            🔄
          </button>
        </div>
      </div>
      
      <div 
        className={styles.tickerWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.ticker} ref={tickerRef}>
          {[...latestData, ...latestData].map((item, index) => (
            <motion.div 
              key={`${item.ELEVATION}-${index}`}
              className={`${styles.tickerItem} ${
                item.changeDirection > 0 ? styles.up : 
                item.changeDirection < 0 ? styles.down : styles.neutral
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedTea(item)}
            >
              <span className={styles.elevation}>
                <span className={styles.emoji}>{TEA_TYPES.find(t => t.key === item.ELEVATION)?.emoji || '🍵'}</span>
                <span className={styles.elevationName}>{TEA_TYPES.find(t => t.key === item.ELEVATION)?.name || item.ELEVATION}</span>
              </span>
              <span className={styles.price}>Rs. {item.TOTAL_AVG}</span>
              <span className={styles.change}>
                {getDiffIndicator(item.PRICE_DIFF_LKR)} Rs. {item.PRICE_DIFF_LKR}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.saleInfo}>
          <span className={styles.infoLabel}>Latest Sale:</span>
          <span className={styles.infoValue}>{saleInfo.currentSaleNo || 'N/A'}</span>
          <span className={styles.infoSeparator}>•</span>
          <span className={styles.infoLabel}>Updated:</span>
          <span className={styles.infoValue}>
            {saleInfo.lastUpdated ? new Date(saleInfo.lastUpdated).toLocaleString() : 'N/A'}
          </span>
        </div>
      </div>

      {/* Tea Detail Modal */}
      <AnimatePresence>
        {selectedTea && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTea(null)}
          >
            <motion.div 
              className={styles.teaModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedTea(null)}
                aria-label="Close details"
              >
                &times;
              </button>
              
              <div className={styles.modalHeader}>
                <span className={styles.modalEmoji}>
                  {TEA_TYPES.find(t => t.key === selectedTea.ELEVATION)?.emoji || '🍵'}
                </span>
                <h3 className={styles.modalTitle}>
                  {TEA_TYPES.find(t => t.key === selectedTea.ELEVATION)?.name || selectedTea.ELEVATION}
                </h3>
                <div className={`${styles.priceChange} ${
                  selectedTea.changeDirection > 0 ? styles.up : 
                  selectedTea.changeDirection < 0 ? styles.down : styles.neutral
                }`}>
                  {getDiffIndicator(selectedTea.PRICE_DIFF_LKR)} Rs. {selectedTea.PRICE_DIFF_LKR}
                </div>
              </div>
              
              <div className={styles.teaDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Sale Number:</span>
                  <span className={styles.detailValue}>{selectedTea.SALENO}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Total Quantity:</span>
                  <span className={styles.detailValue}>
                    {selectedTea.TOTAL_QTY ? selectedTea.TOTAL_QTY.toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Average Price:</span>
                  <span className={styles.detailValue}>Rs. {selectedTea.TOTAL_AVG}</span>
                </div>
                {selectedTea.ORTHODOX_AVG && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Orthodox Avg:</span>
                    <span className={styles.detailValue}>
                      Rs. {formatPrice(selectedTea.ORTHODOX_AVG)}
                    </span>
                  </div>
                )}
                {selectedTea.CTC_AVG && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>CTC Avg:</span>
                    <span className={styles.detailValue}>
                      Rs. {formatPrice(selectedTea.CTC_AVG)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



