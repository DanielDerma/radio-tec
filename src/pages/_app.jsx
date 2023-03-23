import { AudioProvider } from '../components/AudioProvider'
import { Layout } from '../components/Layout'

import { AuthProvider } from '../context/AuthCtx'
import '../styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AudioProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AudioProvider>
    </AuthProvider>
  )
}
