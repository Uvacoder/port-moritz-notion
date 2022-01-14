import { NextSeo } from 'next-seo';
import Link from 'next/link';
import useSWR from 'swr';
import routes from '../config/routes';
import ActivityIndicator from './ActivityIndicator';
import BookPreview from './BookPreview';
import TitleBar from './TitleBar';

const fetcher = url => fetch(url).then(r => r.json())

export default function Home() {
  const { data, error } = useSWR('https://oku.club/api/collections/user/jadann/reading', fetcher)
  
  return (
    <>
      <TitleBar />
      <NextSeo {...routes.home.seo} />
      <div className="w-full flex justify-center">
        <div className="w-full py-20 md:px-8 mx-8 max-w-2xl">
          <div className='prose prose-neutral dark:prose-invert dark:text-white'>
            <p>Hi, I&apos;m Moritz. <span className='opacity-50 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 rounded px-2 py-1'>he/him</span></p>
            <p>I&apos;m a fan of <strong>learning in public</strong> and I <span className='border-black border-dashed'>copycatted</span> the building blocks of <a href='http://brianlovin.com' target='_blank' rel='noreferrer'>brianlovin.com</a> to publish content to the outta world.</p>
            <p>I <Link href='/writing'>write</Link> down little realizations I made on my way.</p>
            <p>You can contact me via <a href='https://twitter.com/mrzmyr' target='_blank' rel='noreferrer'>Twitter</a>.</p>
          </div>
          <div className="relative flex items-center mt-14">
            <div className="flex-grow border-t border-gray-200 dark:border-neutral-800"></div>
            <span className="flex-shrink mx-4 text-black dark:text-white">Currently Reading</span>
            <div className="flex-grow border-t border-gray-200 dark:border-neutral-800"></div>
          </div>
          <div className=''>
            {!data && <ActivityIndicator />}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {!error && data && data.books.map(book => <BookPreview key={book.id} book={book} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
