import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../theme-provider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5" />
      <Switch
        id="theme-toggle"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
      />
      <Moon className="h-5 w-5" />
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle theme
      </Label>
    </div>
  );
}
