import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './Auth'
import { Room } from '../pages/Room'
import NewRoom from '../pages/NewRoom'
import Home from '../pages/Home'
import { AdminRoom } from '../pages/AdminRoom'

export function App() {
  return (
    <div className="flex overflow-x-hidden overflow-y-auto relative w-screen h-screen sm:overflow-y-hidden">
      <BrowserRouter>
        <Auth>
          <Routes>
            <Route path="/rooms/new" element={<NewRoom />} />
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="/rooms/admin/:id" element={<AdminRoom />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </div>
  )
}
