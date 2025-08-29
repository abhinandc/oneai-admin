import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Replace with your actual authentication API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      if (response.ok) {
        const data = await response.json()
        // Store auth token/session as needed
        localStorage.setItem('authToken', data.token)
        navigate('/dashboard')
      } else {
        console.error('Login failed')
        // Handle login error
      }
    } catch (error) {
      console.error('Login error:', error)
      // Handle login error - no automatic redirect
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth with your backend
    console.log("Google login initiated")
    // No automatic redirect - implement proper OAuth flow
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header with Logo */}
        <div className="text-center space-y-4">
          {/* OneOrigin Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={theme === 'dark' ? '/lovable-uploads/dd643953-77fa-4e55-a10d-1a0df298ef50.png' : '/lovable-uploads/6769a209-c508-4221-a988-13dc68d43d9f.png'}
              alt="OneOrigin"
              className="h-8 w-auto object-contain opacity-90"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback text logo */}
            <div className="hidden text-center">
              <div className="text-2xl font-bold text-foreground mb-1">oneorigin</div>
              <div className="w-8 h-1.5 bg-blue-500 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-foreground">
            OneAI Admin Interface
          </h1>
          <p className="text-foreground-secondary">
            Sign in to your OneAI account
          </p>
        </div>

        {/* Login Form */}
        <GlassCard className="p-8 space-y-6">
          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 text-base font-medium border-border/60 hover:bg-accent hover:text-accent-foreground"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-foreground-tertiary">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-tertiary" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-tertiary" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 bg-background/50 border-border/60 focus:border-primary/50"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-foreground-tertiary" />
                  ) : (
                    <Eye className="w-5 h-5 text-foreground-tertiary" />
                  )}
                </Button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                Forgot password?
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-foreground-secondary">
            Don't have an account?{" "}
            <Button variant="link" className="text-primary hover:text-primary/80 p-0">
              Sign up
            </Button>
          </div>
        </GlassCard>

        {/* Footer */}
        <div className="text-center text-xs text-foreground-tertiary">
          By signing in, you agree to our{" "}
          <Button variant="link" className="text-xs p-0 h-auto">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="text-xs p-0 h-auto">
          Privacy Policy
          </Button>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-sm text-foreground-tertiary">
            © {new Date().getFullYear()} OneOrigin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}