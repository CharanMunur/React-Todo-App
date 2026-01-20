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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
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

const TodoItem = ({ todo, onEdit, onDelete, onToggle }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  {/* Open edit dialog and set fields */}
  const openEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditOpen(true);
  };

  {/* Save changes */}
  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onEdit(todo.id, { title, description });
    setEditOpen(false);
  };

  return (
    /* --- Motion wrapper for animation --- */
    <motion.div layout transition={{ duration: 0.15, ease: "ease" }}>
      {/* --- Main item block --- */}
      <Item
        variant="outline"
        className="
        transition-colors
        hover:bg-muted/50
        group
        "
      >
        <div className="flex items-center gap-4 w-full">
          {/* --- Checkbox for toggling completion --- */}
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="transition-colors hover:ring-1 "
          />

          {/* --- Title and description --- */}
          <ItemContent className="flex-1">
            <ItemTitle
              className={
                "transition-all" +
                (todo.completed ? " line-through text-muted-foreground/70" : "")
              }
            >
              {todo.title}
            </ItemTitle>
            <ItemDescription
              className={
                "transition-all" +
                (todo.completed ? " line-through text-muted-foreground/70" : "")
              }
            >
              {todo.description}
            </ItemDescription>
          </ItemContent>

          {/* --- Dropdown menu for actions --- */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto transition-colors hover:bg-accent/70 focus-visible:ring-2"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* --- Edit Option --- */}
              <DropdownMenuItem
                onSelect={openEdit}
                className="flex items-center gap-2 hover:bg-primary/10 focus:bg-primary/10"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {/* --- Delete Option --- */}
              <DropdownMenuItem
                onSelect={() => onDelete(todo.id)}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* --- Edit Dialog --- */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSave} className="contents">
                <DialogHeader>
                  <DialogTitle>Edit Todo</DialogTitle>
                  <DialogDescription>
                    Update the title and description of your todo. Press "Save"
                    to apply changes.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor={`edit-todo-title-${todo.id}`}>Title</Label>
                    <Input
                      id={`edit-todo-title-${todo.id}`}
                      name="title"
                      placeholder="Todo title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor={`edit-todo-description-${todo.id}`}>
                      Description
                    </Label>
                    <Input
                      id={`edit-todo-description-${todo.id}`}
                      name="description"
                      placeholder="Todo description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </Item>
    </motion.div>
  );
};

export default TodoItem;
