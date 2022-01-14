import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout'
import ListView from '../../components/ListView';
import TitleBar from '../../components/TitleBar';
import routes from '../../config/routes';
import { getBiteSizedLearnings } from '../../lib/notion';

const BiteSizedLearnings = ({ pages }) => {
  
  return (
    <>
      <NextSeo {...routes.writing.seo} />
      <Layout>
        <ListView.Sidebar>
          <TitleBar title={routes.writing.title}/>
          {pages.map(page => <ListView.SidebarItem href={`${routes.writing.path}/${page.slug}`} key={page.title} data={page} />)}
        </ListView.Sidebar>
      </Layout>
    </>
  )
}

export const getStaticProps = async (context) => {
  const pages = await getBiteSizedLearnings()

  return {
    props: {
      pages,
    },
    revalidate: 60,
  }
}

export default BiteSizedLearnings
