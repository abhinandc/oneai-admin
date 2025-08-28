import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Plus, 
  ChevronDown,
  Shield,
  Filter,
  RotateCcw,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Guardrail {
  id: string
  name: string
  provider: string
  mode: string
  defaultOn: boolean
  createdAt: string
  updatedAt: string
  description?: string
  rules?: string[]
}

const mockGuardrails: Guardrail[] = [
  // Currently empty to match the "No guardrails found" state
]

export default function Guardrails() {
  const [guardrails] = useState<Guardrail[]>(mockGuardrails)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newGuardrail, setNewGuardrail] = useState({
    name: "",
    provider: "",
    mode: "",
    defaultOn: false,
    description: "",
    rules: ""
  })

  const handleAddGuardrail = () => {
    // Logic to add new guardrail would go here
    console.log("Adding guardrail:", newGuardrail)
    setIsAddDialogOpen(false)
    setNewGuardrail({
      name: "",
      provider: "",
      mode: "",
      defaultOn: false,
      description: "",
      rules: ""
    })
  }

  const getDefaultBadge = (defaultOn: boolean) => {
    return (
      <Badge 
        className={defaultOn 
          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
        }
      >
        {defaultOn ? "On" : "Off"}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Guardrails</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Configure and manage safety guardrails for your AI models
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="glass-button bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Guardrail
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Guardrail</DialogTitle>
                <DialogDescription>
                  Create a new safety guardrail to protect your AI models and users.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Guardrail Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Content Filter"
                      value={newGuardrail.name}
                      onChange={(e) => setNewGuardrail({...newGuardrail, name: e.target.value})}
                      className="glass-card bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider</Label>
                    <Select value={newGuardrail.provider} onValueChange={(value) => setNewGuardrail({...newGuardrail, provider: value})}>
                      <SelectTrigger className="glass-card bg-background/50">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                        <SelectItem value="azure">Azure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mode">Mode</Label>
                    <Select value={newGuardrail.mode} onValueChange={(value) => setNewGuardrail({...newGuardrail, mode: value})}>
                      <SelectTrigger className="glass-card bg-background/50">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                        <SelectItem value="input">Input Filter</SelectItem>
                        <SelectItem value="output">Output Filter</SelectItem>
                        <SelectItem value="both">Input & Output</SelectItem>
                        <SelectItem value="content">Content Moderation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultOn">Default State</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch 
                        id="defaultOn"
                        checked={newGuardrail.defaultOn}
                        onCheckedChange={(checked) => setNewGuardrail({...newGuardrail, defaultOn: checked})}
                      />
                      <Label htmlFor="defaultOn" className="text-sm">
                        {newGuardrail.defaultOn ? "On by default" : "Off by default"}
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this guardrail does..."
                    value={newGuardrail.description}
                    onChange={(e) => setNewGuardrail({...newGuardrail, description: e.target.value})}
                    className="glass-card bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">Rules Configuration</Label>
                  <Textarea
                    id="rules"
                    placeholder="Enter guardrail rules and configuration..."
                    value={newGuardrail.rules}
                    onChange={(e) => setNewGuardrail({...newGuardrail, rules: e.target.value})}
                    className="glass-card bg-background/50"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddGuardrail} className="glass-button bg-primary hover:bg-primary/90">
                    Create Guardrail
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search guardrails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-card bg-background/50"
            />
          </div>
          <Button variant="outline" className="glass-button" onClick={() => console.log("Filters button clicked!")}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="glass-button" onClick={() => console.log("Reset Filters button clicked!")}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        {/* Guardrails Table */}
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-card-border/50">
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Guardrail ID
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Name
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Provider
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Mode
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Default On
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Created At
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Updated At
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guardrails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <Shield className="w-12 h-12 text-foreground-tertiary" />
                        <div className="space-y-2">
                          <p className="text-foreground-tertiary font-medium">No guardrails found</p>
                          <p className="text-sm text-foreground-secondary">
                            Create your first guardrail to start protecting your AI models
                          </p>
                        </div>
                        <Button 
                          onClick={() => setIsAddDialogOpen(true)}
                          className="glass-button bg-primary hover:bg-primary/90"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Guardrail
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  guardrails.map((guardrail) => (
                    <TableRow key={guardrail.id} className="border-card-border/50">
                      <TableCell className="font-mono text-sm text-primary">
                        {guardrail.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {guardrail.name}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {guardrail.provider}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                          {guardrail.mode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getDefaultBadge(guardrail.defaultOn)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {guardrail.createdAt}
                      </TableCell>
                      <TableCell className="text-sm">
                        {guardrail.updatedAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                            <DropdownMenuItem className="glass-button">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Guardrail
                            </DropdownMenuItem>
                            <DropdownMenuItem className="glass-button">
                              <Shield className="mr-2 h-4 w-4" />
                              View Rules
                            </DropdownMenuItem>
                            <DropdownMenuItem className="glass-button text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Guardrail
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </GlassCard>

        {/* Info Section */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              About Guardrails
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Input Filtering</h4>
                <p className="text-foreground-secondary">
                  Filter and validate user inputs before they reach your AI models to prevent harmful prompts.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Output Moderation</h4>
                <p className="text-foreground-secondary">
                  Monitor and filter AI model outputs to ensure they meet your safety and compliance standards.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Custom Rules</h4>
                <p className="text-foreground-secondary">
                  Define custom safety rules and policies tailored to your specific use case and requirements.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}