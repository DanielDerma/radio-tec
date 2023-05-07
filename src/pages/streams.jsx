import Head from 'next/head'

import { Container } from '../components/Container'

export default function EpisodeEntry() {
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
          <button className="text-left">
            <div className="h-28 w-full bg-gray-400"></div>
            <p>Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur.</p>
          </button>
          <div className="">
            <div className="h-28 w-full bg-gray-400"></div>
            <p>Lorem ipsum dolor</p>
          </div>
          <div className="">
            <div className="h-28 w-full bg-gray-400"></div>
            <p>Lorem ipsum dolor</p>
          </div>
          <div className="">
            <div className="h-28 w-full bg-gray-400"></div>
            <p>Lorem ipsum dolor</p>
          </div>
          <div className="">
            <div className="h-28 w-full bg-gray-400"></div>
            <p>Lorem ipsum dolor</p>
          </div>
          <div className="">
            <div className="h-28 w-full bg-gray-400"></div>
            <p>Lorem ipsum dolor</p>
          </div>
          <div className="">
            <div className="h-28 w-full bg-gray-400"></div>
            <p>Lorem ipsum dolor</p>
          </div>
        </div>
      </Container>
    </>
  )
}
