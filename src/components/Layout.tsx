import { SidebarProvider } from "@/components/ui/sidebar"
import { TopBar } from "@/components/shell/TopBar"
import { SideNav } from "@/components/shell/SideNav"
import { CommandPalette } from "@/components/CommandPalette"
import { Footer } from "@/components/Footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex flex-col">
        <TopBar />
        <div className="flex flex-1">
          <SideNav />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
      <CommandPalette />
    </SidebarProvider>
  )
}