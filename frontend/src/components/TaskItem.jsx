import React, { useState } from 'react'
import { Trash2, Edit2, Check } from 'lucide-react'

const priorityColors = {
  High: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  Medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  Low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
}

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedPriority, setEditedPriority] = useState(task.priority)

  const handleSave = () => {
    onUpdate(task.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      isCompleted: task.isCompleted
    })
    setIsEditing(false)
  }

  const handleToggleComplete = () => {
    onUpdate(task.id, {
      title: task.title,
      description: task.description,
      priority: task.priority,
      isCompleted: !task.isCompleted
    })
  }

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows="3"
        />
        <select
          value={editedPriority}
          onChange={(e) => setEditedPriority(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            ✓ Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition"
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 ${
      task.isCompleted ? 'border-green-500 opacity-75' : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={handleToggleComplete}
              className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                task.isCompleted
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
              }`}
            >
              {task.isCompleted && <Check size={16} className="text-white" />}
            </button>
            <h3 className={`text-lg font-semibold ${
              task.isCompleted
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p className="text-gray-600 dark:text-gray-400 ml-9 mb-3">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-2 ml-9">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[task.priority] || priorityColors.Medium}`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 py-1">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"
            aria-label="Edit task"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
            aria-label="Delete task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
