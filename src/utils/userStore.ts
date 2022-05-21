import React from 'react'
import create from 'zustand'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../services/firebase'

export interface UserProps {
  name: string
  avatar: string
  id: string
}

interface UserActions {
  user: UserProps | undefined
  setUser: (newUser: UserProps) => void
  signIn: () => Promise<void>
}

const useStore = create<UserActions>((set, get) => ({
  user: undefined,
  setUser: (newUser: UserProps) => set({ user: newUser }),
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
      console.log(get().user)
    } catch (error) {
      console.log(error)
      // ...
    }
  }
}))

export default useStore
