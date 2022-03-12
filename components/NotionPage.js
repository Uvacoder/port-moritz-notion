import React from 'react'
import BulletedListItem from './Notion/BulletedListItem'
import Paragraph from './Notion/Paragraph'
import Image from './Notion/Image'

const NotionPage = ({ blocks }) => {
  return blocks.map(block => {
    if (block.type === 'paragraph') {
      return <Paragraph data={block} />
    }
    if (block.type === 'bulleted_list_item') {
      return <BulletedListItem data={block} />
    }
    if (block.type === 'image') {
      return <Image alt='' data={block} />
    }
    if(!['paragraph', 'bulleted_list_item'].includes(block.type)) {
      return <div>{JSON.stringify(block)}</div>
    }
  })
}

export default NotionPage
