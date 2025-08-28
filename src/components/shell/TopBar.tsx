import { Search, Bell, User, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopBar() {
  return (
    <header className="h-16 glass-card border-b border-card-border/50 backdrop-glass sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="glass-button" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">OA</span>
            </div>
            <span className="font-semibold text-foreground">OneAI Admin</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
            <Input
              placeholder="Search or press ⌘K"
              className="glass-button pl-10 pr-4 bg-glass/60 border-input-border focus:bg-glass-hover/70"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                <Command className="w-3 h-3 mr-0.5" />K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="glass-button">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="glass-button">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}