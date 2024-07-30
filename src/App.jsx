import { useState } from 'react'
import './App.css'

function App() {

  const [tasks, setTasks] = useState([])
  const [tasksDone, setTasksDone] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskText, setTaskText] = useState('')
  const [error, setError] = useState(false)
  const [showTasksDone, setShowTaskDone] = useState(false)

  const handleSubmit = (e) =>{
    //Evita el refresh de la página por defecto al enviar formulario
    e.preventDefault()

    //Trim remueve todos los caracteres en blanco
    if(taskTitle.trim()){
      //Limpia el formulario
      e.target.reset()

      setTasks(tasks.concat({title: taskTitle, text: taskText}))

      setError(false)
      setTaskText('')
      setTaskTitle('')

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

        {/*Todo/Done*/}
        <div style={{ width: '100%', paddingLeft:'50px' }}>

          <button className= 'todo-btn' style= {showTasksDone ? null : {backgroundColor:' rgba(0, 102, 255, 0.438)'}} onClick={()=>{
            setShowTaskDone(false)
          }}
          >ToDo</button>

          <button className= 'done-btn' style= {showTasksDone ? {backgroundColor:' rgba(0, 102, 255, 0.438)'} : null} onClick={()=>{
            setShowTaskDone(true)
          }}
          >Done</button>
        </div>
        <br/>

        {/*ARREGLOS DE TAREAS*/}
        {!showTasksDone ?
        
            tasks.length ? 
              tasks.map((value, index) => 
              <Task key = {index}
              title= {value.title} 
              text = {value.text} 
              index={index} 
              setTasks={setTasks}
              tasks={tasks}
              tasksDone={tasksDone}
              setTasksDone={setTasksDone}
              done = {false}/>
              )
            : 
            <h4 style={{color:'gray'}}>Nothing here... well done!</h4>
          :
            tasksDone.length ? 
              tasksDone.map((value, index) => 
              <Task key = {index}
                title= {value.title} 
                text = {value.text} 
                index={index} 
                setTasksDone={setTasksDone}
                tasksDone={tasksDone}
                done={true}/>
              )
            : 
            <h4 style={{color:'gray'}}>Do some tasks!</h4>
        }
        <br/>
      </div>
    </>
  )
}

const Task = ({index, title, text, tasks, tasksDone, setTasks, setTasksDone, done}) => {

  const [isUpdating, setIsUpdating] = useState(false)
  const [taskTitle, setTaskTitle] = useState(title)
  const [taskText, setTaskText] = useState(text)
  const [error, setError] = useState(false)

  const handleCheckTask = () =>{
    
    setTasks([
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1) //Hasta el final
    ]);
    setTasksDone(tasksDone.concat({title: title, text: text}))
  }
  const handleDeleteTask = () =>{
    setTasks([
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1) //Hasta el final
    ]);
  }
  const handleDeleteTaskDone = () =>{
    setTasksDone([
      ...tasksDone.slice(0, index),
      ...tasksDone.slice(index + 1) //Hasta el final
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
      <>
        <div className='task-text-container'>
          <h2 style={{marginTop: 0}}>{title}</h2>
          <p style={{marginTop: "-10px", color: "rgb(100, 100, 100)", fontFamily: 'Roboto Mono', fontSize:'small'}}>{text}</p>
        </div>

        {done ? 
        <div className='task-btns-container'>
          <button onClick={handleDeleteTaskDone} className='delete-btn'></button>
        </div>
        :
        <div className='task-btns-container'>
          <button onClick={handleCheckTask} className='check-btn' ></button>
          <button onClick={handleDeleteTask} className='delete-btn'></button>
          <button onClick={handleUpdating} className='edit-btn'></button>
        </div>
      }
        
      </>
       :
      <>
          <div style={{display:'flex', width:'100%', paddingTop:10, paddingBottom:10}}>

          <TaskForm 
            handleSubmit={handleSubmit} 
            setTaskText={setTaskText} 
            setTaskTitle={setTaskTitle} 
            error={error} 
            taskTitle={taskTitle}
            text = {taskText}
          />
          </div>
          <div className='task-btns-container'>
            <button onClick={handleUpdating} className='cancel-btn'></button>
          </div>
       </>
      }
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
          <textarea type = 'text'  placeholder= 'Add a new description...'  className = 'input-task' onChange={(e)=>setTaskText(e.target.value)}      
              onPaste={
              (e)=>{
                //Se usa setTimeOut para que el evento de pegado termine antes de actualizar el estado
                setTimeout(() => {
                  setTaskText(e.target.value);
                }, 0);
              }}
            value={text}/>
            
          <button className='submit-btn'>Submit</button>
        </form>
      </div>
  )
}

export default App
