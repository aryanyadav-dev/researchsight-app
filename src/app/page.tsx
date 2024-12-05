import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { UploadSection } from '@/components/sections/upload-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <main>
        <Hero />
        <UploadSection />
        <Features />
      </main>
      <Footer />
    </div>
  );
}