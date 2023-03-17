import { db } from '@/services/firebase/server'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
    })
    return
  }

  try {
    // get all episodes from firestore collection 'episodes' ordered by date
    const snapshot = await db
      .collection('episodes')
      .orderBy('published', 'desc')
      .get()
    const episodes = []

    snapshot.forEach((doc) => {
      episodes.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    // sort episodes by date, newest first
    episodes.sort((a, b) => {
      return new Date(b.published) - new Date(a.published)
    })

    res.status(200).json(episodes)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
