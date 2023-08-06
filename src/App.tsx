import { FC, lazy, Suspense } from 'react'
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom'

import { MovieProvider } from '@context/Movie'

const Home = lazy(() => import('@pages/Home'))
const Details = lazy(() => import('@pages/Details'))
const NotFound = lazy(() => import('@pages/NotFound'))

const App: FC = () => {
  return (
    <BrowserRouter>
      <MovieProvider>
        <Routes>
          <Route
            path='/movies'
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route path='/' element={<Navigate to='/movies?filter=now_playing' />} />
          <Route
            path='/movie/:id'
            element={
              <Suspense fallback={<>...</>}>
                <Details />
              </Suspense>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MovieProvider>
    </BrowserRouter>
  )
}

export default App
