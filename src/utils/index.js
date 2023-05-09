export function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

// export const CHANNEL_ID = 'UCyNWWXpN0d6GFu4dhUpbDvQ' // tec
// export const CHANNEL_ID = 'UC52YgT6TITyBpck82V_N_8g' // el mariana
export const CHANNEL_ID = 'UCw1Opi2WMA3vvTnOKR55PSQ' // livves

export const videos = [
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
]
