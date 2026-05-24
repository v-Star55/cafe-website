import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import VideoInterlude from '@/components/VideoInterlude'
import Atelier from '@/components/Atelier'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      <Cursor />
      <Navigation />
      <Hero />
      <Story />
      <VideoInterlude />
      <Atelier />
      <Gallery />
      <Reviews />
      <Footer />
    </main>
  )
}
