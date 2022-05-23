import { ReactNode, useEffect } from 'react'
import userStore from '../utils/userStore'
import { auth } from '../services/firebase'

type AuthProps = {
  children: ReactNode
}
export function Auth(props: AuthProps) {
  const { user, setUser } = userStore()
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
