# Codex Context — Supertodo

## Project Summary
- React Todo app with a full-height, two-column layout.
- Left sidebar controls; main list center; task detail panel on the right.
- Local-only persistence using `localStorage`.

## Core UX
- Sidebar: add task, search, filters (All/Pending/Completed), sort (default/priority/createdAt), clear completed, stats, theme toggle.
- List: displays tasks with priority badge, due date preview, subtask progress count, selection state.
- Detail panel: task overview + subtasks (add/toggle/delete) and progress bar. Notes + created/updated timestamps removed.
- Add dialog: title, description, priority, due date, and subtasks input with inline list.

## Data Model (useTodos)
- Todo fields: `id`, `title`, `description`, `completed`, `priority`, `createdAt`, `updatedAt`, `dueDate`, `notes`, `subtasks`.
- `dueDate` is rehydrated from JSON string to `Date` on load.
- Actions: `addTodo`, `editTodo`, `toggleTodo`, `deleteTodo`, `clearCompleted`, `addSubtask`, `toggleSubtask`, `deleteSubtask`.

## Motion
- List uses Framer Motion with `layout="position"` and a short tween.
- Detail panel uses `AnimatePresence` + `motion.aside` with subtle slide/fade.

## Date Picker
- Uses `react-day-picker` v9 with shadcn-style Calendar wrapper.
- Custom `Chevron` component for proper nav icons.
- Weekday header spacing fixed via v9 class keys.

## Key Files
- `src/App.jsx` — layout and state (filter/search/sort/selected)
- `src/components/Sidebar.jsx` — controls + stats
- `src/components/TodoList.jsx` — presentation-only list
- `src/components/TodoItem.jsx` — row UI + quick priority + edit dialog
- `src/components/TodoDetail.jsx` — detail panel + subtasks
- `src/components/TodoInputDialog.jsx` — add dialog + subtasks
- `src/components/ui/calendar.jsx` — DayPicker styling
- `src/components/ui/date-picker.jsx` — popover picker with clear action
- `src/hooks/useTodos.js` — domain logic

## Known Decisions
- Theme toggle is a switch (light/dark only).
- Notes are still in the model but not shown in the UI.
- Sidebar is scrollable (`h-screen overflow-y-auto`) to keep stats visible.
