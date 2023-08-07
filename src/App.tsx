import { FC, lazy, Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { MovieProvider } from '@context/Movie'

const Home = lazy(() => import('@pages/Home'))
const Details = lazy(() => import('@pages/Details'))
const NotFound = lazy(() => import('@pages/NotFound'))

const App: FC = () => {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='/now_playing'
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='/top_rated'
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='/search'
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
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
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App
