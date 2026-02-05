import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Signal,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DatePicker } from "./ui/date-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const priorityVariant = {
  High: "destructive",
  Medium: "secondary",
  Low: "default",
};

const priorityIconColor = {
  High: "text-red-500",
  Medium: "text-yellow-500",
  Low: "text-gray-500",
};

const TodoItem = ({ todo, onEdit, onDelete, onToggle, onSelect, isSelected }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const openEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setPriority(todo.priority);
    setDueDate(todo.dueDate);
    setEditOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onEdit(todo.id, { title, description, priority, dueDate });
    setEditOpen(false);
  };

  const subtaskProgress =
    todo.subtasks.length > 0
      ? `${todo.subtasks.filter((st) => st.completed).length}/${
          todo.subtasks.length
        }`
      : null;

  return (
    <motion.div
      layout="position"
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
    >
      <div
        className={cn(
          "flex items-center gap-4 w-full p-4 rounded-lg border transition-colors cursor-pointer",
          isSelected
            ? "bg-muted"
            : "bg-background hover:bg-muted/50"
        )}
        onClick={onSelect}
      >
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          onClick={(e) => e.stopPropagation()}
          className="transition-colors hover:ring-1"
        />

        <div className="flex-1">
          <p
            className={cn(
              "font-medium",
              todo.completed && "line-through text-muted-foreground/70"
            )}
          >
            {todo.title}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {subtaskProgress && (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{subtaskProgress}</span>
              </div>
            )}
            {todo.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(todo.dueDate), "MMM d")}</span>
              </div>
            )}
          </div>
        </div>

        <Badge variant={priorityVariant[todo.priority]} className="hidden sm:inline-flex">
          {todo.priority}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto transition-colors hover:bg-accent/70 focus-visible:ring-2 h-8 w-8"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onSelect={openEdit}>
              <Pencil className="w-4 h-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Signal className="w-4 h-4 mr-2" />
                <span>Priority</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onSelect={() => onEdit(todo.id, { priority: "High" })}
                >
                  <div className={cn("w-2 h-2 rounded-full mr-2", priorityIconColor.High)} />
                  <span>High</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onEdit(todo.id, { priority: "Medium" })}
                >
                  <div className={cn("w-2 h-2 rounded-full mr-2", priorityIconColor.Medium)} />
                  <span>Medium</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onEdit(todo.id, { priority: "Low" })}
                >
                  <div className={cn("w-2 h-2 rounded-full mr-2", priorityIconColor.Low)} />
                  <span>Low</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem
              onSelect={() => onDelete(todo.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSave} className="contents">
              <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogDescription>
                  Update the details of your todo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-3">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="grid gap-3">
                  <Label>Description</Label>
                  <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label>Priority</Label>
                    <Select onValueChange={setPriority} value={priority}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label>Due Date</Label>
                    <DatePicker date={dueDate} setDate={setDueDate} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default TodoItem;
