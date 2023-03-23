import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { db } from '../../../services/firebase/server'
import { getServerSession } from 'next-auth'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).send('Unauthorized')
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method not allowed',
    })
    return
  }

  const body = req.body

  try {
    const ref = db.collection('main').doc('live')
    await ref.update(body)

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
