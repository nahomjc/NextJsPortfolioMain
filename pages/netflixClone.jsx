import Image from 'next/image';
import React from 'react';
import netflixOverView from '../public/assets/projects/netflix.jpg';
import { RiRadioButtonFill } from 'react-icons/ri';
import Link from 'next/link';
import ImageCarousel from '../components/ImageCarousel';

const netflixClone= () => {
    const carouselImages = [
        {
          src: '/assets/project-view/netflix-view1.png',
          alt: 'netflix Platform Overview',
          caption: 'Netflix landing page '
        },
        {
          src: '/assets/project-view/netflix-view2.png',
          alt: 'netflix search page',
          caption: 'Netflix genre page'
        },
        {
          src: '/assets/project-view/netflix-view3.png',
          alt: 'Netflix Login page',
          caption: 'Netflix Login page'
        },
        {
          src: '/assets/project-view/netflix-view4.png',
          alt: 'Netflix mobile view ',
          caption: 'Netfix responsive view'
        }
        
      ];
  return (
    <div className='w-full'>

        <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
<div className=' absolute top-0 left-0 w-full h-[38vh] lg:h-[40vh] bg-black/80 z-10'> </div>
     
     <Image className='absoulute z-1 ' layout='fill' objectFit='cover' src={netflixOverView} alt='/'/>
       <div className='absolute top-[70%] max-w-[1240] w-full left-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
        <h2 className='py-2'> Netflix clone </h2>
        <h3> React Js/Next Js /TailWind / Vercel</h3>
       </div>
        </div>
        <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
            <p>Project</p>
            <h2>Overview</h2>
            <p>
          This project is a Netflix clone built using Next.js, Shadcn, and Tailwind CSS. It leverages the TMDB API to fetch movie lists and allows for movie searching. The project aims to provide streamlined access to movies with a fast and smooth user experience. To get started, you&apos;ll need Node.js, npm, a TMDB account, and API keys. You can clone the repository, install dependencies, add your API keys to a .env file, and run the development server to see the clone in action. Contributions are welcome, and the project is licensed under the MIT License.
        </p>
            <a
            href='https://netflix-clone-ai.vercel.app/'
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
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4 h-[500px]' >
            <div className='p-2'>

                <p className='text-center font-bold pb-2 '>Technologies</p>
                <div className='grid grid-cols-3 md:grid-cols-1'>
                    <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Next.js</p>
                    <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> React.js</p>
                    <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Tailwind CSS</p>
                    <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Shadcn</p>
                    <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> TMDB API</p>
                    <p className='text-gray-600 py-2 flex items-center'>
                        <RiRadioButtonFill className='pr-1'/> Vercel</p>
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

export default netflixClone