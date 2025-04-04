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
    role: "Chairman / Managing Director", 
    bio: "Chairman of Mercantile Produce Brokers (Pvt) Limited, Mr. Dodanwela brings over three decades of tea industry expertise. An alumnus of Trinity College, Kandy, he began his career in 1991 as a trainee tea taster at Bartleet & Company. His exceptional skills in tea tasting, auctioneering, and brokering propelled his rapid rise in the industry. Mr. Dodanwela has served as Chairman of the Colombo Tea Brokers Association (2017/2018 & 2020/2021) and contributes to the Executive Committee of the Colombo Tea Traders Association. A former first-class cricketer, he remains actively involved in Sri Lanka Cricket's administration, serving as Chairman of the Tournament Committee and Director of the Lanka Premier League.", 
    image: "/management/samantha.jpg" 
  },
  { 
    name: "Mr. Ramesh Rayappan", 
    role: "Director / CEO", 
    bio: "With 30 years of tea industry leadership, Mr. Rayappan combines operational excellence with strategic vision. His qualifications include an MBA from Cardiff Metropolitan University (UK), Post Graduate Diploma in Marketing from CIM UK, and Certified Professional Marketer (Asia) from SLIM. A Fellow Member of the Association of Business Executives (UK) and awarded FCIM status from CIM UK, he has successfully integrated marketing excellence with tea industry expertise. His career encompasses senior executive roles where he has demonstrated exceptional leadership in administration, marketing, and business management.", 
    image: "/management/ramesh.jpg" 
  },
  { 
    name: "Mr. Ishan Goonetileke", 
    role: "Director Tea", 
    bio: "A tea industry veteran since 1989, Mr. Goonetileke has demonstrated consistent excellence throughout his career. He served as Interim Convener of the Tea Sub-Committee of the Colombo Brokers' Association (2015/2016) and brings over three decades of specialized knowledge in tea valuation and auctioneering. Holding a Diploma in Marketing from SLIM, he combines technical tea expertise with strong commercial acumen. His comprehensive understanding of all tea-growing regions makes him a valued leader in our operations.", 
    image: "/management/ishan.jpg" 
  },
  { 
    name: "Mr. Vishana Madawela", 
    role: "Director Tea", 
    bio: "Specializing in Low Grown teas, Mr. Madawela offers 25 years of expertise in tea tasting, auctioning, and marketing. His deep understanding of regional tea characteristics and market dynamics has significantly contributed to our company's success. Mr. Madawela's career reflects consistent dedication to quality evaluation and market development, making him an invaluable asset in maintaining our standards of excellence in tea brokering.", 
    image: "/management/vishana.jpg" 
  },
  { 
    name: "Mr. Chaminda Senaviratne", 
    role: "Director Finance", 
    bio: "A Fellow Member of the Institute of Chartered Accountants of Sri Lanka, Mr. Senaviratne brings 18 years of financial leadership across multiple industries. Graduating with Second Upper Honors in Business Administration from the University of Colombo, he oversees financial operations, corporate strategy, and business development. His analytical rigor and strategic vision have been instrumental in driving organizational growth while maintaining financial discipline. As a member of Professional Managers Sri Lanka, he combines financial expertise with strong managerial capabilities.", 
    image: "/management/chaminda.jpg" 
  },
  { 
    name: "Mr. Manjula Jayasinghe", 
    role: "Director Tea", 
    bio: "With over 20 years as a tea auctioneer, valuer, and taster, Mr. Jayasinghe holds a Master of Business Administration from Cardiff Metropolitan University (UK). His tenure as Tea Convener (2018-2019) demonstrated his leadership in the industry. His expertise spans all aspects of tea evaluation and market analysis, combining traditional knowledge with modern business practices. This dual competency enables him to effectively bridge operational excellence with strategic business objectives.", 
    image: "/management/manjula.jpg" 
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const stats = [
  { label: "Years of Experience", value: 40, icon: "📅", color: "bg-amber-100 text-amber-800" },
  { label: "Tea Auctions Conducted", value: 5000, icon: "🍵", color: "bg-green-100 text-green-800" },
  { label: "Success Clients", value: 1000, icon: "🤝", color: "bg-blue-100 text-blue-800" }
];

const values = [
  { title: "Integrity", icon: "⚖️", color: "bg-purple-100 text-purple-800" },
  { title: "Expertise", icon: "🔍", color: "bg-indigo-100 text-indigo-800" },
  { title: "Quality", icon: "✨", color: "bg-amber-100 text-amber-800" },
  { title: "Innovation", icon: "💡", color: "bg-teal-100 text-teal-800" },
  { title: "Relationships", icon: "🤝", color: "bg-rose-100 text-rose-800" },
  { title: "Sustainability", icon: "🌱", color: "bg-emerald-100 text-emerald-800" }
];

export default function About() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const [particleCount, setParticleCount] = useState(50);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const updateParticleCount = () => {
      setParticleCount(window.innerWidth < 768 ? 30 : 50);
    };
    
    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);
    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Animated Particle Background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fpsLimit: 60,
            particles: {
              number: { value: particleCount },
              color: { value: ["#2E7D32", "#4CAF50", "#8BC34A"] },
              move: { 
                direction: "none",
                enable: true,
                speed: 0.5,
                outModes: "bounce"
              },
              opacity: { 
                value: 0.3,
                animation: { 
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1 
                }
              },
              size: { 
                value: { min: 1, max: 5 },
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 0.1
                }
              },
              shape: { type: "circle" }
            },
            detectRetina: true
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gray-900 text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/about/company-bg.jpg)" }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        <div className="relative container mx-auto px-6 md:px-12">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={slideUp}
            >
              About <span className="text-amber-300">Mercantile</span> Produce Brokers
            </motion.h1>
            
            <motion.div 
              className="w-24 h-1 bg-amber-400 mx-auto mb-8"
              variants={fadeIn}
            />
            
            <motion.p 
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto"
              variants={slideUp}
            >
              Operating since 1983, Mercantile Produce Brokers Private Limited has established itself as a premier tea broker in Sri Lanka, connecting producers of fine Ceylon Tea to discerning buyers worldwide through our expertise, integrity, and commitment to quality.
            </motion.p>
            
            <motion.div variants={slideUp}>
              <a
                href="#management"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Meet Our Leadership
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              variants={slideLeft}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our <span className="text-green-600">Legacy</span> in Ceylon Tea
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  For over four decades, we have upheld excellence in Ceylon Tea. Our journey began in the lush highlands of Sri Lanka, where we recognized the exceptional quality of locally grown tea.
                </p>
                <p>
                  As custodians of Sri Lanka tea heritage, we combine traditional expertise with modern auction methods to create transparent, efficient markets for producers and buyers.
                </p>
                <p className="font-medium text-green-700">
                  Our commitment to quality and authenticity has made us trusted partners in the international tea trade.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl relative h-96">
                <Image 
                  src="/about/tea-plantation.jpg" 
                  alt="Ceylon Tea Plantation" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="font-medium italic">
                  Honoring tradition while embracing innovation in the global marketplace.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Impact in <span className="text-green-600">Numbers
              </span>
            </h2>
           
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className={`p-8 rounded-2xl shadow-md ${stat.color} flex flex-col items-center`}
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-5xl font-bold mb-2">
                  <CountUp 
                    end={stat.value} 
                    duration={2.5} 
                    separator="," 
                    enableScrollSpy 
                  />
                  <span className="text-4xl">+</span>
                </div>
                <p className="text-lg font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section id="management" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-green-600">Leadership</span> Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With over a century of combined experience in the tea industry
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {management.map((member, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8 }}
              >
                <div className="h-80 relative overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-amber-300 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6 bg-white">
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
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to experience the finest Ceylon Tea?
              </h2>
              <p className="text-green-100">
                Connect with our team to learn more about our services
              </p>
            </div>
            <motion.a
              href="/contact"
              className="bg-amber-400 hover:bg-amber-500 text-green-900 font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Team
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}