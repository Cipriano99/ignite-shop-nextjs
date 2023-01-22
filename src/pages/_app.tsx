import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import { ContainerApp } from '../styles/pages/app'
import { ShopContextProvider } from '../context/ShopContext'
import { Header } from '../components/Header'
import { SideMenuOrder } from '../components/SideMenuOrder'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ShopContextProvider>
      <ContainerApp>
        <Header />
        <SideMenuOrder />

        <Component {...pageProps} />
      </ContainerApp>
    </ShopContextProvider>
  )
}
