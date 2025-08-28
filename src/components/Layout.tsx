import { SidebarProvider } from "@/components/ui/sidebar"
import { TopBar } from "@/components/shell/TopBar"
import { SideNav } from "@/components/shell/SideNav"
import { CommandPalette } from "@/components/CommandPalette"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SideNav />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
      <CommandPalette />
    </SidebarProvider>
  )
}