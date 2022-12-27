import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import { ContainerApp, Header } from '../styles/pages/app'
import logoImg from '../assets/logo.svg'
import Image from 'next/image'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ContainerApp>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>

      <Component {...pageProps} />
    </ContainerApp>
  )
}
