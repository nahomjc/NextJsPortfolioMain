import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AboutImg from '../public/assets/new-image.png';
const About = () => {
  return (
    <div id='about' className='w-full md:h-screen p-2 flex itmes-center py-16 dark:bg-gray-900 dark:text-white'>
      <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
        <div className='col-span-2'>

            <p className='py-4 uppercase text-xl tracking-widest text-[#5651e5] dark:text-white'>About</p>
            <h2 className='py-4'>Who I Am</h2>
            <p className='py-2 text-gray-600 dark:text-white'>I am not your typical developer.</p>
            <p  className='py-2 text-gray-600 dark:text-white'>I specialize in building mobile-responsive front-end UI applications that seamlessly integrate with APIs and backend technologies. Passionate about learning and adopting new technologies, I believe there is always more than one way to solve a problem. While I am most proficient in React, Next.js, HTML, CSS, and JavaScript, I am a fast learner who can adapt to new tech stacks as needed. For me, being a great developer is not about using a single language but selecting the right tool for the job.


            </p>
            <p  className='py-2 text-gray-600 dark:text-white'>
            I began my journey in 2016, managing multiple e-commerce websites on CMS platforms. Over the years, I have worked directly with clients, taking mock wireframes all the way to fully deployed applications like Muyalogy and Afriwork
          
          
            </p>
            <Link href='/#projects'>
            <p className='py-2 text-gray-600 dark:text-white  underline cursor-pointer'>
              Check out some of my latest projects.
            </p>
          </Link>
        </div>
        <div className='w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300'>
        <Image src={AboutImg} className='rounded-xl' alt='/' />
        </div>
      </div>
    </div>
  )
}

export default About
