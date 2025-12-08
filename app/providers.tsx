"use client";
import AuthProvider from "@/contexts/AuthProvider";
import store from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
        refetchInterval: 5000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: "always",
        retry: 2,
      },
      mutations: {
        retry: 1,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
