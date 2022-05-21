import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LOGO from './../public/favicon.svg'
import { Aside } from '../components/HomeAside/index'
import useStore from '../utils/userStore'
function NewRoom() {
  const { user } = useStore()

  return (
    <div className="flex relative flex-col w-screen h-screen bg-white sm:flex-row sm:h-screen">
      <Aside />
      <main className="flex flex-col gap-4 justify-center items-center py-16 sm:flex-[8] sm:p-0">
        <div className="flex relative flex-col gap-6 items-stretch max-w-[320px]">
          <img
            src={LOGO}
            alt="Logo Let Me Ask"
            className="self-center max-w-[160px] h-auto"
          />
          <h2 className="font-pop text-2xl font-bold leading-6 text-center">
            Crie uma nova conta
          </h2>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Nome da sala"
              className="p-3 h-12 placeholder:font-rob bg-white  rounded-lg
              border-2 border-my-gray-medium focus:border-transparent outline-none focus:ring-2 focus:ring-my-purple focus:ring-offset-2 focus:ring-offset-my-purple transition duration-200
            "
            />
            <button
              type="submit"
              className="flex gap-3 justify-center items-center p-3 h-[50px] font-rob text-white bg-my-purple   hover:bg-my-hover-purple rounded-lg disabled:opacity-50 transition duration-200 disabled:cursor-not-allowed"
            >
              Criar sala
            </button>
            <p className="font-rob text-sm text-my-gray-medium">
              Quer entrar em uma sala já existente?{' '}
              <Link to="/" className="text-my-pink-dark underline">
                Clique aqui
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}

export default NewRoom
