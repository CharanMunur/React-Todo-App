import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/date-picker";
import { Trash2 } from "lucide-react";

const DESCRIPTION_MAX_LENGTH = 200;

const TodoInputDialog = ({ open, setOpen, addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= DESCRIPTION_MAX_LENGTH) {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTodo(title, description, priority, dueDate, subtasks);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate(null);
    setSubtasks([]);
    setSubtaskInput("");
    setOpen(false);
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    const trimmed = subtaskInput.trim();
    if (!trimmed) return;
    setSubtasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ]);
    setSubtaskInput("");
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="contents">
          <DialogHeader>
            <DialogTitle>Add a New Todo</DialogTitle>
            <DialogDescription>
              Add the details for your new todo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="todo-title">Title</Label>
              <Input
                id="todo-title"
                name="title"
                placeholder="Todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="todo-description">Description</Label>
              <Textarea
                id="todo-description"
                name="description"
                placeholder="Todo description"
                value={description}
                onChange={handleDescriptionChange}
                maxLength={DESCRIPTION_MAX_LENGTH}
              />
              <div className="text-xs text-right text-muted-foreground">
                {description.length} / {DESCRIPTION_MAX_LENGTH}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="todo-priority">Priority</Label>
                <Select onValueChange={setPriority} value={priority}>
                  <SelectTrigger id="todo-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="todo-dueDate">Due Date</Label>
                <DatePicker date={dueDate} setDate={setDueDate} />
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Subtasks</Label>
              {subtasks.length > 0 && (
                <div className="flex flex-col gap-2">
                  {subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-2 rounded-md border px-2 py-1"
                    >
                      <span className="text-sm flex-1">{subtask.text}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a subtask..."
                  value={subtaskInput}
                  onChange={(e) => setSubtaskInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSubtask(e);
                    }
                  }}
                />
                <Button type="button" size="sm" onClick={handleAddSubtask}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Todo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoInputDialog;
