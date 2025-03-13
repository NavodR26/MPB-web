"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import CountUp from "react-countup";
import { useInView } from "framer-motion";

const management = [
  { 
    name: "Mr. Samantha Dodanwela", 
    role: "Managing Director", 
    bio: "Over 25 years of experience in Tea Brokering. Serves in the Executive Committee of the Colombo Tea Traders' Association.", 
    image: "/management/samantha.jpg" 
  },
  { 
    name: "Mr. Ramesh Rayappan", 
    role: "Director / CEO", 
    bio: "Over 25 years of experience in Tea Tasting and Auctioning. Holds an MBA from Cardiff Metropolitan University.", 
    image: "/management/ramesh.jpg" 
  },
  { 
    name: "Mr. Ishan Goonetileke", 
    role: "Director Tea", 
    bio: "Over 30 years of experience in the tea industry. Served as Interim Convener of the Tea Sub-Committee.", 
    image: "/management/ishan.jpg" 
  },
  { 
    name: "Mr. Vishana Madawela", 
    role: "Director Tea", 
    bio: "Specializes in Low Grown teas with over 17 years of experience in Tea Tasting and Auctioning.", 
    image: "/management/vishana.jpg" 
  },
  { 
    name: "Mr. Chaminda Senaviratne", 
    role: "Director Finance", 
    bio: "Associate member of the Institute of Chartered Accountants of Sri Lanka. Over 10 years of financial expertise.", 
    image: "/management/chaminda.jpg" 
  },
  { 
    name: "Mr. Manjula Jayasinghe", 
    role: "Director Tea", 
    bio: "Over 20 years of experience in Tea Auctioning and Tasting. Holds an MBA from Cardiff Metropolitan University.", 
    image: "/management/manjula.jpg" 
  },
];

// Animation variants for reuse
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const stats = [
  { label: "Years of Experience", value: 40, icon: "📅" },
  { label: "Tea Auctions Conducted", value: 5000, icon: "🍵" },
  { label: "Success Clients", value: 1000, icon: "🤝" }
];

export default function About() {
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  const particlesInit = async (engine) => {
    await loadFull(engine);
    setParticlesLoaded(true);
  };

  // Optimize particle count based on screen size
  const [particleCount, setParticleCount] = useState(50);
  
  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 30 : 50);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 overflow-hidden">
      {/* Particle Background with conditional rendering for performance */}
      <div className="fixed inset-0 -z-10 opacity-50">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "#f9f9f9" },
            fpsLimit: 60,
            particles: {
              number: { value: particleCount },
              color: { value: "#2E7D32" },
              move: { 
                direction: "bottom", 
                enable: true, 
                speed: 0.8,
                outModes: "out"
              },
              shape: { type: "circle" },
              opacity: { value: 0.2, animation: { enable: true, speed: 0.3, minimumValue: 0.1 } },
              size: { value: { min: 2, max: 5 } },
            },
            detectRetina: true,
            responsive: [
              {
                maxWidth: 768,
                options: {
                  particles: {
                    number: { value: 30 }
                  }
                }
              }
            ]
          }}
        />
      </div>
      
      {/* Hero Section with Parallax */}
      <section className="relative py-24 md:py-32 bg-gray-900 text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/about/company-bg.jpg)" }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="relative container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
                variants={fadeInUp}
                transition={{ duration: 0.8 }}
              >
                About Mercantile Produce Brokers
              </motion.h1>
              <motion.div 
                className="w-24 h-1 bg-green-500 mx-auto mb-8"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.1 }}
              ></motion.div>
              <motion.p 
                className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Operating since 1983, Mercantile Produce Brokers Private Limited has established itself as a premier tea broker in Sri Lanka, connecting producers of fine Ceylon Tea to discerning buyers worldwide through our expertise, integrity, and commitment to quality.
              </motion.p>
              <motion.a
                href="#management"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              >
                Meet Our Team
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* History & Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Legacy in Ceylon Tea</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                For over four decades, we have upheld the tradition of excellence in Ceylon Tea. Our journey began in the lush highlands of Sri Lanka, where we recognized the exceptional quality of locally grown tea and dedicated ourselves to representing it on the global stage.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As custodians of Sri Lanka s tea heritage, we combine traditional expertise with modern auction methods to create transparent, efficient markets for producers and buyers alike. Our commitment to quality and authenticity has made us trusted partners in the international tea trade.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl relative h-96">
                <Image 
                  src="/about/tea-plantation.jpg" 
                  alt="Ceylon Tea Plantation" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="italic font-medium">
                  Our commitment is to honor the legacy of Ceylon Tea while embracing innovation in the global marketplace.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Statistics Counter */}
      <section ref={statsRef} className="py-24 bg-gray-50 text-center relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-green-50 opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <div className="text-5xl mb-4 text-green-600">{stat.icon}</div>
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  <CountUp end={stat.value} duration={2.5} separator="," enableScrollSpy />
                  <span className="text-green-600">+</span>
                </div>
                <p className="text-lg text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Management Section */}
      <section id="management" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With over a century of combined experience in the tea industry, our management team brings unparalleled expertise and passion to every aspect of our business.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {management.map((member, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="h-64 relative">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    className="object-cover transition-all duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-4 flex items-center">
                    <span className="w-6 h-0.5 bg-green-600 mr-2"></span>
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/about/values-bg.jpg)" }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These principles guide every aspect of our business operations and relationships.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Integrity", icon: "⚖️", description: "We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty in every transaction." },
              { title: "Expertise", icon: "🔍", description: "Our deep knowledge of tea varieties, cultivation practices, and market dynamics allows us to provide exceptional value to our clients." },
              { title: "Quality", icon: "✨", description: "We are committed to representing only the finest Ceylon Tea, maintaining rigorous quality standards throughout our operations." },
              { title: "Innovation", icon: "💡", description: "While honoring tradition, we embrace modern technologies and approaches to improve efficiency and market access." },
              { title: "Relationships", icon: "🤝", description: "We build lasting partnerships based on mutual respect, reliability, and shared success with producers and buyers alike." },
              { title: "Sustainability", icon: "🌱", description: "We promote environmentally responsible practices that ensure the longevity of Sri Lanka's tea industry for generations to come." }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="bg-green-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to experience the finest Ceylon Tea?</h2>
              <p className="text-gray-600">Connect with our team to learn more about our services and how we can help you access premium tea products.</p>
            </div>
            <motion.a
              href="/contactus"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}