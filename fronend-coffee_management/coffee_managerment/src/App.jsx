// use for react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './router/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Khởi tạo queryClient để sử dụng react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: thời gian dữ liệu được coi là còn hợp lệ 5S (NẾU VƯỢT QUÁ THÌ SẼ FETCH LẠI DỮ LIỆU)
      staleTime: 3000,
      // cacheTime: thời gian dữ liệu được lưu trong cache 10p (NẾU VƯỢT QUÁ THÌ SẼ XÓA DỮ LIỆU)
      gcTime: 10 * (1000 * 60),
      // refetchInterval: 3000
    },
  },
})

export default function App() {

  return (
    <div>

      <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="colored"
        />
      </QueryClientProvider>
    </div>
  )
}
