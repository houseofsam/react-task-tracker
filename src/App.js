import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  // State for the Add Button which toggles form display. 
  // Form will be dependent on this piece of state.
  const [showAddTask, setShowAddTask] = useState(false);
  // putting tasks state here so we can access it globally throughout app
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
    <Router>
      <div className='container'>
        <Header toggleForm={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route 
          path='/'
          exact
          render={(props) => (
            <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'Task list is empty!'}
            </>
          )} 
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
