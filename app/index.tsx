import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppNavigator from "../navigation/Navigator";
import { ThemeProvider } from "../Theme/ThemeContext";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
