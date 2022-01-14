import Image from 'next/image'

export default function BookPreview({ book }) {
  return (
    <div className='rounded border dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900' onClick={() => window.open(`https://oku.club/book/${book.slug}`)}>
      <div className='flex items-center'>
        <div className='bg-neutral-50 dark:bg-neutral-900 p-4'>
          <div className='flex-none h-24 w-16 relative dark:bg-neutral-800 bg-neutral-200 rounded dark:opacity-50'>
            {book.imageLinks.thumbnail && <Image src={book.imageLinks.thumbnail} className='rounded ' alt={book.title} layout="fill" />}
          </div>
        </div>
        <div className='m-4'>
          <div className='text-sm line-clamp-1'>{book.title}</div>
          <div className='mt-1 text-xs opacity-60'>by {book.authors.map(a => a.name).join(', ')} {book.pageCount && `(${book.pageCount} pages)`}</div>
        </div>
      </div>
    </div>
  )
}