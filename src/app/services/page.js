"use client";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    title: "Tea Brokering",
    description:
      "As a national crop and a steady foreign exchange earner, Sri Lanka is synonymous with tea. We bring great value by setting high standards.",
    longDescription: 
      "Our tea brokering services create a seamless connection between growers and buyers. We leverage decades of market experience to maximize value for producers while ensuring buyers access the finest Ceylon tea varieties. Our expert team evaluates each batch, providing detailed quality assessments that have earned us the trust of the global tea community.",
    icon: "/services/tea-brokering.png",
    background: "/images/auction.jpg",
    benefits: [
      "Access to premium global buyers",
      "Transparent auction process",
      "Expert quality grading",
      "Competitive pricing strategies"
    ]
  },
  {
    title: "Training on Tea Tasting",
    description:
      "Our training programs help individuals master the skill of identifying tea quality and flavors for the finest blends.",
    longDescription:
      "Our specialized tea tasting training programs are designed for industry professionals seeking to refine their palate. Led by master tasters with decades of experience, our courses cover flavor profiles, regional characteristics, quality assessment, and market valuation techniques. Participants gain hands-on experience with hundreds of tea varieties in our state-of-the-art tasting facilities.",
    icon: "/services/tea-tasting.png",
    background: "/images/tea-tasting.jpg",
    benefits: [
      "Professional certification",
      "Small-group instruction",
      "Exposure to rare tea varieties",
      "Industry networking opportunities"
    ]
  },
  {
    title: "Warehousing",
    description:
      "We provide secure storage facilities close to auction locations, ensuring your crop is stored safely and efficiently.",
    longDescription:
      "Our climate-controlled warehousing facilities are strategically located near major auction centers to minimize transport costs and preserve tea quality. With advanced security systems and specialized storage protocols, we ensure optimal conditions for maintaining the freshness and aromatic qualities of your tea. Our inventory management system provides real-time tracking and detailed reporting.",
    icon: "/services/warehousing.png",
    background: "/images/warehouse.jpg",
    benefits: [
      "Climate-controlled environments",
      "24/7 security monitoring",
      "Digital inventory tracking",
      "Flexible storage options"
    ]
  },
  {
    title: "Tea Manufacturing",
    description:
      "With over three decades of experience, we guide clients through the best tea manufacturing investment strategies.",
    longDescription:
      "Our manufacturing consultancy provides comprehensive guidance on equipment selection, process optimization, quality control systems, and sustainable production practices. We've helped establish over 25 successful processing facilities across Sri Lanka's tea-growing regions. Our team of engineers and production specialists conducts detailed feasibility studies and provides ongoing operational support.",
    icon: "/services/tea-manufacturing.png",
    background: "/images/tea-factory.jpg",
    benefits: [
      "Equipment modernization planning",
      "Processing efficiency analysis",
      "Quality control implementation",
      "Staff training programs"
    ]
  },
  {
    title: "Financial Support",
    description:
      "We assist tea businesses in securing working capital through tailored financial solutions and growth strategies.",
    longDescription:
      "Our financial services team specializes in the unique needs of tea industry businesses. We facilitate access to specialized agricultural credit lines, seasonal financing options, and long-term capital for expansion projects. Our financial analysts work closely with plantation owners, processors, and exporters to develop customized funding solutions that align with harvest cycles and market conditions.",
    icon: "/services/financial-support.png",
    background: "/images/finance.jpg",
    benefits: [
      "Harvest advance financing",
      "Equipment leasing arrangements",
      "Export credit facilities",
      "Merger & acquisition support"
    ]
  },
];

export default function ServicesPage() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const [activeService, setActiveService] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/tea-plantation.jpg"
            alt="Tea Plantation"
            fill
            priority
            className="object-cover brightness-75"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-white text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg mb-6"
              variants={itemVariants}
            >
              Our Services
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-green-500 mx-auto mb-8"
              variants={itemVariants}
            ></motion.div>
            <motion.p
              className="text-white text-lg md:text-xl mt-4 max-w-2xl text-center mx-auto"
              variants={itemVariants}
            >
              Empowering the tea industry with innovative solutions and expertise
              for over four decades.
            </motion.p>
            <motion.a
              href="#services"
              className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
            </motion.a>
          </motion.div>
        </div>
        
        {/* Animated Down Arrow */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Comprehensive Tea Industry Solutions</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Mercantile Produce Brokers, we offer a comprehensive range of services designed to support every aspect of the tea industry value chain - from cultivation to market.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our integrated approach ensures that each service complements the others, providing a seamless experience for our clients. Whether you are a small tea garden owner or a large-scale exporter, our tailored solutions address your specific needs with precision and expertise.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative h-80 md:h-96"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="rounded-lg overflow-hidden shadow-2xl h-full">
                <Image 
                  src="/images/tea-service-overview.jpg" 
                  alt="Tea Services Overview" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="italic font-medium max-w-xs">
                  Our mission is to elevate Ceylon Teas global standing through excellence in every service we provide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid with Modal Detail View */}
      <section id="services" className="py-20 px-6 md:px-20 bg-gray-50" ref={ref}>
        <div className="container mx-auto mb-16 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Specialized Services
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Click on any service to learn more about how we can support your tea business.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-lg rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              onClick={() => setActiveService(service)}
            >
              <div className="h-48 relative">
                <Image
                  src={service.background}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>

              <div className="relative px-6 py-8">
                <div className="absolute -top-12 left-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-green-50 transition-all">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={50}
                    height={50}
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3 group-hover:text-green-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex items-center text-green-600 font-medium">
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <motion.div 
          className="container mx-auto bg-gradient-to-r from-green-700 to-green-900 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Tea Business?</h2>
              <p className="text-green-100 mb-8 leading-relaxed">
                Book a consultation with our experts to discover how our services can help you achieve your business goals in the competitive tea industry.
              </p>
              <motion.a
                href="https://forms.gle/hf2WwPXjgz3VbfQB9"
                className="inline-block bg-white text-green-800 hover:bg-green-100 font-medium py-3 px-8 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Consultation
              </motion.a>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/images/tea-consultation.jpg"
                alt="Tea Consultation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveService(null)}
          >
            <motion.div
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden relative"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full z-10 hover:bg-white transition-colors"
                onClick={() => setActiveService(null)}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="h-64 relative">
                <Image
                  src={activeService.background}
                  alt={activeService.title}
                  fill
                  className="object-cover brightness-75"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 flex items-center">
                  <div className="bg-white rounded-full p-4 mr-4">
                    <Image
                      src={activeService.icon}
                      alt={activeService.title}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{activeService.title}</h3>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  {activeService.longDescription}
                </p>
                
                <h4 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {activeService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-center mt-8">
                  <a
                    href="/contact"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center"
                  >
                    <span>Inquire about this service</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}