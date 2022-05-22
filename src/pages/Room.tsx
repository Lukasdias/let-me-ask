import React from 'react'
import Logo from './../public/logo.svg'
import { motion } from 'framer-motion'
import { RoomButton } from '../components/RoomButton/index'
export function Room() {
  return (
    <motion.div
      className="flex relative flex-col w-screen h-screen bg-my-white-background"
      animate={{
        opacity: [0, 1]
      }}
    >
      <header className="flex gap-2 justify-between items-center px-10 pt-12 pb-4 w-full h-auto border-b-2 border-b-my-gray-light sm:px-[100px]">
        <img src={Logo} alt="Let me ask logo" className="w-[100px] h-auto" />
        <div className="flex gap-2">
          <RoomButton variant="copy-paste">Sala #323243</RoomButton>
          <RoomButton variant="delete-room">Encerrar sala</RoomButton>
        </div>
      </header>
      <motion.main
        className="flex flex-1 justify-center p-2 pt-9"
        animate={{
          opacity: [0, 1],
          x: [-1000, 0]
        }}
        transition={{
          delay: 0.6
        }}
      >
        <section className="flex flex-col gap-4 items-stretch w-full sm:w-[800px]">
          <div className="flex gap-4">
            <h1 className="font-pop text-2xl font-bold text-my-black">{`Sala React Q&A`}</h1>
            <span className="flex justify-center items-center py-2 px-4 h-8 font-rob font-bold text-white bg-my-pink-dark rounded-3xl">
              4 perguntas
            </span>
          </div>
          <textarea
            className="p-4 min-h-[133px] rounded-md border-2 border-transparent focus:border-my-purple outline-none shadow-xl transition duration-200 resize-none"
            placeholder="O que você quer perguntar?"
          ></textarea>
        </section>
      </motion.main>
    </motion.div>
  )
}
