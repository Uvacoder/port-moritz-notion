import Link from 'next/link';
import dayjs from 'dayjs'

import Post from '../types/Post';
import { ReactElement } from 'react';

const Sidebar = ({ children, className }: { children: ReactElement[], className: string[] }) => {
  return (
      <div className={`
        ${className}
        relative flex-none 
        h-full max-h-screen min-h-screen 
        overflow-y-auto 
        border-r border-neutral-150 
        w-full md:w-80 xl:w-96 
        bg-white 
        dark:bg-neutral-900 dark:border-neutral-800
      `}>
      <div className='flex flex-col'>
        {children}
      </div>
    </div>
  )
}

interface SidebarItemData extends Post {
  isActive: boolean
}

interface SidebarItem {
  data: SidebarItemData;
  href: string;
  className: string[];
}

const SidebarItem = ({ data, href, className }: SidebarItem) => {
  return (
    <Link href={href} passHref>
      <a className={`${className} m-2 py-3 px-4 mb-1 text-sm cursor-pointer rounded-lg ${data.isActive ? 'bg-black text-white dark:bg-neutral-700' : 'text-black hover:bg-black hover:bg-opacity-5 dark:text-white dark:hover:bg-neutral-800'}`}>
        <div className='font-semibold'>{data.icon?.emoji} {data.title}</div>
        <div className='mt-1 opacity-70 line-clamp-2'>{data.excerpt}</div>
        <div className='mt-1 opacity-50'>{dayjs(data.createdAt).format('MMM DD, YYYY')}</div>
      </a>
    </Link>
  )
}

const Main = ({ children }: { children: ReactElement[] }) => {
  return (
    <div className="
    relative flex-col w-full max-h-screen overflow-y-auto bg-white dark:bg-black
    flex items-center
    ">
      {children}
    </div>
  )
}

const Content = ({ children }: { children: ReactElement[] }) => {
  return (
    <div className="p-6 lg:my-16">
      {children}
    </div>
  )
}

const ListView = {
  Sidebar,
  SidebarItem,
  Main,
  Content
}

export default ListView