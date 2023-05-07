import clsx from 'clsx'
import { useEffect, useState } from 'react'

export function PlayButton({ videoId }) {
  const [player, setPlayer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!videoId) return
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(script)
    // Initialize player when script is loaded
    script.onload = () => {
      window.onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player('youtube-player', {
          videoId,
          playerVars: {
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: () => {
              setPlayer(player)
            },
            onStateChange: () => {
              setIsPlaying(
                player.getPlayerState() === window.YT.PlayerState.PLAYING
              )
            },
          },
        })
      }
    }

    // Clean up
    return () => {
      document.body.removeChild(script)
      delete window.onYouTubeIframeAPIReady
    }
  }, [videoId])

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  return (
    <>
      <div id="youtube-player" className="hidden"></div>
      <button
        type="button"
        className={clsx(
          'group relative flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-full bg-primary hover:bg-primaryHover focus:outline-none focus:ring focus:ring-primaryHover focus:ring-offset-4'
        )}
        onClick={handlePlayPauseClick}
      >
        <div className="absolute -inset-3 md:hidden"></div>
        <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
        {isPlaying ? (
          <svg
            viewBox="0 0 22 28"
            className={clsx('h-7 w-7 fill-white group-active:fill-white/80')}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.5 0C0.671573 0 0 0.671572 0 1.5V26.5C0 27.3284 0.671573 28 1.5 28H4.5C5.32843 28 6 27.3284 6 26.5V1.5C6 0.671573 5.32843 0 4.5 0H1.5ZM17.5 0C16.6716 0 16 0.671572 16 1.5V26.5C16 27.3284 16.6716 28 17.5 28H20.5C21.3284 28 22 27.3284 22 26.5V1.5C22 0.671573 21.3284 0 20.5 0H17.5Z"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 36 36"
            className={clsx('h-9 w-9 fill-white group-active:fill-white/80')}
            aria-hidden="true"
          >
            <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z" />
          </svg>
        )}
      </button>
    </>
  )
}
