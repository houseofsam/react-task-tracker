import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks';

function App() {
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

  return (
    <div className='container'>
      <Header />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} /> : 'Task list is empty!'}
    </div>
  );
}

export default App;
