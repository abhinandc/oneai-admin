import { 
  Key, 
  TestTube,
  Package, 
  BarChart3, 
  Users, 
  Building, 
  UserCheck, 
  BookOpen, 
  Zap,
  FileBarChart,
  Shield,
  Wrench,
  FlaskConical,
  Settings,
  Route,
  Bell,
  UserCog,
  Palette,
  ChevronDown
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
  { title: "Virtual Keys", url: "/keys/virtual", icon: Key },
  { title: "Test Key", url: "/keys/test", icon: TestTube },
  { title: "Models + Endpoints", url: "/models", icon: Package, active: true },
  { title: "Usage", url: "/usage", icon: BarChart3 },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "Organizations", url: "/organizations", icon: Building },
  { title: "Internal Users", url: "/internal-users", icon: UserCheck },
  { title: "API Reference", url: "/api-reference", icon: BookOpen },
  { title: "Model Hub", url: "/model-hub", icon: Zap },
  { title: "Logs", url: "/logs", icon: FileBarChart },
  { title: "Guardrails", url: "/guardrails", icon: Shield },
]

const expandableItems = [
  { 
    title: "Tools", 
    url: "/tools", 
    icon: Wrench, 
    hasDropdown: true,
    children: []
  },
  { 
    title: "Experimental", 
    url: "/experimental", 
    icon: FlaskConical, 
    hasDropdown: true,
    children: []
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings, 
    hasDropdown: true,
    children: [
      { title: "Router Settings", url: "/settings/router", icon: Route },
      { title: "Logging & Alerts", url: "/settings/logging", icon: Bell },
      { title: "Admin Settings", url: "/settings/admin", icon: UserCog },
      { title: "UI Theme", url: "/settings/theme", icon: Palette },
    ]
  },
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
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="ml-3 font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Expandable Items */}
        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {expandableItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 font-medium">{item.title}</span>
                          {item.hasDropdown && (
                            <ChevronDown className="ml-auto w-3 h-3 opacity-50" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                  {item.children && item.children.length > 0 && !isCollapsed && (
                    <SidebarMenu className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <SidebarMenuItem key={child.title}>
                          <SidebarMenuButton asChild>
                            <NavLink to={child.url} className={getNavCls}>
                              <child.icon className="w-4 h-4 flex-shrink-0" />
                              <span className="ml-3 font-medium text-sm">{child.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}