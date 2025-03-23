import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import StoryPreview from "@/pages/StoryPreview";
import Checkout from "@/pages/Checkout";
import ContactSubmissions from "@/pages/ContactSubmissions";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/preview/:id" component={StoryPreview} />
      <Route path="/checkout/:id" component={Checkout} />
      <Route path="/admin/contact-submissions" component={ContactSubmissions} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
