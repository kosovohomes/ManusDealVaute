import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectNutshell from "./pages/ProjectNutshell";
import InvestorWorkspace from "./pages/InvestorWorkspace";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  return <Switch>
    <Route path="/" component={Home}/>
    <Route path="/project/:slug/nutshell" component={ProjectNutshell}/>
    <Route path="/project/:slug" component={ProjectDetail}/>
    <Route path="/workspace" component={InvestorWorkspace}/>
    <Route path="/admin" component={AdminDashboard}/>
    <Route path="/admin/projects" component={AdminDashboard}/>
    <Route path="/admin/requests" component={AdminDashboard}/>
    <Route path="/admin/documents" component={AdminDashboard}/>
    <Route path="/admin/media" component={AdminDashboard}/>
    <Route path="/admin/readiness" component={AdminDashboard}/>
    <Route path="/admin/users" component={AdminDashboard}/>
    <Route path="/admin/analytics" component={AdminDashboard}/>
    <Route path="/admin/imports" component={AdminDashboard}/>
    <Route path="/admin/activity" component={AdminDashboard}/>
    <Route path="/admin/settings" component={AdminDashboard}/>
    <Route path="/404" component={NotFound}/>
    <Route component={NotFound}/>
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster/><Router/></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
