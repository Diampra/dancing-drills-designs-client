import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";

interface ThemeToggleProps {
  variant?: "default" | "scrolled";
}

const ThemeToggle = ({ variant = "default" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`w-9 h-9 ${
        variant === "scrolled" 
          ? "text-foreground hover:bg-muted" 
          : "text-primary-foreground hover:bg-primary-foreground/10"
      }`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
