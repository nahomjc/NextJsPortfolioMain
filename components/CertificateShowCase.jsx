import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaMedal, FaDownload, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const certificates = [
  {
    id: 1,
    title: "Meta Advanced React Certification",
    issuer: "Meta (Facebook)",
    date: "2022",
    image: "/assets/certificate2.jpg",
    skills: ["React.js", "Advanced Patterns", "Performance Optimization"],
    verificationLink: "your-verification-link",
    description: "Advanced certification in React.js development from Meta, covering modern React patterns and best practices.",
    category: "Frontend Development",
    downloadLink: "/assets/certificates/meta-react.pdf"
  },
  {
    id: 2,
    title: "UN Data Science Certificate",
    issuer: "United Nations",
    date: "2020",
    image: "/assets/certificate3.jpg",
    skills: ["Data Analysis", "Machine Learning", "Statistics"],
    verificationLink: "your-verification-link",
    description: "Comprehensive data science certification from the United Nations, focusing on data analysis and machine learning.",
    category: "Data Science",
    downloadLink: "/assets/certificates/un-data.pdf"
  },
  {
    id: 3,
    title: "BSc in Computer Science - Very Great Distinction",
    issuer: "Admas University",
    date: "2023",
    image: "/assets/certificate1.jpg", // Make sure to add your certificate image
    skills: ["Computer Science", "Software Engineering", "Programming", "Data Structures", "Algorithms"],
    verificationLink: "your-verification-link",
    description: "Graduated with Very Great Distinction, achieving a 3.9 GPA in Computer Science. The program covered comprehensive computer science fundamentals, software engineering principles, and advanced programming concepts.",
    category: "Education",
    downloadLink: "/assets/certificate4.jpg"
  },
];

const categories = [...new Set(certificates.map(cert => cert.category))];

const CertificateCard = ({ certificate, onClick }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300"
    onClick={onClick}
  >
    <div className="relative h-48 w-full group">
      <Image
        src={certificate.image}
        alt={certificate.title}
        layout="fill"
        objectFit="contain"
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-semibold">{certificate.title}</h3>
        <p className="text-sm opacity-90">{certificate.issuer}</p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-[#5651e5]/20 flex items-center justify-center"
      >
        <span className="bg-white px-4 py-2 rounded-full text-[#5651e5] font-medium">
          View Details
        </span>
      </motion.div>
    </div>
  </motion.div>
);

const CarouselView = ({ certificates, onSelect }) => (
  <Swiper
    effect="coverflow"
    grabCursor={true}
    centeredSlides={true}
    slidesPerView="auto"
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    pagination={{ clickable: true }}
    navigation={true}
    modules={[EffectCoverflow, Pagination, Navigation]}
    className="w-full py-12"
  >
    {certificates.map((cert) => (
      <SwiperSlide key={cert.id} className="w-[300px]">
        <CertificateCard certificate={cert} onClick={() => onSelect(cert)} />
      </SwiperSlide>
    ))}
  </Swiper>
);

const CertificateModal = ({ certificate, onClose }) => {
  const downloadCertificate = async () => {
    try {
      const response = await fetch(certificate.downloadLink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${certificate.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden mt-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-44 w-full">
          <Image
            src={certificate.image}
            alt={certificate.title}
            layout="fill"
            objectFit="cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold dark:text-white">{certificate.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={downloadCertificate}
                className="bg-[#5651e5] text-white p-2 rounded-full hover:bg-[#4640b3] transition-colors"
                title="Download Certificate"
              >
                <FaDownload size={20} />
              </button>
              <FaMedal className="text-[#5651e5] text-2xl" />
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-gray-600 dark:text-gray-300">{certificate.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-semibold mb-2 dark:text-white">Skills Covered:</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-[#5651e5]/10 text-[#5651e5] rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-gray-600 dark:text-gray-400">
                Issued: {certificate.date}
              </p>
              <a
                href={certificate.verificationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#5651e5] hover:underline"
              >
                Verify Certificate
                <FaExternalLinkAlt size={14} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CertificateShowcase = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Certifications & Achievements</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Professional certifications and achievements that demonstrate my commitment to continuous learning and expertise.
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <div className="flex gap-2">
              
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCertificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onClick={() => setSelectedCertificate(cert)}
              />
            ))}
          </motion.div>
        ) : (
          <CarouselView 
            certificates={filteredCertificates} 
            onSelect={setSelectedCertificate} 
          />
        )}

        <AnimatePresence>
          {selectedCertificate && (
            <CertificateModal
              certificate={selectedCertificate}
              onClose={() => setSelectedCertificate(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CertificateShowcase;