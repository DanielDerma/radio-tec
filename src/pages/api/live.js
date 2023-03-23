import { db } from '../../services/firebase/server'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
    })
    return
  }

  try {
    const ref = db.collection('main').doc('live')
    const doc = await ref.get()
    const data = doc.data()

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
