import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GlassCard } from "@/components/ui/glass-card"
import { Separator } from "@/components/ui/separator"
import { 
  MessageCircle, 
  Code, 
  Send, 
  Key,
  Monitor,
  Package,
  Tag,
  Wrench,
  Database,
  Shield,
  HelpCircle
} from "lucide-react"

export default function TestKey() {
  const [message, setMessage] = useState("")
  const [apiKeySource, setApiKeySource] = useState("")
  const [currentSession, setCurrentSession] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")
  const [endpointType, setEndpointType] = useState("/v1/chat/completions")
  const [tags, setTags] = useState("")
  const [mcpTool, setMcpTool] = useState("")
  const [vectorStore, setVectorStore] = useState("")
  const [guardrails, setGuardrails] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Test Key</h1>
        <p className="text-foreground-secondary mt-1">
          Test your API keys and chat with AI models
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
        {/* Left Sidebar - Configurations */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-card/70 backdrop-blur-sm rounded-2xl shadow-lg border border-border/20 h-full overflow-y-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">Configurations</h2>
            
            <div className="space-y-4">
              {/* API Key Source */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  API Key Source
                </Label>
                <Input
                  placeholder="Enter API key source"
                  value={apiKeySource}
                  onChange={(e) => setApiKeySource(e.target.value)}
                  className="bg-background/60 border border-border/10"
                />
              </div>

              {/* Current UI Session */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Current UI Session
                </Label>
                <Input
                  placeholder="Session ID"
                  value={currentSession}
                  onChange={(e) => setCurrentSession(e.target.value)}
                  className="bg-background/60 border border-border/10"
                />
              </div>

              {/* Select Model */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Select Model
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-background/60 border border-border/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                    <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                    <SelectItem value="claude-3.5-sonnet">claude-3.5-sonnet</SelectItem>
                    <SelectItem value="gemini-pro">gemini-pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Endpoint Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Endpoint Type
                </Label>
                <Select value={endpointType} onValueChange={setEndpointType}>
                  <SelectTrigger className="bg-background/60 border border-border/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="/v1/chat/completions">/v1/chat/completions</SelectItem>
                    <SelectItem value="/v1/completions">/v1/completions</SelectItem>
                    <SelectItem value="/v1/embeddings">/v1/embeddings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>
                <Input
                  placeholder="Add tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-background/60 border border-border/10"
                />
              </div>

              {/* MCP Tool */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  MCP Tool
                </Label>
                <Input
                  placeholder="MCP tool configuration"
                  value={mcpTool}
                  onChange={(e) => setMcpTool(e.target.value)}
                  className="bg-background/60 border border-border/10"
                />
              </div>

              {/* Vector Store */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Vector Store
                </Label>
                <Input
                  placeholder="Vector store configuration"
                  value={vectorStore}
                  onChange={(e) => setVectorStore(e.target.value)}
                  className="bg-background/60 border border-border/10"
                />
              </div>

              {/* Guardrails */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Guardrails
                </Label>
                <Input
                  placeholder="Guardrails configuration"
                  value={guardrails}
                  onChange={(e) => setGuardrails(e.target.value)}
                  className="bg-background/60 border border-border/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="p-6 bg-card/70 backdrop-blur-sm rounded-2xl shadow-lg border border-border/20 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Chat Interface</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="hover:bg-background/50">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
                <Button variant="outline" className="hover:bg-background/50">
                  <Code className="w-4 h-4 mr-2" />
                  Get Code
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl border-2 border-dashed border-border/50 flex items-center justify-center bg-background/50">
                  <MessageCircle className="w-8 h-8 text-foreground-tertiary" />
                </div>
                <p className="text-foreground-secondary font-medium">
                  Start a conversation or generate an image
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Why not change the world one day at a..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-background/60 border border-border/10 resize-none min-h-[60px] pr-14 py-3"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="absolute bottom-3 right-3 h-8 w-8 p-0 bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-foreground-tertiary text-left mt-2">
              Press Ctrl+Enter to send
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}