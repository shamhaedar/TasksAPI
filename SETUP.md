# 🚀 Running Frontend + Backend Together

## Prerequisites

- .NET 10 SDK installed
- Node.js 16+ installed
- SQL Server LocalDB running

## Backend Setup

### 1. Start the API Server
```bash
cd TasksAPI
dotnet run
```

The API will start at: **`http://localhost:5230`**

You can test it with Swagger: `http://localhost:5230/swagger`

### 2. Create the Database (First Time Only)
The database will auto-create on first run. Check that `TasksDB` exists in:
- SQL Server Object Explorer
- Or run SQL queries in SQL Server Management Studio

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The frontend will start at: **`http://localhost:5173`**

## ✅ Full Integration Checklist

- [x] **CORS Enabled** — Backend allows requests from `http://localhost:5173`
- [x] **API Routes** — All CRUD endpoints working at `/api/Tasks`
- [x] **Database** — SQL Server LocalDB configured
- [x] **UpdateTask Fixed** — Now properly saves priority changes
- [x] **Frontend Connected** — React frontend calling correct API endpoint

## 🎯 Testing the Full Flow

1. **Start Backend**
   ```bash
   cd TasksAPI && dotnet run
   ```

2. **Start Frontend** (in new terminal)
   ```bash
   cd frontend && npm run dev
   ```

3. **Open Browser**
   - Frontend: `http://localhost:5173`
   - API Docs: `http://localhost:5230/swagger`

4. **Try These Actions**
   - ✅ Create a new task
   - ✅ Edit the task
   - ✅ Change priority
   - ✅ Mark as complete
   - ✅ Delete the task
   - ✅ Toggle dark mode

## 🔧 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/Tasks` | Get all tasks |
| GET | `/api/Tasks/{id}` | Get specific task |
| POST | `/api/Tasks` | Create new task |
| PUT | `/api/Tasks/{id}` | Update task |
| DELETE | `/api/Tasks/{id}` | Delete task |

## 📊 Task Model

```json
{
  "id": 1,
  "title": "My Task",
  "description": "Task details",
  "priority": "High",
  "isCompleted": false,
  "createdAt": "2026-05-30T10:30:00"
}
```

## ❌ Troubleshooting

**Frontend can't connect to API?**
- ✅ Check backend is running on port 5230
- ✅ Verify CORS is enabled in Program.cs
- ✅ Check browser console for errors

**Database errors?**
- ✅ Ensure SQL Server LocalDB is running
- ✅ Delete `TasksDB` and restart to recreate it

**Port conflicts?**
- Frontend: Edit `frontend/vite.config.js` → change port
- Backend: Edit `Properties/launchSettings.json` → change port

## 📝 Files Modified

- `Program.cs` — Added CORS policy
- `TasksController.cs` — Fixed UpdateTask to save changes
