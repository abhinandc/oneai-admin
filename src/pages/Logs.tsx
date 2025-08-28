import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
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
  Filter, 
  RotateCcw, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  Clock,
  Play,
  Square,
  ChevronRight as ChevronRightIcon
} from "lucide-react"

interface LogEntry {
  time: string
  status: "Success" | "Failure"
  sessionId: string
  requestId: string
  cost: number
  duration: number
  teamName: string
  keyHash: string
  keyName: string
  model: string
  tokens: number
  internalUser: string
  endUser: string
  tags: string
}

const mockLogs: LogEntry[] = [
  {
    time: "08/27/2025 04:11:18 PM",
    status: "Success",
    sessionId: "a70987f8-c481c",
    requestId: "chatcmpl-C97a...",
    cost: 0.000303,
    duration: 7.361,
    teamName: "",
    keyHash: "c0914be0408a2...",
    keyName: "",
    model: "gpt-5-nano",
    tokens: 1118,
    internalUser: "default_user_id",
    endUser: "",
    tags: "User Agent: Models +1"
  },
  {
    time: "08/27/2025 04:11:17 PM", 
    status: "Failure",
    sessionId: "a70987f8-c481c",
    requestId: "2b9dbe1d-447a...",
    cost: 0.000000,
    duration: 0,
    teamName: "",
    keyHash: "c0914be0408a2...",
    keyName: "",
    model: "gpt-4o-mini",
    tokens: 0,
    internalUser: "default_user_id",
    endUser: "",
    tags: ""
  },
  {
    time: "08/27/2025 04:11:17 PM",
    status: "Failure", 
    sessionId: "a70987f8-c481c",
    requestId: "18980a95-3771...",
    cost: 0.000000,
    duration: 0,
    teamName: "",
    keyHash: "c0914be0408a2...",
    keyName: "",
    model: "gpt-5-chat",
    tokens: 0,
    internalUser: "default_user_id",
    endUser: "",
    tags: ""
  }
]

// Generate more mock logs for demonstration
const generateMockLogs = (): LogEntry[] => {
  const baseTime = new Date("2025-08-27T16:11:00")
  const logs: LogEntry[] = []
  
  for (let i = 0; i < 43; i++) {
    const time = new Date(baseTime.getTime() - i * 60000) // 1 minute intervals
    logs.push({
      time: time.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit", 
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }).replace(/(\d+)\/(\d+)\/(\d+)/, "$1/$2/$3"),
      status: i === 0 ? "Success" : "Failure",
      sessionId: `${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}`,
      requestId: `${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}...`,
      cost: i === 0 ? 0.000303 : 0.000000,
      duration: i === 0 ? 7.361 : 0,
      teamName: "",
      keyHash: `${Math.random().toString(36).substr(2, 12)}...`,
      keyName: i % 5 === 0 ? "New Test" : "",
      model: ["gpt-5-nano", "gpt-4o-mini", "gpt-5-chat", "gpt-o1x-2025", "mamba2-14b", "memgpt-8b"][i % 6],
      tokens: i === 0 ? 1118 : 0,
      internalUser: "default_user_id",
      endUser: "",
      tags: i === 0 ? "User Agent: Models +1" : ""
    })
  }
  
  return logs
}

export default function Logs() {
  const [logs] = useState<LogEntry[]>(generateMockLogs())
  const [searchTerm, setSearchTerm] = useState("")
  const [timeRange, setTimeRange] = useState("Last 24 Hours")
  const [liveTail, setLiveTail] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(15)
  const [currentPage] = useState(1)
  const totalPages = 1
  const totalResults = 43

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoRefresh) {
      interval = setInterval(() => {
        // Auto-refresh logic would go here
        console.log("Auto-refreshing logs...")
      }, refreshInterval * 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval])

  const getStatusBadge = (status: "Success" | "Failure") => {
    return (
      <Badge 
        className={status === "Success" 
          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
        }
      >
        {status}
      </Badge>
    )
  }

  const formatCost = (cost: number) => {
    return cost > 0 ? `$${cost.toFixed(6)}` : "$0.000000"
  }

  const formatDuration = (duration: number) => {
    return duration > 0 ? `${duration.toFixed(3)}s` : "0 (n/a)"
  }

  const formatTokens = (tokens: number) => {
    return tokens > 0 ? `${tokens.toLocaleString()} (Success)` : "0 (n/a)"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header Tabs */}
        <Tabs defaultValue="request-logs" className="w-full">
          <TabsList className="glass-card bg-background/50 p-1">
            <TabsTrigger value="request-logs" className="glass-button">Request Logs</TabsTrigger>
            <TabsTrigger value="audit-logs" className="glass-button">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="request-logs" className="space-y-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-4">Request Logs</h1>
              
              {/* Filters and Controls */}
              <div className="flex items-center gap-4 mb-4">
                <Button variant="outline" className="glass-button">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" className="glass-button">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              </div>

              {/* Search and Time Controls */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-tertiary" />
                    <Input
                      placeholder="Search by Request ID"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="glass-card bg-background/50 pl-10"
                    />
                  </div>
                </div>
                
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40 glass-card bg-background/50">
                    <Clock className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="Last 24 Hours">Last 24 Hours</SelectItem>
                    <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                    <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Live Tail</span>
                  <Switch 
                    checked={liveTail} 
                    onCheckedChange={setLiveTail}
                  />
                  <div className={`w-2 h-2 rounded-full ${liveTail ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>

                <Button variant="outline" className="glass-button">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Auto-refresh Status */}
              {autoRefresh && (
                <div className="mb-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Auto-refreshing every {refreshInterval} seconds</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setAutoRefresh(false)}
                        className="ml-auto text-green-800 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                      >
                        Stop
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Info */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-foreground-secondary">
                  Showing 1 - {totalResults} of {totalResults} results
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <span>Page {currentPage} of {totalPages}</span>
                  <Button variant="outline" size="sm" disabled className="glass-button">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled className="glass-button">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Logs Table */}
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-card-border/50">
                        <TableHead className="w-[30px]"></TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Session ID</TableHead>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Duration (s)</TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Key Hash</TableHead>
                        <TableHead>Key Name</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Tokens</TableHead>
                        <TableHead>Internal User</TableHead>
                        <TableHead>End User</TableHead>
                        <TableHead>Tags</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log, index) => (
                        <TableRow key={index} className="border-card-border/50">
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ChevronRightIcon className="h-3 w-3" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-sm font-mono">
                            {log.time}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(log.status)}
                          </TableCell>
                          <TableCell className="font-mono text-sm text-primary">
                            {log.sessionId}
                          </TableCell>
                          <TableCell className="font-mono text-sm text-primary">
                            {log.requestId}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatCost(log.cost)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDuration(log.duration)}
                          </TableCell>
                          <TableCell>
                            {log.teamName || <span className="text-foreground-tertiary">-</span>}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {log.keyHash}
                          </TableCell>
                          <TableCell>
                            {log.keyName || <span className="text-foreground-tertiary">-</span>}
                          </TableCell>
                          <TableCell className="text-sm">
                            {log.model}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatTokens(log.tokens)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {log.internalUser}
                          </TableCell>
                          <TableCell>
                            {log.endUser || <span className="text-foreground-tertiary">-</span>}
                          </TableCell>
                          <TableCell className="text-sm">
                            {log.tags || <span className="text-foreground-tertiary">-</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </GlassCard>
            </div>
          </TabsContent>

          <TabsContent value="audit-logs" className="space-y-4">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <Clock className="w-12 h-12 mx-auto text-foreground-tertiary" />
                <h3 className="text-lg font-semibold">Audit Logs</h3>
                <p className="text-foreground-secondary">
                  Track administrative actions and system changes across your organization.
                </p>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}