const Text = ({
  data
}) => {
  let classNames = []

  if(data.annotations.underline) classNames.push('underline')
  if(data.annotations.strikethrough) classNames.push('line-through')
  if(data.annotations.bold) classNames.push('font-bold')
  if(data.annotations.italic) classNames.push('italic')
  if(data.annotations.code) classNames.push('font-mono')
  
  return (
    data.href ? <a href={data.href} className={classNames.join(' ')}>{data.text.content}</a> : <span className={classNames.join(' ')}>{data.text.content}</span>
  )
}

export default Text;