"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [activeLocation, setActiveLocation] = useState("headOffice");

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_j4lyaoa", // Service ID
        "template_v2ebkti", // Template ID
        formData,
        "vqAhw24uZD3kaoTYD" // Public Key
      );
      
      if (result.status === 200) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for contacting us! We'll get back to you soon."
        });
        setFormData({ 
          name: "", 
          email: "", 
          subject: "General Inquiry", 
          message: "",
          phone: ""
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 5000);
    }
  };

  // Define location data
  const locations = {
    headOffice: {
      title: "Head Office",
      address: "133 Jawatta Rd, Colombo 00500",
      phone: "0112 581 358",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757686!2d79.86443231539303!3d6.914444595003818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596b5c8b5b5f%3A0x8b5b5b5b5b5b5b5b!2s133%20Jawatta%20Rd%2C%20Colombo%2000500!5e0!3m2!1sen!2slk!4v1631234567890!5m2!1sen!2slk"
    },
    warehouse: {
      title: "Warehouse",
      address: "No. 220, Padiliyathuduwa Road, Enderamulla, Wattala",
      phone: "0112 981 418",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.35856532781!2d79.89483231539328!3d6.977803594951809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597b5b5b5b5f%3A0x8b5b5b5b5b5b5b5b!2sPadiliyathuduwa%20Rd%2C%20Wattala!5e0!3m2!1sen!2slk!4v1631234567890!5m2!1sen!2slk"
    },
    sampleRoom: {
      title: "Sample Room",
      address: "No. 220/A/3B, Diyabubulawatta, Enderamulla, Wattala",
      phone: "0112 943 497",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.35856532781!2d79.89483231539328!3d6.977803594951809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597b5b5b5b5f%3A0x8b5b5b5b5b5b5b5b!2sDiyabubulawatta%2C%20Wattala!5e0!3m2!1sen!2slk!4v1631234567890!5m2!1sen!2slk"
    }
  };

  // Business hours
  const businessHours = [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-900 py-24 md:py-32">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get in Touch with Us
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white opacity-90 mb-8"
            >
              We are here to help and answer any questions you might have. We look forward to hearing from you!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a 
                href="#contact-form" 
                className="inline-block bg-white text-green-700 font-medium rounded-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50 transform hover:-translate-y-1"
              >
                Contact Us Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-6">
                Feel free to get in touch with us through any of the following channels. Our dedicated team is ready to assist you.
              </p>
              
              <div className="flex items-center mb-4 text-gray-700">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@merctea.lk" className="hover:text-green-600 transition duration-300">info@merctea.lk</a>
              </div>
              
              <div className="flex items-center mb-4 text-gray-700">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+94112581358" className="hover:text-green-600 transition duration-300"> 011 258 1358</a>
              </div>
            </motion.div>

            {/* Location Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
                {Object.keys(locations).map((loc) => (
                  <button
                    key={loc}
                    className={`px-4 py-3 font-medium whitespace-nowrap ${
                      activeLocation === loc 
                        ? 'text-green-600 border-b-2 border-green-600' 
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                    onClick={() => setActiveLocation(loc)}
                  >
                    {locations[loc].title}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{locations[activeLocation].title}</h3>
                  <p className="text-gray-600 mb-2">{locations[activeLocation].address}</p>
                  <p className="text-gray-600 mb-4">Phone: {locations[activeLocation].phone}</p>
                  
                  <div className="h-64 md:h-72 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src={locations[activeLocation].mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title={`Map of ${locations[activeLocation].title}`}
                    ></iframe>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Business Hours
              </h3>
              <div className="space-y-2">
                {businessHours.map((item, index) => (
                  <div 
                    key={item.day} 
                    className={`flex justify-between ${
                      index !== businessHours.length - 1 ? 'border-b border-gray-100 pb-2' : ''
                    }`}
                  >
                    <span className={`font-medium ${item.hours === 'Closed' ? 'text-gray-500' : 'text-gray-700'}`}>
                      {item.day}
                    </span>
                    <span className={item.hours === 'Closed' ? 'text-gray-500' : 'text-gray-700'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-green-200 focus:border-green-400'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-green-200 focus:border-green-400'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.phone 
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-green-200 focus:border-green-400'
                      }`}
                      placeholder="+94 71 234 5678"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white transition-all"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Support">Technical Support</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Partnership">Partnership Opportunity</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.message 
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-green-200 focus:border-green-400'
                    }`}
                    rows="5"
                    placeholder="Please type your message here..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    id="privacy-policy"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-600">
                    I agree to the <a href="#" className="text-green-600 hover:underline">Privacy Policy</a> and consent to being contacted.
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transform transition duration-300 hover:shadow-lg flex justify-center items-center font-medium disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
                
                {submitStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success" 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    <div className="flex items-start">
                      {submitStatus.type === "success" ? (
                        <svg className="h-5 w-5 mr-3 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 mr-3 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <p>{submitStatus.message}</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and support.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                question: "What are your business hours?",
                answer: "Our head office is open Monday through Friday from 8:30 AM to 5:00 PM except on public holidays. The warehouse has similar operational hours."
              },
              {
                question: "How quickly can I expect a response?",
                answer: "We typically respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our office directly."
              },
              {
                question: "Can I visit your offices without an appointment?",
                answer: "While we welcome visitors, we recommend scheduling an appointment in advance to ensure that the relevant team members are available to assist you properly."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white mb-4 rounded-lg shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-gray-800">{faq.question}</span>
                    <svg 
                      className="w-5 h-5 text-green-500 group-open:rotate-180 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section with Enhanced Styling */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Connect With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow us on social media to stay updated with our latest news, products, and announcements.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Facebook",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                ),
                url: "https://www.facebook.com/mercantilebrokers/",
                color: "bg-blue-600 hover:bg-blue-700"
              },
              {
                name: "Instagram",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.2-4.354-2.618-6.782-6.98-6.98-1.281-.058-1.689-.072-4.948-.072z" />
                  </svg>
                ),
                url: "https://www.instagram.com/mercantilebrokers/",
                color: "bg-pink-600 hover:bg-pink-700"
              },
              {
                name: "LinkedIn",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
                url: "https://www.linkedin.com/company/merctea/",
                color: "bg-blue-500 hover:bg-blue-600"
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {social.icon}
                <span>{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}