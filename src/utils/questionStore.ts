import React from 'react'
import create from 'zustand'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { get as dbGet } from 'firebase/database'
import { set as dbSet } from 'firebase/database'

export type FirebaseQuestions = Record<string, IQuestionProps>

export interface IQuestionProps {
  content: string
  author: {
    name: string
    avatar: string
  }
  numOfLikes: number
  isHighlighted: false
  isAnswered: false
}

export type Question = {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  numOfLikes: number
  isHighlighted: false
  isAnswered: false
}

interface IQuestionActions {
  title: string
  questions: Question[]
  likeQuestion: (question: Question, roomID: string) => Promise<void>
  removeQuestion: (question: Question, roomID: string) => Promise<void>
  setQuestions: (questions: Question[]) => void
  fetchRoomQuestion: (roomID: string) => Promise<void>
}

const questionStore = create<IQuestionActions>((set, get) => ({
  questions: [],
  title: '',
  setQuestions: (newQuestions) => {
    try {
      set({
        questions: newQuestions
      })
    } catch (error) {
      console.log(error)
    }
  },
  removeQuestion: async (question, roomID) => {
    try {
      const db = getDatabase()
      const questionRef = ref(db, `rooms/${roomID}/questions/${question.id}`)
      await remove(questionRef)
    } catch (error) {
      console.log(error)
    }
  },
  likeQuestion: async (question, roomID) => {
    try {
      const db = getDatabase()
      const questionRef = ref(db, `rooms/${roomID}/questions/${question.id}`)
      await dbSet(questionRef, {
        ...question,
        numOfLikes: question.numOfLikes + 1
      })
    } catch (error) {
      console.log(error)
    }
  },
  fetchRoomQuestion: async (roomID) => {
    try {
      const db = getDatabase()
      const roomRef = ref(db, `rooms/${roomID}`)
      onValue(roomRef, (room) => {
        const dbRoom = room.val()
        const firebaseQuestions: FirebaseQuestions = dbRoom.questions ?? {}
        const parsedData =
          Object.entries(firebaseQuestions).map(([key, value]) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isAnswered: value.isAnswered,
              numOfLikes: value.numOfLikes,
              isHighlighted: value.isHighlighted
            }
          }) ?? {}
        get().title = dbRoom.title
        get().setQuestions(parsedData)
      })
    } catch (error) {
      console.log(error)
    }
  }
}))

export default questionStore
