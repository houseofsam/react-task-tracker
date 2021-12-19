import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, formDisplay }) => {
  const onClick = (() => formDisplay())

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text='Add' onClick={onClick} />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  formDisplay: PropTypes.func,
}

export default Header