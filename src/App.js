import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  // State for the Add Button which toggles form display. 
  // Form will be dependent on this piece of state.
  const [showAddTask, setShowAddTask] = useState(false);
  // putting tasks state here so we can access it globally throughout app
  const[tasks, setTasks] = useState([]);

  useEffect(() => {
    // async bc it will call fetchTasks which returns a promise
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      // add it to our state
      setTasks(tasksFromServer)
    }

    getTasks();
  }, []);
  // ^Add dependency array. No dependecies here, so pass in empty array

  // Fetch Tasks
  const fetchTasks = async() => {
    // fetch returns a promise so we want to await that promise
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    return data;
  };

  // Add task
  const addTask = (task) => {
    // Create random ID for each entry
    const id = Math.floor(Math.random() * 10000) + 1;

    // create new object and give it the id property we just created
    // and copy in the task object that's passed into the function
    const newTask = { id, ...task };

    // call state function, set it as an array, copy the current tasks + and add new task to the end of array
    setTasks([...tasks, newTask])
    
  }

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
      <Header toggleForm={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'Task list is empty!'}
    </div>
  );
}

export default App;
