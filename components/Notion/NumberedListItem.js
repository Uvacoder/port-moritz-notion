import Text from "./Text";

const NumberedListItem = ({
  data
}) => {
  return (
    <ul>
      <li>{data.numbered_list_item.text.map((text, i) => <Text key={i} data={text} />)}</li>
    </ul>
  )
}

export default NumberedListItem;