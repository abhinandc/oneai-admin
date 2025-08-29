import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={true}
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-card-foreground group-[.toaster]:border-card-border/30 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:before:absolute group-[.toaster]:before:inset-0 group-[.toaster]:before:bg-gradient-to-br group-[.toaster]:before:from-white/5 group-[.toaster]:before:to-transparent group-[.toaster]:before:pointer-events-none",
          description: "group-[.toast]:text-card-foreground/80 group-[.toast]:text-sm group-[.toast]:leading-relaxed",
          actionButton:
            "group-[.toast]:bg-primary/90 group-[.toast]:text-primary-foreground group-[.toast]:rounded-xl group-[.toast]:backdrop-blur-sm group-[.toast]:hover:scale-105 group-[.toast]:transition-all",
          cancelButton:
            "group-[.toast]:bg-secondary/90 group-[.toast]:text-secondary-foreground group-[.toast]:rounded-xl group-[.toast]:backdrop-blur-sm group-[.toast]:hover:scale-105 group-[.toast]:transition-all",
          closeButton:
            "group-[.toast]:bg-background/60 group-[.toast]:border-border/50 group-[.toast]:text-foreground/60 group-[.toast]:hover:text-foreground group-[.toast]:hover:bg-background/80 group-[.toast]:rounded-xl group-[.toast]:transition-all group-[.toast]:hover:scale-110",
          success: "group-[.toast]:bg-success/95 group-[.toast]:text-success-foreground group-[.toast]:border-success/30",
          error: "group-[.toast]:bg-destructive/95 group-[.toast]:text-destructive-foreground group-[.toast]:border-destructive/30",
          warning: "group-[.toast]:bg-warning/95 group-[.toast]:text-warning-foreground group-[.toast]:border-warning/30",
          info: "group-[.toast]:bg-primary/95 group-[.toast]:text-primary-foreground group-[.toast]:border-primary/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
