"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Rss, AlertTriangle, Clock, ExternalLink } from "lucide-react";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Categories derived from news items
  const categories = ["all", "market", "auctions", "exhibitions", "collectors"];

  const fetchNews = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const response = await fetch("/api/rss");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        // Add category field if not present
        const processedData = data.map(article => ({
          ...article,
          category: article.category || determineCategory(article.title, article.content),
          publishDate: article.pubDate ? new Date(article.pubDate) : new Date(),
        }));
        setNews(processedData);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError("No articles found. Please check back later.");
      }
    } catch (err) {
      console.error("News fetch error:", err);
      setError(`Failed to load news: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  }, []);

  // Determine category based on content
  const determineCategory = (title, content) => {
    const text = (title + " " + content).toLowerCase();
    if (text.includes("auction") || text.includes("bidding") || text.includes("sale"))
      return "auctions";
    if (text.includes("market") || text.includes("price") || text.includes("trend"))
      return "market";
    if (text.includes("exhibit") || text.includes("gallery") || text.includes("museum"))
      return "exhibitions";
    if (text.includes("collector") || text.includes("collection") || text.includes("acquire"))
      return "collectors";
    return "general";
  };

  // Format relative time
  const getRelativeTime = (date) => {
    if (!date) return "";
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 30 minutes
    const interval = setInterval(() => {
      fetchNews(true);
    }, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchNews]);

  // Filter news by category
  const filteredNews = selectedCategory === "all" 
    ? news 
    : news.filter(article => article.category === selectedCategory);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchNews(true);
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Rss className="mr-2 h-5 w-5 text-green-600" />
            Latest News
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load News</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={handleRefresh}
          className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-md transition duration-300 flex items-center mx-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (filteredNews.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
        <div className="mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No News Found</h3>
        <p className="text-gray-600 mb-6">
          {selectedCategory !== "all" 
            ? `No articles found in the "${selectedCategory}" category.` 
            : "No news articles are currently available."}
        </p>
        {selectedCategory !== "all" && (
          <button
            onClick={() => setSelectedCategory("all")}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-2 px-4 rounded-md transition duration-300"
          >
            View All Categories
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section with title, refresh and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Rss className="mr-2 h-5 w-5 text-green-600" />
            Latest News
          </h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {getRelativeTime(lastUpdated)}
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Category tabs */}
          <div className="flex overflow-x-auto bg-gray-100 rounded-md p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm font-medium rounded-md capitalize transition whitespace-nowrap
                  ${selectedCategory === category 
                    ? 'bg-white text-green-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`ml-2 p-2 rounded-full transition
              ${refreshing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* News cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredNews.map((article, index) => (
          <motion.div
            key={article.link || index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Category badge */}
            <div className="px-6 pt-6">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md capitalize mb-3">
                {article.category || "general"}
              </span>
              
              {/* Article title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-green-700 transition">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {article.title}
                </a>
              </h3>
              
              {/* Publication date */}
              {article.publishDate && (
                <p className="text-sm text-gray-500 mb-3">
                  {getRelativeTime(article.publishDate)}
                </p>
              )}
              
              {/* Article snippet */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.contentSnippet || article.description}
              </p>
            </div>
            
            {/* Footer */}
            <div className="px-6 pb-6 pt-2 flex justify-between items-center border-t border-gray-100 mt-2">
              {/* Source */}
              {article.source && (
                <span className="text-xs text-gray-500">
                  via {article.source}
                </span>
              )}
              
              {/* Read more link */}
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 text-sm font-semibold hover:underline flex items-center"
              >
                Read Full Article
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Load more button */}
      {filteredNews.length > 9 && (
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md transition duration-300">
            Load More News
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;