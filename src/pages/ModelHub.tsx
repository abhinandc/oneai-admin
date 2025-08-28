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
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Plus, 
  Copy,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  Eye,
  Brain,
  Search,
  Zap as LightningIcon
} from "lucide-react"

interface ModelInfo {
  name: string
  provider: string
  mode: string
  tokens: string
  costPerM: string
  inputCost: string
  features: string[]
  isPublic: boolean
}

const mockModels: ModelInfo[] = [
  {
    name: "gpt-4o-mini",
    provider: "openai",
    mode: "chat",
    tokens: "128.0K / 16.4K",
    costPerM: "$0.15",
    inputCost: "$0.60",
    features: ["Vision", "Function Calling"],
    isPublic: false
  },
  {
    name: "gpt-4o-mini-search-preview",
    provider: "openai", 
    mode: "chat",
    tokens: "128.0K / 16.4K",
    costPerM: "$0.15",
    inputCost: "$0.60",
    features: ["Vision", "Web Search", "Function Calling"],
    isPublic: false
  },
  {
    name: "gpt-5-2025-08-07",
    provider: "openai",
    mode: "chat", 
    tokens: "400.0K / 128.0K",
    costPerM: "$1.25",
    inputCost: "$70.00",
    features: ["Vision", "Reasoning", "Function Calling"],
    isPublic: false
  },
  {
    name: "gpt-5-chat",
    provider: "openai",
    mode: "chat",
    tokens: "400.0K / 128.0K", 
    costPerM: "$1.25",
    inputCost: "$70.00",
    features: ["Vision", "Reasoning"],
    isPublic: false
  },
  {
    name: "gpt-5-nano",
    provider: "openai",
    mode: "chat",
    tokens: "400.0K / 128.0K",
    costPerM: "$0.05", 
    inputCost: "$0.40",
    features: ["Vision", "Reasoning", "Function Calling"],
    isPublic: false
  }
]

export default function ModelHub() {
  const [models] = useState<ModelInfo[]>(mockModels)
  const [modelHubUrl] = useState("http://localhost:3000/model_hub.html")
  const [newLinkUrl, setNewLinkUrl] = useState("https://example.com")
  const [newLinkName, setNewLinkName] = useState("Friendly name")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("All Providers")
  const [selectedModel, setSelectedModel] = useState("All Models")
  const [selectedFeatures, setSelectedFeatures] = useState("All Features")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getFeatureBadge = (feature: string) => {
    const featureStyles = {
      "Vision": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Function Calling": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400", 
      "Web Search": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Reasoning": "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
    }
    
    return (
      <Badge key={feature} className={`${featureStyles[feature as keyof typeof featureStyles] || 'bg-gray-100 text-gray-800'} text-xs`}>
        {feature}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Model Hub</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Make models public for developers to know what models are available on the proxy.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-foreground-secondary">Model Hub URL:</span>
              <code className="bg-muted px-2 py-1 rounded text-xs">{modelHubUrl}</code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(modelHubUrl)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Button className="glass-button bg-primary hover:bg-primary/90">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Public
            </Button>
          </div>
        </div>

        {/* Link Management */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Link Management</h3>
                <p className="text-sm text-foreground-secondary">
                  Manage the links that are displayed under "Useful Links" on the public model hub.
                </p>
              </div>
              <ChevronDown className="w-5 h-5 text-foreground-secondary" />
            </div>

            {/* Add New Link */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">Add New Link</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="glass-card bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                    className="glass-card bg-background/50"
                  />
                </div>
                <Button className="glass-button bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>
            </div>

            {/* Manage Existing Links */}
            <div className="space-y-4">
              <h4 className="text-md font-medium">Manage Existing Links</h4>
              <Table>
                <TableHeader>
                  <TableRow className="border-card-border/50">
                    <TableHead>Display Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-foreground-tertiary py-8">
                      No links added yet. Add a new link above.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </GlassCard>

        {/* Search Models */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Search Models:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search model names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-card bg-background/50"
            />
            
            <div className="space-y-1">
              <label className="text-xs text-foreground-secondary">Provider:</label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger className="glass-card bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                  <SelectItem value="All Providers">All Providers</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-foreground-secondary">Model:</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="glass-card bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                  <SelectItem value="All Models">All Models</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-5">GPT-5</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-foreground-secondary">Features:</label>
              <Select value={selectedFeatures} onValueChange={setSelectedFeatures}>
                <SelectTrigger className="glass-card bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                  <SelectItem value="All Features">All Features</SelectItem>
                  <SelectItem value="Vision">Vision</SelectItem>
                  <SelectItem value="Function Calling">Function Calling</SelectItem>
                  <SelectItem value="Web Search">Web Search</SelectItem>
                  <SelectItem value="Reasoning">Reasoning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Models Table */}
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-card-border/50">
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Public Model Name
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
                      Tokens
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Cost/M
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Public
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model, index) => (
                  <TableRow key={index} className="border-card-border/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.name}</span>
                        <HelpCircle className="w-4 h-4 text-foreground-tertiary" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {model.provider}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {model.mode}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {model.tokens}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{model.costPerM}</div>
                        <div className="text-foreground-tertiary">{model.inputCost}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {model.features.map((feature) => getFeatureBadge(feature))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={model.isPublic ? "default" : "secondary"} className="glass-button">
                        {model.isPublic ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="glass-button">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassCard>

        <div className="text-sm text-foreground-secondary">
          Showing 5 of 5 models
        </div>
      </main>
    </div>
  )
}