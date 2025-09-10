import React, { useState, useEffect } from 'react'
import { todoAPI } from '../services/api'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Load todos on component mount
    useEffect(() => {
        loadTodos()
    }, [])

    const loadTodos = async () => {
        try {
            setLoading(true)
            setError(null)
            const todos = await todoAPI.getTodos()
            setTasks(todos)
        } catch (err) {
            setError('Failed to load todos')
            console.error('Error loading todos:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddTask = async () => {
        if (!title.trim()) return
        
        try {
            setError(null)
            const newTodo = await todoAPI.createTodo({ title, description })
            setTasks([...tasks, newTodo])
            setTitle('')
            setDescription('')
        } catch (err) {
            setError('Failed to add todo')
            console.error('Error adding todo:', err)
        }
    }

    const handleToggleComplete = async (taskId, completed) => {
        try {
            setError(null)
            const updatedTodo = await todoAPI.toggleTodo(taskId, completed)
            setTasks(tasks.map(task => 
                task.id === taskId ? updatedTodo : task
            ))
        } catch (err) {
            setError('Failed to update todo')
            console.error('Error updating todo:', err)
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            setError(null)
            await todoAPI.deleteTodo(taskId)
            setTasks(tasks.filter(task => task.id !== taskId))
        } catch (err) {
            setError('Failed to delete todo')
            console.error('Error deleting todo:', err)
        }
    }

    return (
        <div className='px-10 flex items-center flex-col gap-4 h-full w-full'>
            <h1 className='text-4xl font-bold'>Task Manager</h1>
            
            {/* Error Display */}
            {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded min-w-[500px]'>
                    {error}
                </div>
            )}

            {/* Add Task Form */}
            <div className='flex items-center w-full flex-col gap-4'>
                <input 
                    type="text" 
                    placeholder='Title' 
                    className='min-w-[500px] border-1 border-black rounded-md p-2' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <textarea 
                    placeholder='Description (optional)' 
                    className='min-w-[500px] border-1 border-black rounded-md p-2' 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button 
                    className='min-w-24 rounded-md p-2 bg-blue-400 text-white cursor-pointer disabled:bg-gray-400' 
                    onClick={handleAddTask}
                    disabled={!title.trim() || loading}
                >
                    {loading ? 'Adding...' : 'Add Task'}
                </button>
            </div>

            {/* Loading State */}
            {loading && tasks.length === 0 && (
                <div className='text-gray-600'>Loading todos...</div>
            )}

            {/* Tasks Display */}
            <div className='w-full flex flex-wrap gap-4'>
                {tasks.length === 0 && !loading ? (
                    <div className='w-full text-center text-gray-500 py-8'>
                        No tasks yet. Add one above!
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div 
                            className={`min-w-[300px] min-h-[150px] border-1 border-black rounded-md p-2 ${
                                task.completed ? 'bg-green-100' : 'bg-yellow-100'
                            }`} 
                            key={task.id}
                        >
                            <div className='flex items-center justify-between gap-2 mb-2'>
                                <h2 className='font-bold flex-1'>{task.title}</h2>
                                <input 
                                    type="checkbox" 
                                    checked={task.completed || false} 
                                    onChange={(e) => handleToggleComplete(task.id, e.target.checked)}
                                    className="cursor-pointer"
                                />
                            </div>
                            <p className='text-sm text-gray-700 mb-2'>{task.description}</p>
                            <div className='flex justify-between items-center'>
                                <span className={`text-xs px-2 py-1 rounded ${
                                    task.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                                }`}>
                                    {task.completed ? 'Completed' : 'Pending'}
                                </span>
                                <button 
                                    onClick={() => handleDeleteTask(task.id)}
                                    className='text-red-600 hover:text-red-800 text-sm font-medium'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Home