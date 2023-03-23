import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'rss-to-json'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'

export default function Home({ episodes, live }) {
  return (
    <>
      <Head>
        <title>Radio TEC Halcones</title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        {/* <Container>
          <h2 className="text-2xl font-bold leading-7 text-slate-900">Live</h2>
        </Container> */}

        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <EpisodeEntry
            episode={{
              id: 'live',
              title: live.title,
              description: live.description,
              audio: process.env.NEXT_PUBLIC_LIVE_URL,
              isLive: true,
            }}
          />
        </div>

        <Container>
          <h2 className="text-xl font-bold leading-7 text-slate-900">
            Episodios
          </h2>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </>
  )
}

function EpisodeEntry({ episode }) {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(episode.isLive ? new Date() : new Date(episode.published))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio,
        type: 'audio/mpeg',
        isLive: episode.isLive,
      },
      link: `/${episode.id}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 items-center text-lg font-bold text-slate-900"
          >
            <Link href={`/${episode.id}`} className="flex gap-x-4">
              <p>{episode.title}</p>
              {episode.isLive && (
                <div className="flex items-center gap-x-1 rounded-md border">
                  <div className="ml-1 h-3  w-3 animate-pulse rounded-full bg-red-400" />
                  <p className="mr-1 text-sm">LIVE</p>
                </div>
              )}
            </Link>
          </h2>
          <time
            dateTime={date ? date : ''}
            className="-order-1 font-mono text-sm leading-7 text-slate-500"
          >
            {new Intl.DateTimeFormat('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(date)}
          </time>
          <p className="mt-1 text-base leading-7 text-slate-700">
            {episode.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => player.toggle()}
              className="flex items-center text-sm font-bold leading-6 text-primary hover:text-primaryHover active:text-primaryActive"
            >
              <span className="sr-only">
                {player.playing ? 'Pause' : 'Play'}
                episode {episode.title}
              </span>
              <svg
                className="h-2.5 w-2.5 fill-current"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                {player.playing ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
                  />
                ) : (
                  <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
                )}
              </svg>

              <span className="ml-3" aria-hidden="true">
                Escuchar
              </span>
            </button>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/${episode.id}`}
              className="flex items-center text-sm font-bold leading-6 text-primary hover:text-primaryHover active:text-primaryActive"
            >
              Mostrar notas
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

export async function getServerSideProps() {
  const dataJson = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/feed`)
  const { episodes, live } = await dataJson.json()

  if (!episodes || !live) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episodes: episodes.map((episode) => ({
        ...episode,
        audio: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/audio/${episode.slug}.mp3`,
        published:
          episode.published._seconds * 1000 +
          episode.published._nanoseconds / 1000000,
      })),
      live,
    },
  }
}
