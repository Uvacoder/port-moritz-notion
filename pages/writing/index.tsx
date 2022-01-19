import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout'
import ListView from '../../components/ListView';
import TitleBar from '../../components/TitleBar';
import routes from '../../config/routes';
import { getWritings } from '../../lib/notion';
import Post from '../../types/Post';

const Writings = ({ pages }: { pages: any }) => {
  
  return (
    <>
      <NextSeo {...routes.writing.seo} />
      <Layout>
        <ListView.Sidebar>
          <TitleBar title={routes.writing.title}/>
          {pages.map((page: Post) => (
            <ListView.SidebarItem 
              href={`${routes.writing.path}/${page.slug}`} 
              key={page.title} 
              isActive={false}
              data={page}
            />
          ))}
        </ListView.Sidebar>
      </Layout>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  const pages = await getWritings()

  return {
    props: {
      pages,
    },
    revalidate: 60,
  }
}

export default Writings
