import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { storage } from '@/services/firebase/client'
import { db } from '@/services/firebase/server'
import { getServerSession } from 'next-auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
    })
    return
  }

  try {
    const ref = await storage.getQuery({
      collection: 'audio',
      doc: `${req.query.audio}.mp3`,
    })

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Length', data.ContentLength)
    res.send()

    res.status(200).json({
      message: 'Success',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
