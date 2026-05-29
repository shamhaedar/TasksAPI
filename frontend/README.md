# Tasks Manager Frontend 🎨

A modern React SPA built with Vite, Tailwind CSS, and Axios to manage your tasks.

## Features

✅ **CRUD Operations** — Create, read, update, delete tasks  
✅ **Priority Filtering** — Filter tasks by High, Medium, Low priority  
✅ **Smart Sorting** — Sort by date created, priority, or completion status  
✅ **Dark Mode** — Toggle between light and dark themes  
✅ **Responsive Design** — Works great on desktop and mobile  
✅ **Real-time Updates** — Sync with the backend API  

## Tech Stack

- **React 18** — UI library
- **Vite** — Fast build tool
- **Tailwind CSS** — Styling with dark mode support
- **Axios** — HTTP client for API calls
- **Lucide React** — Beautiful icons

## Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## How to Use

1. **Create a task** — Fill in the form on the left with title, description, and priority
2. **View tasks** — See all your tasks on the right side
3. **Filter by priority** — Select a priority filter to show only specific tasks
4. **Sort tasks** — Choose how to sort: by date, priority, or status
5. **Edit a task** — Click the edit icon to update task details
6. **Complete a task** — Click the checkbox to mark as complete
7. **Delete a task** — Click the trash icon to remove a task
8. **Toggle dark mode** — Click the moon/sun icon in the header

## API Connection

Make sure your TasksAPI is running at `http://localhost:5230`

Vite will proxy API calls from `/api` to the backend automatically.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskItem.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Troubleshooting

**API Connection Failed?**
- Ensure TasksAPI is running on port 5230
- Check CORS settings in your API if requests fail

**Dark mode not working?**
- Clear browser cache
- Check that Tailwind CSS is properly compiled

**Port 5173 already in use?**
- Edit `vite.config.js` and change the port number
