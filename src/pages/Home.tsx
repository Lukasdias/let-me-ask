import React from 'react'
import { useNavigate } from 'react-router-dom'
import ASIDE_IMG from './../public/illustration.svg'
import LOGO from './../public/favicon.svg'
import { GoogleLogo, SignIn } from 'phosphor-react'

function Home() {
  const navigate = useNavigate()

  function handleGoToNewRoom() {
    navigate('/rooms/new', { replace: true })
  }

  return (
    <div className="flex relative flex-col w-screen h-screen bg-white sm:flex-row sm:h-screen">
      <aside className="flex flex-col flex-[7] gap-3 justify-center p-16 bg-my-purple">
        <img src={ASIDE_IMG} alt="aside img" className="max-w-[315px] h-auto" />
        <h1 className=" font-pop text-4xl font-bold leading-10 text-white">
          Toda pergunta tem uma resposta.
        </h1>
        <span className="font-rob text-2xl leading-8 text-white">
          Aprenda e compartilhe conhecimento com outras pessoas
        </span>
      </aside>
      <main className="flex flex-col gap-4 justify-center items-center py-16 sm:flex-[8] sm:p-0">
        <div className="flex relative flex-col gap-4 items-stretch max-w-[320px]">
          <img
            src={LOGO}
            alt="Logo Let Me Ask"
            className="self-center max-w-[160px] h-auto"
          />
          <button
            type="button"
            className="flex gap-4 justify-center items-center px-9 h-14 font-rob font-bold text-white bg-my-red hover:bg-red-700 rounded-md focus:border-2 focus:border-my-danger outline-none transition duration-200"
            onClick={handleGoToNewRoom}
          >
            <GoogleLogo weight="bold" className="w-6 h-6" />
            Crie sua sala com o google
          </button>
          <span
            className="flex relative after:flex-1 before:flex-1 items-center
          before:mr-[16px] after:ml-[16px] w-full after:h-[1px] before:h-[1px]
          text-sm
text-my-gray-medium
after:content-['']
before:content-['']
    after:bg-my-gray-medium before:bg-my-gray-medium
"
          >
            ou entre em uma sala
          </span>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Digite o código da sala"
              className="p-3 h-12 placeholder:font-rob bg-white  rounded-lg
              border-2 border-my-gray-medium focus:border-transparent outline-none focus:ring-2 focus:ring-my-purple focus:ring-offset-2 focus:ring-offset-my-purple transition duration-200
            "
            />
            <button
              type="submit"
              className="flex gap-3 justify-center items-center p-3 h-[50px] font-rob text-white bg-my-purple   hover:bg-my-hover-purple rounded-lg disabled:opacity-50 transition duration-200 disabled:cursor-not-allowed"
            >
              <SignIn weight="bold" className="w-6 h-6 " />
              Entrar na sala
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
