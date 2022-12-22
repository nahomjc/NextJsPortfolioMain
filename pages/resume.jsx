import React from 'react';
import Head from 'next/head';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const resume = () => {
  return (
    <>
      <Head>
        <title>Nahom | Resume</title>
        <meta
          name='description'
          content='I’m a front-end web developer specializing in building (and occasionally designing) exceptional digital experiences.'
        />
        <link rel='icon' href='/LogNah.png' />
      </Head>

      <div className='max-w-[940px] mx-auto p-2 pt-[120px]'>
        <h2 className='text-center'>Resume</h2>
        <div className='bg-[#d0d4d6] my-4 p-4 w-full flex justify-between items-center'>
          <h2 className='text-center'>Nahom Tesfaye</h2>
          <div className='flex'>
            <a
              href='https://www.linkedin.com/in/nahom-jc-35b97420b/'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedinIn size={20} style={{ marginRight: '1rem' }} />
            </a>
            <a
              href='https://github.com/nahomjc'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub size={20} style={{ marginRight: '1rem' }} />
            </a>
          </div>
        </div>
        <div className='text-center py-4 text-xl font-bold uppercase tracking-wider'>
          <div className='hidden sm:block'>
            <p>
              Proven Leadership <span className='px-1'>|</span> Web Development
              <span className='px-1'>|</span> Complex Problem Solving
            </p>
          </div>
          <div className='block sm:hidden'>
            <p>Proven Leadership</p>
            <p className='py-2'>Web Development</p>
            <p>Complex Problem Solving</p>
          </div>
        </div>
        <p>
        I am a young man graduated from Admas
University with a very great distinction award in
computer science. i have done a lot of web site
projects, including personal mobile application. also i have professional Certificate on Google IT
support and Data science.

        </p>

        {/* Skills */}
        <div className='text-center py-4'>
          <h5 className='text-center underline text-[18px] py-2'>Skills</h5>
          <p className='py-2'>
            <span className='font-bold'>Technical Skills</span>
            <span className='px-2'>|</span>Front-End Web Developer
            <span className='px-2'>|</span> HTML
            <span className='px-2'>|</span>CSS
            <span className='px-2'>|</span>Javascript
            <span className='px-2'>|</span>React
            <span className='px-2'>|</span>Next JS
            <span className='px-2'>|</span>SQL
            <span className='px-2'>|</span>NoSQL
            <span className='px-2'>|</span>Redux
            <span className='px-2'>|</span>Tailwind
            <span className='px-2'>|</span> Firebase
            <span className='px-2'>|</span> RESTAPI
          </p>
          <p className='py-2'>
           
          </p>
        </div>

        <h5 className='text-center underline text-[18px] py-4'>
          Professional Experience
        </h5>
        {/* Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold italic'>
            Inter Software Developer
@ Dan Energy For 8 month

            </span>
            <span className='px-2'>|</span>Addis Ababa, CMC
          </p>
          <p className='py-1 italic'>Software engineer(2021 - 2022)</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>
            Artificial neural networks based vehicle license plate
            recognition system
            </li>
            <li>
            Car Auto Parts Ecommerce website.
            </li>
           
          </ul>
        </div>


        {/* Personal Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold italic'>
            Junior Software Developer
@Bazra Motors

            </span>
            <span className='px-2'>|</span>Addis Ababa, Bole
          </p>
          <p className='py-1 italic'>Code Commerce - Youtube Channel (2021 - Current)</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>
            A web app that works on money transfer, Between
customer to customer , agent to customer and customer
to merchant.
            </li>
            <li>
            Admin dashboard to control all the activity of partners and customers information.
            </li>
          </ul>
        </div>

        {/*  */}
        <h5 className='text-center underline text-[18px] py-4'>
          Other Professional Experience
        </h5>
      
        {/* Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold'>Freelance</span>
            <span className='px-2'>|</span>Addis Ababa, Summite
          </p>
          <p className='py-1 italic'>2 year experience on online freelance Web
Development. (2010 – 2019)</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>
            Personal Websites for church&#39;s. 
            </li>
            <li>
            Ecommerce websites for small companies. 
            </li>
           
          </ul>
         
        </div>
        <button className='px-8 py-2 mt-4 mr-8'>
        <a href='assets/resume.pdf' download>Download My CV</a>
        </button>
      </div>
    </>
  );
};

export default resume;