"use client";
import AuthProvider from "@/contexts/AuthProvider";
import store from "@/store";
import { Provider as ReduxProvider } from "react-redux";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </AuthProvider>
  );
}
