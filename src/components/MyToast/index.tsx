import React from 'react'
import { CheckCircle, WarningCircle, Copy } from 'phosphor-react'
import { motion, Variants } from 'framer-motion'

interface MyToastProps {
  visible: boolean
  type: 'success' | 'fail' | 'waiting' | 'custom'
  text?: string
}

const MyToastVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  },
  hidden: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

export function MyToast({ type, visible, text }: MyToastProps) {
  switch (type) {
    case 'success':
      return (
        <motion.div
          initial={'hidden'}
          animate={visible ? 'visible' : 'hidden'}
          variants={MyToastVariants}
          className={`flex gap-3 justify-center items-center p-3 font-pop font-bold text-white bg-green-600 rounded-xl shadow-sm
          }`}
        >
          <CheckCircle weight="bold" className="w-6 h-6" />
          Pergunta enviada
        </motion.div>
      )
    case 'fail':
      return (
        <motion.div
          initial={'hidden'}
          animate={visible ? 'visible' : 'hidden'}
          variants={MyToastVariants}
          className={`flex gap-3 justify-center items-center p-3 font-pop font-bold text-white bg-my-danger rounded-xl shadow-sm
      }`}
        >
          <WarningCircle weight="bold" className="w-6 h-6" />
          Error
        </motion.div>
      )
    case 'waiting':
      return <>waiting</>
    case 'custom':
      return (
        <motion.div
          initial={'hidden'}
          animate={visible ? 'visible' : 'hidden'}
          variants={MyToastVariants}
          className={`flex gap-3 justify-center items-center p-3 font-pop font-bold text-white bg-my-purple rounded-xl shadow-sm
      }`}
        >
          <Copy weight="bold" className="w-6 h-6" />
          {text}
        </motion.div>
      )
    default:
      return <></>
  }
}
