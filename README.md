# TaskFlow

A task management tool built with React, Vite, Tailwind CSS v4, React Router and GSAP.
Admins create and assign tasks and follow progress. Employees accept tasks and finish them.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo accounts

| Role     | Email               | Password   |
| -------- | ------------------- | ---------- |
| Admin    | admin@example.com   | admin123   |
| Employee | shilpa@example.com  | shilpa123  |
| Employee | rahul@example.com   | rahul123   |
| Employee | priya@example.com   | priya123   |
| Employee | aman@example.com    | aman123    |
| Employee | neha@example.com    | neha123    |

To reset the demo data, clear the site's local storage in DevTools (Application tab) and refresh.

## Routes

| Path                | Who      | Page                                   |
| ------------------- | -------- | -------------------------------------- |
| `/login`            | everyone | Log in                                 |
| `/admin`            | admin    | Overview: counts, progress, latest     |
| `/admin/tasks`      | admin    | All tasks, filter, reassign, delete    |
| `/admin/tasks/new`  | admin    | Create and assign a task               |
| `/admin/employees`  | admin    | Progress per employee                  |
| `/employee`         | employee | My tasks: accept, complete, fail       |

Logged-out visitors are sent to `/login`. People who open the other role's area are sent back to their own.

## Task flow

```
new  ->  active  ->  completed
                 ->  failed
```

- Admin creates a task: it starts as `new`.
- Admin can reassign or delete a task only while it is `new`.
- Employee accepts it (`active`), then marks it `completed` or `failed`.

## Folder guide

```
src/
  main.jsx                 providers + router
  App.jsx                  all routes, sidebar links
  index.css                theme colours (light + dark), gradient and button styles
  context/
    ThemeContext.jsx       light / dark theme
    AuthProvider.jsx       login, logout, current user
    TaskProvider.jsx       tasks: add, change status, delete, reassign
    ToastContext.jsx       small success / error messages
  pages/
    Login.jsx  NotFound.jsx
    admin/     Overview, ManageTasks, CreateTask, Employees
    employee/  MyTasks
  components/
    layout/    DashboardLayout (sidebar + top bar), ProtectedRoute
    ui/        TaskCard, StatCard, StatusBadge, FilterTabs, ...
  hooks/useReveal.js       GSAP fade-in used by every page
  utils/                   status rules, date helpers, storage helpers
  data/                    users.json, tasks.json (starting data)
```

## Changing the look

Open `src/index.css`. The colours for both themes and the gradient stops
(`--g1`, `--g2`, `--g3`) are at the top. Change them there and the whole app follows.

## Important: this is a prototype

Users, passwords and tasks live in the browser. Anyone can read them in DevTools.
A real version needs a backend with hashed passwords and server-side role checks.
