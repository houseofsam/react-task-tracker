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
  const[tasks, setTasks] = useState([]);

  useEffect(() => {
    // async bc it will call fetchTasks which returns a promise
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      // add it to our state
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);
  // ^Add dependency array. No dependecies here, so pass in empty array

  // Fetch Tasks
  const fetchTasks = async() => {
    // fetch returns a promise so we want to await that promise
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };


  
  // Add task
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      // convert task data being passed into function from object to JSON then send it
      body: JSON.stringify(task)
    });
    
    // data that's returned is just new task that's added (as a promise)
    const data = await res.json();
    
    // add what we just sent to DB to the existing tasks state
    setTasks([...tasks, data]);
    
    /* 
    Code prior to working with backend
    
    // Create random ID for each entry
    const id = Math.floor(Math.random() * 10000) + 1;
    
    // create new object and give it the id property we just created
    // and copy in the task object that's passed into the function
    const newTask = { id, ...task };
    
    // call state function, set it as an array, copy the current tasks + and add new task to the end of array
    setTasks([...tasks, newTask])
    */
  }
  
  // Delete task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    
    // set the tasks to the filtered tasks
    // essentially only include array/list values where task.id does not equal the id being passed in as an argument
    setTasks(tasks.filter((task) => task.id !== id ));
  }

  // Fetch (single) Task for reminder toggle
  const fetchTask = async(id) => {
    // fetch returns a promise so we want to await that promise
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    // create var for the new (updated) task and put it in a variable BUT change its reminder boolean value
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    // return promise with the updated data app sent to server
    const data = await res.json();

    setTasks(tasks.map((task) => 
      // if task id in the current iteration is equal to the id passed in
      // then we're going to have a specific object (modify that partiular task),
      // else just return the task (no change)
      //*** !task.reminder to data.reminder for server update *** 
      task.id === id ? { ...task, reminder: data.reminder } : task
      // spread the task object, and for reminder, change it to opposite of what it was
    ));
  };

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
