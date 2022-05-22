import React, { useEffect, useState } from 'react'
import { NoQuestions } from './NoQuestions/index'
import { Question } from './Question/index'
import useStore from '../../utils/userStore'
import { ref, get, child, onValue } from 'firebase/database'
import { RoomParams } from '../../utils/roomParams'
import { useParams } from 'react-router-dom'
import { getDatabase } from 'firebase/database'
import {
  QuestionProps,
  FirebaseQuestions,
  ParsedQuestionProps
} from '../../utils/question'

export function Questions() {
  const { user } = useStore()
  const [questionsData, setQuestionsData] = useState<QuestionProps[]>([])
  const params = useParams<RoomParams>()
  const roomID = params.id
  // const dbRef = ref(database, `rooms/${roomID}/questions`)

  useEffect(() => {
    async function getData() {
      // const room = await get(
      //   child(ref(getDatabase()), `rooms/${roomID}/questions`)
      // )
      onValue(ref(getDatabase(), `rooms/${roomID}/questions`), (room) => {
        const databaseRoom = room.val()
        console.log(databaseRoom)
        const firebaseQuestions = databaseRoom.questions as FirebaseQuestions
        const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(
          ([key, value]) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isHighlighted: value.isHighlighted,
              numOfLikes: value.numOfLikes,
              isAnswered: value.isAnswered
            }
          }
        )
      })
    }
    getData()
  }, [])
  return (
    <>
      {!questionsData ? (
        <NoQuestions />
      ) : (
        <>
          <div className="flex flex-col gap-3 items-stretch"></div>
        </>
      )}
    </>
  )
}
