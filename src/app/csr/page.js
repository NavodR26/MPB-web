"use client";
import { motion } from "framer-motion";
import { FaHandsHelping, FaLeaf, FaRegClock } from "react-icons/fa";

export default function CSRPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl p-10 max-w-4xl text-center border border-white/30"
      >
        <h1 className="text-4xl font-extrabold text-green-800 drop-shadow-lg">Our Commitment to CSR</h1>
        <p className="text-gray-700 mt-4 text-lg">
          At <span className="font-semibold">Mercantile Produce Brokers</span>, we are dedicated to sustainable tea trading, ethical sourcing, and community well-being.
        </p>

        <div className="border-t border-green-300 my-6"></div>

        <motion.h2
          className="text-2xl font-semibold text-gray-900 flex justify-center items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <FaHandsHelping className="text-green-600" /> Upcoming CSR Initiatives
        </motion.h2>
        
        <ul className="text-gray-600 mt-4 space-y-4">
          <motion.li className="flex items-center gap-2 hover:text-green-700 transition">
            <FaLeaf className="text-green-500" /> Promoting sustainable tea farming
          </motion.li>
          <motion.li className="flex items-center gap-2 hover:text-green-700 transition">
            <FaHandsHelping className="text-green-500" /> Community development programs
          </motion.li>
          <motion.li className="flex items-center gap-2 hover:text-green-700 transition">
            <FaRegClock className="text-green-500" /> More updates coming soon...
          </motion.li>
        </ul>

        <p className="text-gray-500 mt-6 italic">Stay tuned for impactful CSR projects.</p>
      </motion.div>
    </div>
  );
}
