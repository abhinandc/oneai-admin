import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CommandPalette } from "@/components/CommandPalette"
import { 
  Search, 
  Command, 
  Bell, 
  User, 
  Moon, 
  Sun,
  Settings,
  LogOut
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleNotificationClick = () => {
    console.log("Notifications button clicked!")
    toast({
      title: "Notifications",
      description: "• New API key created\n• Monthly usage report ready\n• Team member added"
    })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="backdrop-blur-2xl bg-background/80 border-b border-border/30 h-16 px-6 flex items-center justify-between z-50 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center">
          <span className="font-display font-semibold text-lg text-foreground tracking-tight">
            ZoneAI <span className="text-foreground-secondary">|</span> Admin
          </span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-lg mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-tertiary" />
          <Input
            placeholder="Search..."
            className="chatgpt-input pl-12 pr-16 bg-background/80 border-border/50 focus:bg-background focus:border-primary/30 h-11"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Badge variant="secondary" className="text-xs font-mono bg-muted/60 border-border/30 px-2 py-1">
              <Command className="w-3 h-3 mr-1" />
              K
            </Badge>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="apple-button w-10 h-10 p-0"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="apple-button w-10 h-10 p-0 relative"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="apple-button w-10 h-10 p-0">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="apple-glass bg-background/95 backdrop-blur-xl border-border/50 w-56 shadow-lg"
          >
            <DropdownMenuItem 
              className="apple-nav-item"
              onClick={() => navigate('/admin/settings')}
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="apple-nav-item"
              onClick={() => navigate('/admin/settings')}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="apple-nav-item text-destructive">
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandPalette />
    </header>
  )
}