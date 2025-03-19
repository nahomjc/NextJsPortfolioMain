import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import propertyImg from '../public/assets/projects/Airbnb1.jpg';
import muyalogyImg from '../public/assets/projects/muyaloyg.png';
import cryptoImg from '../public/assets/projects/crypto1.jpg'
import netflixImg from '../public/assets/projects/youtube.jpg'
import twitchImg from '../public/assets/projects/covidl.jpg'
import ProjectItem from './ProjectItem';
import afriworkImg from '../public/assets/projects/afriwork.png';
import loopstateImg from '../public/assets/projects/loop-state.png';
import primebankImg from '../public/assets/projects/prime-bank.png';
import jiretImg from '../public/assets/projects/jiret.png';
import netflixImgClone from '../public/assets/projects/netflix.jpg';
const Projects = () => {
  return (
    <div id='projects' className='w-full'>
      <div className='max-w-[1240px] mx-auto px-2 py-16'>
        <p className='text-xl tracking-widest uppercase text-[#5651e5]'>
          Projects
        </p>
        <h2 className='py-4'>What I&apos;ve Built</h2>
        <div className='grid md:grid-cols-2 gap-8'>
        <ProjectItem
            title='Jiret'
            backgroundImg={jiretImg}
            projectUrl='/jiret'
           
          />
        <ProjectItem
            title='Muyalogy'
            backgroundImg={muyalogyImg}
            projectUrl='/muyalogy'
           
          />
          <ProjectItem
            title='Afriwork'
            backgroundImg={afriworkImg}
            projectUrl='/afriwork'
            
          />
          <ProjectItem
            title='Loop state'
            backgroundImg={loopstateImg}
            projectUrl='/loopState'
        

            
          />
          <ProjectItem
            title='Prime bank'
            backgroundImg={primebankImg}
            projectUrl='/prime'
           

            
          />
         
        </div>
      </div>
      <div className='max-w-[1240px] mx-auto px-2 py-16'>
        <p className='text-xl tracking-widest uppercase text-[#5651e5]'>
          Projects
        </p>
        <h2 className='py-4'>Personal Projects</h2>
        <div className='grid md:grid-cols-2 gap-8'>
       
        <ProjectItem
            title='Netflix clone'
            backgroundImg={netflixImgClone}
            projectUrl='/netflixClone'
           
          />
        
          <ProjectItem
            title='Airbnb clone'
            backgroundImg={propertyImg}
            projectUrl='/airbnb'
         
          />
          <ProjectItem
            title='Crypto App'
            backgroundImg={cryptoImg}
            projectUrl='/crypto'
         

          />
          <ProjectItem
            title='Youtube clone'
            backgroundImg={netflixImg}
            projectUrl='/youtube'
           

          />
          <ProjectItem
            title='Covid -19 Tracker'
            backgroundImg={twitchImg}
            projectUrl='/covid'
           

          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
