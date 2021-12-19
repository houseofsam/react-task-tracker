// A component for each task
import { FaTimes } from 'react-icons/fa'

// These props will all be attribute properties in App.js
const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div 
      // 'task' class should be present by default
      // if task.reminder = true, add 'reminder' class
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
