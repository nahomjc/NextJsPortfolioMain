import Image from 'next/image';
import React from 'react';
import muyalogyOverView from '../public/assets/projects/muyalogy-view.png';
import { RiRadioButtonFill } from 'react-icons/ri';
import Link from 'next/link';
import ImageCarousel from '../components/ImageCarousel';

const muyaloyg= () => {
    const carouselImages = [
        {
          src: '/assets/project-view/muyalogy-view.png',
          alt: 'Muyalogy Platform Overview',
          caption: 'Course details'
        },
        {
          src: '/assets/project-view/muyalogy-view2.png',
          alt: 'Course Cart',
          caption: 'Course cart overview'
        },
        {
          src: '/assets/project-view/muyalogy-view3.png',
          alt: 'instructor dashboard',
          caption: 'Instructor dashboard'
        }
      ];
    
  return (
    <div className='w-full'>

        <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
<div className=' absolute top-0 left-0 w-full h-[38vh] lg:h-[40vh] bg-black/80 z-10'> </div>
     
     <Image className='absoulute z-1 ' layout='fill' objectFit='cover' src={muyalogyOverView} alt='/'/>
     
       <div className='absolute top-[70%] max-w-[1240] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
        <h2 className='py-2'> Muyalogy </h2>
        <h3> React Js/Next Js /TailWind / Vercel</h3>
       </div>
        </div>
        <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
            <p>Project</p>
            <h2>Overview</h2>
            <p>
          Muyalogy is an Ethiopian digital learning platform dedicated to providing accessible, skills-based education to address the country&apos;s job market skills gap. It offers online courses in technology, business, and personal development, aiming to equip individuals with practical skills aligned with industry demands, thereby empowering them for employment and entrepreneurship. Additionally, Muyalogy provides the Jiret Learning Platform, a software as a service, enabling institutions and organizations to create their own e-learning platforms, and it extends its educational reach through active engagement on social media platforms like TikTok.
        </p>
            <a
            href='https://muyalogy.com'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </a>
          <div className=' mx-auto mt-8 px-4'>
        <ImageCarousel 
          images={carouselImages}
          height="600px"
          autoPlayInterval={6000}
          showCaption={true}
          showControls={true}
          showDots={true}
          showPlayPause={true}
          className="shadow-xl"
        />
      </div>

        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4 h-[500px]'>
            <div className='p-2'>

                <p className='text-center font-bold pb-2 '>Technologies</p>
                <div className='grid grid-cols-3 md:grid-cols-1'>
                   
                    
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Next js</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> TailWind</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/>Mantine dev</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Supabase</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> JavaScript</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Firebase</p>
                     
                       

                </div>
            </div>
            <div className='max-w-[1240px] mx-auto mt-8 px-4'>
       
      </div>
      
        </div>
        
        <Link href='/#projects'>
            <p className='underline cursor-pointer'>Back</p>
        </Link>
        </div>
    </div>
  )
}

export default muyaloyg