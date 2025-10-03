import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "frosted" | "glow"
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "liquid-glass-card",
      frosted: "frosted-glass",
      glow: "liquid-glass-card glow-primary"
    }

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          className
        )}
        {...props}
      />
    )
  }
)

GlassCard.displayName = "GlassCard"

export { GlassCard }