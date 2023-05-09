import Head from 'next/head'

import { Container } from '../components/Container'
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid'
import { videos as vid } from '../utils'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const PlayButton = () => {
  const [isPlay, setIsPlay] = useState(false)
  return (
    <button
      onClick={() => setIsPlay(!isPlay)}
      className="absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform bg-none text-primary group-hover:block"
    >
      {isPlay ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}

export default function EpisodeEntry() {
  const [videos, setVideos] = useState(null)
  const [select, setSelect] = useState(null)

  useEffect(() => {
    // fetch('/api/videos')
    //   .then((e) => e.json())
    //   .then(({ items }) => {
    //     console.log(items)
    //     setVideos(items)
    //   })
    setVideos(vid)
  }, [])

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
      <Container className="py-16 lg:pb-36">
        <div className="h-96 w-full border-2 bg-gray-400"></div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3">
          {videos &&
            videos.map((vid, i) => (
              <div className="" key={vid.id}>
                <div className="group relative">
                  <Image
                    src={vid.thumbnail.link}
                    alt={vid.title}
                    width={vid.thumbnail.width}
                    height={vid.thumbnail.height}
                    className="mb-2"
                  />
                  {/* background */}
                  <div className="absolute inset-0 hidden bg-black/50 group-hover:block"></div>
                  <button className="absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform bg-none text-primary group-hover:block">
                    <PlayIcon className="" />
                  </button>
                </div>
                <p className="text-left">{vid.title}</p>
              </div>
            ))}
        </div>
      </Container>
    </>
  )
}
