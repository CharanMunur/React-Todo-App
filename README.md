# SuperTodo — React + shadcn/ui

A modern Todo application built with React, focusing on clean architecture, derived state, and thoughtful UX.
This project demonstrates best practices for building a scalable, maintainable frontend app—avoiding unnecessary complexity and boilerplate.

---

## Features

- Add, edit, and delete todos
- Title and description support
- Priority and due date on todos
- Subtasks with completion progress
- Sidebar controls for search, filters, sort, and clear completed
- Task detail panel for subtask management
- Mark todos as completed with visual feedback
- Filter todos (All / Pending / Completed)
- Group tasks by date (Overdue, Today, This Week, Later, No Date)
- Sort by default status, priority, or creation date
- Smooth list animations with Framer Motion
- Edit todos via dialog
- Persistent storage via localStorage
- Dark / light theme toggle

---

## Architectural Principles

- Single source of truth via a custom hook: `useTodos`
- Separation of concerns:
  - Domain logic -> `src/hooks/`
  - UI composition -> `src/components/`
  - Infrastructure/providers -> `src/providers/`
- No duplicated or unnecessary derived state
- No business logic in UI components
- Filtering, sorting, and counts handled as derived UI state
- Animations added after core logic for decoupled UX

---

## Tech Stack

- React — UI library
- shadcn/ui — Accessible, composable UI components
- Tailwind CSS — Utility-first styling
- Framer Motion — List animations
- Lucide Icons — Icon library
- date-fns — Date formatting utilities
- react-day-picker — Calendar date picker
- LocalStorage — Client-side persistence

---

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx              # App controls and stats
│   ├── TodoDetail.jsx           # Detail panel (subtasks)
│   ├── TodoInputDialog.jsx      # Add todo dialog (priority, due date, subtasks)
│   ├── TodoInput.jsx            # Inline add todo component and filter dropdown
│   ├── TodoItem.jsx             # Single todo item (edit / delete / toggle)
│   ├── TodoList.jsx             # Rendering only (no filtering)
│   └── ui/                      # shadcn/ui components only
│
├── hooks/
│   └── useTodos.js              # Todo domain logic (state + actions)
│
├── providers/
│   ├── theme-provider.jsx       # Theme context
│   └── features/
│       └── theme/
│           └── mode-toggle.jsx
│
├── lib/
│   └── utils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Getting Started

```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

Open http://localhost:5173 (or as instructed) in your browser to view the app.

---

## Project Notes

- Frontend only: no backend or authentication; pure client-side state and storage.
- Clarity, correctness, and maintainability are top priorities.
- Features added incrementally to avoid architectural drift.
- Designed to be easily extensible without refactoring.

---

## Possible Extensions

- Undo delete (via toast/notification)
- Keyboard shortcuts (navigate, add, delete, edit)
- Sorting by additional fields or custom grouping
- Backend integration (e.g., REST API)
- Drag-and-drop reordering
- Better accessibility / screen reader support
- Tests (unit/integration)

---

## License

[MIT](LICENSE)
