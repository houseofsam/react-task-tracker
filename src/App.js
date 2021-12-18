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

  return (
    <div className='container'>
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
