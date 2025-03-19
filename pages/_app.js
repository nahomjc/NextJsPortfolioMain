import Navbar from '../components/Navbar'
import StickyPhone from '../components/StickyPhone'
import AnimatedBackground from '../components/AnimatedBackground'
import ScrollProgress from '../components/ScrollProgress'
import MouseFollower from '../components/MouseFollower'
import '../styles/globals.css'
import { ThemeProvider } from '../components/ThemeProvider'

function MyApp({ Component, pageProps }) {
  return <> 
     <ThemeProvider>
    <AnimatedBackground />
    <ScrollProgress />
  
    <Navbar/>
    <MouseFollower />
    <Component {...pageProps} />
    <StickyPhone />
    </ThemeProvider>
  </>
}

export default MyApp
