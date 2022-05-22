import React from 'react'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset' | undefined
  disabled: boolean
  variant: 'purple' | 'danger' | 'no-bg'
}

export function Button({ ...props }: ButtonProps) {
  return (
    <>
      {props.variant === 'purple' && (
        <button
          disabled={props.disabled}
          type={props.type}
          className="flex gap-3 justify-center items-center p-3 h-[50px] font-rob font-bold text-white  bg-my-purple hover:bg-my-hover-purple rounded-lg outline-none focus:ring-4 focus:ring-my-hover-purple focus:ring-offset-my-hover-purple 
        disabled:opacity-50 transition duration-200 disabled:cursor-not-allowed"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
      {props.variant === 'danger' && (
        <button className="" onClick={props.onClick}></button>
      )}
      {props.variant === 'no-bg' && (
        <button className="" onClick={props.onClick}></button>
      )}
    </>
  )
}
