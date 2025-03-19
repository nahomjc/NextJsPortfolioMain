import Image from 'next/image';
import React from 'react';
import jiretOverView from '../public/assets/projects/jiret-view.png';
import { RiRadioButtonFill } from 'react-icons/ri';
import Link from 'next/link';

const jiret= () => {
  return (
    <div className='w-full'>

        <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
<div className=' absolute top-0 left-0 w-full h-[38vh] lg:h-[40vh] bg-black/80 z-10'> </div>
     
     <Image className='absoulute z-1 ' layout='fill' objectFit='cover' src={jiretOverView} alt='/'/>
       <div className='absolute top-[70%] max-w-[1240] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
        <h2 className='py-2'> Jiret Learning Platform </h2>
        <h3> React Js/Next Js /TailWind / Vercel</h3>
       </div>
        </div>
        <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
            <p>Project</p>
            <h2>Overview</h2>
            <p>
            Jiret is an online learning platform that empowers creators to design and deliver immersive educational experiences. It provides tools for building dynamic courses, offering downloadable resources, streaming live broadcasts, and offering personalized coaching. The platform aims to offer both creators and learners a versatile, engaging, and accessible environment where individuals can grow, interact, and succeed in their learning journeys. Jiret’s goal is to make high-quality, personalized learning easily accessible and create a collaborative space for knowledge sharing.
            </p>
            <a
            href='https://jiret.com'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </a>
         
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
            <div className='p-2'>

                <p className='text-center font-bold pb-2 '>Technologies</p>
                <div className='grid grid-cols-3 md:grid-cols-1'>
                   
                    
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Next js</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> TailWind</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/>Mantine dev</p>
                     
                     
                       

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

export default jiret