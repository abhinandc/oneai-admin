import { Heart, Code } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-6 px-6">
      <div className="border-t border-border/20 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by OneAI Team</span>
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
            © 2024 OneAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}