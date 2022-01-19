import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ListView from '../../components/ListView';
import NotionPage from '../../components/NotionPage';
import TitleBar from '../../components/TitleBar';
import routes from '../../config/routes';
import { baseUrl, defaultSEO } from '../../config/seo';
import { getWriting, getWritings } from '../../lib/notion';
import Post from '../../types/Post'

dayjs.extend(relativeTime)

const Writing = ({ pages, page }: { pages: any, page: Post }) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <NextSeo
        title={`${page.title} | ${defaultSEO.title}`}
        description={page.excerpt}
        openGraph={{
          title: page.title,
          url: `${baseUrl}/guides/${page.id}`,
          description: page.excerpt,
          images: [{
            url:`${baseUrl}/static/og/default.png`,
            alt: page.title,
          }],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Layout>
        <div className='flex w-full max-h-screen'>
          <ListView.Sidebar className="hidden lg:block">
            <TitleBar
              title={routes.writing.title}
              backButton
              backButtonHref={routes.writing.path}
            />
            {pages.map((page: Post) => (
              <ListView.SidebarItem 
                href={`${routes.writing.path}/${page.slug}`} 
                isActive={slug === page.slug} 
                data={page} 
                key={page.title} 
              />
            ))}
          </ListView.Sidebar>
          <ListView.Main>
            <TitleBar
              className="lg:hidden"
              backButton
              backButtonHref={routes.writing.path}
              title={routes.writing.title}
            />
            <ListView.Content>
              <div className='max-w-xl'>
                <div className='mb-8'>
                  <h1 className='text-2xl font-bold dark:text-white'>{page.title}</h1>
                  <div className='mt-2 text-neutral-500'>Published {dayjs().to(page.createdAt)} · Updated {dayjs().to(page.updatedAt)}</div>
                </div>
                <div className='prose prose-p:mb-3 prose-p:mt-3 dark:prose-invert leading-normal'>
                  {page !== undefined && <NotionPage blocks={page.blocks} />}
                </div>
              </div>
            </ListView.Content>
          </ListView.Main>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ params }: { params: any }) => {  
  const pages = await getWritings()
  const page = await getWriting(params.slug)

  return {
    props: {
      pages,
      page
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  const posts = await getWritings()

  return {
    paths: posts.map(guide => {
      return {
        params: {
          slug: guide.slug,
        },
      }
    }),
    fallback: 'blocking',
  }
}

export default Writing
