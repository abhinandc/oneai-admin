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
  Key, 
  TestTube,
  Package, 
  BarChart3, 
  Users, 
  Building, 
  UserCheck, 
  BookOpen, 
  Zap,
  FileBarChart,
  Shield,
  Wrench,
  FlaskConical,
  Settings
} from "lucide-react"

const commands = [
  { id: "virtual-keys", label: "Virtual Keys", icon: Key, url: "/keys/virtual" },
  { id: "test-key", label: "Test Key", icon: TestTube, url: "/keys/test" },
  { id: "models", label: "Models + Endpoints", icon: Package, url: "/models" },
  { id: "usage", label: "Usage", icon: BarChart3, url: "/usage" },
  { id: "teams", label: "Teams", icon: Users, url: "/teams" },
  { id: "internal-users", label: "Internal Users", icon: UserCheck, url: "/internal-users" },
  { id: "api-reference", label: "API Reference", icon: BookOpen, url: "/api-reference" },
  { id: "model-hub", label: "Model Hub", icon: Zap, url: "/model-hub" },
  { id: "logs", label: "Logs", icon: FileBarChart, url: "/logs" },
  { id: "guardrails", label: "Guardrails", icon: Shield, url: "/guardrails" },
  { id: "tools", label: "Tools", icon: Wrench, url: "/tools" },
  { id: "experimental", label: "Experimental", icon: FlaskConical, url: "/experimental" },
  { id: "settings", label: "Settings", icon: Settings, url: "/settings" },
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
            {commands.map((command) => (
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
        </CommandList>
      </div>
    </CommandDialog>
  )
}