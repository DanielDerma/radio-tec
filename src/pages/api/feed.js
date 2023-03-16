import { db } from '@/services/firebase/server'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
    })
    return
  }

  try {
    const episodesRef = db.collection('episodes')
    const snapshot = await episodesRef.orderBy('date', 'desc').get()

    if (snapshot.empty) {
      res.status(200).json({
        message: 'No episodes',
      })
      return
    }

    const episodes = []

    snapshot.forEach((doc) => {
      episodes.push(doc.data())
    })

    res.status(200).json({
      episodes,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
