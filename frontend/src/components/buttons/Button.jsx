import "./Button.css";

function Button({
  children,
  bg = 'red', // red | white | blac
  fs = 'medium', // small | medium | large
  fw = '', // bold
  radius = 'full', // full | small
  padding = 'small',
  icon, // optional icon src
  type = 'button',
  width = 'small',
  border = 'none',
  onClick,
}) {
  const classes = [
    'btn',
    `bg-${bg}`,
    `fs-${fs}`,
    `fw-${fw}`,
    `radius-${radius}`,
    `width-${width}`,
    `p-${padding}`,
    `border-${border}`,
  ].join(' ')

  return (
    <button className={classes} onClick={onClick} type={type}>
      {icon && <img src={icon} alt="icon" className="btn-icon" draggable={false}/>}
      {children}
    </button>
  )
}

export default Button