import { motion } from 'framer-motion'
import React from 'react'
import BalloonIMG from './../../../public/empty-questions.svg'

export function NoQuestions() {
  return (
    <motion.div
      className="flex flex-col gap-2 items-stretch mx-auto w-full sm:w-[284px]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
        y: [1000, 0],
        scale: [0, 1]
      }}
      transition={{
        delay: 1.1
      }}
    >
      <img
        src={BalloonIMG}
        alt="ícones de balões de conversa"
        className="mx-auto max-w-[150px]"
      />
      <h3 className="font-pop text-lg font-semibold text-center text-my-black">
        Nenhuma pergunta por aqui...
      </h3>
      <span className="font-rob text-center text-my-hover-gray-medium">
        Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
      </span>
    </motion.div>
  )
}
