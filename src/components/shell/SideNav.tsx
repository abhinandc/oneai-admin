import { 
  Home, 
  MessageSquare, 
  Bot, 
  Zap, 
  Package, 
  FileText, 
  Wrench, 
  PlayCircle, 
  HelpCircle,
  Users,
  CreditCard,
  Settings,
  CheckSquare
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const mainItems = [
  { title: "Home", url: "/", icon: Home, shortcut: "G H" },
  { title: "Chat", url: "/chat", icon: MessageSquare, shortcut: "G C" },
  { title: "Agents", url: "/agents", icon: Bot, shortcut: "G A" },
  { title: "Automations", url: "/automations", icon: Zap, shortcut: "G Z" },
  { title: "Model Hub", url: "/models", icon: Package, shortcut: "G M" },
  { title: "Prompts", url: "/prompts", icon: FileText, shortcut: "G P" },
  { title: "Tools", url: "/tools", icon: Wrench, shortcut: "G T" },
  { title: "Playground", url: "/playground", icon: PlayCircle, shortcut: "G Y" },
]

const adminItems = [
  { title: "Users & Roles", url: "/admin/users", icon: Users },
  { title: "Billing & Usage", url: "/admin/billing", icon: CreditCard },
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "QA Checklist", url: "/admin/qa", icon: CheckSquare },
]

const supportItems = [
  { title: "Help", url: "/help", icon: HelpCircle, shortcut: "?" },
]

export function SideNav() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary border-primary/30 glass-card" 
      : "hover:bg-accent/50 text-foreground-secondary hover:text-foreground glass-button"

  return (
    <Sidebar
      className="glass-card border-r border-card-border/50 backdrop-glass"
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-foreground-tertiary mb-3">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 font-medium">{item.title}</span>
                          {item.shortcut && (
                            <kbd className="ml-auto text-xs opacity-50">{item.shortcut}</kbd>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Navigation */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-foreground-tertiary mb-3">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="ml-3 font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 font-medium">{item.title}</span>
                          {item.shortcut && (
                            <kbd className="ml-auto text-xs opacity-50">{item.shortcut}</kbd>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}