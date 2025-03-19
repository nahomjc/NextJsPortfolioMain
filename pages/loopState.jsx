import Image from 'next/image';
import React from 'react';
import loopStateOverView from '../public/assets/projects/loop-state-view.png';
import { RiRadioButtonFill } from 'react-icons/ri';
import Link from 'next/link';
import ImageCarousel from '../components/ImageCarousel';

const loopState= () => {
    const carouselImages = [
        {
          src: '/assets/project-view/loop-state-view.png',
          alt: 'loo Platform Overview',
          caption: 'Course details'
        },
        {
          src: '/assets/project-view/loop-state-view2.png',
          alt: 'Course Cart',
          caption: 'Course cart overview'
        },
        {
          src: '/assets/project-view/loop-state-view3.png',
          alt: 'instructor dashboard',
          caption: 'Instructor dashboard'
        },
        {
            src: '/assets/project-view/loop-state-view4.png',
            alt: 'instructor dashboard',
            caption: 'Instructor dashboard'
          }
      ];
  return (
    <div className='w-full'>

        <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
<div className=' absolute top-0 left-0 w-full h-[38vh] lg:h-[40vh] bg-black/80 z-10'> </div>
     
     <Image className='absoulute z-1 ' layout='fill' objectFit='cover' src={loopStateOverView} alt='/'/>
       <div className='absolute top-[70%] max-w-[1240] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
        <h2 className='py-2'> loop state </h2>
        <h3> React Js/Next Js /TailWind / Vercel</h3>
       </div>
        </div>
        <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
            <p>Project</p>
            <h2>Overview</h2>
            <p>
            Loop facilitates fractional real estate ownership, enabling individuals to confidently invest in real estate and build wealth by purchasing shares of properties alongside other investors. This approach democratizes real estate investment, lowering the barrier to entry and allowing for diversified portfolios.
            </p>
            <a
            href='https://crowd-funded-stake.vercel.app/'
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
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl h-[500px] p-4'>
            <div className='p-2'>

                <p className='text-center font-bold pb-2 '>Technologies</p>
                <div className='grid grid-cols-3 md:grid-cols-1'>
                   
                    
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Next js</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Vercel</p>
                        <p className='text-gray-600 py-2 flex items-center'>

                        <RiRadioButtonFill className='pr-1'/> Clerk authentication</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> TailWind</p>
                     
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Supabase</p>
                       
                     
                       

                </div>
            </div>
            
        </div>
        <Link href='/#projects'>
            <p className='underline cursor-pointer'>Back</p>
        </Link>
        </div>
    </div>
  )
}

export default loopState