import PropTypes from 'prop-types'
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { auth } from '../services/firebase/client'
import { useRouter } from 'next/router'

export const AuthContext = React.createContext()

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export function AuthProvider({ children }) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function login(email = process.env.NEXT_PUBLIC_AUTHOR_EMAIL) {
    if (email !== process.env.NEXT_PUBLIC_AUTHOR_EMAIL) return
    await sendSignInLinkToEmail(auth, email, {
      // URL you want to redirect back to after email is verified.
      url: 'http://localhost:3000/verify',
      // This must be true.
      handleCodeInApp: true,
    })
    window.localStorage.setItem('emailForSignIn', email)
  }

  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const verify = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      console.log(email)
      if (!email) {
        email = window.prompt('Escribe tu email para confirmar')
      }
      signInWithEmailLink(auth, email, window.location.href).then(() => {
        window.localStorage.removeItem('emailForSignIn')
      })
    }
  }
  const value = {
    status: currentUser ? 'authenticated' : 'unauthenticated',
    login,
    logout,
    verify,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
