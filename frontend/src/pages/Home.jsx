import React, { useState } from 'react'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [completed, setCompleted] = useState(false)
    const [description, setDescription] = useState('')

    const handleAddTask = () => {
        setTasks([...tasks, { title, description, completed: false }])
    }

    return (
        // make a simple crud to do application using react and tailwindcss
        <div className='px-10 flex items-center flex-col gap-4 h-full w-full'>
            <h1 className='text-4xl font-bold'>Task Manager</h1>
            <div className='flex items-center gap-4 w-full flex-col gap-4'>
                <input type="text" placeholder='title' className='min-w-[500px] border-1 border-black rounded-md p-2' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea name="" id="" placeholder='description' className='min-w-[500px] border-1 border-black rounded-md p-2' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <button className='min-w-24 rounded-md p-2 bg-blue-400 text-white cursor-pointer' onClick={handleAddTask}>Add</button>
            </div>
            <div className='w-full flex  gap-4'>
                <div className='min-w-[300px] min-h-[150px] border-1 border-black rounded-md p-2'>
                    <h2 className='font-bold'>Title</h2>
                    <p>Description</p>
                </div>
                {tasks.map((task, index) => (
                    <div className={`min-w-[300px] min-h-[150px] border-1 border-black rounded-md p-2 ${task.completed ? 'bg-green-400' : 'bg-red-400'}`} key={index}>
                        <div className='flex items-center justify-between gap-2'>
                            <h2 className='font-bold'>{task.title}</h2>
                            <input type="checkbox" checked={task.completed} onChange={(e) => setTasks(tasks.map((task, index) => index === index ? { ...task, completed: e.target.checked } : task))} />
                        </div>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default Home