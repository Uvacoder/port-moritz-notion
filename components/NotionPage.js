import React from 'react'
import BulletedListItem from './Notion/BulletedListItem'
import NumberedListItem from './Notion/NumberedListItem'
import Paragraph from './Notion/Paragraph'
import Image from './Notion/Image'
import Text from './Notion/Text'

const NotionPage = ({ blocks }) => {
  return blocks.map(block => {
    if (block.type === 'paragraph') {
      return <Paragraph data={block} />
    }
    if (block.type === 'bulleted_list_item') {
      return <BulletedListItem data={block} />
    }
    if (block.type === 'numbered_list_item') {
      return <NumberedListItem data={block} />
    }
    if (block.type === 'image') {
      return <Image alt='' data={block} />
    }
    if (block.type === 'heading_1') {
      return <h1>{block.heading_1.text.map((t, i) => <Text key={i} data={t} />)}</h1>
    }
    if (block.type === 'heading_2') {
      return <h2>{block.heading_2.text.map((t, i) => <Text key={i} data={t} />)}</h2>
    }
    if (block.type === 'heading_3') {
      return <h3>{block.heading_3.text.map((t, i) => <Text key={i} data={t} />)}</h3>
    }
    if (block.type === 'code') {
      return <pre>{block.code.text.map((t, i) => <Text key={i} data={t} />)}</pre>
    }
    if (block.type === 'quote') {
      return <blockquote>{block.quote.text.map((t, i) => <Text key={i} data={t} />)}</blockquote>
    }
    // if(!['paragraph', 'bulleted_list_item'].includes(block.type)) {
    //   return <div>{JSON.stringify(block)}</div>
    // }
  })
}

export default NotionPage
