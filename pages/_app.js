import Navbar from '../components/Navbar'
import StickyPhone from '../components/StickyPhone'
import AnimatedBackground from '../components/AnimatedBackground'
import ScrollProgress from '../components/ScrollProgress'
import MouseFollower from '../components/MouseFollower'
import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ThemeProvider } from '../components/ThemeProvider'
import { motion, AnimatePresence } from 'framer-motion';
import FingerPrintLoader from '../components/FingerPrintLoaderProps'
import EntranceSmoke from '../components/EntranceSmoke'
import { useState, useCallback } from 'react'

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showEntranceSmoke, setShowEntranceSmoke] = useState(false)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
    const skipSmoke =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!skipSmoke) setShowEntranceSmoke(true)
  }, [])

  const handleEntranceSmokeComplete = useCallback(() => {
    setShowEntranceSmoke(false)
  }, [])

  return (
    <ThemeProvider>
      <>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <FingerPrintLoader
              key="fingerprint-loader"
              onLoadingComplete={handleLoadingComplete}
            />
          ) : (
            <motion.div
              key="app-shell"
              className="relative min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <AnimatedBackground />
              <ScrollProgress />
              <Navbar />
              <MouseFollower />
              <Component {...pageProps} />
              <StickyPhone />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Outside AnimatePresence so smoke isn’t tied to swap timing / stacking quirks (esp. mobile Safari) */}
        {!isLoading && showEntranceSmoke ? (
          <EntranceSmoke onComplete={handleEntranceSmokeComplete} />
        ) : null}
      </>
    </ThemeProvider>
  )
}

export default MyApp