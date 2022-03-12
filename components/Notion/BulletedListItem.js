import Text from "./Text";

const BulletedListItem = ({
  data
}) => {
  return (
    <ul>
      <li>{data.bulleted_list_item.text.map((text, i) => <Text key={i} data={text} />)}</li>
    </ul>
  )
}

export default BulletedListItem;