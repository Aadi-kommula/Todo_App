import React, { useState } from 'react'
import axios from 'axios'
const Home = () => {
  const [tab, setTab]=useState(1)
  const [task, setTask]=useState(1)
 
  const handleTab =(tab)=>{
    setTab(tab)
    console.log(tab)
  }

  const handleAdd = ()=>{    
    axios.post('http://localhost:8080/new-task',{task})
  }
  return (
    <div className='bg-gray-100 w-screen h-screen'>
      <div className='flex flex-col items-center justify-center w-screen h-90'>
        <h2 className='text-2xl font-bold mb-5 text-pink-600' >ToDo List</h2>
        <div className='gap-4 flex'>
        <input 
        className='p-2 border outline-none w-62 border-blue-200 rounded-md cursor-text bg-white' 
        type="text" 
        placeholder="Enter task"
        onChange={(e)=>{
          setTask(e.target.value)
        }} />
        <button
        className='bg-blue-500 text-white px-4 rounded-md cursor-pointer'
        onClick={() => handleAdd()}>Add</button>
        </div>
        <div className='flex justify-between w-60 mt-5'>
            <p className={ `${tab==1 ? 'text-blue-700 cursor-pointer hover:text-green-600 ' : 'text-black cursor-pointer '} `} onClick={()=> handleTab(1)}>All</p>
            <p className={ `${tab==2 ? 'text-blue-700 cursor-pointer hover:text-green-600 ' : 'text-black cursor-pointer '} `} onClick={()=> handleTab(2)}>Active</p>
            <p  className={ `${tab==3 ? 'text-blue-700 cursor-pointer hover:text-green-600 ' : 'text-black cursor-pointer '} `} onClick={()=> handleTab(3)}>Completed</p>
          </div>
          <div className='flex w-84 gap-26 p-4 mt-6 bg-white rounded-md'>
           <div>
           <p className='text-md font-bold'>Task 1</p>
            <p>12-02-2025</p>
            <p>Status:Active</p>
           </div>
           <div>
            <p className='text-cyan-600 cursor-pointer'>Edit ✍️</p>
            <p className='text-rose-600 cursor-pointer'>Delete ⛔</p>
            <p className='text-green-600 cursor-pointer'>Completed ✅</p>
           </div>
          </div>
         </div>
    </div>
  )
}

export default Home