import React from 'react'
import { NotionRenderer } from "react-notion";

const NotionPage = ({ blocks }) => {
  return <NotionRenderer blockMap={blocks} />
}

export default NotionPage
