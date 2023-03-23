import { storage } from '../../../services/firebase/server'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
    })
    return
  }

  try {
    const file = storage.file(req.query.audio)

    const [fileExists] = await file.exists()
    if (!fileExists) {
      return res.status(404).send('File not found')
    }

    const sizeFile = Number(file.metadata.size)

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Length', sizeFile)
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Range', `bytes 0-${sizeFile - 1}/${sizeFile}`)
    res.setHeader('Cache-Control', 'public, max-age=31536000')
    file.createReadStream().pipe(res)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
