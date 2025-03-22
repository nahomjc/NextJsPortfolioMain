import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes } from 'react-icons/fa';
import myCourse from '../public/assets/my-course.png';

const VideoModal = ({ isOpen, onClose }) => {
    const videoUrl = '/assets/my-course-video.mp4';
    
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <FaTimes className="text-white text-xl" />
            </button>
            
            <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CoursePromo = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  return (
    <div className='w-full bg-gradient-to-r from-[#5651e5]/10 to-[#709dff]/10 py-16'>
      <div className='max-w-[1240px] mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div className='relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-xl shadow-xl group cursor-pointer'
               onClick={() => setIsVideoModalOpen(true)}>
            <Image
              src={myCourse}
              alt='Muyalogy Course'
              layout='fill'
              objectFit='contain'
                className='group-hover:scale-105 transition-transform duration-300'
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative"
    style={{
      animation: 'glow 2s ease-in-out infinite',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
    }}
  >
    
    <div className="absolute inset-0 rounded-full bg-[#5651e5]/30"></div>
    <FaPlay className="text-white text-2xl ml-1 relative z-10 drop-shadow-lg" />
  </motion.div>
</div>
          </div>
          
          <div className='flex flex-col space-y-4'>
            <h2 className='text-3xl font-bold'>Learn Web Development with Me on Muyalogy</h2>
            <p className='text-xl text-gray-600 dark:text-gray-400'>
              Take your development skills to the next level with my comprehensive course.
            </p>
            
            <div className='space-y-3'>
              <div className='flex items-center space-x-2'>
                <svg className='w-6 h-6 text-[#5651e5]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <p>Learn modern web development techniques</p>
              </div>
              <div className='flex items-center space-x-2'>
                <svg className='w-6 h-6 text-[#5651e5]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <p>Hands-on projects and real-world applications</p>
              </div>
              <div className='flex items-center space-x-2'>
                <svg className='w-6 h-6 text-[#5651e5]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <p>24/7 support and community access</p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link href="https://www.muyalogy.com/course/1bcd4432-4f5e-4984-8572-c90648d637bb" className='w-fit'>
                <button className='px-8 py-3 text-white bg-[#5651e5] rounded-xl hover:bg-[#4640b3] transition-colors duration-300'>
                  Enroll Now
                </button>
              </Link>
              <Link href="https://www.muyalogy.com/instructor/261acd41-cf81-465a-9c4f-5fad10d5e7fe" className='w-fit'>
                <button className='px-8 py-3 text-white bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-100 transition-colors duration-300'>
                  Check out My Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        
      />
    </div>
  );
};

export default CoursePromo;