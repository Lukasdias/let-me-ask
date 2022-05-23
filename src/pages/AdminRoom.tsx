import { FormEvent, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RoomButton } from '../components/RoomButton/index'
import { Button } from '../components/Button/index'
import { Questions } from '../components/Questions/index'
import { useParams } from 'react-router-dom'
import { push, ref } from 'firebase/database'
import { database } from '../services/firebase'
import { Loading } from '../components/Loading/index'
import toast, { Toaster } from 'react-hot-toast'
import { MyToast } from '../components/MyToast/index'
import { RoomParams } from '../utils/roomParams'
import { SmileySad } from 'phosphor-react'
import questionStore, { IQuestionProps } from '../utils/questionStore'
import userStore from '../utils/userStore'
import Logo from './../public/logo.svg'
import roomStore from '../utils/roomStore'
import { modalStore } from '../components/Modal'
import { Modal } from '../components/Modal/index'
const success = () =>
  toast.custom((t) => <MyToast visible={t.visible} type="success" />)
const fail = () =>
  toast.custom((t) => <MyToast visible={t.visible} type="fail" />)

export function AdminRoom() {
  const { toggle } = modalStore()
  const { user, signIn } = userStore()
  const { questions, title } = questionStore()
  const { deleteRoom } = roomStore()
  const params = useParams<RoomParams>()
  const roomID = params.id

  function handleDeleteRoom() {
    toggle()
  }

  return (
    <>
      <Modal />
      <motion.div
        className="flex overflow-y-auto relative flex-col w-screen h-screen bg-my-white-background"
        initial={{ opacity: 0, y: -1000 }}
        animate={{
          opacity: [0, 1],
          y: 0
        }}
      >
        <Toaster
          toastOptions={{
            duration: 1000
          }}
        />
        <header className="flex gap-2 justify-center px-10 pt-12 pb-4 w-full h-auto border-b-2 border-b-my-gray-light sm:px-[100px]">
          <div className="flex flex-col gap-3 justify-between items-center w-full max-w-[1120px] sm:flex-row">
            <img
              src={Logo}
              alt="Let me ask logo"
              className="w-[100px] h-auto"
            />
            <div className="flex gap-2">
              <RoomButton roomID={roomID as string} variant="copy-paste">
                {params.id}
              </RoomButton>
              <RoomButton
                roomID={roomID as string}
                variant="delete-room"
                onClick={handleDeleteRoom}
              >
                Encerrar sala
              </RoomButton>
            </div>
          </div>
        </header>
        <motion.main
          className="flex flex-1 justify-center p-2 pt-9"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1],
            y: [1000, 0]
          }}
          transition={{
            delay: 0.9
          }}
        >
          <section className="flex flex-col gap-4 items-stretch w-full sm:w-[800px]">
            <div className="flex flex-col gap-4 sm:flex-row">
              <h1 className="font-pop text-2xl font-bold text-center text-my-black sm:text-left">{`Sala ${title}`}</h1>
              {questions!.length > 0 ? (
                <span className="flex justify-center items-center py-2 px-4 h-8 font-rob font-bold text-white bg-my-pink-dark rounded-3xl">
                  {questions!.length} pergunta{questions!.length > 1 && 's'}
                </span>
              ) : (
                <span className="flex gap-2 justify-center items-center py-2 px-4 h-8 font-rob font-bold text-white bg-my-black rounded-3xl">
                  Nenhuma pergunta{' '}
                  <SmileySad weight="bold" className="w-6 h-6" />
                </span>
              )}
            </div>
            <Questions isAdmin={true} />
          </section>
        </motion.main>
      </motion.div>
    </>
  )
}
