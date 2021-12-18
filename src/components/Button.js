import PropTypes from 'prop-types'

// Create new/separate button component
// In case I want to add more buttons, perhaps with diff . colours, texts and events
const Button = ({ color, text }) => {
  const onClick = () => {
    console.log('click');
  }
  return <button onClick={onClick} style={{ backgroundColor: color }}className='btn'>{text}</button>
}

Button.defaultProps = {
  color: 'navyblue'
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
}

export default Button
