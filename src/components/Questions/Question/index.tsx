import React from 'react'
import { ThumbsUp } from 'phosphor-react'
import { motion, MotionProps, Variants } from 'framer-motion'

interface Props extends MotionProps {
  description: string
  author: {
    avatar: string
    name: string
  }
  numOfLikes: number
  onLikeQuestion: () => void
}

const QuestionVariant: Variants = {
  show: (i) => ({
    opacity: [0, 1],
    x: [1000, 0],
    transition: {
      duration: 0.6,
      delay: i * 1
    }
  })
}

export function Question({ ...props }: Props) {
  return (
    <motion.div
      custom={props.custom}
      variants={QuestionVariant}
      animate="show"
      initial={{ opacity: 0 }}
      className="flex flex-col gap-3 p-6 min-h-[150px] rounded-lg shadow"
    >
      <p className="font-rob text-my-black">{props.description}</p>
      <div className="flex justify-between items-center mt-auto w-full">
        <div className="flex gap-4 items-center">
          <img
            src={props.author.avatar}
            alt={`icone da foto de ${props.author.name}`}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-rob text-sm text-my-gray-dark">
            {props.author.name}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center font-pop font-bold text-my-gray-dark">
            {props.numOfLikes}
          </span>
          <button type="button" className="group">
            <ThumbsUp
              weight="regular"
              className="w-6 h-6 text-my-gray-dark group-hover:text-my-hover-purple group-focus:text-my-hover-purple transition duration-200"
            />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
