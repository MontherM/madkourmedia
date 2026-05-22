import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import MarqueeBand from "@/components/MarqueeBand"
import Services from "@/components/Services"
import Work from "@/components/Work"
import Clients from "@/components/Clients"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="bg-bg">
      <Navigation />
      <Hero />
      <MarqueeBand />
      <Services />
      <Work />
      <Clients />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
