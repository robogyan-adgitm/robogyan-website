import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ParticleBackground from "@/components/animations/particle-background";
import Home from "@/pages/home";
import Team from "@/pages/team";
import Projects from "@/pages/projects";
import Events from "@/pages/events";
import Alumni from "@/pages/alumni";
import LifeAtRG from "@/pages/life-at-rg";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/team" component={Team} />
          <Route path="/projects" component={Projects} />
          <Route path="/events" component={Events} />
          <Route path="/alumni" component={Alumni} />
          <Route path="/life-at-rg" component={LifeAtRG} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;