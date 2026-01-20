# 📝 Todo App — React + shadcn/ui

A modern Todo application built with React, focusing on **clean architecture**, derived state, and thoughtful UX.  
This project demonstrates best practices for building a scalable, maintainable frontend app—avoiding unnecessary complexity and boilerplate.

---

## ✨ Features

- **Add, edit, and delete todos**
- Support for todo **title and description**
- **Mark** todos as completed (with visual feedback)
- **Filter todos** (`All` / `Pending` / `Completed`)
- **Completed tasks** automatically move to the bottom
- **Contextual empty states** for each filter
- **Smooth reordering animations** (with [Framer Motion](https://www.framer.com/motion/))
- Edit todos via **accessible dialog**
- **Persistent storage** via `localStorage`
- **Dark / light theme** toggle
- **Clean, maintainable folder structure**

---

## 🧠 Architectural Principles

- **Single source of truth** via a custom hook: `useTodos`
- **Separation of concerns:**
  - **Domain logic** → [`hooks/`](src/hooks/)
  - **UI composition** → [`components/`](src/components/)
  - **Infrastructure/providers** → [`providers/`](src/providers/)
- **No duplicated or unnecessary derived state**
- **No business logic in UI components**
- Filtering, sorting and counts handled as **derived UI state**
- Animations added after core logic for **decoupled UX**

---

## 🧩 Tech Stack

- [React](https://react.dev/) — UI library
- [shadcn/ui](https://ui.shadcn.com/) — Accessible, composable UI components
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — List animations
- [Lucide Icons](https://lucide.dev/) — Icon library
- LocalStorage — Client-side persistence

---

## 📁 Project Structure

<details>
  <summary><code>src/</code> directory</summary>

```
src/
├── components/
│   ├── TodoInput.jsx          # Add todo dialog + filter control
│   ├── TodoItem.jsx           # Single todo item (edit / delete / toggle)
│   ├── TodoList.jsx           # Filtering, sorting, rendering, stats
│   └── ui/                    # shadcn/ui components only
│
├── hooks/
│   └── useTodos.js            # Todo domain logic (state + actions)
│
├── providers/
│   ├── theme-provider.jsx     # Theme context
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

```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or as instructed) in your browser to view the app.

---

## 📌 Project Notes

- **Frontend only:** No backend or authentication; pure client-side state and storage.
- **Clarity, correctness, and maintainability** are top priorities.  
- **Features added incrementally** to avoid architectural drift.
- Designed to be **easily extensible** without refactoring.

---

## 🧩 Possible Extensions

These are ideas for future enhancements, **not yet implemented:**

- Undo delete (via toast/notification)
- Keyboard shortcuts (navigate, add, delete, edit)
- Sorting by creation date or custom fields
- Backend integration (e.g., REST API)
- Drag-and-drop reordering
- Better accessibility / screen reader support
- Tests (unit/integration)

---

## 🙌 Contributing

Pull requests and suggestions are welcome! Feel free to fork and submit a PR.

---

## 📄 License

[MIT](LICENSE)

---