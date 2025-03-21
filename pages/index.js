import Head from 'next/head'
import Image from 'next/image'
import About from '../components/About'
import Contact from '../components/Contact'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import CoursePromo from '../components/CoursePromo'
import FoxCharacter from '../components/FoxCharacter'
import TelegramPromo from '../components/TelegramPromo'
import MediumBlog from '../components/MeduimBlog'
import AIChat from '../components/AIChat'
import CertificateShowcase from '../components/CertificateShowCase'

export default function Home() {
  
  return (
    <div >
      <Head>
        <title>Nahom | Front-End Developer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

  
       <Main/>
       <AIChat/>
     <About/> 
     <Skills/>
     <Projects/>
     <CertificateShowcase/>
     <CoursePromo/>
     <TelegramPromo/>
     <MediumBlog/>
     <Contact/>
    </div>
  )
}
