import JpNavigation from "@/components/jpdlag/JpNavigation"
import JpHero from "@/components/jpdlag/JpHero"
import JpIntro from "@/components/jpdlag/JpIntro"
import JpServices from "@/components/jpdlag/JpServices"
import JpAlbaProject from "@/components/jpdlag/JpAlbaProject"
import JpWhy from "@/components/jpdlag/JpWhy"
import JpProcess from "@/components/jpdlag/JpProcess"
import JpContact from "@/components/jpdlag/JpContact"
import JpFooter from "@/components/jpdlag/JpFooter"

export default function JpDlAgPage() {
  return (
    <main className="bg-jp-bg overflow-x-hidden">
      <JpNavigation />
      <JpHero />
      <JpIntro />
      <JpServices />
      <JpAlbaProject />
      <JpWhy />
      <JpProcess />
      <JpContact />
      <JpFooter />
    </main>
  )
}
