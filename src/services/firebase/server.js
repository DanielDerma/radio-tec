import * as admin from 'firebase-admin'
import { credential } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

let serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE || '',
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID || 'test-project',
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID || '',
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY || 'REDACTED',
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 'REDACTED',
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID || '',
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI || '',
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI || '',
  auth_provider_x509_cert_url:
    process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL || '',
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL || '',
}

console.log(serviceAccount)

if (!admin.apps.length) {
  initializeApp({
    credential: credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
}

export const db = admin.firestore()
export const auth = admin.auth()
