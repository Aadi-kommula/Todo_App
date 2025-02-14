import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

const Home = () => {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState('');
  const [category, setCategory] = useState("All");
  const [todos, setTodos] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState('active'); // Default status is 'active'

  const handleCategory = (category) => {
    setCategory(category);
    console.log(category);
  };

  const handleTabs = (tab, status) => {
    setTab(tab);
    setStatus(status); 
    console.log(status);
  };

  const handleAddTask = (e) => {
    if (task.length > 1) {
      e.preventDefault();
      axios.post('http://localhost:5000/new-task', { task, category })
        .then(res => {
          setTodos(res.data);
          setTask('');
        });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/read-tasks')
      .then(res => {
        setTodos(res.data);
      });
  }, []);

  const [updateId, setUpdateId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState('');
  const handleEdit = (id, task) => {
    setIsEdit(true);
    setTask(task);
    setUpdatedTask(task);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.post('http://localhost:5000/update-task', { updateId, task })
      .then(res => {
        setTodos(res.data);
        setTask('');
        setIsEdit(false);
      });
  };

  const handleDelete = (id) => {
    axios.post('http://localhost:5000/delete-task', { id })
      .then(res => {
        setTodos(res.data);
      });
  };

  const handleComplete = (id) => {
    axios.post('http://localhost:5000/complete-task', { id })
      .then(res => {
        setTodos(res.data);
      });
  };

  const filteredTodos = todos?.filter(todo => {
    if (category === 'All') {
      return tab === 1 ? todo.status === 'active' : todo.status === 'completed';
    } else {
      return todo.category === category && (tab === 1 ? todo.status === 'active' : todo.status === 'completed');
    }
  });

  return (
    <div className='bg-gray-200 w-full h-screen '>
      <br /><br />
      <div className='flex flex-col container w-full h-full justify-center items-center'>
        <div>
          <h2 className='font-bold text-4xl m-4 text-cyan-600'>Todo App</h2>
        </div>
        <div className='flex gap-3'>
          <input value={task} onChange={e => setTask(e.target.value)} type='text' placeholder='Enter todo' className='w-64 p-2 outline-none border border-blue-300 rounded-md' />
          <>
            {isEdit ? <button className='bg-blue-600 text-white px-4 rounded-md' onClick={updateTask}>Update</button> : <button className='bg-blue-600 text-white px-4 rounded-md' onClick={handleAddTask}>add</button>}
          </>
        </div>

        {/* category   */}

        <div className='flex  font-semibold text-sm w-80 justify-evenly mt-5 mb-2'>
          {category == 'All' ? <div className='text-blue-700'> <input onClick={() => handleCategory('All')} type="radio" name="category" id="All" /> All</div> : <div> <input onClick={() => handleCategory('All')} type="radio" name="category" id="All" /> All</div>}
          {category == 'Work' ? <div className='text-blue-700'> <input onClick={() => handleCategory('Work')} type="radio" name="category" id="work" /> Work</div> : <div> <input onClick={() => handleCategory('Work')} type="radio" name="category" id="work" /> Work</div>}
          {category === 'Personal' ? <div className='text-blue-700'> <input onClick={() => handleCategory('Personal')} type="radio" name="category" id="Personal" /> Personal</div> : <div> <input onClick={() => handleCategory('Personal')} type="radio" name="category" id="Personal" /> Personal</div>}
          {category == 'Urgent' ? <div className='text-blue-700'> <input onClick={() => handleCategory('Urgent')} type="radio" name="category" id="Urgent" /> Urgent</div> : <div> <input onClick={() => handleCategory('Urgent')} type="radio" name="category" id="Urgent" /> Urgent</div>}
        </div>

        <div className='flex font-semibold text-sm w-80 justify-evenly mt-4 mb-2'>
          <p onClick={() => handleTabs(1, 'active')} className={`${tab === 1 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>📝 Active Tasks</p>
          <p onClick={() => handleTabs(2, 'completed')} className={`${tab === 2 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>✅ Completed Tasks</p>
        </div>

        {/* Render filtered tasks */}

        {filteredTodos?.map(todo => (
          <div key={todo.id} className='flex card justify-left bg-white p-3 w-76 mt-5 rounded-md '>
            <div>
              <p className='text-lg font-semibold'>{todo?.task} <span className='text-sm'>({todo.category})</span></p>
          {status=='active' ?   <p className='text-sm font-semibold text-pink-500'>{ todo.status}</p>: <p className='text-sm font-semibold text-green-500'>{ todo.status}</p> }  
              <div className='flex mt-3 w-64 text-sm justify-around'>

              {todo.status == 'completed' ? null : <button className='text-blue-600 cursor-pointer' onClick={() => handleEdit(todo.id, todo.task)}>✏ Edit &nbsp;</button>}
              <button className='text-red-500 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete 🚮&nbsp;</button>
              {todo.status == 'completed' ? null : <button className='text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Completed ✅</button>}
           
            </div>
            </div>        
          </div>
        ))}

      </div>
      <br/>
    </div>
  );
};

export default Home;