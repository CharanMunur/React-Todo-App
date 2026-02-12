import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Calendar, Trash2, X } from "lucide-react";

const priorityVariant = {
  High: "destructive",
  Medium: "secondary",
  Low: "default",
};

const TodoDetail = ({
  todo,
  addSubtask,
  toggleSubtask,
  deleteSubtask,
  onClose,
}) => {
  const [newSubtask, setNewSubtask] = useState("");

  if (!todo) return null;

  const subtaskProgress =
    todo.subtasks.length > 0
      ? (todo.subtasks.filter((subTask) => subTask.completed).length /
          todo.subtasks.length) *
        100
      : 0;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      addSubtask(todo.id, newSubtask.trim());
      setNewSubtask("");
    }
  };

  return (
    <motion.aside
      initial={{ x: 16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 16, opacity: 0 }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      className="w-[400px] border-l min-h-screen bg-background p-6 flex flex-col"
    >
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex max-h-screen justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{todo.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <Badge variant={priorityVariant[todo.priority]}>
            {todo.priority} Priority
          </Badge>
          {todo.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(todo.dueDate), "PPP")}</span>
            </div>
          )}
        </div>

        <p className="text-muted-foreground mb-6">{todo.description}</p>

        <Separator className="my-4" />

        {/* Subtasks */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Subtasks</h3>
          {todo.subtasks.length > 0 && (
            <div className="mb-2">
              <Progress value={subtaskProgress} className="h-2" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            {todo.subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-2 group">
                <Checkbox
                  id={`subtask-${subtask.id}`}
                  checked={subtask.completed}
                  onCheckedChange={() => toggleSubtask(todo.id, subtask.id)}
                />
                <label
                  htmlFor={`subtask-${subtask.id}`}
                  className={`flex-1 text-sm ${
                    subtask.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {subtask.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100"
                  onClick={() => deleteSubtask(todo.id, subtask.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddSubtask} className="flex gap-2 mt-2">
            <Input
              placeholder="Add new subtask..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              className="h-8"
            />
            <Button type="submit" size="sm" className="h-8">
              Add
            </Button>
          </form>
        </div>
      </div>
      <div className="pt-4 mt-4 border-t bg-background/80 backdrop-blur">
        <div className="text-xs text-muted-foreground">
          Created: {format(new Date(todo.createdAt), "PPP")}
        </div>
      </div>
    </motion.aside>
  );
};

export default TodoDetail;
