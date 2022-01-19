const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });

const NOTION_API_HOST = process.env.NOTION_API_HOST;
const NOTION_API_ACCESS_TOKEN = process.env.NOTION_API_ACCESS_TOKEN;

import Post from '../types/Post';

const _getBlocks = async (id: string) => {
  id = id.replace(/-/gm, '');
  const data = await fetch(`${NOTION_API_HOST}/v1/page/${id}`, {
    headers: {
      authorization: `Bearer ${NOTION_API_ACCESS_TOKEN}`,
    }
  }).then(res => res.json());

  return data
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
    database_id: process.env.NOTION_DATABASE_WRITING_ID
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
    database_id: process.env.NOTION_DATABASE_WRITING_ID,
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

  return {
    ...page,
    blocks
  }
}

export const getProductionPlugins = async () => {
  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_DATABASE_PRODUCTION_PLUGINS_ID,
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

