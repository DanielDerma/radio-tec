import {
  isSignInWithEmailLink,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase/client'

export const AuthContext = React.createContext()

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password).catch(() => {
      alert('Invalid')
    })
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
  const value = {
    status: currentUser ? 'authenticated' : 'unauthenticated',
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
