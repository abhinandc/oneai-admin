import { useState } from "react"
import { Users as UsersIcon, Shield, Crown, Eye, Edit, MoreHorizontal } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockEmployees = [
  { id: 1, name: "Alice Johnson", email: "alice@oneai.com", role: "Admin", tenant: "Enterprise", vip: true, status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@startup.com", role: "Employee", tenant: "Startup", vip: false, status: "Active" },
  { id: 3, name: "Carol Davis", email: "carol@corp.com", role: "Editor", tenant: "Corporate", vip: true, status: "Inactive" },
  { id: 4, name: "David Wilson", email: "david@oneai.com", role: "Admin", tenant: "Enterprise", vip: false, status: "Active" },
]

const roles = ["Admin", "Editor", "Employee", "Viewer"]
const tenants = ["Enterprise", "Corporate", "Startup", "Free"]

export default function Users() {
  const [selectedTenant, setSelectedTenant] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin": return "default"
      case "Editor": return "secondary" 
      case "Employee": return "outline"
      default: return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <UsersIcon className="w-8 h-8" />
            Employees & Roles
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage employee accounts, roles, and tenant assignments
          </p>
        </div>
        <Button className="glass-button">
          <UsersIcon className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <GlassCard className="p-6">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs bg-glass/60 border-input-border"
          />
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="w-48 bg-glass/60 border-input-border">
              <SelectValue placeholder="Select tenant" />
            </SelectTrigger>
            <SelectContent className="glass-card border-card-border">
              <SelectItem value="All">All Tenants</SelectItem>
              {tenants.map((tenant) => (
                <SelectItem key={tenant} value={tenant}>{tenant}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </GlassCard>

      {/* Employees Table */}
      <GlassCard className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-card-border/30">
              <TableHead className="text-foreground-secondary font-medium">Employee</TableHead>
              <TableHead className="text-foreground-secondary font-medium">Role</TableHead>
              <TableHead className="text-foreground-secondary font-medium">Tenant</TableHead>
              <TableHead className="text-foreground-secondary font-medium">Status</TableHead>
              <TableHead className="text-foreground-secondary font-medium">VIP</TableHead>
              <TableHead className="text-foreground-secondary font-medium"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEmployees.map((employee) => (
              <TableRow key={employee.id} className="border-card-border/20 hover:bg-glass-hover/30">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{employee.name}</div>
                    <div className="text-sm text-foreground-secondary">{employee.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(employee.role)} className="glass-button">
                    <Shield className="w-3 h-3 mr-1" />
                    {employee.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-foreground-secondary font-medium">{employee.tenant}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(employee.status)}>
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {employee.vip && (
                    <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">
                      <Crown className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="glass-button">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-card border-card-border" align="end">
                      <DropdownMenuItem className="glass-button">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="glass-button">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="glass-button text-destructive">
                        <Shield className="w-4 h-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}