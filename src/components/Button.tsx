interface ButtonProps {
  id: string
  icon: string
  handleClick: (id: string) => void
}

export function Button(props: ButtonProps) {
  return (
    <button
      id={props.id}
      onClick={() => {
        props.handleClick(props.id)
      }}
    >
      <i className={props.icon}></i>
    </button>
  )
}
