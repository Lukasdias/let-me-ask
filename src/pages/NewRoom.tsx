import React, { FormEvent, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ref, push, DatabaseReference } from 'firebase/database'
import { Aside } from '../components/HomeAside/index'
import { database } from '../services/firebase'
import { Loading } from '../components/Loading'
import { motion } from 'framer-motion'
import LOGO from './../public/logo.svg'
import userStore from '../utils/userStore'
import roomStore from '../utils/roomStore'

function NewRoom() {
  const [isSendingRoom, setIsSendingRoom] = useState(false)
  const { user } = userStore()
  const { createRoom } = roomStore()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleCreateRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (inputRef.current?.value.trim() === '') return
    setIsSendingRoom(true)
    const firebaseRoom = await createRoom({
      title: inputRef.current?.value as string,
      authorID: user?.id as string,
      questions: []
    })
    // const roomRef = ref(database, 'rooms')
    // const firebaseRoom = await push(roomRef, {
    //   title: inputRef.current?.value,
    //   authorID: user?.id
    // })
    setIsSendingRoom(false)
    navigate(`/rooms/admin/${firebaseRoom?.key}`, { replace: true })
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 1000
      }}
      animate={{
        x: [1000, 0],
        opacity: [0, 1]
      }}
      className="flex relative flex-col w-screen h-screen bg-white sm:flex-row sm:h-screen"
    >
      <Aside />
      <main className="flex flex-col gap-4 justify-center items-center py-16 sm:flex-[8] sm:p-0">
        <div className="flex relative flex-col gap-6 items-stretch max-w-[320px]">
          <img
            src={LOGO}
            alt="Logo Let Me Ask"
            className="self-center max-w-[160px] h-auto"
          />
          <h2 className="font-pop text-2xl font-bold leading-6 text-center">
            Bem vindo {user?.name}
          </h2>
          <h2 className="font-pop text-2xl font-bold leading-6 text-center">
            Crie uma nova sala
          </h2>
          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => handleCreateRoom(event)}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Nome da sala"
              className="p-3 h-12 placeholder:font-rob bg-white  rounded-lg
              border-2 border-my-gray-medium focus:border-transparent outline-none focus:ring-2 focus:ring-my-purple focus:ring-offset-2 focus:ring-offset-my-purple transition duration-200
            "
            />
            <button
              type="submit"
              className="flex gap-3 justify-center items-center p-3 h-[50px] font-rob font-bold text-white  bg-my-purple hover:bg-my-hover-purple rounded-lg outline-none focus:ring-4 focus:ring-my-hover-purple focus:ring-offset-my-hover-purple 
              disabled:opacity-50 transition duration-200 disabled:cursor-not-allowed"
            >
              {isSendingRoom ? <Loading /> : <>Criar sala</>}
            </button>
            <p className="font-rob text-sm text-my-gray-medium">
              Quer entrar em uma sala já existente?{' '}
              <Link
                to="/"
                className="text-my-pink-dark focus:text-my-pink-light underline outline-none"
              >
                Clique aqui
              </Link>
            </p>
          </form>
        </div>
      </main>
    </motion.div>
  )
}

export default NewRoom
