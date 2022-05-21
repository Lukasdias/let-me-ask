import React from 'react'
import ASIDE_IMG from './../public/illustration.svg'

export function Home() {
  return (
    <div className="flex relative w-screen h-screen bg-white">
      <aside className="flex flex-col gap-3 justify-center p-16 w-1/2 bg-purple-600">
        <img src={ASIDE_IMG} alt="aside img" className="max-w-[315px] h-auto" />
        <h1 className=" font-pop text-4xl font-bold leading-10 text-white">
          Toda pergunta tem <br /> uma resposta.
        </h1>
        <span className=" font-rob text-2xl leading-8 text-white">
          Aprenda e compartilhe conhecimento com outras pessoas
        </span>
      </aside>
    </div>
  )
}
