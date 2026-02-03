import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TempleSection from "@/components/TempleSection";
import Portfolio from "@/components/Portfolio";
import TransformationShowcase from "@/components/TransformationShowcase";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Artisan Interiors Studio | Luxury Interior Design & Temple Craftsmanship</title>
        <meta 
          name="description" 
          content="Premium interior design, custom furniture, WPC panels, CNC wood cutting, and sacred temple design. Transform your space with our expert craftsmanship and modern luxury aesthetic."
        />
        <meta name="keywords" content="interior design, temple design, mandir, CNC wood cutting, WPC panels, custom furniture, luxury interiors, Indian interior design" />
        <link rel="canonical" href="https://artisaninteriors.in" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Artisan Interiors Studio | Luxury Interior Design & Temple Craftsmanship" />
        <meta property="og:description" content="Premium interior design, custom furniture, WPC panels, CNC wood cutting, and sacred temple design." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artisan Interiors Studio",
            "description": "Premium interior design, custom furniture, WPC panels, CNC wood cutting, and sacred temple design.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Artisan Lane, Design District",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "400001",
              "addressCountry": "IN"
            },
            "telephone": "+91-98765-43210",
            "openingHours": "Mo-Sa 10:00-19:00",
            "priceRange": "$$$"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <TempleSection />
          <Portfolio />
          <TransformationShowcase />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
