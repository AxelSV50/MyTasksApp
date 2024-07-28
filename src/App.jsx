import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className='title-container'>
        <div style={{textAlign: "center"}}>
          <img src='/thumbtack-icon.png' alt='Pin' className='pin-img'/>
          <h1>My Tasks for today</h1>
        </div>

        <div className='task-text-container'>
          <form style={{display:'flex', flexDirection: 'column', gap: '5px'}}>
            <input type = 'text' placeholder='Add a new title...' className = 'input-task'/>
            <textarea type = 'text' placeholder='Add a new description...' className = 'input-task'/>
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

        <br/>

        <Task title='Este es el primer título' text = 'Esto es una tarea que a mí me gusta mucho'/>
        <Task title='Hola' text = 'Esto es una tarea que a mí me gusta mucho. Para ello he decidido crear una app con React'/>
        <Task title='Hola de nuevo' text = 'Esto es una tarea que a mí me gusta mucho'/>

      </div>

    </>
  )
}

const Task = ({title, text}) => {
  return (
    <div className='task-main-container'>

      <div className='task-text-container'>
        <h2 style={{marginTop: 0}}>{title}</h2>
        <p style={{marginTop: "-10px", color: "rgb(100, 100, 100)"}}>{text}</p>
      </div>

      <div className='task-btns-container'>
      <button 
          className='tasks-btns' 
          style= {{backgroundImage: 'url(/check.png)',backgroundSize: 'cover', 
          width: '24px', height: '24px', border: 'none', backgroundColor: 'rgba(0, 102, 255, 0.438)',
          borderRadius: '3px'}}>
        </button>
        <button 
          className='tasks-btns' 
          style= {{backgroundImage: 'url(/delete.png)',backgroundSize: 'cover', 
          width: '24px', height: '24px', border: 'none', backgroundColor: 'rgba(0, 102, 255, 0.438)',
          borderRadius: '3px'}}>
        </button>
        <button 
          className='tasks-btns' 
          style= {{backgroundImage: 'url(/edit.png)',backgroundSize: 'cover', 
          width: '24px', height: '24px', border: 'none', backgroundColor: 'rgba(0, 102, 255, 0.438)',
          borderRadius: '3px'}}>
        </button>
      </div>
    </div>
  )
}
export default App
