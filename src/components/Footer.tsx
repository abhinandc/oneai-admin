import { Code } from "lucide-react"

export function Footer() {
  return (
    <footer className="backdrop-blur-2xl bg-background/80 border-t border-border/30 px-6 py-4 shadow-lg">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <span>Product by OneOrigin</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-foreground-secondary">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Code className="w-4 h-4" />
              API Docs
            </a>
          </div>
          
          <div className="text-sm text-foreground-tertiary">
            © 2025 OneOrigin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}