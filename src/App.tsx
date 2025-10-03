import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import VirtualKeys from "./pages/VirtualKeys";
import TestKey from "./pages/TestKey";
import ModelsEndpoints from "./pages/ModelsEndpoints";
import Usage from "./pages/Usage";
import InternalUsers from "./pages/InternalUsers";
import ModelHub from "./pages/ModelHub";
import Logs from "./pages/Logs";
import Guardrails from "./pages/Guardrails";
import MCPServers from "./pages/tools/MCPServers";
import Settings from "./pages/Settings";
import Users from "./pages/admin/Users";
import Billing from "./pages/admin/Billing";
import AdminSettings from "./pages/admin/Settings";
import Auth from "./pages/Auth";
import Teams from "./pages/Teams";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth route without navigation */}
            <Route path="/" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* All other routes with navigation layout and authentication protection */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/keys/virtual" element={<VirtualKeys />} />
                      <Route path="/keys/test" element={<TestKey />} />
                      <Route path="/models" element={<ModelsEndpoints />} />
                      <Route path="/usage" element={<Usage />} />
                      <Route path="/internal-users" element={<InternalUsers />} />
                      <Route path="/model-hub" element={<ModelHub />} />
                      <Route path="/logs" element={<Logs />} />
                      <Route path="/guardrails" element={<Guardrails />} />
                      <Route path="/tools/mcp-servers" element={<MCPServers />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/admin/users" element={<Users />} />
                      <Route path="/admin/billing" element={<Billing />} />
                      <Route path="/admin/settings" element={<AdminSettings />} />
                      <Route path="/teams" element={<Teams />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;