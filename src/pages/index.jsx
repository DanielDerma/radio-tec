import Head from 'next/head'
import { useMemo } from 'react'
import { parse } from 'rss-to-json'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { PlayButton } from '@/components/player/PlayButton'
import Edit from '@/icons/Edit'
import { db } from '@/src/services/firebase'
import { useSession } from 'next-auth/react'

export default function EpisodeEntry({ episode, data }) {
  let date = new Date()

  const { status } = useSession()
  const isSignedIn = status === 'authenticated'

  let audioPlayerData = useMemo(
    () => ({
      title: data.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode] // eslint-disable-line react-hooks/exhaustive-deps
  )
  let player = useAudioPlayer(audioPlayerData)

  const handleEdit = async () => {}

  return (
    <>
      <Head>
        <title>{data.title} - Their Side</title>
        <meta name="description" content={data.description} />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <div className="group relative">
                  <h1 className="mt-2  text-4xl font-bold text-slate-900">
                    {data.title}
                  </h1>
                  <button onClick={handleEdit}>
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
              <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
                {data.description}
              </p>
              <Edit
                className={`absolute -right-4 -top-4 hidden h-6 w-6 cursor-pointer ${
                  isSignedIn && 'group-hover:block'
                }`}
              />
            </div>
          </header>
          <hr className="my-12 border-gray-200" />
          {/* <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: episode.content }}
          /> */}
          <div className="prose prose-slate mt-14 [&>div>h2]:mt-12 [&>div>h2]:flex [&>div>h2]:items-center [&>div>h2]:font-mono [&>div>h2]:text-sm [&>div>h2]:font-medium [&>div>h2]:leading-7 [&>div>h2]:text-slate-900 [&>div>h2]:before:mr-3 [&>div>h2]:before:h-3 [&>div>h2]:before:w-1.5 [&>div>h2]:before:rounded-r-full [&>div>h2]:before:bg-cyan-200 [&>div>ul]:mt-6 [&>div>ul]:list-['\2013\20'] [&>div>ul]:pl-5 [&>div>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>div>h2:nth-of-type(3n)]:before:bg-violet-200">
            <div className="group relative w-max">
              <h2 id="topics" className="">
                Topicsasdf
              </h2>
              <Edit
                className={`absolute -right-4 -top-4 hidden h-6 w-6 cursor-pointer ${
                  isSignedIn && 'group-hover:block'
                }`}
              />
            </div>
            <div className="group relative">
              <ul>
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
              <Edit
                className={`absolute -right-4 -top-4 hidden h-6 w-6 cursor-pointer ${
                  isSignedIn && 'group-hover:block'
                }`}
              />
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
  let feed = await parse('https://their-side-feed.vercel.app/api/feed')
  let episode = feed.items
    .map(({ id, title, description, content, enclosures, published }) => ({
      id: id.toString(),
      title: `${id}: ${title}`,
      description,
      content,
      published,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }))
    .find(({ id }) => id === '5')

  if (!episode) {
    return {
      notFound: true,
    }
  }

  console.log(data)

  return {
    props: {
      episode,
      data,
    },
  }
}
