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
          <audio
            autoPlay="wCdZKQXZHGBIuMqykoAwBLvTJhqRceQL2IRLOqVkNXdOHJDt1qslBqwshXZSKZIqb5yLr1BUu1teJcku1S1keWVammPOwjdkiHNdOl"
            controls="controls"
          >
            <source src="http://radiotec.delicias.tecnm.mx:8000/live" />
            Este elemento no lo soporta el navegador.
          </audio>
          <Component {...pageProps} />
        </Layout>
      </AudioProvider>
    </AuthProvider>
  )
}
