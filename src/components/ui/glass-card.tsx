import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "active"
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass effect with stunning backdrop blur
          "backdrop-blur-xl bg-card/60 border border-card-border/30",
          "rounded-2xl shadow-2xl transition-all duration-300 ease-out",
          "hover:shadow-3xl hover:bg-card/70 hover:border-card-border/50",
          "hover:scale-[1.01] hover:-translate-y-1",
          // Enhanced glass morphism effect
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
          {
            "bg-card/60": variant === "default",
            "bg-card/70 shadow-3xl scale-[1.01] -translate-y-1": variant === "hover",
            "bg-card/80 shadow-4xl border-primary/20": variant === "active",
          },
          className
        )}
        {...props}
      />
    )
  }
)

GlassCard.displayName = "GlassCard"

export { GlassCard }