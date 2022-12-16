import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux"
import { store } from '../redux/store'
import HomePageLayout from '../components/fullPages/Home/layouts/HomePageLayout'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <HomePageLayout>
        <Component {...pageProps} />
        
      </HomePageLayout>
    </Provider>
  )
}

export default MyApp
