"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, loop: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/LOGO crest.png" // Replace with your logo path
          alt="Loading..."
          width={100}
          height={100}
          className="animate-spin-slow" // Add a custom spin animation
        />
      </motion.div>
    </div>
  );
}