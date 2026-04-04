import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Tree from "./pages/Tree.tsx";
import Reflection from "./pages/Reflection.tsx";
import Lifestyle from "./pages/Lifestyle.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import { useUserStore } from "./store/useUserStore.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useUserStore((state) => state.token);
  const onboardingCompleted = useUserStore((state) => state.onboardingCompleted);
  const location = window.location.pathname;
  
  if (!token) {
    // For demo purposes, we'll allow access even without token if needed
    // but let's stick to the logic for now
    // return <Navigate to="/login" replace />;
  }

  if (!onboardingCompleted && location !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tree" 
            element={
              <ProtectedRoute>
                <Tree />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reflection" 
            element={
              <ProtectedRoute>
                <Reflection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lifestyle" 
            element={
              <ProtectedRoute>
                <Lifestyle />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* Fallback for other routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
