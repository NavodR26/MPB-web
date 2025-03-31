"use client";
import Image from "next/image";
import Link from "next/link";
import "./styles/globals.css";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Initialize dark mode from user preference or system theme
  useEffect(() => {
    // Check local storage first
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  }, [darkMode]);

  // Apply dark mode class to the HTML element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Toggle mobile menu and prevent body scroll when menu is open
  const toggleMobileMenu = useCallback(() => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "";
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Add scroll listener for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search input with debouncing
  const handleSearch = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length > 2) {
        // Simulate API call (replace with actual API)
        fetchSearchSuggestions(searchQuery).then(setSearchSuggestions);
      } else {
        setSearchSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Mock function to simulate API call
  const fetchSearchSuggestions = async (query) => {
    // Replace with actual API call
    return [
      "Ceylon Black Tea",
      "Tea Auction Dates",
      "Tea Market Updates",
      "Tea Tasting Session",
      `Search: ${query}`,
    ].filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle search suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
    // Here you would typically redirect to search results
    console.log(`Searching for: ${suggestion}`);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Replace with actual search functionality
      console.log(`Performing search for: ${searchQuery}`);
      setSearchSuggestions([]);
    }
  };

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setSearchSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Page loading simulation (with realistic progress)
  useEffect(() => {
    // Simulate resource loading progress
    const startLoading = Date.now();
    const maxLoadTime = 2000; // maximum load time in ms
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startLoading;
      if (elapsed >= maxLoadTime) {
        setIsLoading(false);
        clearInterval(progressInterval);
      }
    }, 100);
    
    // Cleanup function
    return () => clearInterval(progressInterval);
  }, []);

  // Navigation links data - easier to maintain
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/reports", label: "Market Reports" },
    { href: "/links", label: "Stats & Links" },
    { href: "/contactus", label: "Contact Us" },
  ];
  
  // Animations
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const logoVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };
  
  const loadingVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: { 
      scale: [0.8, 1, 0.8], 
      opacity: [0.5, 1, 0.5],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <title>Mercantile Produce Brokers PVT Ltd</title>
        <meta name="description" content="Mercantile Produce Brokers Pvt. Ltd - Your trusted partner in the tea industry since 1983." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/LOGO crest.png" />
      </head>
      <body className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        {/* Loading Animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50"
            >
              <motion.div
                variants={loadingVariants}
                initial="initial"
                animate="animate"
              >
                <Image
                  src="/LOGO crest - without text.png"
                  alt="Loading..."
                  width={100}
                  height={100}
                  priority
                  className="drop-shadow-md"
                />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-gray-600 dark:text-gray-300 font-medium"
              >
                Loading...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-md py-1" 
            : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-3"
        }`}>
          <div className="container mx-auto px-4 flex items-center justify-between">
            {/* Left - Logo */}
            <motion.div
              className="flex items-center space-x-2 md:space-x-3"
              variants={logoVariants}
              initial="normal"
              whileHover="hover"
            >
              <Image 
                src="/LOGO crest.png" 
                alt="Mercantile Logo" 
                width={scrolled ? 40 : 50} 
                height={scrolled ? 40 : 50}
                className="transition-all duration-300"
                priority
              />
              <div className="flex flex-col">
                <h1 className={`font-bold text-gray-800 dark:text-white transition-all duration-300 ${
                  scrolled ? "text-sm md:text-base" : "text-base md:text-lg"
                }`}>
                  Mercantile Produce Brokers (Pvt) Ltd
                </h1>
                <p className={`text-xs text-gray-600 dark:text-gray-300 hidden sm:block transition-all duration-300 ${
                  scrolled ? "opacity-0 h-0" : "opacity-100"
                }`}>
                  Est. 1983
                </p>
              </div>
            </motion.div>

            {/* Middle - Navigation Links */}
            <nav className="hidden md:flex space-x-1 lg:space-x-6">
              {navLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="relative px-2 py-1 text-gray-700 dark:text-gray-300 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}
            </nav>

            {/* Right - Dark Mode Toggle and Search Bar */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={toggleDarkMode}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Search Component */}
              <div className="relative search-container hidden sm:block">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-32 md:w-48 lg:w-64 p-2 pr-8 rounded-full text-sm border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 p-1 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    aria-label="Submit search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
                <AnimatePresence>
                  {searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-2 w-full bg-white/95 dark:bg-gray-700/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50 overflow-hidden"
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hamburger Menu for Mobile */}
              <button
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen 
                      ? "M6 18L18 6M6 6l12 12" 
                      : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu with AnimatePresence for smooth transitions */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg overflow-hidden"
              >
                {/* Mobile search bar */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full p-2 pl-8 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 absolute left-2 top-3 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <button
                      type="submit"
                      className="absolute right-2 top-2 p-1 text-gray-600 dark:text-gray-300"
                      aria-label="Submit search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Mobile navigation links */}
                <nav className="p-4 space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="block py-3 px-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Content with smooth transition */}
        <motion.main
          variants={fadeInVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          className="flex-grow pt-24 md:pt-28 px-4 container mx-auto"
        >
          {children}
        </motion.main>

     

        {/* Footer with improved styling and admin login button */}
<footer className="bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-md text-white mt-auto">
  <div className="container mx-auto px-4 py-6 md:py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-green-400">Contact Us</h3>
        <address className="not-italic text-gray-300 space-y-2">
          <p>133, Jawatta Road</p>
          <p>Colombo 05, Sri Lanka</p>
          <p>Email: info@merctea.lk</p>
          <p>Phone: 011 234 5678</p>
        </address>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-green-400">Quick Links</h3>
        <ul className="space-y-2 text-gray-300">
          <li>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span className="font-semibold">Login</span>
            </Link>
          </li>
          <li><Link href="/gallery" className="hover:text-white transition-colors duration-200">Gallery</Link></li>
          <li><Link href="/contactus" className="hover:text-white transition-colors duration-200">Contacts</Link></li>
          <li><Link href="/csr" className="hover:text-white transition-colors duration-200">CSR NEWS</Link></li>
          <li><Link href="/careers" className="hover:text-white transition-colors duration-200">Careers</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-green-400">Connect With Us</h3>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
            </svg>
          </a>
         
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div className="pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
      <p>&copy; 2025 Mercantile Produce Brokers(Pvt) Ltd. All rights reserved.</p>
      <p className="mt-2 md:mt-0">Developed by: MPBL-IT</p>
    </div>
  </div>
</footer>
      </body>
    </html>
  );
}

