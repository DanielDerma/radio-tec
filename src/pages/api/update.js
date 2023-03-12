import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { db } from '@/src/services/firebase'
import { removeEmpty } from '@/utils'
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

  const result = removeEmpty(req.body)
  console.log(req.body)
  console.log(result)

  res.json(result)

  // try {
  //   const ref = db.collection("main").doc("home")

  //   await auth.setCustomUserClaims(uid, { role })

  //   res.status(200).json({
  //     message: 'User created',
  //   })
  // } catch (error) {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //   })
  // }
}
