import React, { useEffect } from 'react'
import { NoQuestions } from './NoQuestions/index'
import { TemplateQuestion } from './TemplateQuestion/index'
import userStore from '../../utils/userStore'
import { RoomParams } from '../../utils/roomParams'
import { useParams } from 'react-router-dom'
import questionStore from '../../utils/questionStore'

type Props = {
  isAdmin: boolean
}

export function Questions({ isAdmin }: Props) {
  const { questions, fetchRoomQuestion } = questionStore()
  const params = useParams<RoomParams>()
  const roomID = params.id

  useEffect(() => {
    fetchRoomQuestion(`${roomID}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomID])

  return (
    <>
      {questions.length === 0 ? (
        <NoQuestions isAdmin={isAdmin} />
      ) : (
        <>
          <div className="flex flex-col gap-3 items-stretch">
            {questions.map((q, idx: number) => (
              <TemplateQuestion
                isAdmin={isAdmin}
                key={idx}
                custom={idx}
                question={q}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}
