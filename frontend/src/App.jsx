import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Moon, Sun } from 'lucide-react'

const API_URL = 'http://localhost:5230/api/Tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [filterPriority, setFilterPriority] = useState('All')
  const [sortBy, setSortBy] = useState('created')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      setTasks(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load tasks')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData)
      setTasks([...tasks, response.data])
      setError(null)
    } catch (err) {
      setError('Failed to create task')
      console.error(err)
    }
  }

  const handleUpdateTask = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData)
      setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedData } : t))
      setError(null)
    } catch (err) {
      setError('Failed to update task')
      console.error(err)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setTasks(tasks.filter(t => t.id !== id))
      setError(null)
    } catch (err) {
      setError('Failed to delete task')
      console.error(err)
    }
  }

  const filteredAndSortedTasks = tasks
    .filter(task => filterPriority === 'All' || task.priority === filterPriority)
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 }
        return (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1)
      }
      if (sortBy === 'status') {
        return a.isCompleted - b.isCompleted
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">📋 Tasks Manager</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-900 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <TaskForm onSubmit={handleCreateTask} />
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Filter by Priority
                  </label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option>All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="created">Date Created</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
                </div>
              ) : (
                <TaskList
                  tasks={filteredAndSortedTasks}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
