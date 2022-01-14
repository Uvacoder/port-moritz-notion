import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, Edit3, GitHub, Home, Speaker, Sunrise, Sunset, Twitter, X } from 'react-feather';
import { useAudio } from 'react-use';
import routes from '../config/routes';
import useDarkMode from '../hooks/useDarkMode';
import useSidebar from '../hooks/useSidebar';
import SidebarHeadline from './SidebarHeadline';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  const [isDark, setIsDark] = useDarkMode()
  const [audio, state, controls_switch] = useAudio({ src: '/static/audio/switch.ogg'});

  const { isOpen, setIsOpen } = useSidebar()
  
  const [title, setTitle] = useState()
  const [previousTitle, setPreviousTitle] = useState()
  
  useEffect(() => {
    setTitle(window.document.title)
    setPreviousTitle(window.document.title)
  }, [])

  useEffect(() => {
    window.document.title = title
  }, [title])
  
  const toggleDarkMode = () => {
    setIsDark(!isDark)
    controls_switch.seek(0)
    controls_switch.play()
  }
  
  return (
    <nav 
    className={`${
      isOpen
        ? 'absolute inset-y-0 left-0 translate-x-0 shadow-lg'
        : 'absolute -translate-x-full'
    } lg:relative flex flex-none flex-col lg:translate-x-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-56 2xl:w-72 3xl:w-80 z-30 lg:z-auto max-h-screen h-full min-h-screen overflow-y-auto transition duration-200 ease-in-out transform bg-white border-r pb-10 sm:pb-0 border-neutral-150 dark:bg-neutral-900 dark:border-neutral-800`}
    >
    <div className='font-bold cursor-pointer p-4 dark:text-white flex items-center'>

      {false && (
        <Link href={backButtonHref}>
          <a className="flex items-center justify-center p-2 rounded-md dark:hover:bg-neutral-800 text-primary lg:hidden hover:bg-neutral-200">
            <ArrowLeft size={16} className="text-primary" />
          </a>
        </Link>
      )}

      <Link href="/">
        <a id='logo' className='flex items-center grow text-3xl text-black dark:text-white italic '>
          <span>m</span>
        </a>
      </Link>

      {isOpen && (
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-2 rounded-md cursor-pointer lg:hidden hover:bg-neutral-200 dark:hover:bg-neutral-800"
        >
          <X size={16} className="text-primary" />
        </span>
      )}
    </div>

    {audio}
    
    <div className='flex flex-col grow px-3 py-3'>
      <SidebarLink 
        title={routes.home.label} 
        href={routes.home.path}
        icon={<Home size={16} />} 
        onClick={() => setIsOpen(false)}
      />

      <SidebarHeadline>Environment</SidebarHeadline>
      <SidebarLink 
        title={routes.production.label} 
        href={routes.production.path} 
        icon={<Speaker size={16} />}
        onClick={() => setIsOpen(false)}
      />

      <SidebarHeadline>Public Learning</SidebarHeadline>
      <SidebarLink 
        title={routes.writing.label} 
        href={routes.writing.path}
        icon={<Edit3 size={16} />}
        onClick={() => setIsOpen(false)}
      />

      <SidebarHeadline>Social Networks</SidebarHeadline>
      <SidebarLink 
        title='Twitter' 
        href="https://twitter.com/mrzmyr"
        icon={<Twitter size={16} />}
      />
      <SidebarLink 
        title='GitHub' 
        href="https://github.com/mrzmyr/moritz.works"
        icon={<GitHub size={16} />}
      />
    </div>

    <div className='flex items-center justify-center py-4'>
      <a href="#" className='p-2 rounded-md cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 text-black dark:text-white' 
          onClick={() => toggleDarkMode()} 
          onMouseEnter={() => { 
            setTitle(isDark ? '☀️ make morning!!' : '🌚  make night.')
          }}
          onMouseLeave={() => setTitle(previousTitle)}
        >
          {isDark ? <Sunrise size={16} /> : <Sunset size={16} />}
        </a>
      </div>
  </nav>
  )
}

export default Sidebar;