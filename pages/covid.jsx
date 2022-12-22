import Image from 'next/image';
import React from 'react';
import twitchImg from '../public/assets/projects/covidl.jpg';
import { RiRadioButtonFill } from 'react-icons/ri';
import Link from 'next/link';

const covid = () => {
  return (
    <div className='w-full'>

        <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
<div className=' absolute top-0 left-0 w-full h-[38vh] lg:h-[40vh] bg-black/80 z-10'> </div>
     
     <Image className='absoulute z-1 ' layout='fill' objectFit='cover' src={twitchImg} alt='/'/>
       <div className='absolute top-[70%] max-w-[1240] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
        <h2 className='py-2'> Covid 19 Tracker</h2>
        <h3> React Js /Css / FireBase</h3>
       </div>
        </div>
        <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
            <p>Project</p>
            <h2>Overview</h2>
            <p>
            This appplication was built using React.JS and is styled with CSS.  
            The application is hosted statically using Firebase.the web app focus on 
            tracking world wide covid-19 live data using world health org API to fech the data
            </p>
            <a
            href='https://covid-tracker-5f81e.web.app/'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </a>
          <a
            href='https://github.com/nahomjc/covid-19-tracker/tree/main/react-covid-tracker-master'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4'>Code</button>
          </a>

        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
            <div className='p-2'>

                <p className='text-center font-bold pb-2 '>Technologies</p>
                <div className='grid grid-cols-3 md:grid-cols-1'>
                    <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> React</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Css</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> JavaScript</p>
                        <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Firebase</p>
                       
                       

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

export default covid