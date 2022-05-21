import React, { ReactNode, useEffect } from 'react'
import useStore from '../utils/userStore'
import { auth } from '../services/firebase'

type AuthProps = {
  children: ReactNode
}
export function Auth(props: AuthProps) {
  const { user, setUser } = useStore()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user?.displayName as string,
          id: user?.uid as string,
          avatar: user?.photoURL as string
        })
      }
    })
    return () => unsubscribe()
  }, [])
  return <>{props.children}</>
}
