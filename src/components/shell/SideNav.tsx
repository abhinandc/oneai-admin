import { 
  Home,
  Key, 
  TestTube,
  Package, 
  BarChart3, 
  Users, 
  UserCheck, 
  Zap,
  FileBarChart,
  Shield,
  Wrench,
  Settings,
  Database,
  Menu
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const homeItem = { title: "Home", url: "/", icon: Home }

const mainItems = [
  { title: "Virtual Keys", url: "/keys/virtual", icon: Key },
  { title: "Test Key", url: "/keys/test", icon: TestTube },
  { title: "Models + Endpoints", url: "/models", icon: Package },
  { title: "Usage", url: "/usage", icon: BarChart3 },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "Internal Users", url: "/internal-users", icon: UserCheck },
  { title: "Model Hub", url: "/model-hub", icon: Zap },
  { title: "Logs", url: "/logs", icon: FileBarChart },
  { title: "Guardrails", url: "/guardrails", icon: Shield },
]

const toolsItems = [
  { title: "MCP Servers", url: "/tools/mcp-servers", icon: Database },
]

export function SideNav() {
  const { state } = useSidebar()
  const { theme } = useTheme()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "apple-nav-item-active" 
      : "apple-nav-item"

  return (
    <Sidebar className="apple-sidebar w-64" collapsible="icon">
      <SidebarContent className="p-4 space-y-6">
        {/* Collapse Toggle */}
        <div className="flex justify-end mb-4">
          <SidebarTrigger className="flex items-center justify-center w-10 h-10 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
            <Menu className="w-5 h-5 text-foreground" />
          </SidebarTrigger>
        </div>

        {/* Home Button */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to={homeItem.url} end className={getNavCls}>
                    <homeItem.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-semibold">{homeItem.title}</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="section-header">
            PLATFORM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
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

        {/* Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="section-header">
            TOOLS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
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

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className={getNavCls}>
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-medium">Settings</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* OneOrigin Logo */}
        <div className="mt-auto p-4 border-t border-border/20">
          <div className="flex justify-center">
            {/* Logo placeholder - replace with actual logo imports */}
            <div className="h-8 flex items-center">
              {theme === 'dark' ? (
                // Dark theme logo (light colored logo)
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-sm flex-shrink-0"></div>
                  {!isCollapsed && (
                    <span className="text-foreground font-semibold text-sm">oneorigin</span>
                  )}
                </div>
              ) : (
                // Light theme logo (dark colored logo)  
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-800 rounded-sm flex-shrink-0"></div>
                  {!isCollapsed && (
                    <span className="text-foreground font-semibold text-sm">oneorigin</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}