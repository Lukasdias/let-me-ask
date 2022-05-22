import React from 'react'
import { Copy } from 'phosphor-react'
import { motion } from 'framer-motion'

interface RoomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: 'copy-paste' | 'delete-room'
}

export function RoomButton({ ...props }: RoomButtonProps) {
  return (
    <>
      {props.variant === 'copy-paste' && (
        <button
          onClick={props.onClick}
          className="flex relative items-center min-w-[150x] h-[40px] font-rob font-medium rounded-lg border-2 border-my-purple hover:border-my-hover-purple focus:border-my-hover-purple outline-none transition duration-200"
        >
          <div className="flex justify-center items-center p-3 h-full bg-my-purple">
            <Copy weight="bold" className="w-5 h-5 text-white rounded-l-lg" />
          </div>
          <span className="px-5">{props.children}</span>
        </button>
      )}
      {props.variant === 'delete-room' && (
        <button
          onClick={props.onClick}
          className="flex justify-center items-center py-3 px-6 min-w-[150x] h-[40px] font-rob text-my-purple bg-transparent rounded-lg border-2 border-my-purple hover:border-my-hover-purple focus:border-my-hover-purple outline-none transition duration-200"
        >
          {props.children}
        </button>
      )}
    </>
  )
}
