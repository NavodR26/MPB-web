// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { useState } from "react";

// export default function LinksPage() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   const links = [
//     {
//       name: "E-Dos Portal",
//       url: "https://apps.merctea.lk/bsp/",
//       description: "Electronic Delivery Order Request Portal",
//       color: "from-blue-500 to-cyan-400",
//     },
//     {
//       name: "Tea Auction Login",
//       url: "https://smartauctionlkacta.b2clogin.com/smartauctionlkacta.onmicrosoft.com/b2c_1_si_auctionplatform_v3/oauth2/v2.0/authorize?client_id=d03bbd7a-aaef-4d20-b3a7-1b52aecddba7&redirect_uri=https%3A%2F%2Fsmartauction.okloapps.com%2Fsignin-oidc&response_type=id_token&scope=openid%20profile&response_mode=form_post&nonce=638755554160810907.ZWI1MzhjNjctNWQxYi00NTMxLTkzMGMtMzlhZjM4NDJlYzI1MDJmZWE2MjEtMWMwNi00NmY5LThjYzItNjMwZGMzMjUwZDhj&state=CfDJ8DTMF2RjINhKkTIf6lMuoL21cJHfY4bnaWpowNBchQaYuQv6vezGLOckfWEZlvV58N0r8xMYM3qmG-U3DUp7KtMLfzSi9ftusAOOUL8Cz37gyqNB9FJwMBFmclMnpZmNoD3_tVNuKU8-Kr9eI-C06cNyra3t5GCKnM33fGfvPw0oh49VDiOghiPg14FslOQ2n2gosKHNOZ-D_c8aLNfely4XHezYm_5AHB27nGsLHXc_HHgo4mlzsp_tqEw7NSsuirI5BbZ07nTwwrWo2WQhfGMIT229pHMoLeKqxtLLgBpfNAanp5DnvIaxw3z6MTU56Q&x-client-SKU=ID_NET6_0&x-client-ver=6.35.0.0",
//       description: "Live Tea Auction",
//       color: "from-green-500 to-emerald-400",
//     },
//     {
//       name: "Tea Board Sri Lanka",
//       url: "https://www.srilankateaboard.lk/",
//       description: "Sri Lanka Tea Board Official Website",
//       color: "from-amber-500 to-yellow-400",
//     },
//   ];

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1 },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center max-w-3xl mx-auto mb-12"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//           Quick Access Links
//         </h1>
//         <p className="text-lg text-gray-600">
//           Explore essential resources and portals for seamless tea industry operations.
//         </p>
//       </motion.div>

//       {/* Links Grid */}
//       <motion.div
//         variants={container}
//         initial="hidden"
//         animate="show"
//         className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//       >
//         {links.map((link, index) => (
//           <motion.div
//             key={index}
//             variants={item}
//             whileHover={{ scale: 1.03 }}
//             onHoverStart={() => setHoveredIndex(index)}
//             onHoverEnd={() => setHoveredIndex(null)}
//             className="relative h-full"
//           >
//             <Link 
//               href={link.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block h-full"
//             >
//               <div className={`h-full rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl`}>
//                 <div className={`h-2 bg-gradient-to-r ${link.color}`} />
//                 <div className="p-6 flex flex-col h-full">
//                   <div className="flex items-start justify-between mb-2">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {link.name}
//                     </h2>
//                     <motion.div
//                       animate={{ 
//                         rotate: hoveredIndex === index ? 45 : 0,
//                         scale: hoveredIndex === index ? 1.2 : 1,
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <FaExternalLinkAlt className="text-gray-400 mt-1" />
//                     </motion.div>
//                   </div>
//                   <p className="text-gray-600 flex-grow">{link.description}</p>
                  
//                   <motion.div 
//                     className="mt-4 text-sm font-medium text-right"
//                     initial={{ opacity: 0 }}
//                     animate={{ 
//                       opacity: hoveredIndex === index ? 1 : 0,
//                     }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <span className={`text-${link.color.split('-')[1]}-500`}>Visit now →</span>
//                   </motion.div>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Footer Message */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8, duration: 0.5 }}
//         className="text-center mt-12 text-gray-500"
//       >
//         <p>More useful links will be added soon! Stay tuned.</p>
//       </motion.div>

//       {/* Newsletter Signup */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1, duration: 0.5 }}
//         className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow-md p-6 border border-gray-100"
//       >
//         <h3 className="text-lg font-medium text-gray-800 mb-3">Stay Updated</h3>
//         <p className="text-gray-600 mb-4">Get notified when new industry resources are available.</p>
//         <div className="flex">
//           <input 
//             type="email" 
//             placeholder="Your email address" 
//             className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 rounded-l-lg focus:outline-none"
//           />
//           <button className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity">
//             Subscribe
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt, FaChartLine } from "react-icons/fa";
import { useState } from "react";

export default function LinksPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showFullDashboard, setShowFullDashboard] = useState(false);

  const links = [
    {
      name: "E-Dos Portal",
      url: "https://apps.merctea.lk/bsp/",
      description: "Electronic Delivery Order Request Portal",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Tea Auction Login",
      url: "https://smartauctionlkacta.b2clogin.com/smartauctionlkacta.onmicrosoft.com/b2c_1_si_auctionplatform_v3/oauth2/v2.0/authorize?client_id=d03bbd7a-aaef-4d20-b3a7-1b52aecddba7&redirect_uri=https%3A%2F%2Fsmartauction.okloapps.com%2Fsignin-oidc&response_type=id_token&scope=openid%20profile&response_mode=form_post&nonce=638755554160810907.ZWI1MzhjNjctNWQxYi00NTMxLTkzMGMtMzlhZjM4NDJlYzI1MDJmZWE2MjEtMWMwNi00NmY5LThjYzItNjMwZGMzMjUwZDhj&state=CfDJ8DTMF2RjINhKkTIf6lMuoL21cJHfY4bnaWpowNBchQaYuQv6vezGLOckfWEZlvV58N0r8xMYM3qmG-U3DUp7KtMLfzSi9ftusAOOUL8Cz37gyqNB9FJwMBFmclMnpZmNoD3_tVNuKU8-Kr9eI-C06cNyra3t5GCKnM33fGfvPw0oh49VDiOghiPg14FslOQ2n2gosKHNOZ-D_c8aLNfely4XHezYm_5AHB27nGsLHXc_HHgo4mlzsp_tqEw7NSsuirI5BbZ07nTwwrWo2WQhfGMIT229pHMoLeKqxtLLgBpfNAanp5DnvIaxw3z6MTU56Q&x-client-SKU=ID_NET6_0&x-client-ver=6.35.0.0",
      description: "Live Tea Auction",
      color: "from-green-500 to-emerald-400",
    },
    {
      name: "Tea Board Sri Lanka",
      url: "https://www.srilankateaboard.lk/",
      description: "Sri Lanka Tea Board Official Website",
      color: "from-amber-500 to-yellow-400",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Auction Performance Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Data Source : Weekly Public Sale Bid History Data
        </p>
      </motion.div>

      {/* Dashboard Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="border-b border-gray-100 p-4 flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center">
              <FaChartLine className="text-green-500 mr-3 text-xl" />
              <h2 className="text-xl font-semibold text-gray-800">Mercantile Produce Brokers Pvt Ltd - (MPB)</h2>
            </div>
            <button 
              onClick={() => setShowFullDashboard(!showFullDashboard)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center"
            >
              {showFullDashboard ? "Compact View" : "Full Screen"}
            </button>
          </div>
          <div className={`w-full ${showFullDashboard ? 'h-screen' : 'h-96 md:h-[450px]'} transition-all duration-500`}>
            <iframe 
              src="https://lookerstudio.google.com/embed/reporting/7d03915b-bc05-4a8f-9a69-f462ee934ef1/page/7YW9E" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              className="transition-all duration-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Links Section Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center max-w-3xl mx-auto my-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Quick Access Links
        </h2>
        <p className="text-gray-600">
          Essential portals and resources for tea industry operations
        </p>
      </motion.div>

      {/* Links Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {links.map((link, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative h-full"
          >
            <Link 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className={`h-full rounded-lg shadow-md overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl`}>
                <div className={`h-2 bg-gradient-to-r ${link.color}`} />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {link.name}
                    </h2>
                    <motion.div
                      animate={{ 
                        rotate: hoveredIndex === index ? 45 : 0,
                        scale: hoveredIndex === index ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaExternalLinkAlt className="text-gray-400 mt-1" />
                    </motion.div>
                  </div>
                  <p className="text-gray-600 flex-grow">{link.description}</p>
                  
                  <motion.div 
                    className="mt-4 text-sm font-medium text-right"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={`text-${link.color.split('-')[1]}-500`}>Visit now →</span>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-12 text-gray-500"
      >
        <p>More useful links and analytics will be added soon! Stay tuned.</p>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow-md p-6 border border-gray-100"
      >
        <h3 className="text-lg font-medium text-gray-800 mb-3">Stay Updated</h3>
        <p className="text-gray-600 mb-4">Get notified when new industry resources are available.</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 rounded-l-lg focus:outline-none"
          />
          <button className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
}