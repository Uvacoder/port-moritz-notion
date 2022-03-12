import Text from './Text'

const Paragraph = ({
  data
}) => {
  return (
    <p>{data.paragraph.text.map((text, i) => <Text key={i} data={text} />)}</p>
  )
}

export default Paragraph;