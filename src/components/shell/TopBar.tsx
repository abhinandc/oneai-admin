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
    <header className="frosted-glass border-b border-border/20 h-16 px-6 flex items-center justify-between z-50 sticky top-0">
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
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-tertiary transition-colors group-hover:text-primary" />
          <Input
            placeholder="Search..."
            className="liquid-input pl-12 pr-16 h-11"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Badge variant="secondary" className="text-xs font-mono frosted-glass px-2.5 py-1 font-semibold">
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
          className="liquid-button w-11 h-11 p-0 hover:scale-105 transition-transform"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </Button>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="liquid-button w-11 h-11 p-0 relative hover:scale-105 transition-transform"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground border-0 shadow-lg glow-primary">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="liquid-button w-11 h-11 p-0 hover:scale-105 transition-transform">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="frosted-glass w-56 shadow-2xl p-2 rounded-2xl"
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