import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { 
  Home, 
  MessageSquare, 
  Bot, 
  Zap, 
  Package, 
  FileText, 
  Wrench, 
  PlayCircle, 
  HelpCircle,
  Users,
  CreditCard,
  Settings,
  CheckSquare
} from "lucide-react"

const commands = [
  { id: "home", label: "Home", icon: Home, url: "/", shortcut: "G H" },
  { id: "chat", label: "Chat", icon: MessageSquare, url: "/chat", shortcut: "G C" },
  { id: "agents", label: "Agents", icon: Bot, url: "/agents", shortcut: "G A" },
  { id: "automations", label: "Automations", icon: Zap, url: "/automations", shortcut: "G Z" },
  { id: "models", label: "Model Hub", icon: Package, url: "/models", shortcut: "G M" },
  { id: "prompts", label: "Prompts", icon: FileText, url: "/prompts", shortcut: "G P" },
  { id: "tools", label: "Tools", icon: Wrench, url: "/tools", shortcut: "G T" },
  { id: "playground", label: "Playground", icon: PlayCircle, url: "/playground", shortcut: "G Y" },
  { id: "users", label: "Users & Roles", icon: Users, url: "/admin/users" },
  { id: "billing", label: "Billing & Usage", icon: CreditCard, url: "/admin/billing" },
  { id: "settings", label: "Settings", icon: Settings, url: "/admin/settings" },
  { id: "qa", label: "QA Checklist", icon: CheckSquare, url: "/admin/qa" },
  { id: "help", label: "Help", icon: HelpCircle, url: "/help", shortcut: "?" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="glass-card border-card-border backdrop-glass">
        <CommandInput 
          placeholder="Type a command or search..." 
          className="bg-transparent border-none focus:ring-0"
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {commands.slice(0, 8).map((command) => (
              <CommandItem
                key={command.id}
                onSelect={() => runCommand(() => navigate(command.url))}
                className="glass-button my-1 rounded-lg"
              >
                <command.icon className="mr-2 h-4 w-4" />
                <span>{command.label}</span>
                {command.shortcut && (
                  <kbd className="ml-auto text-xs opacity-50">{command.shortcut}</kbd>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Administration">
            {commands.slice(8, 12).map((command) => (
              <CommandItem
                key={command.id}
                onSelect={() => runCommand(() => navigate(command.url))}
                className="glass-button my-1 rounded-lg"
              >
                <command.icon className="mr-2 h-4 w-4" />
                <span>{command.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Support">
            {commands.slice(12).map((command) => (
              <CommandItem
                key={command.id}
                onSelect={() => runCommand(() => navigate(command.url))}
                className="glass-button my-1 rounded-lg"
              >
                <command.icon className="mr-2 h-4 w-4" />
                <span>{command.label}</span>
                {command.shortcut && (
                  <kbd className="ml-auto text-xs opacity-50">{command.shortcut}</kbd>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  )
}