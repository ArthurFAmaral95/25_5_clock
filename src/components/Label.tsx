interface LabelProps {
  id: string
  text: string
}

export function Label(props: LabelProps) {
  return <h2 id={props.id}>{props.text}</h2>
}
