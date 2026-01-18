# 📝 Todo App — React + shadcn/ui

A modern Todo application built with React, focusing on clean architecture, robust state management, and reusable UI components. This project demonstrates best practices and a scalable structure for React apps.

---

## ✨ Features

- Add, edit, and delete todos
- Title and description support
- Mark todos as completed
- Edit todos via dialog for clean UX
- Persistent storage (localStorage)
- Dark / light theme toggle
- Clean, scalable folder structure

---

## 🧠 Architectural Principles

- **Single source of truth** using a custom hook (`useTodos`)
- **Separation of concerns:**  
  - Domain logic (`hooks/`)  
  - UI components (`components/`)  
  - Infrastructure (providers, context)
- No duplicated state
- No business logic inside UI components
- Derived UI state (no redundant fields)

---

## 🧩 Tech Stack

- **React** — core UI library
- **shadcn/ui** — accessible, composable UI components
- **Tailwind CSS** — utility-first styling
- **Lucide Icons** — icon library
- **LocalStorage** — client-side persistence

---

## 📁 Project Structure

<details>
  <summary><code>src/</code> directory</summary>

```
src/
├── components/
│   ├── TodoInput.jsx        # Add todo dialog
│   ├── TodoItem.jsx         # Single todo item (edit / delete / toggle)
│   ├── TodoList.jsx         # Renders list and wires actions
│   └── ui/                  # shadcn/ui components only
│
├── hooks/
│   └── useTodos.js          # Todo domain logic (state + actions)
│
├── providers/
│   ├── theme-provider.jsx   # Theme context
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
</details>

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

---

## 🔮 Possible Improvements

- Filters (All / Active / Completed)
- Undo delete (toast notification)
- Keyboard shortcuts
- Sorting by creation date
- Backend integration (REST API)

---