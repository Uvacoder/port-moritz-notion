import Text from "./Text";

const Image = ({
  data
}) => {
  return (
    <figure className="dark:invert">
      <img src={data.image.file.url} alt={data.image.caption.map(d => d.plain_text).join(' ')} />
      <figcaption>{data.image.caption.map((t, i) => <Text key={i} data={t} />)}</figcaption>
    </figure>
  )
}

export default Image;