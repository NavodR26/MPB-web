"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

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

  // Apply dark mode class to the HTML element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network request
    setTimeout(() => {
      // Validate credentials (hardcoded for this example)
      if (username === "ADMIN" && password === "MpbAdmin") {
        // Set a flag in localStorage to indicate logged in status
        localStorage.setItem("adminLoggedIn", "true");
        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header with Back Button */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-md py-3 px-4">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-md w-full"
        >
          {/* Login Form Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white text-center">
            <div className="flex justify-center mb-3">
              <Image
                src="/LOGO crest - without text.png"
                alt="Mercantile Logo"
                width={70}
                height={70}
                className="drop-shadow-md"
              />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-green-100 mt-1">Mercantile Produce Brokers</p>
          </div>

          {/* Login Form */}
          <div className="p-6">
            <h2 className="text-gray-700 dark:text-gray-200 text-xl font-semibold mb-6 text-center">
              Sign In
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                  Forgot password?
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Protected area. Unauthorized access is prohibited.</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md py-3 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 Mercantile Produce Brokers. All rights reserved.</p>
      </footer>
    </div>
  );
}