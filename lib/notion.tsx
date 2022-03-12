const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });

import Post from '../types/Post';

const NOTION_DATABASE_WRITING_ID = '0499b90b-5ed1-466d-af88-5b15dc8f80d9'
const NOTION_DATABASE_PRODUCTION_PLUGINS_ID = '5ce0f0f2-c415-49a1-abc4-52ec6833cfeb'

const _getBlocks = async (id: string) => {
  return notion.blocks.children.list({
    block_id: id,
    page_size: 100,
  }).then((res: any) => res.results)
}

const _transformPage = (page: any): Post => {
  return {
    id: page.id,
    title: page.properties.title.title[0].plain_text,
    icon: page.icon,
    slug: page.properties.slug.rich_text[0].plain_text,
    excerpt: page.properties.excerpt.rich_text.length > 0 ? 
      page.properties.excerpt.rich_text[0].plain_text : null,
    createdAt: page.properties.created_at.date !== null ? 
      new Date(page.properties.created_at.date.start).toISOString() : null,
    updatedAt: page.last_edited_time,
  }
}

export const getWritings = async (): Promise<Post[]> => {
  const response = await notion.databases.query({ 
    database_id: NOTION_DATABASE_WRITING_ID
  });
  
  const valid_pages = response.results
    .filter((result: any) => {      
      return (
        result.properties.title.title.length > 0 &&
        result.properties.slug.rich_text.length > 0 &&
        result.properties.excerpt.rich_text.length > 0 &&
        result.properties.created_at.date !== null
      )
    })

  return valid_pages.map((result: any) => ({
      id: result.id,
      icon: result.icon,
      title: result.properties.title.title[0].plain_text,
      slug: result.properties.slug.rich_text[0].plain_text,
      excerpt: result.properties.excerpt.rich_text[0].plain_text,
      createdAt: new Date(result.properties.created_at.date.start).toISOString(),
      updatedAt: result.last_edited_time
    }))
}

export const getWriting = async (slug: string) => {  
  const response = await notion.databases.query({ 
    database_id: NOTION_DATABASE_WRITING_ID,
    filter: {
      or: [{
          property: 'slug',
          text: {
            equals: slug,
          },
        }],
    },
  });
  
  const pageId = response.results[0].id;
  const page = _transformPage(response.results[0]);
  const blocks = await _getBlocks(pageId);

  console.log(blocks)

  return {
    ...page,
    blocks
  }
}

export const getProductionPlugins = async () => {
  const response = await notion.databases.query({ 
    database_id: NOTION_DATABASE_PRODUCTION_PLUGINS_ID,
  });

  return response.results.map((result: any) => ({
    title: result.properties.name.title[0].text.content,
    description: result.properties.description.rich_text.length > 0 ? result.properties.description.rich_text[0].text.content : '',
    author: result.properties.author.rich_text.length > 0 ? result.properties.author.rich_text[0].text.content : '',
    price: result.properties.price.rich_text.length > 0 ? result.properties.price.rich_text[0].text.content : '',
    screenshot: result.properties.screenshot.files[0].file.url,
    link: result.properties.link.url,
  }));
}

