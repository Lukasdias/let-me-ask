import React from 'react'
import create from 'zustand'
import { getDatabase, ref, onValue, remove, push, off } from 'firebase/database'
import { get as dbGet } from 'firebase/database'
import { set as dbSet } from 'firebase/database'
import { database } from '../services/firebase'
import { IUserProps } from './userStore'
import { persist } from 'zustand/middleware'
import userStore from './userStore'
export type FirebaseQuestions = Record<string, IQuestionProps>

export interface IQuestionProps {
  content: string
  author: {
    name: string
    avatar: string
  }
  likes: Record<
    string,
    {
      authorId: string
    }
  >
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
  likesCount: number
  likeId: string | undefined
  isHighlighted: false
  isAnswered: false
}

interface IQuestionActions {
  title: string
  questions: Question[]
  likeQuestion: (
    question: Question,
    roomID: string,
    user: IUserProps | undefined,
    likeId: string | undefined
  ) => Promise<void>
  removeQuestion: (question: Question, roomID: string) => Promise<void>
  setQuestions: (questions: Question[]) => void
  fetchRoomQuestion: (
    roomID: string,
    user: IUserProps | undefined
  ) => Promise<void | null>
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
      const db = database
      const questionRef = ref(db, `rooms/${roomID}/questions/${question.id}`)
      await remove(questionRef)
    } catch (error) {
      console.log(error)
    }
  },
  likeQuestion: async (question, roomID, user, likeId) => {
    try {
      if (likeId) {
        const likeRef = ref(
          database,
          `rooms/${roomID}/questions/${question.id}/likes/${likeId}`
        )
        await remove(likeRef)
      } else {
        const likeRef = ref(
          database,
          `rooms/${roomID}/questions/${question.id}/likes`
        )
        await push(likeRef, {
          authorId: user?.id
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  fetchRoomQuestion: async (roomID, user) => {
    try {
      const db = database
      const roomRef = ref(db, `rooms/${roomID}`)
      onValue(roomRef, (room) => {
        const dbRoom = room.val()
        if (!dbRoom) return
        const firebaseQuestions: FirebaseQuestions = dbRoom.questions ?? {}
        const parsedData =
          Object.entries(firebaseQuestions).map(([key, value]) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isAnswered: value.isAnswered,
              isHighlighted: value.isHighlighted,
              likesCount: Object.values(value.likes ?? {}).length,
              likeId: ''
            }
          }) ?? {}
        get().title = dbRoom.title
        console.log(parsedData)
        get().setQuestions(parsedData)
      })
      // return off(roomRef, 'value')
    } catch (error) {
      console.log(error)
      return null
    }
  }
}))

export default questionStore
