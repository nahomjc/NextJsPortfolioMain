import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import propertyImg from '../public/assets/projects/Airbnb1.jpg';
import cryptoImg from '../public/assets/projects/crypto1.jpg'
import netflixImg from '../public/assets/projects/youtube.jpg'
import twitchImg from '../public/assets/projects/covidl.jpg'
import ProjectItem from './ProjectItem';

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
            title='Airbnb clone'
            backgroundImg={propertyImg}
            projectUrl='/airbnb'
            tech='React JS'
          />
          <ProjectItem
            title='Crypto App'
            backgroundImg={cryptoImg}
            projectUrl='/crypto'
            tech='React JS'

          />
          <ProjectItem
            title='Youtube clone'
            backgroundImg={netflixImg}
            projectUrl='/youtube'
            tech='React JS'

          />
          <ProjectItem
            title='Covid -19 Tracker'
            backgroundImg={twitchImg}
            projectUrl='/covid'
            tech='React JS'

          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
