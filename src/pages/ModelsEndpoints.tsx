import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Plus, 
  MoreHorizontal, 
  ChevronDown,
  Calendar,
  Filter,
  Copy,
  Edit,
  Trash2,
  Play,
  RefreshCw,
  BarChart3,
  Settings,
  HelpCircle
} from "lucide-react"

interface Model {
  id: string
  modelName: string
  modelInfo: string
  credentials: string
  createdBy: string
  updatedAt: string
  costs: string
  teamId: string
  modelAccessGroup: string
  status: "active" | "inactive"
}

const mockModels: Model[] = [
  {
    id: "gpt35a4-8dc...",
    modelName: "gpt-3.5-chat",
    modelInfo: "gpt-3.5-chat",
    credentials: "No credentials",
    createdBy: "Unknown",
    updatedAt: "8/27/2025",
    costs: "In: $1.25 Out: $50.00",
    teamId: "",
    modelAccessGroup: "US Model",
    status: "active"
  },
  {
    id: "7118371f-c82...",
    modelName: "gpt-5-nano",
    modelInfo: "gpt-5-nano",
    credentials: "No credentials",
    createdBy: "Unknown", 
    updatedAt: "8/27/2025",
    costs: "In: $0.05 Out: $0.40",
    teamId: "",
    modelAccessGroup: "US Model",
    status: "active"
  },
  {
    id: "364ff744-dcc...",
    modelName: "gpt-5-2025-08-07",
    modelInfo: "gpt-5-2025-08-07",
    credentials: "No credentials",
    createdBy: "Unknown",
    updatedAt: "8/27/2025", 
    costs: "In: $1.25 Out: $50.00",
    teamId: "",
    modelAccessGroup: "US Model",
    status: "active"
  },
  {
    id: "5ea88b1a-e8a...",
    modelName: "gpt-4o-mini",
    modelInfo: "gpt-4o-mini",
    credentials: "No credentials",
    createdBy: "Unknown",
    updatedAt: "8/27/2025",
    costs: "In: $0.15 Out: $0.60",
    teamId: "",
    modelAccessGroup: "US Model", 
    status: "active"
  },
  {
    id: "b9074231-f9a...",
    modelName: "gpt-4o-mini-search-preview",
    modelInfo: "gpt-4o-mini-search-preview",
    credentials: "No credentials",
    createdBy: "Unknown",
    updatedAt: "8/27/2025",
    costs: "In: $0.15 Out: $0.60",
    teamId: "",
    modelAccessGroup: "US Model",
    status: "active"
  }
]

export default function ModelsEndpoints() {
  const [models, setModels] = useState<Model[]>(mockModels)
  const [currentTeam, setCurrentTeam] = useState("Personal")
  const [viewType, setViewType] = useState("Current Team Models")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  const [modelAccessFilter, setModelAccessFilter] = useState("All Model Access Groups")
  const [showAddModelDialog, setShowAddModelDialog] = useState(false)
  const [showAutoRouterDialog, setShowAutoRouterDialog] = useState(false)
  const [showCredentialDialog, setShowCredentialDialog] = useState(false)
  const [showPassThroughDialog, setShowPassThroughDialog] = useState(false)
  const [showAliasDialog, setShowAliasDialog] = useState(false)
  const [newModelName, setNewModelName] = useState("")
  const [newModelProvider, setNewModelProvider] = useState("")
  const [newModelCredentials, setNewModelCredentials] = useState("")
  const [newModelCosts, setNewModelCosts] = useState("")
  const [newModelTeamId, setNewModelTeamId] = useState("")
  const [newModelAccessGroup, setNewModelAccessGroup] = useState("")
  const [newModelStatus, setNewModelStatus] = useState<"active" | "inactive">("active")
  const [newCredentialProvider, setNewCredentialProvider] = useState("")
  const [newCredentialApiKey, setNewCredentialApiKey] = useState("")
  const [newAliasName, setNewAliasName] = useState("")
  const [newAliasTarget, setNewAliasTarget] = useState("")

  const handleAddModel = () => {
    console.log("Add Model button clicked!")
    setShowAddModelDialog(true)
  }

  const handleAddAutoRouter = () => {
    console.log("Add Auto Router button clicked!")
    setShowAutoRouterDialog(true)
  }

  const handleSaveModel = () => {
    const newModel: Model = {
      id: `model_${Date.now()}`,
      modelName: newModelName || "New Model",
      modelInfo: newModelProvider || "Custom Provider",
      credentials: newModelCredentials || "No credentials",
      createdBy: "Current User",
      updatedAt: new Date().toLocaleDateString(),
      costs: newModelCosts || "In: $0.10 Out: $0.30",
      teamId: newModelTeamId || "",
      modelAccessGroup: newModelAccessGroup || "US Model",
      status: newModelStatus
    }
    
    setModels([newModel, ...models])
    setShowAddModelDialog(false)
    // Reset form
    setNewModelName("")
    setNewModelProvider("")
    setNewModelCredentials("")
    setNewModelCosts("")
    setNewModelTeamId("")
    setNewModelAccessGroup("")
    setNewModelStatus("active")
    console.log("Created new model:", newModel)
  }

  const handleAddCredential = () => {
    console.log("Add LLM Credential button clicked!")
    setShowCredentialDialog(true)
  }

  const handleSaveCredential = () => {
    console.log("Saved new credential:", { provider: newCredentialProvider, apiKey: newCredentialApiKey })
    setShowCredentialDialog(false)
    setNewCredentialProvider("")
    setNewCredentialApiKey("")
  }

  const handleAddPassThrough = () => {
    console.log("Add Pass-Through Endpoint button clicked!")
    setShowPassThroughDialog(true)
  }

  const handleRunAllChecks = () => {
    console.log("Run All Checks button clicked!")
    // Simulate running health checks
    setTimeout(() => {
      console.log("All health checks completed")
    }, 2000)
  }

  const handleAddAlias = () => {
    console.log("Add Alias button clicked!")
    setShowAliasDialog(true)
  }

  const handleSaveAlias = () => {
    console.log("Saved new alias:", { name: newAliasName, target: newAliasTarget })
    setShowAliasDialog(false)
    setNewAliasName("")
    setNewAliasTarget("")
  }

  const handleReloadPriceData = () => {
    console.log("Reload Price Data button clicked!")
    // Simulate reloading price data
    setTimeout(() => {
      console.log("Price data reloaded successfully")
    }, 1500)
  }

  const handleEditModel = (modelId: string) => {
    console.log("Edit Model clicked for:", modelId)
    // Open edit dialog
  }

  const handleCloneModel = (modelId: string) => {
    console.log("Clone Model clicked for:", modelId)
    // Clone model logic
  }

  const handleDeleteModel = (modelId: string) => {
    console.log("Delete Model clicked for:", modelId)
    // Replace confirm with toast - in real app, use a proper dialog
    setModels(models.filter(m => m.id !== modelId))
    toast({
      title: "Model deleted",
      description: "Model has been successfully deleted from your configuration."
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Model Management</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Add and manage models for the proxy
            </p>
          </div>
          <div className="text-xs text-foreground-tertiary">
            Last Refreshed: 8/27/2025, 8:19:36 PM
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all-models" className="w-full">
          <TabsList className="glass-card bg-background/50 p-1">
            <TabsTrigger value="all-models" className="glass-button">All Models</TabsTrigger>
            <TabsTrigger value="add-model" className="glass-button">Add Model</TabsTrigger>
            <TabsTrigger value="llm-credentials" className="glass-button">LLM Credentials</TabsTrigger>
            <TabsTrigger value="pass-through" className="glass-button">Pass-Through Endpoints</TabsTrigger>
            <TabsTrigger value="health-status" className="glass-button">Health Status</TabsTrigger>
            <TabsTrigger value="analytics" className="glass-button">Model Analytics</TabsTrigger>
            <TabsTrigger value="retry-settings" className="glass-button">Model Retry Settings</TabsTrigger>
            <TabsTrigger value="group-alias" className="glass-button">Model Group Alias</TabsTrigger>
            <TabsTrigger value="price-reload" className="glass-button">Price Data Reload</TabsTrigger>
          </TabsList>

          {/* All Models Tab */}
          <TabsContent value="all-models" className="space-y-4">
            {/* Team and View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Current Team:</Label>
                <Select value={currentTeam} onValueChange={setCurrentTeam}>
                  <SelectTrigger className="w-32 glass-card bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Team A">Team A</SelectItem>
                    <SelectItem value="Team B">Team B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">View:</Label>
                <Select value={viewType} onValueChange={setViewType}>
                  <SelectTrigger className="w-48 glass-card bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="Current Team Models">Current Team Models</SelectItem>
                    <SelectItem value="All Models">All Models</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Info Alert */}
            <GlassCard className="p-4 bg-blue-50/10 border-blue-200/20">
              <p className="text-sm text-foreground-secondary">
                To access these models, Create a Virtual key without selecting a team on the Virtual Keys page
              </p>
            </GlassCard>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search Public Model Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-card bg-background/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search model names..."
                  className="w-48 glass-card bg-background/50"
                />
                <Select value="All Models" onValueChange={() => {}}>
                  <SelectTrigger className="w-32 glass-card bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="All Models">All Models</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Filter by Model Access Group:</Label>
                <Select value={modelAccessFilter} onValueChange={setModelAccessFilter}>
                  <SelectTrigger className="w-48 glass-card bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="All Model Access Groups">All Model Access Groups</SelectItem>
                    <SelectItem value="US Model">US Model</SelectItem>
                    <SelectItem value="EU Model">EU Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-sm text-foreground-secondary">
              Showing 5 results
            </p>

            {/* Models Table */}
            <GlassCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-card-border/50">
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Model ID
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Model Information
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Credentials
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Created By
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
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Costs
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>Team ID</TableHead>
                      <TableHead>Model Access Group</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {models.map((model) => (
                      <TableRow key={model.id} className="border-card-border/50">
                        <TableCell className="font-mono text-sm text-primary">
                          {model.id}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{model.modelName}</div>
                            <div className="text-sm text-foreground-secondary">{model.modelInfo}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground-tertiary">
                          {model.credentials}
                        </TableCell>
                        <TableCell className="text-sm">
                          {model.createdBy}
                        </TableCell>
                        <TableCell className="text-sm">
                          {model.updatedAt}
                        </TableCell>
                        <TableCell className="text-sm">
                          {model.costs}
                        </TableCell>
                        <TableCell className="text-sm">
                          {model.teamId || <span className="text-foreground-tertiary">-</span>}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="glass-button text-primary">
                            {model.modelAccessGroup}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={model.status === "active" ? "default" : "secondary"} className="glass-button">
                            {model.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                              <DropdownMenuItem className="glass-button" onClick={() => handleEditModel(model.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Model
                              </DropdownMenuItem>
                              <DropdownMenuItem className="glass-button" onClick={() => handleCloneModel(model.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Clone Model
                              </DropdownMenuItem>
                              <DropdownMenuItem className="glass-button text-destructive" onClick={() => handleDeleteModel(model.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Model
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Add Model Tab */}
          <TabsContent value="add-model" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleAddModel}>
                  Add Model
                </Button>
                <Button variant="outline" className="glass-button" onClick={handleAddAutoRouter}>
                  Add Auto Router
                </Button>
              </div>
            </div>

            <GlassCard className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Add Model</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Provider <HelpCircle className="inline w-3 h-3 ml-1 opacity-50" />
                    </Label>
                    <Select>
                      <SelectTrigger className="glass-card bg-background/50">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="microsoft">Microsoft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Model Mappings <HelpCircle className="inline w-3 h-3 ml-1 opacity-50" />
                    </Label>
                    <div className="text-sm text-foreground-secondary mb-2">
                      Either select existing credentials OR enter new provider credentials below
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Existing Credentials:</Label>
                      <Select>
                        <SelectTrigger className="glass-card bg-background/50">
                          <SelectValue placeholder="Select or search for existing credentials" />
                        </SelectTrigger>
                        <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                          <SelectItem value="cred1">Credential 1</SelectItem>
                          <SelectItem value="cred2">Credential 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-center py-2">
                      <span className="text-sm text-foreground-tertiary">OR</span>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">API Base:</Label>
                      <Input
                        placeholder="https://api.openai.com/v1"
                        className="glass-card bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">OpenAI Organization ID:</Label>
                      <Input
                        placeholder="[OPTIONAL] my-unique-org"
                        className="glass-card bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">
                        OpenAI API Key: <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="password"
                        placeholder="Type..."
                        className="glass-card bg-background/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      LiteLLM Model Name(s) <HelpCircle className="inline w-3 h-3 ml-1 opacity-50" />
                    </Label>
                    <Input
                      placeholder="gpt-3.5-turbo"
                      className="glass-card bg-background/50"
                    />
                    <div className="text-xs text-foreground-secondary">
                      The model name LiteLLM will send to the LLM API
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Public Model Name <HelpCircle className="inline w-3 h-3 ml-1 opacity-50" />
                      </Label>
                      <Input className="glass-card bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">
                        LiteLLM Model Name <HelpCircle className="inline w-3 h-3 ml-1 opacity-50" />
                      </Label>
                      <Input
                        placeholder="No data"
                        className="glass-card bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Mode:</Label>
                    <Input className="glass-card bg-background/50" />
                    <div className="text-xs text-foreground-secondary">
                      Optional - LiteLLM endpoint to use when health checking this model.{" "}
                      <a href="#" className="text-primary hover:underline">Learn more</a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Team-BYOK Model <HelpCircle className="inline w-3 h-3 ml-1 opacity-50" />
                      </Label>
                      <Switch />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">
                        Model Access Group <HelpCircle className="inline w-3 h-3 ml-1 opacity-50" />
                      </Label>
                      <Input
                        placeholder="Select existing groups or type to create new ones"
                        className="glass-card bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Additional Model Info Settings</Label>
                      <Textarea
                        placeholder="Additional settings..."
                        className="glass-card bg-background/50 min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="border-t border-card-border/50 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium">Advanced Settings</h4>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" className="glass-button text-primary">
                  Need Help?
                </Button>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="glass-button">
                    Test Connect
                  </Button>
                  <Button className="glass-button bg-primary hover:bg-primary/90">
                    Add Model
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Other Tabs - Placeholder Content */}
          <TabsContent value="llm-credentials" className="space-y-4">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">LLM Credentials</h3>
                <p className="text-foreground-secondary">
                  Configure credentials for different AI providers. Add and manage your API credentials.
                </p>
                <div className="space-y-4">
                  <div className="text-center text-foreground-tertiary">
                    No credentials configured
                  </div>
              <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleAddCredential}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Credential
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="pass-through" className="space-y-4">
            <GlassCard className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Pass Through Endpoints</h3>
                    <p className="text-sm text-foreground-secondary">
                      Configure and manage your pass-through endpoints
                    </p>
                  </div>
                  <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleAddPassThrough}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Pass-Through Endpoint
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="border-card-border/50">
                      <TableHead>ID</TableHead>
                      <TableHead>Path</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Headers</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-foreground-tertiary py-8">
                        No pass-through endpoints configured
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="health-status" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Model Health Status</h3>
                <p className="text-sm text-foreground-secondary">
                  Run health checks on individual models to verify they are working correctly
                </p>
              </div>
              <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleRunAllChecks}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Run All Checks
              </Button>
            </div>

            <GlassCard className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-card-border/50">
                    <TableHead>Model ID</TableHead>
                    <TableHead>Model Name</TableHead>
                    <TableHead>Health Status</TableHead>
                    <TableHead>Error Details</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead>Last Success</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {models.slice(0, 5).map((model) => (
                    <TableRow key={model.id} className="border-card-border/50">
                      <TableCell className="font-mono text-sm text-primary">
                        {model.id}
                      </TableCell>
                      <TableCell>{model.modelName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="glass-button">
                          none
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground-tertiary">No errors</TableCell>
                      <TableCell className="text-foreground-tertiary">None</TableCell>
                      <TableCell className="text-foreground-tertiary">None</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="glass-button">
                          <Play className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </GlassCard>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Model Analytics</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Select Time Range:</Label>
                    <Select defaultValue="aug20-27">
                      <SelectTrigger className="w-40 glass-card bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                        <SelectItem value="aug20-27">Aug 20 - 27, 2025</SelectItem>
                        <SelectItem value="last-week">Last Week</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Select Model Group:</Label>
                    <Select defaultValue="gpt-4o-mini">
                      <SelectTrigger className="w-32 glass-card bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                        <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                        <SelectItem value="gpt-5">gpt-5</SelectItem>
                        <SelectItem value="claude">claude</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Latency Chart */}
                <GlassCard className="p-6">
                  <h4 className="text-md font-medium mb-4">Avg. Latency per Token</h4>
                  <div className="h-64 flex items-center justify-center border border-dashed border-card-border/50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 mx-auto mb-2 text-foreground-tertiary" />
                      <p className="text-sm text-foreground-tertiary">Chart visualization</p>
                    </div>
                  </div>
                </GlassCard>

                {/* Response Stats */}
                <GlassCard className="p-6">
                  <h4 className="text-md font-medium mb-4">Success Responses</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deployment</span>
                      <span className="text-sm font-medium">Success Responses</span>
                      <span className="text-sm font-medium">Slow Responses</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">https://api.openai.com/v1</span>
                      <span className="text-sm">1</span>
                      <span className="text-sm">2</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Exceptions Section */}
              <GlassCard className="p-6">
                <h4 className="text-md font-medium mb-4">All Exceptions</h4>
                <div className="text-center py-8 text-foreground-tertiary">
                  No data
                </div>
              </GlassCard>

              {/* Rate Limit Errors */}
              <GlassCard className="p-6">
                <h4 className="text-md font-medium mb-4">All Up Rate Limit Errors (429)</h4>
                <div className="text-center py-8 text-foreground-tertiary">
                  No data
                </div>
              </GlassCard>
            </div>
          </TabsContent>

          {/* Placeholder tabs */}
          <TabsContent value="retry-settings" className="space-y-4">
            <GlassCard className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Model Retry Settings</h3>
              <p className="text-foreground-secondary mb-6">
                Configure retry policies for model requests. Falls back to global defaults if not set.
              </p>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-sm">BadRequestError (400)</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AuthenticationError (401)</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">TimeoutError (408)</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">RateLimitError (429)</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ContentPolicyViolationError (400)</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">InternalServerError (500)</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <Button className="glass-button bg-primary hover:bg-primary/90 mt-6">
                  Save
                </Button>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="group-alias" className="space-y-4">
            <GlassCard className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Model Group Alias Settings</h3>
                  <p className="text-sm text-foreground-secondary">
                    Create aliases for your model groups to simplify API calls. For example, you can create an alias 'gpt-4o' that points to 'gpt-4o-mini-openai' model group.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-medium">Add New Alias</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Alias Name</Label>
                      <Input
                        placeholder="e.g. gpt-4o"
                        className="glass-card bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Target Model Group</Label>
                      <Input
                        placeholder="e.g. gpt-4o-mini-openai"
                        className="glass-card bg-background/50"
                      />
                    </div>
                  </div>
                  <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleAddAlias}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Alias
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-medium">Manage Existing Aliases</h4>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-card-border/50">
                        <TableHead>Alias Name</TableHead>
                        <TableHead>Target Model Group</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-foreground-tertiary py-8">
                          No aliases added yet. Add a new alias above.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-medium">Configuration Example</h4>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <pre className="text-sm text-foreground-secondary">
{`router_settings:
  model_group_alias:
    # no aliases configured yet`}
                    </pre>
                  </div>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="price-reload" className="space-y-4">
            <GlassCard className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Price Data Reload</h3>
              <p className="text-foreground-secondary mb-6">
                Reload pricing data for all configured models to ensure accurate cost calculations.
              </p>
                  <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleReloadPriceData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Price Data
              </Button>
            </GlassCard>
          </TabsContent>
        </Tabs>

        {/* Add Model Dialog */}
        <Dialog open={showAddModelDialog} onOpenChange={setShowAddModelDialog}>
          <DialogContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Model</DialogTitle>
              <DialogDescription>
                Add a new AI model to your proxy configuration.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="model-name">Model Name</Label>
                <Input
                  id="model-name"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="e.g. gpt-4o-mini"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="provider">Model Information/Provider</Label>
                <Input
                  id="provider"
                  value={newModelProvider}
                  onChange={(e) => setNewModelProvider(e.target.value)}
                  placeholder="e.g. OpenAI, Anthropic"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="credentials">Credentials</Label>
                <Input
                  id="credentials"
                  value={newModelCredentials}
                  onChange={(e) => setNewModelCredentials(e.target.value)}
                  placeholder="API key or credential info"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="costs">Costs (Input/Output per token)</Label>
                <Input
                  id="costs"
                  value={newModelCosts}
                  onChange={(e) => setNewModelCosts(e.target.value)}
                  placeholder="e.g. In: $0.10 Out: $0.30"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team-id">Team ID</Label>
                <Input
                  id="team-id"
                  value={newModelTeamId}
                  onChange={(e) => setNewModelTeamId(e.target.value)}
                  placeholder="Team identifier (optional)"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="access-group">Model Access Group</Label>
                <Select value={newModelAccessGroup} onValueChange={setNewModelAccessGroup}>
                  <SelectTrigger className="glass-button">
                    <SelectValue placeholder="Select access group" />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50">
                    <SelectItem value="US Model">US Model</SelectItem>
                    <SelectItem value="EU Model">EU Model</SelectItem>
                    <SelectItem value="Global Model">Global Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newModelStatus} onValueChange={(value) => setNewModelStatus(value as "active" | "inactive")}>
                  <SelectTrigger className="glass-button">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModelDialog(false)} className="glass-button">
                Cancel
              </Button>
              <Button onClick={handleSaveModel} className="glass-button bg-primary hover:bg-primary/90">
                Add Model
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Credential Dialog */}
        <Dialog open={showCredentialDialog} onOpenChange={setShowCredentialDialog}>
          <DialogContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add LLM Credential</DialogTitle>
              <DialogDescription>
                Add API credentials for AI providers to authenticate requests.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="credential-provider">Provider</Label>
                <Select value={newCredentialProvider} onValueChange={setNewCredentialProvider}>
                  <SelectTrigger className="glass-button">
                    <SelectValue placeholder="Select AI provider" />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50">
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="microsoft">Microsoft Azure</SelectItem>
                    <SelectItem value="aws">AWS Bedrock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="credential-api-key">API Key</Label>
                <Input
                  id="credential-api-key"
                  type="password"
                  value={newCredentialApiKey}
                  onChange={(e) => setNewCredentialApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="glass-button"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCredentialDialog(false)} className="glass-button">
                Cancel
              </Button>
              <Button onClick={handleSaveCredential} className="glass-button bg-primary hover:bg-primary/90">
                Save Credential
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Pass-Through Endpoint Dialog */}
        <Dialog open={showPassThroughDialog} onOpenChange={setShowPassThroughDialog}>
          <DialogContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Pass-Through Endpoint</DialogTitle>
              <DialogDescription>
                Create a new pass-through endpoint for direct API access.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="endpoint-name">Endpoint Name</Label>
                <Input
                  id="endpoint-name"
                  placeholder="e.g. openai-direct"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endpoint-url">Target URL</Label>
                <Input
                  id="endpoint-url"
                  placeholder="https://api.openai.com/v1"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endpoint-headers">Headers (JSON)</Label>
                <Textarea
                  id="endpoint-headers"
                  placeholder='{"Authorization": "Bearer $API_KEY"}'
                  className="glass-button"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPassThroughDialog(false)} className="glass-button">
                Cancel
              </Button>
              <Button onClick={() => { setShowPassThroughDialog(false); console.log("Pass-through endpoint created"); }} className="glass-button bg-primary hover:bg-primary/90">
                Create Endpoint
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Alias Dialog */}
        <Dialog open={showAliasDialog} onOpenChange={setShowAliasDialog}>
          <DialogContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Model Alias</DialogTitle>
              <DialogDescription>
                Create an alias to map a custom name to one or more models.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="alias-name">Alias Name</Label>
                <Input
                  id="alias-name"
                  value={newAliasName}
                  onChange={(e) => setNewAliasName(e.target.value)}
                  placeholder="e.g. my-gpt-4"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alias-target">Target Model Group</Label>
                <Input
                  id="alias-target"
                  value={newAliasTarget}
                  onChange={(e) => setNewAliasTarget(e.target.value)}
                  placeholder="e.g. gpt-4o, gpt-4-turbo"
                  className="glass-button"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAliasDialog(false)} className="glass-button">
                Cancel
              </Button>
              <Button onClick={handleSaveAlias} className="glass-button bg-primary hover:bg-primary/90">
                Create Alias
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
