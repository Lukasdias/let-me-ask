import create from 'zustand'
import { useNavigate } from 'react-router-dom'
import { Question } from './questionStore'
import { DataSnapshot, get as dbGet } from 'firebase/database'
import {
  getDatabase,
  ref,
  remove,
  push,
  DatabaseReference
} from 'firebase/database'
import { database } from '../services/firebase'
type RoomProps = {
  authorID: string
  questions: Question[]
  title: string
}

interface IRoomActions {
  rooms: RoomProps[] | undefined
  joinRoom: (roomID: string) => Promise<DataSnapshot | null>
  createRoom: (room: RoomProps) => Promise<DatabaseReference | null | undefined>
  deleteRoom: (roomID: string) => Promise<void | null>
}

const roomStore = create<IRoomActions>((set, get) => ({
  rooms: undefined,
  joinRoom: async (roomID) => {
    try {
      const db = database
      const roomCode = roomID
      const roomRef = await dbGet(ref(db, `rooms/${roomCode}`))
      return roomRef
    } catch (error) {
      // console.log(error)
      return null
    }
  },
  createRoom: async (room) => {
    try {
      if (!room) return
      const db = database
      const roomRef = ref(db, 'rooms')
      const firebaseRoom = await push(roomRef, room)
      return firebaseRoom
    } catch (error) {
      // console.log(error)
      return null
    }
  },
  deleteRoom: async (roomID) => {
    if (!roomID) return null
    try {
      const db = database
      const roomCode = roomID
      const removeResponse = await remove(ref(db, `rooms/${roomCode}`))
      return removeResponse
    } catch (error) {
      // console.log(error)
      return null
    }
  }
}))

export default roomStore
