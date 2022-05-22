import React, { useState } from 'react'
import { Copy } from 'phosphor-react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { MyToast } from '../MyToast'

interface RoomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: 'copy-paste' | 'delete-room'
  roomID: string
}

const copySuccess = () =>
  toast.custom((t) => (
    <MyToast visible={t.visible} type="custom" text="Código Copiado!" />
  ))

export function RoomButton({ ...props }: RoomButtonProps) {
  function handleCopyRoomCode() {
    navigator.clipboard.writeText(props.roomID)
    copySuccess()
  }
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 1000
        }}
      />
      {props.variant === 'copy-paste' && (
        <motion.button
          onClick={handleCopyRoomCode}
          whileFocus={{
            opacity: 0.5,
            transition: {
              duration: 0.3,
              ease: 'easeInOut'
            }
          }}
          className="flex relative items-center min-w-[150x] h-[40px] font-rob font-medium rounded-lg border-2 border-my-purple hover:border-my-hover-purple focus:border-my-hover-purple outline-none"
        >
          <div className="flex justify-center items-center p-3 h-full bg-my-purple">
            <Copy weight="bold" className="w-5 h-5 text-white rounded-l-lg" />
          </div>
          <span className="px-5 text-xs sm:text-base">{props.children}</span>
        </motion.button>
      )}
      {props.variant === 'delete-room' && (
        <motion.button
          whileFocus={{
            opacity: 0.5,
            transition: {
              duration: 0.3,
              ease: 'easeInOut'
            }
          }}
          onClick={props.onClick}
          className="flex justify-center items-center py-3 px-6 min-w-[150x] h-[40px] font-rob text-xs text-my-purple bg-transparent rounded-lg border-2 border-my-purple hover:border-my-hover-purple focus:border-my-hover-purple outline-none transition duration-200 sm:text-base"
        >
          {props.children}
        </motion.button>
      )}
    </>
  )
}
