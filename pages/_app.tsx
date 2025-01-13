import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Customer Management System</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=Assistant&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend:wght@100..900&family=Montserrat:wght@100..900&family=Orbitron:wght@400..900&family=Outfit:wght@100..900&family=Playwrite+CO+Guides&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
} 