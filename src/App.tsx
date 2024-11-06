import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './themes'
import { Suspense } from 'react'
import Loading from './components/loading'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
