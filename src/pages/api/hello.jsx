import kv from '@vercel/kv'

export default async function handler(req, res) {
  // handle the API request
  const session = await kv.get('user_1_session')
  res.status(200).json({
    session,
  })
}
