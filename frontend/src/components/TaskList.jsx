import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 text-lg">No tasks yet. Create one to get started! 🎯</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
