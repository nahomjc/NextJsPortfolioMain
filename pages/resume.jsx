import React from 'react';
import Head from 'next/head';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const resume = () => {
  return (
    <>
      <Head>
        <title>Nahom | Resume</title>
        <meta
          name='description'
          content='I am a Full Stack Web Engineer specializing in building scalable, high-performance applications with expertise in React.js, Next.js, and modern web technologies.'
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
            <a
              href='mailto:nahomfjh@gmail.com'
              target='_blank'
              rel='noreferrer'
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        <div className='text-center py-4 text-xl font-bold uppercase tracking-wider'>
          <div className='hidden sm:block'>
            <p>
              Full Stack Development <span className='px-1'>|</span> Technical Leadership
              <span className='px-1'>|</span> System Architecture
            </p>
          </div>
          <div className='block sm:hidden'>
            <p>Full Stack Development</p>
            <p className='py-2'>Technical Leadership</p>
            <p>System Architecture</p>
          </div>
        </div>

        <div className='py-4'>
          <h5 className='text-center underline text-[18px] py-2'>Professional Summary</h5>
          <p className='py-2'>
            Innovative and results-driven Full Stack Web Engineer with a proven track record of designing and implementing scalable, high-performance applications. Since 2019, I have specialized in building robust digital solutions, leading cross-functional teams, and optimizing system architectures. Adept at translating complex technical challenges into user-friendly experiences, I thrive in dynamic environments that demand creativity and precision.
          </p>
        </div>

        {/* Skills */}
        <div className='text-center py-4'>
          <h5 className='text-center underline text-[18px] py-2'>Skills</h5>
          <div className='py-2'>
            <p className='font-bold'>Front-End:</p>
            <p>React.js, Next.js, TypeScript, HTML5, CSS3, Bootstrap, Mantine.dev, Tailwind CSS, C++, R</p>
          </div>
          <div className='py-2'>
            <p className='font-bold'>Back-End:</p>
            <p>Node.js, Express.js, Spring Boot</p>
          </div>
          <div className='py-2'>
            <p className='font-bold'>Databases:</p>
            <p>PostgreSQL, MongoDB, MySQL, Drizzle ORM, Supabase</p>
          </div>
          <div className='py-2'>
            <p className='font-bold'>DevOps & Tools:</p>
            <p>Git, GitHub, GitLab, CI/CD, Docker</p>
          </div>
        </div>

        <h5 className='text-center underline text-[18px] py-4'>
          Professional Experience
        </h5>

        {/* Muyalogy Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold'>Full Stack Developer & Tech Lead</span>
            <span className='px-2'>|</span>Muyalogy
          </p>
          <p className='py-1 italic'>November 21, 2023 - Present</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>Developed a cutting-edge E-learning System using Next.js for both front-end and back-end</li>
            <li>Integrated Supabase for PostgreSQL database management, optimizing data handling</li>
            <li>Designed a visually compelling, responsive UI using Mantine and Tailwind CSS</li>
            <li>Implemented Redux for seamless state management across the application</li>
            <li>Developed a secure payment system for course subscriptions and transactions</li>
            <li>Managed Telegram bot integration, enhancing classroom engagement</li>
            <li>Led a team of developers, ensuring best coding practices and scalable architecture</li>
          </ul>
        </div>

        {/* Jiret LMS Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold'>Technical Lead – Jiret LMS</span>
            <span className='px-2'>|</span>Multiple Clients
          </p>
          <p className='py-1 italic'>2023 - Present</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>Spearheaded the development of Jiret LMS, a low-code LMS leveraging Next.js, Supabase, PostgreSQL, and Drizzle ORM</li>
            <li>Engineered a modular system for easy course creation and user interactions</li>
            <li>Optimized database queries and system performance for seamless scalability</li>
            <li>Integrated drag-and-drop content management for a dynamic learning experience</li>
            <li>Managed and mentored a development team, ensuring smooth project execution</li>
          </ul>
        </div>

        {/* Loop State Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold'>Full Stack Developer – Crowd-Funded Application</span>
            <span className='px-2'>|</span>Loop State
          </p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>Architecting a crowd-funded platform using Next.js and Supabase</li>
            <li>Implemented secure authentication and transaction workflows</li>
            <li>Designed user profiles, project backer interactions, and funding mechanisms</li>
            <li>Optimized performance to handle high traffic and seamless funding tracking</li>
          </ul>
        </div>

        {/* Bazra Motors Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold'>Full Stack Developer</span>
            <span className='px-2'>|</span>Bazra Motors
          </p>
          <p className='py-1 italic'>February 1, 2023 - November 17, 2023</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>Developed an E-Wallet System facilitating real-time financial transactions</li>
            <li>Built a responsive React.js + Material-UI front end</li>
            <li>Implemented Spring Boot for a robust backend</li>
            <li>Designed and optimized MySQL database structures</li>
            <li>Established role-based access control for merchants and agents</li>
          </ul>
        </div>

        {/* Dan Energy Experience */}
        <div className='py-6'>
          <p className='italic'>
            <span className='font-bold'>Developer</span>
            <span className='px-2'>|</span>Dan Energy
          </p>
          <p className='py-1 italic'>April 12, 2021 - December 20, 2021</p>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>Developed a WordPress-based CMS for an AutoParts E-commerce platform</li>
            <li>Implemented an Automatic License Plate Recognition System using OCR technology</li>
            <li>Designed a seamless online shopping experience with secure transactions</li>
          </ul>
        </div>

        {/* Education */}
        <h5 className='text-center underline text-[18px] py-4'>
          Education & Certifications
        </h5>
        <div className='py-6'>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>Bachelor of Science in Computer Science – Admas University (Graduated with Very Great Distinction)</li>
            <li>Practitioner Data Science – United Nations</li>
            <li>Certifications: React.js, Google IT Support, Responsive Web Design, Big Data (Coursera)</li>
          </ul>
        </div>

        {/* Leadership */}
        <h5 className='text-center underline text-[18px] py-4'>
          Leadership & Contributions
        </h5>
        <div className='py-6'>
          <ul className='list-disc list-outside px-7 py-1 leading-relaxed'>
            <li>Technical Leadership: Successfully led multiple teams in building scalable applications</li>
            <li>Mentorship: Provided guidance to junior developers, fostering innovation and growth</li>
            <li>Continuous Improvement: Passionate about implementing best practices for development efficiency</li>
          </ul>
        </div>

        <button className='px-8 py-2 mt-4 mr-8'>
          <a href='assets/NAHOM-TESFAYE-cv777.pdf' download>Download My CV</a>
        </button>
      </div>
    </>
  );
};

export default resume;