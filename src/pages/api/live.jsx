import rateLimit from 'express-rate-limit'
import { CHANNEL_ID } from '../../utils'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
})

export default async function handler(req, res) {
  limiter(req, res, async () => {
    // handle the API request
    const dataJson = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&eventType=live`
    )

    const data = await dataJson.json()

    res.status(200).json({
      items: data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      })),
    })
  })
}
