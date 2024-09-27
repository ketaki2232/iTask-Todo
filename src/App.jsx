import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const saveToLS= (p) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newtodos)
    saveToLS()
  }

  const handleDelete=(e,id)=>{
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newtodos)
    saveToLS()
  }

  const handleCheckbox=(e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id==id
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveToLS()
  }
  

  return (
    <>
    <Navbar/>
     <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[70vh] md:w-[35%] shadow">
     <h1 className='font-bold text-center text-3xl'>iTask - Manage your Todos</h1>
      <div className="addTodo flex flex-col my-5 gap-4">
        <h2 className='text-xl font-semibold'>Add a Todo</h2>
        <div className='flex gap-3'>
        <input onChange={handleChange} value={todo} type="text" className='px-5 py-1 rounded-full w-full'/>
        <button disabled={todo.length<=3} onClick={handleAdd} className='bg-violet-800 text-white hover:bg-violet-900 hover:cursor-pointer disabled:bg-violet-500 p-2 py-1 text-sm font-semibold rounded-full'>Save</button>
        </div>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='my-4' name="" id="show" /> 
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <div className='h-[1px] bg-violet-400 w-[90%] mx-auto my-2'></div>

        <h2 className='text-xl font-semibold'>Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item=>{
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between  my-3">
            <div className='flex gap-5 text-wrap'>
              <input type="checkbox" onChange={handleCheckbox} value={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 text-white hover:bg-violet-900 hover:cursor-pointer p-2 py-1 text-sm font-semibold rounded-md mx-1'><FaRegEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 text-white hover:bg-violet-900 hover:cursor-pointer p-2 py-1 text-sm font-semibold rounded-md mx-1'><AiOutlineDelete /></button>
            </div>
          </div>
          })}
        </div>

     </div>
    </>
  )
}

export default App
