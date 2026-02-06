import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: t.visitOurStudio,
      content: language === "hi" 
        ? "गया-बोधगया रोड, ज्ञान दीप स्कूल के पास, केन्दुई, गया, बिहार 823001"
        : "Gaya-Bodhgaya Road, near Gyan Deep School, Kendui, Gaya, Bihar 823001",
    },
    {
      icon: Phone,
      title: t.callUs,
      content: "+91 88005 70957\n+91 70618 63057",
    },
    {
      icon: Mail,
      title: t.emailUs,
      content: "enquiry@dancingdrills.com",
    },
    {
      icon: Clock,
      title: t.workingHours,
      content: language === "hi"
        ? "सोम - शनि: सुबह 10:00 - शाम 7:00\nरविवार: अपॉइंटमेंट द्वारा"
        : "Mon - Sat: 10:00 AM - 7:00 PM\nSunday: By Appointment",
    },
  ];

  const serviceOptions = [
    { value: "interior", label: t.interiorDesigning },
    { value: "temple", label: t.templeDesignService },
    { value: "furniture", label: t.customFurniture },
    { value: "wpc", label: t.wpcPanels },
    { value: "cnc", label: t.cncCutting },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.thankYouMessage,
      description: t.thankYouDescription,
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
              {t.getInTouch}
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-medium mb-4">
            {t.startYourProject}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.contactDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="bg-background p-6 shadow-soft">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center mb-4">
                    <info.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-serif text-lg text-foreground mb-2">{info.title}</h4>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{info.content}</p>
                </div>
              ))}
            </div>

            {/* Map or Image Placeholder */}
            {/* <div className="h-64 bg-secondary flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">{t.interactiveMap}</p>
              </div>
            </div> */}
          </div>

          {/* Contact Form */}
          <div className="bg-background p-8 shadow-soft">
            <h3 className="font-serif text-2xl text-foreground mb-6">{t.sendUsMessage}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder={language === "hi" ? "आपका नाम" : "John Doe"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t.emailAddress}
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
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
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
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold outline-none transition-all resize-none"
                  placeholder={t.tellUsAboutProject}
                />
              </div>

              <Button type="submit" variant="elegant" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                {t.sendMessage}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
