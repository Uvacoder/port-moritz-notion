import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Layout from '../components/Layout';
import TitleBar from '../components/TitleBar';
import routes from '../config/routes';
import { getProductionPlugins } from '../lib/notion';

const PluginPreview = ({ data }) => {
  return (
    <div onClick={() => window.open(data.link)} className='group flex flex-col cursor-pointer rounded-lg bg-stone-100 dark:bg-neutral-900 overflow-hidden'>
      <div className='relative h-40 w-full transition-all'>
        <Image alt={data.title} src={data.screenshot} layout="fill" objectFit='cover' />
        <div className='absolute right-2 bottom-2'>
        <span className='bg-black bg-opacity-50 text-white ml-2 rounded px-1.5 py-1 text-xs'>{data.price}</span>
        </div>
      </div>
      <div className='p-4 flex flex-col'>
        <div className='text-sm dark:text-white leading-relaxed'>
          <span className='font-semibold'>{data.title}</span> <span className='text-neutral-600 dark:text-neutral-400'>by {data.author}</span>
        </div>
        <div className='text-xs text-neutral-500 mt-2'>{data.description}</div>
      </div>
    </div>
  )
}

const Production = ({ plugins }) => {

  return (
    <Layout>
      <NextSeo {...routes.production.seo} />
      <TitleBar title={routes.production.title}/>
      <div className='flex items-center justify-center'>
        <div className="
          w-full py-24 px-8 mx-8
        ">
          <div className='flex flex-col mb-8 prose'>
            <h1 className='dark:text-white mb-0'>Plugins for Music Production</h1>
            <p className='leading-relaxed dark:text-neutral-300'>
            When I started making music in 2015, I was working with FL Studio. Since then, I&apos;ve made music with Logic X Pro and eventually switched to Ableton. The following plugins are a collection I&apos;ve been using for production ever since.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:gap-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {plugins.map(plugin => <PluginPreview data={plugin} key={plugin.title} />)}
          </div>
        </div>
      </div>
    </Layout>
  )
}


export const getStaticProps = async () => {
  
  const plugins = await getProductionPlugins()

  return {
    props: {
      plugins,
    },
    revalidate: 60,
  }
}

export default Production