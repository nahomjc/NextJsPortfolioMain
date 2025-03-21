  import Image from 'next/image'
  import Link from 'next/link'
  import React from 'react'
  import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';
  import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
  import { BsFillPersonLinesFill } from 'react-icons/bs';
  import { useState,useEffect } from 'react';
  import { useRouter } from 'next/router';
  
  import ThemeToggle from './ThemToggle';
import Logo from './Logo';
  const Navbar = () => {

  const [nav , setNav]= useState(false);
  const[shadow, setShadow]= useState(false)
  const[navBg, setNavBg]=useState("#ecf0f3")
  const [linkColor ,setLinkColor]=useState('#1f2937')
  const router= useRouter()

  useEffect(()=>{
    if( router.asPath==='/property'||
    router.asPath==='/crypto'||
    router.asPath==='/netflix'||
    router.asPath==='/twitch'){
      setNavBg('transparent')
      setLinkColor("#ecf0f3")
    } else{
      setNavBg("#ecf0f3")
      setLinkColor('#1f2937')
    }
    },[router])
  const handelNav=()=>{
      setNav(!nav)

  }

  useEffect(() => {
      const handleShadow = () => {
        if (window.scrollY >= 90) {
          setShadow(true);
        } else {
          setShadow(false);
        }
      };
      window.addEventListener('scroll', handleShadow);
    }, []);

    return ( 
    
      <div
      className={`fixed w-full h-20 z-[100] transition-all duration-300
        ${shadow ? 'shadow-xl' : ''}
        ${router.asPath === '/property' || 
          router.asPath === '/crypto' || 
          router.asPath === '/netflix' || 
          router.asPath === '/twitch' 
          ? 'bg-transparent'
          : 'bg-[#ecf0f3] dark:bg-gray-900 dark:text-white'
        }`}
    >
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
  
  <Link href='/'>
  <Logo size="small" />
  </Link>
      
  <div>
          <ul style={{color:`${linkColor}`}} className='hidden md:flex'>
              <Link href='/'><li className='ml-10 text-sm uppercase hover:border-b dark:text-white'>Home</li></Link>
        
              <Link href='/#about'><li className='ml-10 text-sm uppercase hover:border-b dark:text-white'>About</li></Link>
              <Link href='/#skills'><li className='ml-10 text-sm uppercase hover:border-b dark:text-white'>Skills</li></Link>
              <Link href='/#projects'><li className='ml-10 text-sm uppercase hover:border-b dark:text-white'>Project</li></Link>
              <Link href='/#contact'><li className='ml-10 text-sm uppercase hover:border-b dark:text-white'>Contact</li></Link>
              <Link href='/resume'>
                  <li onClick={() => setNav(false)} className='ml-10 text-sm uppercase hover:border-b dark:text-white'>
                    Resume
                  </li>
                </Link>
                <li className='py-4 text-sm flex flex-row items-center'>
              <ThemeToggle isMobile={false}/>
            </li>
              
          </ul>
          <div onClick={handelNav} className='md:hidden'>
              <AiOutlineMenu size={25}/>
          </div>
      </div>

      </div>
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70': ''}>
  <div className={nav ? ' fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] dark:bg-gray-900 p-10 ease-in duration-500':
  'fixed left-[-100%] top-0 p-10 ease-in duration-500'}>
    <div className='w-full flex justify-center mb-6 mt-2'>
                <ThemeToggle isMobile={true}/>
              </div>
  <div>
      <div className='flex w-full items-center justify-between'>
      <Logo size="small" />
          
      <div onClick={handelNav} className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer '>
      
      <AiOutlineClose size={25}/>
      </div>
      </div>
      <div className='border-b border-gray-300 my-4 dark:border-gray-700'>
          <p className='w-[85%] md:w-[98%] py-4'>Let&#39;s build something legendary together</p>
      </div>

  <div className='py-4 flex flex-col dark:text-white'>
      <ul className='uppercase'>
        
          <Link href='/'>
          
          <li onClick={()=>setNav(false)}  className='py-4 text-sm'> Home</li>
          </Link>
          <Link href='/#about'>
          <li onClick={()=>setNav(false)}className='py-4 text-sm'> About</li>
          </Link>
          <Link href='/#skills'>
          <li onClick={()=>setNav(false)} className='py-4 text-sm'> Skills</li>
          </Link>
          <Link href='/#projects'>
          <li onClick={()=>setNav(false)}className='py-4 text-sm'> Projects</li>
          </Link> 

          <Link href='/#contact'>
          <li onClick={()=>setNav(false)}className='py-4 text-sm'> Contact</li>
          </Link>
          <Link href='/resume'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Resume
                  </li>
                </Link>
      </ul>
      <div className='pt-40'>
          <p className='uppercase tracking-widest text-[#5651e5]'> Let&#39;s Connect</p>
      
      <div className='flex items-center justify-between my-4 w-full sm:w-[80%]'> 
          <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-im duration-75'>
              
              <FaLinkedinIn/>
              </div>
              <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
              
              <FaGithub/>
              </div>
              <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
              
              <AiOutlineMail/>
              </div>
              <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
              
              <BsFillPersonLinesFill/>
              </div>
        
      </div>
      </div>
      </div>
      </div>
  </div>
  
      </div>
      </div>
    )
  }

  export default Navbar
