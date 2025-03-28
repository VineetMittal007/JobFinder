import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from '../navigation/Navigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}


