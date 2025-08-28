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
    <div className="flex h-screen">
      {/* Left Sidebar - Configurations */}
      <div className="w-96 border-r border-card-border/50 bg-background/50 backdrop-blur-sm">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Configurations</h2>
          </div>

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
              className="glass-card bg-background/50"
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
              className="glass-card bg-background/50"
            />
          </div>

          {/* Select Model */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Package className="w-4 h-4" />
              Select Model
            </Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="glass-card bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
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
              <SelectTrigger className="glass-card bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
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
              className="glass-card bg-background/50"
            />
          </div>

          {/* MCP Tool */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              MCP Tool
              <HelpCircle className="w-3 h-3 opacity-50" />
            </Label>
            <Input
              placeholder="MCP tool configuration"
              value={mcpTool}
              onChange={(e) => setMcpTool(e.target.value)}
              className="glass-card bg-background/50"
            />
          </div>

          {/* Vector Store */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Database className="w-4 h-4" />
              Vector Store
              <HelpCircle className="w-3 h-3 opacity-50" />
            </Label>
            <Input
              placeholder="Vector store configuration"
              value={vectorStore}
              onChange={(e) => setVectorStore(e.target.value)}
              className="glass-card bg-background/50"
            />
          </div>

          {/* Guardrails */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Guardrails
              <HelpCircle className="w-3 h-3 opacity-50" />
            </Label>
            <Input
              placeholder="Guardrails configuration"
              value={guardrails}
              onChange={(e) => setGuardrails(e.target.value)}
              className="glass-card bg-background/50"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-card-border/50 bg-background/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Test Key</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="glass-button">
                <MessageCircle className="w-4 h-4 mr-2" />
                Clear Chat
              </Button>
              <Button variant="outline" className="glass-button">
                <Code className="w-4 h-4 mr-2" />
                Get Code
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl border-2 border-dashed border-card-border/50 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-foreground-tertiary" />
              </div>
              <p className="text-foreground-secondary">
                Start a conversation or generate an image
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-card-border/50 bg-background/50 backdrop-blur-sm p-4">
            <div className="flex items-end gap-3 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Why not change the world one day at a..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="glass-card bg-background/50 border-card-border/50 resize-none min-h-[60px] pr-12"
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
                  className="absolute bottom-2 right-2 h-8 w-8 p-0 glass-button bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-foreground-tertiary text-center mt-2">
              Press Ctrl+Enter to send
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}