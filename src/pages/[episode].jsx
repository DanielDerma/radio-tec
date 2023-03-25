import { useMemo, useRef } from 'react'
import Head from 'next/head'
import { parse } from 'rss-to-json'

import { useAudioPlayer } from '../components/AudioProvider'
import { Container } from '../components/Container'
import { PlayButton } from '../components/player/PlayButton'
import { db } from '../services/firebase/server'
import useSession from '../hooks/useSession'
import Edit from '../icons/Edit'
import sanitizeHtml from 'sanitize-html'
import { updateEpisode } from '../services/firebase/client'

export default function Episode({ episode }) {
  let date = new Date(episode.published)

  const refTitle = useRef(null)
  const refDescription = useRef(null)
  const refTopiscs = useRef(null)

  const { status } = useSession()
  const isSignedIn = status === 'authenticated'

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio,
        type: 'audio/mpeg',
      },
      link: `/${episode.id}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)

  const handleEdit = (ref) => {
    ref.current.contentEditable = true
    const range = document.createRange()
    range.selectNodeContents(ref.current)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handlerBlur = (ref) => {
    ref.current.contentEditable = false
    handleSave()
  }

  const handleSave = () => {
    setLoading(true)
    const isTitleEmpty = refTopiscs.current.innerHTML === ''
    const newTitle = refTitle.current.textContent
    const newDescription = refDescription.current.textContent
    const newTopics = isTitleEmpty
      ? '<li><br></li>'
      : refTopiscs.current.innerHTML

    if (isTitleEmpty) {
      refTopiscs.current.innerHTML = '<li><br></li>'
    }

    const body = removeEmpty({
      title: data.title === newTitle ? null : newTitle,
      description: data.description === newDescription ? null : newDescription,
      topics: data.topics === newTopics ? null : newTopics,
    })
    updateEpisode(body)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Head>
        <title>{episode.title} - Their Side</title>
        <meta name="description" content={episode.description} />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <div className="group relative">
                  <h1
                    className="mt-2  text-4xl font-bold text-slate-900"
                    ref={refTitle}
                    onBlur={() => handlerBlur(refTitle)}
                  >
                    {episode.title}
                  </h1>
                  <button onClick={() => handleEdit(refTitle)}>
                    <Edit
                      className={`absolute -right-4 -top-4 hidden h-6 w-6 cursor-pointer ${
                        isSignedIn && 'group-hover:block'
                      }`}
                    />
                  </button>
                </div>
                <time
                  dateTime={date.toISOString()}
                  className="-order-1 font-mono text-sm leading-7 text-slate-500"
                >
                  {new Intl.DateTimeFormat('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(date)}
                </time>
              </div>
            </div>
            <div className="group relative">
              <p
                className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700"
                ref={refDescription}
                onBlur={() => handlerBlur(refDescription)}
              >
                {episode.description}
              </p>
              <button onClick={() => handleEdit(refDescription)}>
                <Edit
                  className={`absolute -right-4 -top-4 hidden h-6 w-6 cursor-pointer ${
                    isSignedIn && 'group-hover:block'
                  }`}
                />
              </button>
            </div>
          </header>
          <hr className="my-12 border-gray-200" />
          <div className="prose prose-slate mt-14 [&>div>h2]:mt-12 [&>div>h2]:flex [&>div>h2]:items-center [&>div>h2]:font-mono [&>div>h2]:text-sm [&>div>h2]:font-medium [&>div>h2]:leading-7 [&>div>h2]:text-slate-900 [&>div>h2]:before:mr-3 [&>div>h2]:before:h-3 [&>div>h2]:before:w-1.5 [&>div>h2]:before:rounded-r-full [&>div>h2]:before:bg-primary [&>div>ul]:mt-6 [&>div>ul]:list-['\2013\20'] [&>div>ul]:pl-5 [&>div>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>div>h2:nth-of-type(3n)]:before:bg-violet-200">
            <div className="">
              <h2 id="topics" className="">
                Temas
              </h2>
            </div>
            <div className="group relative">
              <ul
                ref={refTopiscs}
                onBlur={() => handlerBlur(refTopiscs)}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(episode.topics),
                }}
              />
              <button onClick={() => handleEdit(refTopiscs)}>
                <Edit
                  className={`absolute -right-4 -top-4 hidden h-6 w-6 cursor-pointer ${
                    isSignedIn && 'group-hover:block'
                  }`}
                />
              </button>
            </div>
          </div>
        </Container>
      </article>
    </>
  )
}

// export async function getStaticProps({ params }) {
//   let feed = await parse('https://their-side-feed.vercel.app/api/feed')
//   let episode = feed.items
//     .map(({ id, title, description, content, enclosures, published }) => ({
//       id: id.toString(),
//       title: `${id}: ${title}`,
//       description,
//       content,
//       published,
//       audio: enclosures.map((enclosure) => ({
//         src: enclosure.url,
//         type: enclosure.type,
//       }))[0],
//     }))
//     .find(({ id }) => id === params.episode)

//   console.log(episode)

//   if (!episode) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       episode,
//     },
//     revalidate: 10,
//   }
// }

// export async function getStaticPaths() {
//   let feed = await parse('https://their-side-feed.vercel.app/api/feed')

//   return {
//     paths: feed.items.map(({ id }) => ({
//       params: {
//         episode: id.toString(),
//       },
//     })),
//     fallback: 'blocking',
//   }
// }

export async function getServerSideProps(ctx) {
  const { episode } = ctx.params
  const ref = db.collection('episodes').doc(episode)
  const doc = await ref.get()
  const data = doc.data()

  if (!data) {
    return {
      notFound: true,
    }
  }

  const episodeResponse = {
    ...data,
    audio: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/audio/${data.slug}.mp3`,
    published:
      data.published._seconds * 1000 + data.published._nanoseconds / 1000000,
  }

  console.log(episodeResponse)

  return {
    props: {
      episode: episodeResponse,
    },
  }
}
