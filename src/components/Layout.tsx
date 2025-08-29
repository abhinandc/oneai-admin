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
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <TopBar />
        </div>
        
        <div className="flex flex-1 pt-16"> {/* Add padding-top for fixed header */}
          <SideNav />
          
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Scrollable Main Content */}
            <main className="flex-1 p-6 pb-20"> {/* Add padding-bottom for fixed footer */}
              {children}
            </main>
            
            {/* Fixed Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-40">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <CommandPalette />
    </SidebarProvider>
  )
}