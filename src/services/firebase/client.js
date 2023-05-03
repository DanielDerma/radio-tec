import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAQwy1UhPjxXr40n9Xd45H9vJe9T6gvCmM',
  authDomain: 'radio-tec-dev.firebaseapp.com',
  projectId: 'radio-tec-dev',
  storageBucket: 'radio-tec-dev.appspot.com',
  messagingSenderId: '858856565054',
  appId: '1:858856565054:web:78afc8324bc2f14e04246f',
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export { app, db, storage, auth }

export const updateLive = async (episode) => {
  const docRef = doc(db, 'main', 'live')
  const a = await updateDoc(docRef, episode)
  return {
    success: true,
  }
}

export const getLive = async () => {
  const docRef = doc(db, 'main', 'live')
  const a = await getDoc(docRef)
  return a.data()
}
