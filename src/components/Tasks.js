import Task from "./Task"

// catch the props
const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map ((task) => (
        // pass in the props
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tasks
