import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import ModeToggle from "../providers/features/theme/mode-toggle";
import TodoInputDialog from "./TodoInputDialog";
import { Plus, Search, Star, Trash, LayoutList, Calendar } from "lucide-react";
import { ImGithub } from "react-icons/im";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Sidebar = ({
  todos,
  addTodo,
  clearCompleted,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  sort,
  setSort,
  viewMode,
  setViewMode,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  return (
    <>
      <aside className="w-[380px] border-r bg-background h-screen shrink-0">
        <ScrollArea className="h-full">
          <div className="px-4 py-3 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold flex gap-3 items-center">
                SuperTodo
                <a
                  href="https://github.com/CharanMunur/React-Todo-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <ImGithub />
                </a>
              </h1>
              <ModeToggle />
            </div>

            <Button
              variant="default"
              className="w-full"
              onClick={() => setDialogOpen(true)}
            >
              Add Task <Plus className="w-4 h-4 ml-2" />
            </Button>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <nav className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">View Mode</h2>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  className="flex-1 justify-center gap-2"
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="w-4 h-4" />
                  List
                </Button>
                <Button
                  variant={viewMode === "dateGroup" ? "secondary" : "ghost"}
                  className="flex-1 justify-center gap-2"
                  onClick={() => setViewMode("dateGroup")}
                >
                  <Calendar className="w-4 h-4" />
                  Date Group
                </Button>
              </div>
            </nav>

            <Separator />

            <nav className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant={filter === "All" ? "secondary" : "ghost"}
                className="justify-start gap-2"
                onClick={() => setFilter("All")}
              >
                <LayoutList className="w-4 h-4" />
                All
              </Button>
              <Button
                variant={filter === "Pending" ? "secondary" : "ghost"}
                className="justify-start gap-2"
                onClick={() => setFilter("Pending")}
              >
                <Star className="w-4 h-4" />
                Pending
              </Button>
              <Button
                variant={filter === "Completed" ? "secondary" : "ghost"}
                className="justify-start gap-2"
                onClick={() => setFilter("Completed")}
              >
                <Trash className="w-4 h-4" />
                Completed
              </Button>
            </nav>

            <Separator />

            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold mb-1">Actions</h2>
              <div className="flex gap-2">
                <Select onValueChange={setSort} value={sort}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="createdAt">Creation Date</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="gap-2 whitespace-nowrap"
                  onClick={clearCompleted}
                  disabled={completed === 0}
                >
                  Clear Completed
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Statistics</h2>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total tasks:</span>
                <Badge variant="default">{total}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed:</span>
                <Badge variant="secondary">{completed}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pending:</span>
                <Badge variant="outline">{pending}</Badge>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>

      <TodoInputDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        addTodo={addTodo}
      />
    </>
  );
};

export default Sidebar;
