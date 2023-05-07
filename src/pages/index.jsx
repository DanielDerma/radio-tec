import Head from 'next/head'
import { useEffect, useMemo, useRef, useState } from 'react'

import sanitizeHtml from 'sanitize-html'
import { useAudioPlayer } from '../components/AudioProvider'
import { Container } from '../components/Container'
import { PlayButton } from '../components/player/PlayButton'
import useSession from '../hooks/useSession'
import Edit from '../icons/Edit'
import { getLive, updateLive } from '../services/firebase/client'
import { removeEmpty } from '../utils/index'
import Link from 'next/link'

export default function EpisodeEntry() {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'
  const [data, setData] = useState(null)

  useEffect(() => {
    setDate(new Date())
    getLive().then((elem) => {
      setData(elem)
    })
  }, [])

  const refTitle = useRef(null)
  const refDescription = useRef(null)
  const refTopiscs = useRef(null)

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
    updateLive(body)
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
        <title>RADIO TEC HALCONES</title>
        <meta
          name="description"
          content="Escucha, aprende y descubre con Radio Tec Halcones."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article
        className={`py-16 lg:pb-36 ${
          loading ? 'cursor-wait' : 'cursor-default'
        }`}
      >
        <Container>
          <div className="flex justify-end">
            <Link
              href="/streams"
              className="mt-2 mb-4 hidden text-sm font-bold leading-6 text-primary underline hover:text-primaryHover active:text-primaryActive lg:inline-block"
            >
              Mostrar transmisiónes anteriores.
            </Link>
          </div>
          <hr className="mb-24 border-gray-200" />
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton videoId={data?.liveMP3} />
              <div className="flex flex-col">
                <div className="group relative">
                  <h1
                    className="mt-2 text-4xl font-bold text-slate-900"
                    ref={refTitle}
                    onBlur={() => handlerBlur(refTitle)}
                  >
                    {data?.title}
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
                  dateTime={date && date.toISOString()}
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
                {data?.description}
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
                Itinerario
              </h2>
            </div>
            <div className="group relative">
              <ul
                ref={refTopiscs}
                onBlur={() => handlerBlur(refTopiscs)}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(data?.topics) }}
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
