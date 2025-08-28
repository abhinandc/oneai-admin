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
          "glass-card focus-ring transition-all",
          {
            "glass-card": variant === "default",
            "bg-glass-hover/70": variant === "hover",
            "bg-glass-active/80": variant === "active",
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