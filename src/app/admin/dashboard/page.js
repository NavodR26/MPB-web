"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [marketReportFile, setMarketReportFile] = useState(null);
  const [auctionDates, setAuctionDates] = useState([]);
  const [newAuction, setNewAuction] = useState({ date: "", saleNo: "", title: "" });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchAuctionDates();
  }, []);

  const fetchAuctionDates = async () => {
    try {
      const response = await fetch("https://mpb-web-production.up.railway.app/api/auction-dates");
      if (response.ok) {
        const data = await response.json();
        setAuctionDates(data);
      } else {
        console.error("Failed to fetch auction dates");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching auction dates:", error);
      setLoading(false);
    }
  };

  const handleMarketReportUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://mpb-web-production.up.railway.app/api/upload-market-report", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();

      if (response.ok) {
        alert("✅ " + result);
      } else {
        alert("❌ Upload failed: " + result);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("❌ Error uploading file.");
    }
  };

  const handleAddAuction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mpb-web-production.up.railway.app/api/auction-dates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuction),
      });

      if (response.ok) {
        setNewAuction({ date: "", saleNo: "", title: "" });
        fetchAuctionDates();
        alert("Auction date added successfully!");
      } else {
        alert("Failed to add auction date.");
      }
    } catch (error) {
      console.error("Error adding auction date:", error);
      alert("Error adding auction date.");
    }
  };

  const handleAuctionInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteAuction = async (id) => {
    try {
      const response = await fetch(`https://mpb-web-production.up.railway.app/api/auction-dates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAuctionDates(); // Refresh the list
        alert("Auction date deleted successfully!");
      } else {
        alert("Failed to delete auction date.");
      }
    } catch (error) {
      console.error("Error deleting auction date:", error);
      alert("Error deleting auction date.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark', !darkMode);
  };

  const filteredAuctions = auctionDates.filter(auction =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex`}>
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-green-800">
          <div className="flex items-center justify-center h-16 bg-green-900">
            <h1 className="text-white font-bold text-lg">MPB Admin</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`${
                activeTab === "dashboard" ? "bg-green-900" : "hover:bg-green-700"
              } text-white group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("auctions")}
              className={`${
                activeTab === "auctions" ? "bg-green-900" : "hover:bg-green-700"
              } text-white group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full`}
            >
              Auction Dates
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`${
                activeTab === "reports" ? "bg-green-900" : "hover:bg-green-700"
              } text-white group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full`}
            >
              Market Reports
            </button>
            <button
              onClick={handleLogout}
              className="text-white group flex items-center px-4 py-3 text-sm font-medium rounded-md w-full hover:bg-green-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Mercantile Produce Brokers - Admin
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-green-600 p-1 rounded-full text-white hover:bg-green-700 focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <span className="h-6 w-6 flex items-center justify-center">🔔</span>
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium">AD</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
                </div>
              </div>
              <button onClick={toggleDarkMode} className="ml-4 text-gray-900 dark:text-white">
                Toggle Dark Mode
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto focus:outline-none p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5 bg-green-600">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-white p-3 rounded-md">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-white truncate">Upcoming Auctions</dt>
                          <dd>
                            <div className="text-lg font-medium text-white">{auctionDates.length}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <button
                        onClick={() => setActiveTab("auctions")}
                        className="font-medium text-green-700 dark:text-green-400 hover:text-green-900"
                      >
                        View all
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5 bg-blue-600">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-white p-3 rounded-md">
                        <span className="text-2xl">📝</span>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-white truncate">Market Reports</dt>
                          <dd>
                            <div className="text-lg font-medium text-white">5</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <button
                        onClick={() => setActiveTab("reports")}
                        className="font-medium text-blue-700 dark:text-blue-400 hover:text-blue-900"
                      >
                        View all
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5 bg-purple-600">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-white p-3 rounded-md">
                        <span className="text-2xl">🍵</span>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-white truncate">Tea Varieties</dt>
                          <dd>
                            <div className="text-lg font-medium text-white">12</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-purple-700 dark:text-purple-400 hover:text-purple-900">
                        Manage
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Upcoming Auctions</h3>
                  <div className="mt-4 max-h-80 overflow-y-auto">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {auctionDates.slice(0, 5).map((auction, index) => (
                        <li key={index} className="py-4 flex">
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {auction.title} (Sale #{auction.saleNo})
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{auction.date}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "auctions" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add New Auction Date</h2>
                <form onSubmit={handleAddAuction} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date (MM/DD/YYYY)
                      </label>
                      <input
                        type="text"
                        name="date"
                        value={newAuction.date}
                        onChange={handleAuctionInputChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        placeholder="MM/DD/YYYY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sale Number
                      </label>
                      <input
                        type="text"
                        name="saleNo"
                        value={newAuction.saleNo}
                        onChange={handleAuctionInputChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        placeholder="e.g. 001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Auction Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newAuction.title}
                        onChange={handleAuctionInputChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                        placeholder="e.g. Spring Collection"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Add Auction Date
                    </button>
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                    Manage Auction Dates
                  </h3>
                  <input
                    type="text"
                    placeholder="Search Auctions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md mb-4"
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Sale #
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredAuctions.map((auction, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {auction.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {auction.saleNo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {auction.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDeleteAuction(auction._id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upload Market Report</h2>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    onChange={handleMarketReportUpload}
                    className="hidden"
                    id="marketReportUpload"
                    accept="application/pdf"
                  />
                  <label
                    htmlFor="marketReportUpload"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-200"
                  >
                    Choose File
                  </label>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {marketReportFile ? marketReportFile.name : "No file chosen"}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                    Previous Market Reports
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Report Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Date Uploaded
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            Size
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Q1_2025_Market_Report.pdf
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            01/15/2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            2.4 MB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400">
                              Download
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}