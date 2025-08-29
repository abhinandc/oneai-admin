import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
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
  HelpCircle,
  Trash2,
  Copy,
  Download,
  Sparkles,
  Brain,
  Zap
} from "lucide-react"

export default function TestKey() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{id: string, role: 'user' | 'assistant', content: string, timestamp: Date}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiKeySource, setApiKeySource] = useState("")
  const [currentSession, setCurrentSession] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")
  const [endpointType, setEndpointType] = useState("/v1/chat/completions")
  const [tags, setTags] = useState("")
  const [mcpTool, setMcpTool] = useState("")
  const [vectorStore, setVectorStore] = useState("")
  const [guardrails, setGuardrails] = useState("")
  const { toast } = useToast()

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    }
    
    setChatHistory(prev => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: `This is a simulated response to: "${userMessage.content}". In a real implementation, this would call the ${selectedModel} model via ${endpointType}.`,
        timestamp: new Date()
      }
      
      setChatHistory(prev => [...prev, assistantMessage])
      
      toast({
        title: "Message sent successfully",
        description: "Response received from AI model"
      })
      
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please check your API key and try again",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setChatHistory([])
    toast({
      title: "Chat cleared",
      description: "All messages have been removed"
    })
  }

  const handleGetCode = () => {
    const codeSnippet = `
// OneAI API Integration Code
const response = await fetch('${endpointType}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'${tags ? ',\n    \'X-Tags\': \'' + tags + '\'' : ''}
  },
  body: JSON.stringify({
    model: '${selectedModel}',
    messages: [
      {
        role: 'user',
        content: 'Your message here'
      }
    ]${mcpTool ? ',\n    mcp_tool: \'' + mcpTool + '\'' : ''}${vectorStore ? ',\n    vector_store: \'' + vectorStore + '\'' : ''}${guardrails ? ',\n    guardrails: \'' + guardrails + '\'' : ''}
  })
});

const data = await response.json();
console.log(data);`

    navigator.clipboard.writeText(codeSnippet.trim())
    
    toast({
      title: "Code copied!",
      description: "Integration code has been copied to your clipboard"
    })
  }

  return (
    <div className="h-[calc(100vh-11rem)] w-full space-y-4">
      {/* Compact Header with Action Buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            Test Key
          </h1>
          <p className="text-foreground-secondary text-sm mt-1">
            Test your API keys and chat with AI models in real-time
          </p>
        </div>
        
        {/* Top Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-background/50 border-border/50" 
            onClick={handleClearChat}
            disabled={chatHistory.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Chat
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            className="shadow-lg" 
            onClick={handleGetCode}
          >
            <Code className="w-4 h-4 mr-2" />
            Get Code
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100%-3rem)]">
        {/* Compact Left Sidebar - Essential Configurations */}
        <div className="col-span-3">
          <GlassCard className="p-3 h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="w-3 h-3 text-primary" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Configuration</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
              {/* Left Column - Essential Settings */}
              <div className="space-y-3">
                {/* API Key Source */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Key className="w-3 h-3 text-primary" />
                    API Key
                  </Label>
                  <Input
                    placeholder="Enter your API key"
                    value={apiKeySource}
                    onChange={(e) => setApiKeySource(e.target.value)}
                    className="bg-background/60 border-border/50 focus:border-primary/50 transition-all h-8"
                  />
                </div>

                {/* Select Model */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Package className="w-3 h-3 text-primary" />
                    AI Model
                  </Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-background/60 border-border/50 focus:border-primary/50 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="claude-3.5-sonnet">Claude 3.5 Sonnet</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Endpoint Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <HelpCircle className="w-3 h-3 text-primary" />
                    Endpoint
                  </Label>
                  <Select value={endpointType} onValueChange={setEndpointType}>
                    <SelectTrigger className="bg-background/60 border-border/50 focus:border-primary/50 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                      <SelectItem value="/v1/chat/completions">Chat Completions</SelectItem>
                      <SelectItem value="/v1/completions">Completions</SelectItem>
                      <SelectItem value="/v1/embeddings">Embeddings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    Tags
                  </Label>
                  <Input
                    placeholder="request-type:test, env:dev"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="bg-background/60 border-border/50 focus:border-primary/50 transition-all h-8"
                  />
                </div>
              </div>

              {/* Right Column - Advanced Settings */}
              <div className="space-y-3">
                {/* Current UI Session */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Monitor className="w-3 h-3 text-primary" />
                    UI Session
                  </Label>
                  <Input
                    placeholder="Session identifier"
                    value={currentSession}
                    onChange={(e) => setCurrentSession(e.target.value)}
                    className="bg-background/60 border-border/50 focus:border-primary/50 transition-all h-8"
                  />
                </div>

                {/* MCP Tool */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Wrench className="w-3 h-3" />
                    MCP Tool
                  </Label>
                  <Input
                    placeholder="Tool configuration"
                    value={mcpTool}
                    onChange={(e) => setMcpTool(e.target.value)}
                    className="bg-background/60 border-border/50 focus:border-primary/50 transition-all h-8"
                  />
                </div>

                {/* Vector Store */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Database className="w-3 h-3" />
                    Vector Store
                  </Label>
                  <Input
                    placeholder="Vector store ID"
                    value={vectorStore}
                    onChange={(e) => setVectorStore(e.target.value)}
                    className="bg-background/60 border-border/50 focus:border-primary/50 transition-all h-8"
                  />
                </div>

                {/* Guardrails */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Guardrails
                  </Label>
                  <Input
                    placeholder="Guardrail configuration"
                    value={guardrails}
                    onChange={(e) => setGuardrails(e.target.value)}
                    className="bg-background/60 border-border/50 focus:border-primary/50 transition-all h-8"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Expanded Main Content Area */}
        <div className="col-span-9">
          <GlassCard className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">AI Chat Interface</h2>
                    <p className="text-sm text-foreground-secondary">
                      {selectedModel} • {endpointType}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {chatHistory.length > 0 && (
                    <div className="text-sm text-foreground-secondary bg-background/50 px-3 py-1 rounded-lg">
                      {chatHistory.length} messages
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-foreground-tertiary">
                    {apiKeySource && <span className="text-success bg-success/10 px-3 py-1 rounded-full">API Connected</span>}
                    {!apiKeySource && <span className="text-warning bg-warning/10 px-3 py-1 rounded-full">No API Key</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto min-h-0">
              {chatHistory.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-6 max-w-md">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Zap className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Ready to test your API
                      </h3>
                      <p className="text-foreground-secondary leading-relaxed">
                        Configure your settings on the left, then start a conversation to test your API integration with real AI models.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <div className="text-xs bg-background/60 px-3 py-1 rounded-full border border-border/30">
                        Real-time testing
                      </div>
                      <div className="text-xs bg-background/60 px-3 py-1 rounded-full border border-border/30">
                        Code generation
                      </div>
                      <div className="text-xs bg-background/60 px-3 py-1 rounded-full border border-border/30">
                        Multiple models
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background/60 border border-border/30'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <p className={`text-xs mt-2 opacity-70 ${
                          msg.role === 'user' ? 'text-primary-foreground/70' : 'text-foreground-tertiary'
                        }`}>
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-background/60 border border-border/30 rounded-2xl p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          <span className="text-sm text-foreground-secondary ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enhanced Input Area */}
            <div className="p-6 border-t border-border/20">
              <div className="relative">
                <Textarea
                  placeholder="Type your message... (Ctrl+Enter to send)"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    const textarea = e.target as HTMLTextAreaElement
                    textarea.style.height = 'auto'
                    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
                  }}
                  className="bg-background/60 border-border/50 focus:border-primary/50 resize-none min-h-[60px] max-h-[120px] pr-16 py-4 px-4 text-base rounded-xl transition-all"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="absolute bottom-3 right-3 h-10 w-10 p-0 rounded-lg shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-foreground-tertiary">
                  Press <kbd className="px-1.5 py-0.5 bg-background/60 border border-border/30 rounded text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-background/60 border border-border/30 rounded text-xs">Enter</kbd> to send
                </p>
                <div className="flex items-center gap-2 text-xs text-foreground-tertiary">
                  {apiKeySource && <span className="text-success">API Key Set</span>}
                  {!apiKeySource && <span className="text-warning">No API Key</span>}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}