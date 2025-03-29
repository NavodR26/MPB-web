"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaBriefcase, FaInfoCircle } from "react-icons/fa";

export default function CareersPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl p-10 max-w-3xl text-center border border-white/30"
      >
        <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow-lg">Join Our Team</h1>
        <p className="text-gray-700 mt-4 text-lg">
          At <span className="font-semibold">Mercantile Produce Brokers</span>, we seek innovative minds to grow with us.
        </p>

        <div className="border-t border-blue-300 my-6"></div>

        <motion.h2
          className="text-2xl font-semibold text-gray-900 flex justify-center items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <FaBriefcase className="text-blue-600" /> Current Job Openings
        </motion.h2>

        <p className="text-gray-500 mt-3">
          <FaInfoCircle className="inline text-blue-400 mr-2" />
          No open vacancies or internships at the moment.
        </p>

        <div className="border-t border-blue-300 my-6"></div>

        <h2 className="text-xl font-semibold text-gray-800">Interested in future roles?</h2>
        <p className="text-gray-500 mt-2">We welcome prospective applications.</p>
        
        <motion.a
          href="mailto:info@merctea.lk"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition duration-300 shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <FaEnvelope /> Send Your CV to info@merctea.lk
        </motion.a>

        <p className="text-gray-400 mt-4 text-sm italic">
          We’ll get in touch if a relevant position arises.
        </p>
      </motion.div>
    </div>
  );
}
