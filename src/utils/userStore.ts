import React from 'react'
import create from 'zustand'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../services/firebase'

export interface IUserProps {
  name: string
  avatar: string
  id: string
}

interface IUserActions {
  user: IUserProps | undefined
  setUser: (newUser: IUserProps) => void
  signIn: () => Promise<void>
}

const userStore = create<IUserActions>((set, get) => ({
  user: undefined,
  setUser: (newUser: IUserProps) => set({ user: newUser }),
  signIn: async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
      get().setUser({
        name: user.displayName as string,
        avatar: user.photoURL as string,
        id: user.uid as string
      })
    } catch (error) {
      console.log(error)
      // ...
    }
  }
}))

export default userStore
