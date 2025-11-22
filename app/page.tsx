import Header from "@/components/header"
import AboutSection from "@/components/about-section"
import WhatsAppButton from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutSection />
      <WhatsAppButton />
    </main>
  )
}
