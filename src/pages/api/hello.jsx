import kv from '@vercel/kv'

export default async function handler(req, res) {
  // handle the API request
  await kv.set('vivi', [
    {
      id: 'LViNmgNrats',
      title: 'GRADUACION',
      thumbnail: {
        link: 'https://i.ytimg.com/vi/LViNmgNrats/mqdefault.jpg',
        height: 180,
        width: 320,
      },
      link: 'https://www.youtube.com/watch?v=LViNmgNrats',
    },
    {
      id: 'WCdtLdOu95A',
      title: 'RADIO',
      thumbnail: {
        link: 'https://i.ytimg.com/vi/WCdtLdOu95A/mqdefault.jpg',
        height: 180,
        width: 320,
      },
      link: 'https://www.youtube.com/watch?v=WCdtLdOu95A',
    },
    {
      id: 'l8QIHF8lBeM',
      title: 'GRADUACION',
      thumbnail: {
        link: 'https://i.ytimg.com/vi/l8QIHF8lBeM/mqdefault.jpg',
        height: 180,
        width: 320,
      },
      link: 'https://www.youtube.com/watch?v=l8QIHF8lBeM',
    },
    {
      id: 'o25UB-aUbXc',
      title: 'RADIO',
      thumbnail: {
        link: 'https://i.ytimg.com/vi/o25UB-aUbXc/mqdefault.jpg',
        height: 180,
        width: 320,
      },
      link: 'https://www.youtube.com/watch?v=o25UB-aUbXc',
    },
    {
      id: 'zTociPtWL8w',
      title: 'hoa',
      thumbnail: {
        link: 'https://i.ytimg.com/vi/zTociPtWL8w/mqdefault.jpg',
        height: 180,
        width: 320,
      },
      link: 'https://www.youtube.com/watch?v=zTociPtWL8w',
    },
    {
      id: 'WH4svm2U6p4',
      title: 'Assistant TPM',
      thumbnail: {
        link: 'https://i.ytimg.com/vi/WH4svm2U6p4/mqdefault.jpg',
        height: 180,
        width: 320,
      },
      link: 'https://www.youtube.com/watch?v=WH4svm2U6p4',
    },
  ])

  const vivi = await kv.get('vivi')
  res.status(200).json({
    vivi,
  })
}
