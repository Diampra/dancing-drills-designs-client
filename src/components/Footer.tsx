import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { name: t.interiorDesigning, href: "/services" },
    { name: t.templeDesign, href: "/temple" },
    { name: t.customFurniture, href: "/services" },
    { name: t.wpcPanels, href: "/services" },
    { name: t.cncCutting, href: "/services" },
  ];

  const companyLinks = [
    { name: t.aboutUs, href: "#" },
    { name: t.portfolio, href: "/portfolio" },
    { name: t.process, href: "#" },
    { name: t.testimonials, href: "#" },
    { name: t.contact, href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="font-serif text-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold tracking-tight text-primary-foreground">
                  {t.studioName}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
                  {t.studioTagline}
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              {t.footerDescription}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-primary-foreground mb-6">{t.ourServices}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 text-sm hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg text-primary-foreground mb-6">{t.company}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 text-sm hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-primary-foreground mb-6">{t.stayInspired}</h4>
            <p className="text-primary-foreground/70 text-sm mb-4">
              {t.subscribeText}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.emailAddress}
                className="flex-1 px-4 py-3 bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:ring-2 focus:ring-gold outline-none"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-gold text-foreground text-sm font-medium hover:bg-gold-light transition-colors"
              >
                {t.join}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} {t.studioName} {t.studioTagline}. {t.allRightsReserved}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/50 text-sm hover:text-gold transition-colors">
              {t.privacyPolicy}
            </a>
            <a href="#" className="text-primary-foreground/50 text-sm hover:text-gold transition-colors">
              {t.termsOfService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
