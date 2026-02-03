import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import QuoteWizard from "./quote/QuoteWizard";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.services, href: "/services" },
    { name: t.templeDesign, href: "/temple" },
    { name: t.portfolio, href: "/portfolio" },
    { name: t.blog, href: "/blog" },
    { name: t.contact, href: "/contact" },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-background
        border-b border-gold/20
        shadow-md
        py-5
      "
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light flex items-center justify-center rounded-sm shadow-sm">
            <span className="font-serif text-foreground font-bold text-lg">
              A
            </span>
          </div>

          <div>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Dancing Drills Designs
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Interiors Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-gold ${
                location.pathname === link.href
                  ? "text-gold"
                  : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-2 ml-2">
            <ThemeToggle variant="scrolled" />
            <LanguageToggle variant="scrolled" />
          </div>

          {/* <Link to="/contact">
            <Button variant="elegant" size="sm">
              {t.getQuote}
            </Button>
          </Link> */}
          <Button onClick={() => setQuoteOpen(true)}>
            {t.getQuote}
          </Button>

          <QuoteWizard open={quoteOpen} onClose={() => setQuoteOpen(false)} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavClick}
                className={`text-lg font-medium py-2 border-b border-border hover:text-gold ${
                  location.pathname === link.href
                    ? "text-gold"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-4 py-4 border-b border-border">
              <ThemeToggle variant="scrolled" />
              <LanguageToggle variant="scrolled" />
            </div>

            {/* <Link to="/contact" onClick={handleNavClick}>
              <Button variant="elegant" className="mt-4 w-full">
                {t.getQuote}
              </Button>
            </Link> */}
            <Button onClick={() => setQuoteOpen(true)}>
              {t.getQuote}
            </Button>

            <QuoteWizard open={quoteOpen} onClose={() => setQuoteOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
