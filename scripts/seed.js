import { db } from 'src/services/firebase/server'

// get all the document from episode collection
;(async () => {
  const episodes = await db
    .collection('episodes')
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))

  console.log(episodes)
})()
