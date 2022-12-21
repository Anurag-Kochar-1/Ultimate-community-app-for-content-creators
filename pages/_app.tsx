import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux"
// import { store } from '../redux/store'
import HomePageLayout from '../components/fullPages/Home/layouts/HomePageLayout'
import { wrapper } from '../redux/store'


import LogInModal from '../components/globalComponents/Modals/LogInModal/LogInModal'


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <HomePageLayout>
        <Component {...pageProps} />
        <LogInModal />
      </HomePageLayout>
  )
}

export default wrapper.withRedux(MyApp) 

// export default MyApp