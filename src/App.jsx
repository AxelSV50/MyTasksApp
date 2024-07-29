import { useState } from 'react'
import './App.css'

function App() {

  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskText, setTaskText] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) =>{
    //Evita el refresh de la página por defecto al enviar formulario
    e.preventDefault()

    //Trim remueve todos los caracteres en blanco
    if(taskTitle.trim()){
      //Limpia el formulario
      e.target.reset()
      setTaskText('')
      setTaskTitle('')
      setTasks(tasks.concat({title: taskTitle, text: taskText}))
      setError(false)
    }else{
      setError(true)
    }
    
  }
  
  let myIndex = 0;
  return (
    <>
      {/*TÍTULO*/}
      <div className='title-container'>
        <div style={{textAlign: "center"}}>
          <img src='/thumbtack-icon.png' alt='Pin' className='pin-img'/>
          <h1>My Tasks for today</h1>
        </div>

        <TaskForm handleSubmit={handleSubmit} setTaskText={setTaskText} setTaskTitle={setTaskTitle} error={error} taskTitle={taskTitle}/>
        <br/>
        
        {/*ARREGLO DE TAREAS*/}
        {console.log('Nuevo arreglo: ')}
        {tasks.forEach(value => console.log(value))}
        {tasks.length ? 
           tasks.map((value, index) => 
           <Task key = {index}
            title= {value.title} 
            text = {value.text} 
            index={index} 
            setTasks={setTasks}
            tasks={tasks}/>
           )
          : null
        }
      </div>
    </>
  )
}

const Task = ({index, title, text, tasks, setTasks}) => {

  const [isUpdating, setIsUpdating] = useState(false)
  const [taskTitle, setTaskTitle] = useState(title)
  const [taskText, setTaskText] = useState(text)
  const [error, setError] = useState(false)

  const handleCheckTask = () =>{
    
    setTasks([
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1) //Hasta el final
    ]);
  }
  const handleDeleteTask = () =>{
    setTasks([
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1) //Hasta el final
    ]);
  }

  const handleSubmit = (e) =>{
    //Evita el refresh de la página por defecto al enviar formulario
    e.preventDefault()

    //Trim remueve todos los caracteres en blanco
    if(taskTitle.trim()){
      setError(false)
      setIsUpdating(false)
      
      const auxArray = [...tasks]
      auxArray[index] = {title: taskTitle, text: taskText}
      
      setTasks(auxArray)

    }else{
      setError(true)
    }
  }

  const handleUpdating = () =>{

    const value = isUpdating ? false : true
    setIsUpdating(value)
    setTaskText(text)
    setTaskTitle(title)
  }
  return (
    <div className='task-main-container'>

      {!isUpdating ?
       <div className='task-text-container'>
        <h2 style={{marginTop: 0}}>{title}</h2>
        <p style={{marginTop: "-10px", color: "rgb(100, 100, 100)"}}>{text}</p>
       </div>
       :
       <TaskForm 
          handleSubmit={handleSubmit} 
          setTaskText={setTaskText} 
          setTaskTitle={setTaskTitle} 
          error={error} 
          taskTitle={taskTitle}
          text = {taskText}
          />
      }

      <div className='task-btns-container'>
      <button onClick={handleCheckTask} 
          className='tasks-btns' 
          style= {{backgroundImage: 'url(/check.png)',backgroundSize: 'cover', 
          width: '24px', height: '24px', border: 'none', backgroundColor: 'rgba(0, 102, 255, 0.438)',
          borderRadius: '3px'}}>
        </button>
        <button onClick={handleDeleteTask}
          className='tasks-btns' 
          style= {{backgroundImage: 'url(/delete.png)',backgroundSize: 'cover', 
          width: '24px', height: '24px', border: 'none', backgroundColor: 'rgba(0, 102, 255, 0.438)',
          borderRadius: '3px'}}>
        </button>
        <button onClick={handleUpdating}
          className='tasks-btns' 
          style= {{backgroundImage: 'url(/edit.png)',backgroundSize: 'cover', 
          width: '24px', height: '24px', border: 'none', backgroundColor: 'rgba(0, 102, 255, 0.438)',
          borderRadius: '3px'}}>
        </button>
      </div>
    </div>
  )
}

const TaskForm = ({handleSubmit, setTaskText, setTaskTitle, error, taskTitle, text}) =>{
  return (
     <div className='task-text-container'>
         {/*FORMULARIO*/}
        <form style={{display:'flex', flexDirection: 'column', gap: '5px'}} onSubmit={(e) => handleSubmit(e)}>

          {error && !taskTitle.trim() ? 
        
            <input type = 'text' placeholder= 'Add a new title...' className = 'input-task-error'
            value={taskTitle}
            onChange={(e)=>setTaskTitle(e.target.value)}/>
          :
            <input type = 'text' placeholder= 'Add a new title...' className = 'input-task'
            value={taskTitle}
            onChange={(e)=>setTaskTitle(e.target.value)}/>
          }
          
          <textarea type = 'text'  placeholder= 'Add a new description...'  className = 'input-task' 
            onChange={(e)=>setTaskText(e.target.value)}
            value={text}/>
            
          <button 
            style= {{
              backgroundImage: 'url(/add.png)',
              backgroundSize: 'cover', 
              width: '30px', 
              height: '30px',
              border: 'none', 
              backgroundColor: 'rgba(0, 102, 255, 0.438)',
              borderRadius: '3px',
              fontFamily: 'Shadows Into Light'}}/>
        </form>
      </div>
  )
}

export default App
