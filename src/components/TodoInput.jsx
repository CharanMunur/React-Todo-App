import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";

const TodoInput = ({ addTodo, onFilterChange, filter }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title, description);
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <div className="flex w-full space-x-2">
      <div className="flex-3 w-3/4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              Add Task <Plus className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit} className="contents">
              <DialogHeader>
                <DialogTitle>Add a New Todo</DialogTitle>
                <DialogDescription>
                  Add a title and description for your todo. Press "Add Todo" to
                  save.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="todo-title">Title</Label>
                  <Input
                    id="todo-title"
                    name="title"
                    placeholder="Todo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="todo-description">Description</Label>
                  <Input
                    id="todo-description"
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
                <Button type="submit">Add Todo</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Filter Dropdown */}
      <div className="flex-1 w-1/4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 focus-visible:ring-2 transition-colors"
            >
              {filter} <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[142px] py-1" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex items-center px-3 py-2 rounded-md focus:bg-accent/20 transition-colors"
                onSelect={() => onFilterChange("All")}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center px-3 py-2 rounded-md focus:bg-accent/20 transition-colors"
                onSelect={() => onFilterChange("Completed")}
              >
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center px-3 py-2 rounded-md focus:bg-accent/20 transition-colors"
                onSelect={() => onFilterChange("Pending")}
              >
                Pending
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TodoInput;
