import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";


// We'll build these pages in the next steps
import Dashboard from "@/pages/dashboard";
import Assets from "@/pages/assets";
import Employees from "@/pages/employees";
import Assignments from "@/pages/assignments";
import Maintenance from "@/pages/maintenance";
import Layout from "@/components/layout";
import StudentDashboard from '@/pages/student-dashboard'

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard">
        <Layout><Dashboard /></Layout>
      </Route>
      <Route path={"/students"}>
        <Layout><StudentDashboard /></Layout>
      </Route>
      <Route path="/assets">
        <Layout><Assets /></Layout>
      </Route>
      <Route path="/employees">
        <Layout><Employees /></Layout>
      </Route>
      <Route path="/assignments">
        <Layout><Assignments /></Layout>
      </Route>
      <Route path="/maintenance">
        <Layout><Maintenance /></Layout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
