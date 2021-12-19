import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  // putting state here so we can access it globally throughout app
  const[tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Dishes',
      day: 'December 18th',
      reminder: true,
    },
    {
      id: 2,
      text: 'Drink Water',
      day: 'December 18th',
      reminder: false,
    },
    {
      id: 3,
      text: 'Doc Appt',
      day: 'December 19th',
      reminder: true,
    },
  ])

  // Delete task
  const deleteTask = (id) => {
    // console.log('delete', id);

    // set the tasks to the filtered tasks
    // essentially only include array/list values where task.id does not equal the id being passed in as an argument
    setTasks(tasks.filter((task) => task.id !== id ));
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
      // if task id in the current iteration is equal to the id passed in
      // then we're going to have a specific object (modify that partiular task),
      // else just return the task (no change)
      task.id === id ? { ...task, reminder: !task.reminder } : task 
      // spread the task object, and for reminder, change it to opposite of what it was
    ))
  }

  return (
    <div className='container'>
      <Header />
      <AddTask />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'Task list is empty!'}
    </div>
  );
}

export default App;
