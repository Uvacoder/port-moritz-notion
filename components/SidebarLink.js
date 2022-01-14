import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "react-feather";

export default function SidebarItem({
  icon,
  title,
  href,
  onClick
}) {
  const router = useRouter();
  const isExternal = href[0] !== '/';
  const isActive = (href !== '/' || href === router.pathname) && router.pathname.includes(href);
  
  return (
    isExternal ?
    <a onClick={() => { 
      if(onClick) onClick() 
      window.open(href)
    }} 
    className={`cursor-pointer text-black dark:text-white text-sm px-2 py-1.5 mt-1 w-full rounded flex items-center ${isActive ? 'bg-neutral-800 dark:bg-neutral-700' : 'hover:bg-black dark:hover:bg-neutral-700 hover:bg-opacity-5'}`}>
      <span className={`w-7 flex items-center pr-2 ${isActive ? 'dark:invert-0 invert' : ''}`}>{icon}</span>
      <span className={`${isActive ? 'text-white' : ''} grow`}>{title}</span>
      <span className={`w-7 items-center pl-2 ${isActive ? 'dark:invert-0 invert' : ''}`}><ArrowUpRight size={16} className="opacity-30" /></span>
    </a>
    :
    <Link href={href}>
      <a onClick={onClick} className={`cursor-pointer text-black dark:text-white text-sm px-2 py-1.5 mt-1 w-full rounded flex items-center ${isActive ? 'bg-neutral-800 dark:bg-neutral-700' : 'hover:bg-black dark:hover:bg-neutral-700 hover:bg-opacity-5'}`}>
        <span className={`w-7 flex items-center pr-2 ${isActive ? 'dark:invert-0 invert' : ''}`}>{icon}</span>
        <span className={`${isActive ? 'text-white' : ''} grow`}>{title}</span>
      </a>
    </Link>
  )
}