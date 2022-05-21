import React from 'react'
import ASIDE_IMG from './../../public/illustration.svg'

export function Aside() {
  return (
    <aside className="flex flex-col flex-[7] gap-3 justify-center p-16 bg-my-purple">
      <img src={ASIDE_IMG} alt="aside img" className="max-w-[315px] h-auto" />
      <h1 className=" font-pop text-4xl font-bold leading-10 text-white">
        Toda pergunta tem uma resposta.
      </h1>
      <span className="font-rob text-2xl leading-8 text-white">
        Aprenda e compartilhe conhecimento com outras pessoas
      </span>
    </aside>
  )
}
