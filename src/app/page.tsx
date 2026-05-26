import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import MarqueeBand from "@/components/MarqueeBand"
import Services from "@/components/Services"
import Work from "@/components/Work"
import Clients from "@/components/Clients"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/ui/CustomCursor"
import PageLoader from "@/components/ui/PageLoader"

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
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
    </>
  )
}
