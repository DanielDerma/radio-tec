import Head from 'next/head'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { PlayButton } from '@/components/player/PlayButton'
import Edit from '@/icons/Edit'
import { db } from '@/services/firebase/server'
import { removeEmpty } from '@/utils/index'
import { useSession } from 'next-auth/react'
import sanitizeHtml from 'sanitize-html'

export default function EpisodeEntry({ data }) {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDate(new Date())
  }, [])

  const { status } = useSession()
  const isSignedIn = status === 'authenticated'

  const refTitle = useRef(null)
  const refDescription = useRef(null)
  const refTopiscs = useRef(null)

  let audioPlayerData = useMemo(
    () => ({
      title: data.title,
      audio: {
        src: '',
        type: '',
      },
      link: `/1`,
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
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

    fetch('/api/update', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
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
        <title>{data.title} - RADIO TEC HALCONES</title>
        <meta name="description" content={data.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:title"
          content={`${data.title} - RADIO TEC HALCONES`}
        />
        <meta
          property="og:image"
          content={`https://radio-tec.vercel.app/api/og?title=${data.title}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content={`${data.title} - RADIO TEC HALCONES`}
        />

        {/* generic */}
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="og:url" content="https://radio-tec.vercel.app/" />
        <meta property="og:description" content={data.description} />
        <meta property="fb:app_id" content="749045479981007" />
      </Head>
      <article
        className={`py-16 lg:py-36 ${
          loading ? 'cursor-wait' : 'cursor-default'
        }`}
      >
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
                    {data.title}
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
                  dateTime={date}
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
                {data.description}
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
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.topics) }}
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

export async function getServerSideProps() {
  const ref = db.collection('main').doc('home')
  const doc = await ref.get()
  const data = doc.data()

  return {
    props: {
      data,
    },
  }
}
