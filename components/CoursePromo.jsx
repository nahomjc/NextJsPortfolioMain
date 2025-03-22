import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import myCourse from '../public/assets/my-course.png';

const CoursePromo = () => {
  return (
    <div className='w-full bg-gradient-to-r from-[#5651e5]/10 to-[#709dff]/10 py-16'>
      <div className='max-w-[1240px] mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div className='relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-xl shadow-xl'>
            <Image
              src={myCourse}
              alt='Muyalogy Course'
              layout='fill'
              objectFit='contain'
              className='hover:scale-105 transition-transform duration-300'
            />
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
    </div>
  )
};

export default CoursePromo;