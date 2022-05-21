import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Spinner } from 'phosphor-react'
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth } from '../services/firebase'
import useStore from '../utils/userStore'
import NewRoom from '../pages/NewRoom'
import Home from '../pages/Home'
import { Auth } from './Auth'

export function App() {
  return (
    <div className="flex relative w-screen h-screen">
      <BrowserRouter>
        <Auth>
          <Routes>
            <Route path={`/rooms/new`} element={<NewRoom />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </div>
  )
}
