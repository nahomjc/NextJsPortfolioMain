import Head from 'next/head'
import About from '../components/About'
import Contact from '../components/Contact'
import Main from '../components/Main'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import CoursePromo from '../components/CoursePromo'
import TelegramPromo from '../components/TelegramPromo'
import MediumBlog from '../components/MeduimBlog'
import AIChat from '../components/AIChat'
import CertificateShowcase from '../components/CertificateShowCase'
import SkillsProgress from '../components/SkillCategory'
import Timeline from '../components/ExperienceTimeLine'
import AISection from '../components/AISection'
import {
  SITE_URL,
  SITE_NAME,
  PERSON,
  homeMeta,
  absoluteUrl,
  homeJsonLd,
} from '../lib/seo'

const canonicalUrl = `${SITE_URL}/`

export default function Home() {
  const ogImage = absoluteUrl(homeMeta.ogImagePath)
  const jsonLd = homeJsonLd()

  return (
    <>
      <Head>
        <title>{homeMeta.title}</title>
        <meta name="description" content={homeMeta.description} />
        <meta name="keywords" content={homeMeta.keywords.join(', ')} />
        <meta name="author" content={PERSON.name} />
        <meta name="publisher" content={PERSON.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />

        <meta name="geo.region" content="ET-AA" />
        <meta name="geo.placename" content="Addis Ababa" />
        <meta name="geo.position" content="9.145;38.7613" />
        <meta name="ICBM" content="9.145, 38.7613" />

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />

        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        {process.env.NEXT_PUBLIC_BING_VERIFY ? (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFY} />
        ) : null}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFY ? (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFY} />
        ) : null}

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_ET" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={homeMeta.title} />
        <meta property="og:description" content={homeMeta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={`${PERSON.name}, ${PERSON.jobTitle}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homeMeta.title} />
        <meta name="twitter:description" content={homeMeta.description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="relative min-h-screen">
        <Main />
        <AIChat />
        <About />
        <Skills />
        <SkillsProgress />
        <Timeline />
        <Projects />
        <AISection />
        <CertificateShowcase />
        <CoursePromo />
        <TelegramPromo />
        <MediumBlog />
        <Contact />
      </main>
    </>
  )
}
