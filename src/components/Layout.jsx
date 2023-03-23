import clsx from 'clsx'
import Image from 'next/legacy/image'
import { useId, useState } from 'react'

import { AudioPlayer } from './player/AudioPlayer'
import useSession from '../hooks/useSession'
import posterImage from 'public/tec.png'

// import posterImage from '@/images/poster.png'
import Link from 'next/link'

function random(length, min, max, seed = 1) {
  return Array.from({ length }).map(() => {
    let rand = Math.sin(seed++) * 10000
    rand = rand - Math.floor(rand)
    return Math.floor(rand * (max - min + 1) + min)
  })
}

function Waveform() {
  let id = useId()
  let barCount = 100
  let barWidth = 2
  let barGap = 2
  let lengths = random(barCount, 40, 100)

  return (
    <svg aria-hidden="true" className="absolute left-0 top-0 h-20 w-full">
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="40%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <linearGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="#439a00" />
          <stop offset="50%" stopColor="#3a7f00" />
          <stop offset="100%" stopColor="#18396a" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-pattern)`} />
        </mask>
        <pattern
          id={`${id}-pattern`}
          width={barCount * barWidth + barCount * barGap}
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          {Array.from({ length: barCount }).map((_, index) => (
            <rect
              key={index}
              width={barWidth}
              height={`${lengths[index]}%`}
              x={barGap * (index + 1) + barWidth * index}
              fill={`url(#${id}-fade)`}
            />
          ))}
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id}-gradient)`}
        mask={`url(#${id}-mask)`}
        opacity="0.25"
      />
    </svg>
  )
}

function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <svg aria-hidden="true" className="h-2.5 w-2.5">
          <path
            d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
            className="fill-primary"
          />
          <path
            d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
            className="fill-primaryActive"
          />
        </svg>
        <span className="ml-2.5 text-primary">About</span>
      </h2>
      <p
        className={clsx('mt-2 text-base leading-7 text-slate-700', {
          'lg:line-clamp-4': !isExpanded,
        })}
      >
        Radio Tec Halcones es una estación de radio perteneciente al Tecnológico
        de Delicias, ubicado en la ciudad de Delicias, Chihuahua, México. Su
        programación está orientada a la difusión de contenidos educativos,
        culturales y deportivos, dirigidos principalmente a la comunidad
        estudiantil del instituto y a la población en general.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-primary hover:text-primaryHover active:text-primaryActive lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}

export function Layout({ children }) {
  const { status, login, logout } = useSession()
  const isSignedIn = status === 'authenticated'

  const handleSession = () => {
    if (isSignedIn) {
      logout()
    } else {
      login()
    }
  }

  return (
    <>
      <div className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Dirigido por:</span>
          <span className="mt-6 flex font-bold text-slate-900">
            <span className="after:mt-6 after:text-slate-400 after:content-['/']">
              Lic. Raúl Vázquez Tiscareño
            </span>
            <span className="mt-6">
              Jefe de Departamento de Comunicación y Difusión
            </span>
            <button onClick={handleSession} className="mt-4">
              <a className="group flex items-center">
                {isSignedIn ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-slate-400 group-hover:text-slate-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-slate-400 group-hover:text-slate-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                )}
              </a>
            </button>
          </span>
        </div>
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12">
          <Link
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-md shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
            href="/"
          >
            <Image
              src={posterImage}
              alt=""
              layout="responsive"
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-primary">RADIO TEC HALCONES</p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              Escucha, aprende y descubre con Radio Tec Halcones.
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <svg aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
                  className="fill-primary"
                />
                <path
                  d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
                  className="fill-primaryActive"
                />
              </svg>
              <span className="ml-2.5">Links</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />

            <ul className="mt-4 flex justify-center space-x-10 text-base font-medium leading-7 text-slate-700 sm:space-x-8 lg:block lg:space-x-0 lg:space-y-4">
              <li className="flex">
                <a
                  className="group flex items-center"
                  target="_blank "
                  href="https://www.delicias.tecnm.mx/"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-slate-400 group-hover:text-slate-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>

                  <span className="sr-only sm:hidden">Sitio web</span>
                  <span className="hidden sm:ml-3 sm:block">Sitio web</span>
                </a>
              </li>
              <li className="flex">
                <a
                  className="group flex items-center"
                  target="_blank "
                  href="https://www.facebook.com/tecnologico.delicias"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                  <span className="sr-only sm:hidden">Facebook</span>
                  <span className="hidden sm:ml-3 sm:block">Facebook</span>
                </a>
              </li>

              <li className="flex">
                <a
                  className="group flex items-center"
                  target="_blank "
                  href="https://www.youtube.com/channel/UCyNWWXpN0d6GFu4dhUpbDvQ"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600"
                  >
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                  </svg>
                  <span className="sr-only sm:hidden">Youtube</span>
                  <span className="hidden sm:ml-3 sm:block">Youtube</span>
                </a>
              </li>
              <li className="flex">
                <a
                  className="group flex items-center"
                  target="_blank "
                  href="https://www.instagram.com/tecnologico.delicias/"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                  <span className="sr-only sm:hidden">Instagram</span>
                  <span className="hidden sm:ml-3 sm:block">Instagram</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform />
        <div className="relative">{children}</div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
            <svg
              aria-hidden="true"
              viewBox="0 0 11 12"
              className="h-3 w-auto fill-slate-300"
            >
              <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
            </svg>
            <span className="ml-2.5">Dirigido por:</span>
          </h2>
          <div className="mt-2 flex text-sm font-bold leading-7 text-slate-900">
            <span className="after:ml-6 after:text-slate-400 after:content-['/']">
              Lic. Raúl Vázquez Tiscareño
            </span>
            <span className="ml-6">
              Jefe de Departamento de Comunicación y Difusión
            </span>
            <button onClick={handleSession} className="mt-4">
              <a className="group flex items-center">
                {isSignedIn ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-slate-400 group-hover:text-slate-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-slate-400 group-hover:text-slate-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                )}
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 right-0 bottom-0 z-10 rounded-lg lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>
    </>
  )
}
