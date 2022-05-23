import React from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'
import { motion, MotionProps, Variants } from 'framer-motion'
import questionStore, { Question } from '../../../utils/questionStore'
import { useParams } from 'react-router-dom'
import { RoomParams } from '../../../utils/roomParams'
import { Toaster, toast } from 'react-hot-toast'
import { MyToast } from '../../MyToast'

interface Props extends MotionProps {
  isAdmin: boolean
  question: Question
}

const QuestionVariant: Variants = {
  show: {
    opacity: [0, 1],
    y: [-30, 0],
    scale: [0, 1],
    transition: {
      duration: 0.5
    }
  }
}

const deleted = () =>
  toast.custom((t) => (
    <MyToast visible={t.visible} type="delete" text="Questão removida" />
  ))

export function TemplateQuestion({ ...props }: Props) {
  const params = useParams<RoomParams>()
  const roomID = params.id
  const { likeQuestion, removeQuestion } = questionStore()

  function handleLikeQuestion() {
    likeQuestion(props.question, `${roomID}`)
  }

  function handleRemoveQuestion() {
    removeQuestion(props.question, `${roomID}`)
    deleted()
  }

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 1000
        }}
      />
      <motion.div
        custom={props.custom}
        variants={QuestionVariant}
        viewport={{ once: true }}
        whileInView="show"
        initial={{ opacity: 0 }}
        className="flex flex-col gap-3 p-6 min-h-[150px] rounded-lg shadow"
      >
        <p className="font-rob text-my-black">{props.question.content}</p>
        <div className="flex justify-between items-center mt-auto w-full">
          <div className="flex gap-4 items-center">
            <img
              src={props.question.author.avatar}
              alt={`icone da foto de ${props.question.author.name}`}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-rob text-sm text-my-gray-dark">
              {props.question.author.name}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center font-pop font-bold text-my-gray-dark">
              {props.question.numOfLikes}
            </span>
            <button type="button" className="group">
              <ThumbsUp
                onClick={handleLikeQuestion}
                weight="regular"
                className="w-6 h-6 text-my-gray-dark group-hover:text-my-hover-purple group-focus:text-my-hover-purple transition duration-200"
              />
            </button>
            {props.isAdmin && (
              <button type="button" className="group">
                <Trash
                  onClick={handleRemoveQuestion}
                  weight="regular"
                  className="w-6 h-6 text-my-danger group-hover:text-my-hover-danger group-focus:text-my-hover-danger transition duration-200"
                />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
