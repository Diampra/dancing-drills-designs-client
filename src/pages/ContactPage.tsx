import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  Phone,
  Mail,
  Clock,
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const ContactPage = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const contactInfoData = [
    {
      id: "1",
      type: "address",
      icon: "MapPin",
      title: t.visitOurStudio,
      content: t.studioAddress,
    },
    {
      id: "2",
      type: "phone",
      icon: "Phone",
      title: t.callUs,
      content: t.phoneNumbers,
    },
    {
      id: "3",
      type: "email",
      icon: "Mail",
      title: t.emailUs,
      content: t.emailAddresses,
    },
    {
      id: "4",
      type: "hours",
      icon: "Clock",
      title: t.workingHours,
      content: t.workingHoursContent,
    },
  ];

  const services = [
    { value: "interior", label: t.interiorDesigning },
    { value: "temple", label: t.templeDesign },
    { value: "furniture", label: t.customFurniture },
    { value: "wpc", label: t.wpcPanels },
    { value: "cnc", label: t.cncCutting },
  ];

  const faqData = [
    { q: t.faqQuestion1, a: t.faqAnswer1 },
    { q: t.faqQuestion2, a: t.faqAnswer2 },
    { q: t.faqQuestion3, a: t.faqAnswer3 },
    { q: t.faqQuestion4, a: t.faqAnswer4 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t.thankYouMessage,
      description: t.thankYouDescription,
    });
    
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>{t.contact} | {t.studioName} {t.studioTagline}</title>
        <meta name="description" content={t.readyToTransform} />
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                {t.getInTouch}
              </span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground font-medium mb-6">
              {t.startYourProject}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.readyToTransform}
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">{t.contactInformation}</h2>
                  <p className="text-muted-foreground">
                    {t.contactInfoDescription}
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfoData.map((info) => {
                    const IconComponent = iconMap[info.icon] || MapPin;
                    return (
                      <div key={info.id} className="bg-card p-6 shadow-soft">
                        <div className="w-12 h-12 bg-secondary flex items-center justify-center mb-4">
                          <IconComponent className="w-5 h-5 text-gold" />
                        </div>
                        <h4 className="font-serif text-lg text-foreground mb-2">{info.title}</h4>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">{info.content}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Map Placeholder */}
                <div className="h-72 bg-card shadow-soft flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-gold mx-auto mb-3" />
                    <p className="text-muted-foreground">{t.interactiveMap}</p>
                    <p className="text-sm text-muted-foreground/70">Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-8 md:p-10 shadow-soft">
                <h3 className="font-serif text-2xl text-foreground mb-2">{t.sendUsMessage}</h3>
                <p className="text-muted-foreground mb-8">
                  {t.contactFormDescription}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        {t.fullName} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        {t.emailAddress} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        {t.phoneNumber}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        {t.serviceInterestedIn}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary border-0 text-foreground focus:ring-2 focus:ring-gold outline-none transition-all"
                      >
                        <option value="">{t.selectService}</option>
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      {t.projectDetails}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold outline-none transition-all resize-none"
                      placeholder={t.tellUsAboutProject}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="elegant" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      t.sendingMessage
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t.sendMessage}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-foreground font-medium mb-4">
                {t.faq}
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-background p-6 shadow-soft">
                  <h4 className="font-serif text-lg text-foreground mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ContactPage;