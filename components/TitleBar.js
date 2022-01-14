import Link from 'next/link';
import { ArrowLeft, Menu } from 'react-feather';
import useSidebar from '../hooks/useSidebar';

const TitleBar = ({
  backButton,
  backButtonHref,
  title,
  className
}) => {
  const { isOpen, setIsOpen } = useSidebar()
  
  return (
    <div className={`flex flex-end items-center w-full p-4 px-6 mb-2 ${className}`}>
    { !backButton && (
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-2 rounded-md cursor-pointer lg:hidden hover:bg-neutral-200 dark:hover:bg-neutral-800"
        >
          <Menu size={16} className="text-primary" />
        </span>
      )}
      {backButton && (
        <Link href={backButtonHref}>
          <a className="flex items-center justify-center p-2 rounded-md dark:hover:bg-neutral-800 text-primary lg:hidden hover:bg-neutral-200">
            <ArrowLeft size={16} className="text-primary text-black dark:text-neutral-400" />
          </a>
        </Link>
      )}
      {title && 
      <div className='dark:text-white font-semibold ml-4 lg:ml-0'>{title}</div>
      }
    </div>
  )
}

export default TitleBar;