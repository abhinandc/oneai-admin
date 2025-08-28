import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Plus, 
  ChevronDown,
  Server,
  HelpCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  Link
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MCPServer {
  id: string
  name: string
  alias: string
  url: string
  transport: string
  authType: string
  accessGroups: string[]
  createdAt: string
  updatedAt: string
}

const mockMCPServers: MCPServer[] = [
  // Currently empty to match the "No MCP servers configured" state
]

export default function MCPServers() {
  const [mcpServers] = useState<MCPServer[]>(mockMCPServers)
  const [currentTeam, setCurrentTeam] = useState("All Servers")
  const [accessGroup, setAccessGroup] = useState("All Access Groups")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newServer, setNewServer] = useState({
    name: "",
    alias: "",
    url: "",
    transport: "http",
    authType: "none",
    accessGroups: [] as string[]
  })

  const handleAddServer = () => {
    // Logic to add new MCP server would go here
    console.log("Adding MCP server:", newServer)
    setIsAddDialogOpen(false)
    setNewServer({
      name: "",
      alias: "",
      url: "",
      transport: "http",
      authType: "none",
      accessGroups: []
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">MCP Servers</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Configure and manage your MCP servers
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="glass-button bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add New MCP Server
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New MCP Server</DialogTitle>
                <DialogDescription>
                  Configure a new Model Context Protocol server for your AI workflows.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Server Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., My MCP Server"
                      value={newServer.name}
                      onChange={(e) => setNewServer({...newServer, name: e.target.value})}
                      className="glass-card bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alias">Alias</Label>
                    <Input
                      id="alias"
                      placeholder="e.g., main-server"
                      value={newServer.alias}
                      onChange={(e) => setNewServer({...newServer, alias: e.target.value})}
                      className="glass-card bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">Server URL</Label>
                  <Input
                    id="url"
                    placeholder="e.g., https://mcp.example.com"
                    value={newServer.url}
                    onChange={(e) => setNewServer({...newServer, url: e.target.value})}
                    className="glass-card bg-background/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transport">Transport</Label>
                    <Select value={newServer.transport} onValueChange={(value) => setNewServer({...newServer, transport: value})}>
                      <SelectTrigger className="glass-card bg-background/50">
                        <SelectValue placeholder="Select transport" />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                        <SelectItem value="http">HTTP</SelectItem>
                        <SelectItem value="https">HTTPS</SelectItem>
                        <SelectItem value="websocket">WebSocket</SelectItem>
                        <SelectItem value="grpc">gRPC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authType">Auth Type</Label>
                    <Select value={newServer.authType} onValueChange={(value) => setNewServer({...newServer, authType: value})}>
                      <SelectTrigger className="glass-card bg-background/50">
                        <SelectValue placeholder="Select auth type" />
                      </SelectTrigger>
                      <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="api-key">API Key</SelectItem>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="oauth">OAuth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessGroups">Access Groups</Label>
                  <Input
                    id="accessGroups"
                    placeholder="Select or create access groups"
                    className="glass-card bg-background/50"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddServer} className="glass-button bg-primary hover:bg-primary/90">
                    Add Server
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all-servers" className="w-full">
          <TabsList className="glass-card bg-background/50 p-1">
            <TabsTrigger value="all-servers" className="glass-button">All Servers</TabsTrigger>
            <TabsTrigger value="connect" className="glass-button">Connect</TabsTrigger>
          </TabsList>

          <TabsContent value="all-servers" className="space-y-4">
            {/* Team and Access Group Filters */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Current Team:</Label>
                <Select value={currentTeam} onValueChange={setCurrentTeam}>
                  <SelectTrigger className="w-48 glass-card bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="All Servers">All Servers</SelectItem>
                    <SelectItem value="Team A">Team A</SelectItem>
                    <SelectItem value="Team B">Team B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Access Group:</Label>
                <HelpCircle className="w-3 h-3 text-foreground-tertiary" />
                <Select value={accessGroup} onValueChange={setAccessGroup}>
                  <SelectTrigger className="w-48 glass-card bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="All Access Groups">All Access Groups</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* MCP Servers Table */}
            <GlassCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-card-border/50">
                      <TableHead>Server ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Alias</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Transport</TableHead>
                      <TableHead>Auth Type</TableHead>
                      <TableHead>Access Groups</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Updated At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mcpServers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-12">
                          <div className="flex flex-col items-center gap-4">
                            <Server className="w-12 h-12 text-foreground-tertiary" />
                            <div className="space-y-2">
                              <p className="text-foreground-tertiary font-medium">No MCP servers configured</p>
                              <p className="text-sm text-foreground-secondary">
                                Add your first MCP server to start managing model context protocols
                              </p>
                            </div>
                            <Button 
                              onClick={() => setIsAddDialogOpen(true)}
                              className="glass-button bg-primary hover:bg-primary/90"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add First Server
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      mcpServers.map((server) => (
                        <TableRow key={server.id} className="border-card-border/50">
                          <TableCell className="font-mono text-sm text-primary">
                            {server.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {server.name}
                          </TableCell>
                          <TableCell>{server.alias}</TableCell>
                          <TableCell className="font-mono text-sm">
                            {server.url}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                              {server.transport}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              {server.authType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {server.accessGroups.map((group) => (
                                <Badge key={group} variant="secondary" className="text-xs">
                                  {group}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {server.createdAt}
                          </TableCell>
                          <TableCell className="text-sm">
                            {server.updatedAt}
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
                                  Edit Server
                                </DropdownMenuItem>
                                <DropdownMenuItem className="glass-button">
                                  <Link className="mr-2 h-4 w-4" />
                                  Test Connection
                                </DropdownMenuItem>
                                <DropdownMenuItem className="glass-button text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Server
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
          </TabsContent>

          <TabsContent value="connect" className="space-y-4">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <Server className="w-12 h-12 mx-auto text-foreground-tertiary" />
                <h3 className="text-lg font-semibold">Connect to MCP Server</h3>
                <p className="text-foreground-secondary">
                  Establish a connection to an existing Model Context Protocol server.
                </p>
                <Button className="glass-button bg-primary hover:bg-primary/90">
                  <Link className="w-4 h-4 mr-2" />
                  Start Connection
                </Button>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Server className="w-5 h-5" />
              About MCP Servers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Model Context Protocol</h4>
                <p className="text-foreground-secondary">
                  MCP enables AI models to securely access external data sources and tools through standardized protocols.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Secure Connections</h4>
                <p className="text-foreground-secondary">
                  All MCP server connections are authenticated and encrypted to ensure data security and privacy.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Flexible Integration</h4>
                <p className="text-foreground-secondary">
                  Support for multiple transport protocols including HTTP, WebSocket, and gRPC for diverse integration needs.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}