import Navbar from '../components/Navbar'
import StickyPhone from '../components/StickyPhone'
import AnimatedBackground from '../components/AnimatedBackground'
import ScrollProgress from '../components/ScrollProgress'
import MouseFollower from '../components/MouseFollower'
import '../styles/globals.css'
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
      <AnimatePresence mode="wait">
        {isLoading ? (
          <FingerPrintLoader onLoadingComplete={handleLoadingComplete} />
        ) : (
          <div className="relative min-h-screen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <AnimatedBackground />
              <ScrollProgress />
              <Navbar />
              <MouseFollower />
              <Component {...pageProps} />
              <StickyPhone />
            </motion.div>
            {showEntranceSmoke ? (
              <EntranceSmoke onComplete={handleEntranceSmokeComplete} />
            ) : null}
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default MyApp