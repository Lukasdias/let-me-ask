import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const NewRoom = React.lazy(() => import('./../pages/NewRoom'))
const Home = React.lazy(() => import('./../pages/Home'))

export function App() {
  return (
    <div className="flex relative w-screen h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/rooms/new"
            element={
              <React.Suspense fallback={<>...</>}>
                <NewRoom />
              </React.Suspense>
            }
          />
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
