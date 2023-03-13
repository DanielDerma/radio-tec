import Head from 'next/head'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { PlayButton } from '@/components/player/PlayButton'
import Edit from '@/icons/Edit'
import { db } from '@/src/services/firebase'
import { useSession } from 'next-auth/react'
import { removeEmpty } from '@/utils/index'

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

  const handleEditTitle = () => {
    refTitle.current.contentEditable = true
    const range = document.createRange()
    range.selectNodeContents(refTitle.current)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleEditTitleBlur = () => {
    refTitle.current.contentEditable = false
    handleSave()
  }

  const handleEditDescripcion = () => {
    refDescription.current.contentEditable = true
    const range = document.createRange()
    range.selectNodeContents(refDescription.current)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleEditDescripcionBlur = () => {
    refDescription.current.contentEditable = false
  }

  const handleEditTopics = () => {
    refTopiscs.current.contentEditable = true
    const range = document.createRange()
    range.selectNodeContents(refTopiscs.current)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const handleEditTopicsBlur = () => {
    refTopiscs.current.contentEditable = false
    handleSave()
  }

  const handleSave = () => {
    setLoading(true)
    const newTitle = refTitle.current.textContent
    const newDescription = refDescription.current.textContent
    const newTopics = refTopiscs.current.textContent

    console.log(newTopics)

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
        <title>RADIO TEC HALCONES - {data.title}</title>
        <meta name="description" content={data.description} />
      </Head>
      <article className={`py-16 lg:py-36 ${loading ? 'cursor-wait' : ''}`}>
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <div className="group relative">
                  <h1
                    className="mt-2  text-4xl font-bold text-slate-900"
                    ref={refTitle}
                    onBlur={handleEditTitleBlur}
                  >
                    {data.title}
                  </h1>
                  <button onClick={handleEditTitle}>
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
                onBlur={handleEditDescripcionBlur}
              >
                {data.description}
              </p>
              <button onClick={handleEditDescripcion}>
                <Edit
                  className={`absolute -right-4 -top-4 hidden h-6 w-6 cursor-pointer ${
                    isSignedIn && 'group-hover:block'
                  }`}
                />
              </button>
            </div>
          </header>
          <hr className="my-12 border-gray-200" />
          {/* <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: episode.content }}
          /> */}
          <div className="prose prose-slate mt-14 [&>div>h2]:mt-12 [&>div>h2]:flex [&>div>h2]:items-center [&>div>h2]:font-mono [&>div>h2]:text-sm [&>div>h2]:font-medium [&>div>h2]:leading-7 [&>div>h2]:text-slate-900 [&>div>h2]:before:mr-3 [&>div>h2]:before:h-3 [&>div>h2]:before:w-1.5 [&>div>h2]:before:rounded-r-full [&>div>h2]:before:bg-primary [&>div>ul]:mt-6 [&>div>ul]:list-['\2013\20'] [&>div>ul]:pl-5 [&>div>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>div>h2:nth-of-type(3n)]:before:bg-violet-200">
            <div className="">
              <h2 id="topics" className="">
                Temas
              </h2>
            </div>
            <div className="group relative">
              <ul ref={refTopiscs} onBlur={handleEditTopicsBlur}>
                <li>
                  What are TPS reports exactly, and what’s the motivation for
                  adding the cover sheet?
                </li>
                <li>
                  How Bill preserves such a cool and calm demeanor, despite the
                  extreme consequences Initech faces for not finishing their Y2K
                  upgrades on time, and why it’s important to protect the staff
                  from that stress
                </li>
                <li>
                  Why suspenders and belts aren’t enough on their own, and
                  should be used together
                </li>
                <li>The backstory behind how Bill purchased his Porsche 911</li>
                <li>The real reason he needed the red stapler for himself</li>
              </ul>
              <button onClick={handleEditTopics}>
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
