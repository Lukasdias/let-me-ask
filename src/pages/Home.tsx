import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogo, SignIn } from 'phosphor-react'
import { Aside } from '../components/HomeAside/index'
import { Loading } from '../components/Loading'
import { ref, get } from 'firebase/database'
import { motion } from 'framer-motion'
import { database } from '../services/firebase'
import { Button } from '../components/Button/index'

import LOGO from './../public/logo.svg'
import useStore from '../utils/userStore'

function Home() {
  const { user, signIn } = useStore()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoadingRoom, setIsLoadingRoom] = useState(false)

  async function handleGoToNewRoom() {
    if (!user) {
      await signIn()
    }

    navigate(`/rooms/new`, { replace: true })
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    setIsLoadingRoom(true)

    if (inputRef.current?.value.trim() === '') return

    const roomCode = inputRef.current?.value
    const roomRef = await get(ref(database, `rooms/${roomCode}`))

    if (!roomRef.exists()) {
      alert('Room does not exists')
      setIsLoadingRoom(false)
      return
    }

    setIsLoadingRoom(false)
    navigate(`/rooms/${roomCode}`, { replace: true })
    // navigate("")
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -1000
      }}
      animate={{
        x: [-1000, 0],
        opacity: [0, 1]
      }}
      className="flex relative flex-col w-screen h-screen bg-white sm:flex-row sm:h-screen"
    >
      <Aside />
      <main className="flex flex-col gap-4 justify-center items-center py-16 sm:flex-[8] sm:p-0">
        <div className="flex relative flex-col gap-4 items-stretch max-w-[320px]">
          <img
            src={LOGO}
            alt="Logo Let Me Ask"
            className="self-center max-w-[160px] h-auto"
          />
          <button
            type="button"
            className="flex gap-4 justify-center items-center px-9 h-14 font-rob font-bold text-white bg-my-red hover:bg-red-700 rounded-md outline-none focus:ring-2 focus:ring-red-700
            focus:ring-offset-2 focus:ring-offset-red-700 transition duration-200
            "
            onClick={handleGoToNewRoom}
          >
            <GoogleLogo weight="bold" className="w-6 h-6" />
            Crie sua sala com o google
          </button>
          <span
            className="flex relative after:flex-1 before:flex-1 items-center
          before:mr-[16px] after:ml-[16px] w-full after:h-[1px] before:h-[1px]
          text-sm
text-my-gray-medium
after:content-['']
before:content-['']
    after:bg-my-gray-medium before:bg-my-gray-medium
"
          >
            ou entre em uma sala
          </span>
          <form className="flex flex-col gap-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite o código da sala"
              className="p-3 h-12 placeholder:font-rob bg-white  rounded-lg
              border-2 border-my-gray-medium focus:border-transparent outline-none focus:ring-2 focus:ring-my-purple focus:ring-offset-2 focus:ring-offset-my-purple transition duration-200
            "
            />
            <Button
              variant="purple"
              disabled={isLoadingRoom}
              onClick={handleJoinRoom}
              type="submit"
            >
              {isLoadingRoom ? (
                <Loading />
              ) : (
                <>
                  <SignIn weight="bold" className="w-6 h-6 " />
                  Entrar na sala
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </motion.div>
  )
}

export default Home
