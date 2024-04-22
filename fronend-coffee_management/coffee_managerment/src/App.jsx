// use for react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './router/Router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
      gcTime: 10 * (1000 * 60),
    },
  },
})

export default function App() {

  return (
    <div>

      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </div>
  )
}
