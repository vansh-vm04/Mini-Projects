import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")

  useEffect(() => {
    if(localStorage.getItem("tasks")){
    setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
  }, [])
  
  const saveTask=()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }

 const handleAdd= ()=>{
    setTasks([...tasks,{task,id:uuidv4(),isCompleted:false}]);
    console.log(tasks);
    setTask("")
    saveTask()
 }
 
 const handleDelete= async (id)=>{
  let newtasks = tasks.filter(item=>{
    return item.id!=id;
  })
  setTasks(newtasks);
  localStorage.setItem("tasks", JSON.stringify(newtasks));
 }

 const handleEdit= (id)=>{
    if(!task){
      let index = tasks.findIndex(item=>{
        return item.id == id;
      })
      setTask(tasks[index].task);
      handleDelete(id);
      saveTask()
    }
 }
 const handleChange= (e)=>{
    setTask(e.target.value)
 }
 const handleCheckbox= (e)=>{
    let id = e.target.name;
    let index = tasks.findIndex(item=>{
      return item.id===id;
    })
    let newtasks = [...tasks];
    newtasks[index].isCompleted= !newtasks[index].isCompleted;
    setTasks(newtasks);
    saveTask()
 }
 const handleClear=()=>{
  setTask("");
 }

  return (
    <>
      <Navbar/>
      <div className="container w-full flex flex-col justify-center items-center">
        <div className="addtask max-md:flex-col flex-wrap flex w-full justify-center gap-3 items-center mt-5">
        <h1 className='font-semibold text-xl'>Add Task :</h1>
          <textarea type="text" onChange={handleChange} value={task} className='md:w-1/3 max-md:w-[90vw] h-24 min-h-24 max-h-64 bg-slate-300 px-2 py-2 rounded-lg' placeholder='Type Here'/>
          <button onClick={handleAdd} className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2  rounded-lg text-center disabled:bg-blue-300' disabled={task.length<=3}>Save</button>
          <button onClick={handleClear} className='bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2  rounded-lg text-center'>Clear</button>
        </div>
        <div className="tasks gap-4 flex w-3/4 p-10 justify-center items-center flex-wrap ">
          {tasks.length==0 && <div>No Tasks To Display</div>}
        {tasks.map(item=>{
            return(
          <div key={item.id} className="task bg-white flex flex-col gap-2 rounded-lg p-4 shadow-lg">
            <div style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}} className={item.isCompleted?"w-48 line-through text-pretty":" text-pretty w-48"}>{item.task}</div>
            <div className="buttons flex gap-2 justify-end">
              <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted} className='w-5' />
              <button onClick={()=>{handleEdit(item.id)}} className='bg-blue-500 text-white px-1 py-1 text-sm rounded-sm text-center hover:bg-blue-600 transition-all'><FaEdit /></button>
              <button onClick={()=>{handleDelete(item.id)}} className='bg-red-500 text-white px-1 py-1 text-sm rounded-sm text-center hover:bg-red-600 transition-all'><MdDeleteForever /></button>
            </div>
          </div>
            )
        })}
        </div>
      </div>
    </>
  )
}

export default App
