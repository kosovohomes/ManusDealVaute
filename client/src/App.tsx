import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./auth";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectNutshell from "./pages/ProjectNutshell";
import InvestorWorkspace from "./pages/InvestorWorkspace";
import AdminDashboard from "./pages/AdminDashboard";
import { LoginPage, RegisterPage } from "./pages/AuthPages";

function Router() { return <Switch>
  <Route path="/" component={Home}/>
  <Route path="/login" component={LoginPage}/>
  <Route path="/register" component={RegisterPage}/>
  <Route path="/project/:slug/nutshell" component={ProjectNutshell}/>
  <Route path="/project/:slug" component={ProjectDetail}/>
  <Route path="/workspace">{() => <ProtectedRoute><InvestorWorkspace/></ProtectedRoute>}</Route>
  { ["/admin", "/admin/projects", "/admin/requests", "/admin/documents", "/admin/media", "/admin/readiness", "/admin/users", "/admin/analytics", "/admin/imports", "/admin/activity", "/admin/settings"].map(path => <Route key={path} path={path}>{() => <ProtectedRoute admin><AdminDashboard/></ProtectedRoute>}</Route>) }
  <Route path="/404" component={NotFound}/><Route component={NotFound}/>
</Switch>; }

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster/><AuthProvider><Router/></AuthProvider></TooltipProvider></ThemeProvider></ErrorBoundary>; }
