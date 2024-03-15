interface ValueProps {
  id: string
  value: number | string
}

export function Value(props: ValueProps) {
  return <span id={props.id}>{props.value}</span>
}
