import React from "react";
import TodoItem from "./TodoItem";
import { motion } from "framer-motion";
import { AlertTriangle, Calendar, Clock, CalendarDays, Minus } from "lucide-react";

const groupConfig = {
  overdue: {
    title: "已逾期",
    icon: AlertTriangle,
    className: "text-destructive",
  },
  today: {
    title: "今天",
    icon: Clock,
    className: "text-primary",
  },
  thisWeek: {
    title: "本周",
    icon: CalendarDays,
    className: "text-blue-500",
  },
  later: {
    title: "以后",
    icon: Calendar,
    className: "text-muted-foreground",
  },
  noDate: {
    title: "无截止日期",
    icon: Minus,
    className: "text-gray-400",
  },
};

const TodoList = ({
  todos,
  groupedTodos,
  viewMode,
  editTodo,
  toggleTodo,
  deleteTodo,
  onSelectTodo,
  selectedTodoId,
}) => {
  const renderTodoItem = (todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onDelete={deleteTodo}
      onEdit={editTodo}
      onToggle={toggleTodo}
      onSelect={() => onSelectTodo(todo.id)}
      isSelected={todo.id === selectedTodoId}
    />
  );

  const renderListView = () => (
    <motion.div
      layout="position"
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      className="flex flex-col gap-2"
    >
      {todos.map(renderTodoItem)}
    </motion.div>
  );

  const renderGroupedView = () => {
    const groupOrder = ["today", "overdue", "thisWeek", "later", "noDate"];

    return (
      <div className="flex flex-col gap-6">
        {groupOrder.map((groupKey) => {
          const group = groupConfig[groupKey];
          const groupTodos = groupedTodos[groupKey];
          const Icon = group.icon;

          if (groupTodos.length === 0) return null;

          return (
            <div key={groupKey} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 py-1">
                <Icon className={`w-4 h-4 ${group.className}`} />
                <h3 className={`font-semibold text-sm ${group.className}`}>
                  {group.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  ({groupTodos.length})
                </span>
              </div>
              <motion.div
                layout="position"
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-2"
              >
                {groupTodos.map(renderTodoItem)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const hasAnyTodos = todos.length > 0;

  return (
    <div className="flex flex-col gap-2 w-full">
      {!hasAnyTodos ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted p-8 bg-muted/20 my-10">
          <div className="text-lg font-semibold mb-2 text-muted-foreground">
            <span>No tasks match your filters.</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Try changing your filters or adding a new task.
          </div>
        </div>
      ) : viewMode === "dateGroup" ? (
        renderGroupedView()
      ) : (
        renderListView()
      )}
    </div>
  );
};

export default TodoList;
