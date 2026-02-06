import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "hi";

// Translation structure - can be fetched from backend
export interface Translations {
  // Navigation
  home: string;
  services: string;
  templeDesign: string;
  transformations: string;
  portfolio: string;
  blog: string;
  contact: string;
  getQuote: string;

  // Hero
  heroTagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  viewOurWork: string;
  scheduleConsultation: string;
  yearsExperience: string;
  projectsDelivered: string;
  templeDesigns: string;

  // Services
  ourExpertise: string;
  craftedWithPrecision: string;
  servicesDescription: string;
  interiorDesigning: string;
  interiorDesigningDesc: string;
  wpcPanels: string;
  wpcPanelsDesc: string;
  cncCutting: string;
  cncCuttingDesc: string;
  customFurniture: string;
  customFurnitureDesc: string;
  templeDesignService: string;
  templeDesignServiceDesc: string;

  // Temple Section
  divineCraftsmanship: string;
  modernTempleDesign: string;
  forSacredSpaces: string;
  templeDescription: string;
  intricateCarvings: string;
  intricateCarvingsDesc: string;
  sacredGeometry: string;
  sacredGeometryDesc: string;
  premiumMaterials: string;
  premiumMaterialsDesc: string;
  sacredSpacesCreated: string;
  designYourTemple: string;

  // Portfolio
  ourWork: string;
  featuredProjects: string;
  portfolioDescription: string;
  all: string;
  interior: string;
  temple: string;
  furniture: string;
  panels: string;

  // Contact
  getInTouch: string;
  startYourProject: string;
  contactDescription: string;
  visitOurStudio: string;
  callUs: string;
  emailUs: string;
  workingHours: string;
  interactiveMap: string;
  sendUsMessage: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  serviceInterestedIn: string;
  selectService: string;
  projectDetails: string;
  tellUsAboutProject: string;
  sendMessage: string;
  thankYouMessage: string;
  thankYouDescription: string;

  // Footer
  studioName: string;
  studioTagline: string;
  footerDescription: string;
  ourServices: string;
  company: string;
  aboutUs: string;
  process: string;
  testimonials: string;
  stayInspired: string;
  subscribeText: string;
  join: string;
  privacyPolicy: string;
  termsOfService: string;

  // Testimonials
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonial1Name: string;
  testimonial1Role: string;
  testimonial1Content: string;
  testimonial2Name: string;
  testimonial2Role: string;
  testimonial2Content: string;
  testimonial3Name: string;
  testimonial3Role: string;
  testimonial3Content: string;

  // Common
  luxuryCraftsmanship: string;
  allRightsReserved: string;
  before: string;
  after: string;
  transformationShowcase: string;
  seeOurTransformations: string;
  transformationDescription: string;

  // Services Page
  premiumServices: string;
  servicesPageDescription: string;
  service: string;
  features: string;
  readyToStartProject: string;
  contactUsToday: string;
  scheduleConsultationCta: string;
  spacePlanning: string;
  visualization3d: string;
  materialSelection: string;
  projectManagement: string;
  customSolutions: string;
  weatherResistant: string;
  lowMaintenance: string;
  ecoFriendly: string;
  fireRetardant: string;
  customPatterns: string;
  highPrecision: string;
  complexDesigns: string;
  multipleMaterials: string;
  fastTurnaround: string;
  customDesign: string;
  expertCraftsmanship: string;
  deliveryInstallation: string;
  warranty: string;
  vastuCompliant: string;
  traditionalCarvings: string;
  premiumWoods: string;
  ledIntegration: string;
  customSizes: string;

  // Portfolio Page
  curatedCollection: string;
  luxuryLivingRoom: string;
  luxuryLivingRoomDesc: string;
  sacredMandirDesign: string;
  sacredMandirDesignDesc: string;
  modernConsoleUnit: string;
  modernConsoleUnitDesc: string;
  geometricWallPanels: string;
  geometricWallPanelsDesc: string;
  cncArtPanel: string;
  cncArtPanelDesc: string;
  executiveOffice: string;
  executiveOfficeDesc: string;
  wantToSeeTransformed: string;
  discussVision: string;

  // Temple Page
  whyChooseUs: string;
  craftedWithDevotion: string;
  craftedWithDevotionDesc: string;
  durableConstruction: string;
  durableConstructionDesc: string;
  ledIntegrationDesc: string;
  customSizesDesc: string;
  ourCreations: string;
  templeGallery: string;
  ourProcess: string;
  howWeWork: string;
  consultation: string;
  consultationDesc: string;
  design: string;
  designDesc: string;
  crafting: string;
  craftingDesc: string;
  installation: string;
  installationDesc: string;
  createSacredSpace: string;
  designTempleHome: string;
  getStartedToday: string;
  traditionalTeakMandir: string;
  traditionalTeakMandirDesc: string;
  modernMinimalistTemple: string;
  modernMinimalistTempleDesc: string;
  cncCarvedJaliMandir: string;
  cncCarvedJaliMandirDesc: string;
  traditional: string;
  contemporary: string;
  fusion: string;

  // Contact Page
  readyToTransform: string;
  contactFormDescription: string;
  contactInformation: string;
  contactInfoDescription: string;
  studioAddress: string;
  phoneNumbers: string;
  emailAddresses: string;
  workingHoursContent: string;
  sendingMessage: string;
  faq: string;
  faqQuestion1: string;
  faqAnswer1: string;
  faqQuestion2: string;
  faqAnswer2: string;
  faqQuestion3: string;
  faqAnswer3: string;
  faqQuestion4: string;
  faqAnswer4: string;

  // Blog Page
  ourBlog: string;
  designInsights: string;
  blogDescription: string;
  searchArticles: string;
  interiorDesignCategory: string;
  tipsAndTricks: string;
  readArticle: string;
  loadMoreArticles: string;
  noArticlesFound: string;
  subscribeNewsletter: string;
  newsletterDescription: string;
  enterEmail: string;
  subscribe: string;
}

const translations: Record<Language, Translations> = {
  en: {
    home: "Home",
    services: "Services",
    templeDesign: "Temple Design",
    transformations: "Transformations",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact",
    getQuote: "Get Quote",

    heroTagline: "Luxury Craftsmanship",
    heroTitle1: "Where Sacred Elegance",
    heroTitle2: "Meets Modern Design",
    heroDescription: "Transforming spaces into sanctuaries of beauty. From exquisite temple designs to bespoke furniture and architectural woodwork, we craft timeless interiors that honor tradition while embracing contemporary luxury.",
    viewOurWork: "View Our Work",
    scheduleConsultation: "Schedule Consultation",
    yearsExperience: "Years Experience",
    projectsDelivered: "Projects Delivered",
    templeDesigns: "Temple Designs",

    ourExpertise: "Our Expertise",
    craftedWithPrecision: "Crafted with Precision",
    servicesDescription: "From concept to completion, we bring your vision to life with uncompromising attention to detail and premium craftsmanship.",
    interiorDesigning: "Interior Designing",
    interiorDesigningDesc: "Complete residential and commercial interior solutions that blend aesthetics with functionality. From concept to execution, we create spaces that inspire.",
    wpcPanels: "WPC Panels",
    wpcPanelsDesc: "Premium Wood Plastic Composite panels for walls and ceilings. Durable, elegant, and available in stunning patterns that transform any space.",
    cncCutting: "CNC Wood Cutting",
    cncCuttingDesc: "Precision CNC routing for intricate patterns, jalis, and decorative elements. Modern technology meets traditional artistry.",
    customFurniture: "Custom Furniture",
    customFurnitureDesc: "Bespoke furniture crafted to your exact specifications. Each piece is a work of art, designed to complement your unique space.",
    templeDesignService: "Temple Design",
    templeDesignServiceDesc: "Sacred spaces designed with devotion. Modern mandirs that honor tradition while embracing contemporary architectural elegance.",

    divineCraftsmanship: "Divine Craftsmanship",
    modernTempleDesign: "Modern Temple Design",
    forSacredSpaces: "For Sacred Spaces",
    templeDescription: "Create a sanctuary of peace within your home. Our bespoke mandir designs blend ancient spiritual traditions with contemporary aesthetics, using premium woods and intricate CNC carvings to craft spaces that inspire devotion and tranquility.",
    intricateCarvings: "Intricate Carvings",
    intricateCarvingsDesc: "Traditional motifs and patterns crafted with precision CNC technology",
    sacredGeometry: "Sacred Geometry",
    sacredGeometryDesc: "Vastu-compliant designs that create harmonious spiritual spaces",
    premiumMaterials: "Premium Materials",
    premiumMaterialsDesc: "Finest teak, sheesham, and walnut woods for lasting beauty",
    sacredSpacesCreated: "Sacred Spaces Created",
    designYourTemple: "Design Your Temple",

    ourWork: "Our Work",
    featuredProjects: "Featured Projects",
    portfolioDescription: "A curated collection of our finest work, showcasing the artistry and precision that defines every project we undertake.",
    all: "All",
    interior: "Interior",
    temple: "Temple",
    furniture: "Furniture",
    panels: "Panels",

    getInTouch: "Get In Touch",
    startYourProject: "Start Your Project",
    contactDescription: "Ready to transform your space? Schedule a consultation and let us bring your vision to life with our expert craftsmanship.",
    visitOurStudio: "Visit Our Studio",
    callUs: "Call Us",
    emailUs: "Email Us",
    workingHours: "Working Hours",
    interactiveMap: "Interactive Map",
    sendUsMessage: "Send Us a Message",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    serviceInterestedIn: "Service Interested In",
    selectService: "Select a service",
    projectDetails: "Project Details",
    tellUsAboutProject: "Tell us about your project...",
    sendMessage: "Send Message",
    thankYouMessage: "Thank you for reaching out!",
    thankYouDescription: "We will get back to you within 24 hours.",

    studioName: "Dancing Drills Designs",
    studioTagline: "Interiors Studio",
    footerDescription: "Discover the artistry of precision-crafted CNC sheets for innovative interior design.  Elevate your spaces with our meticulous craftsmanship.",
    ourServices: "Our Services",
    company: "Company",
    aboutUs: "About Us",
    process: "Process",
    testimonials: "Testimonials",
    stayInspired: "Stay Inspired",
    subscribeText: "Subscribe for design inspiration, project showcases, and exclusive offers.",
    join: "Join",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    testimonialsTitle: "What Our Clients Say",
    testimonialsSubtitle: "Hear from homeowners and businesses who trusted us with their spaces.",
    testimonial1Name: "Rajesh Sharma",
    testimonial1Role: "Homeowner, Mumbai",
    testimonial1Content: "The temple they designed for our home is absolutely stunning. The craftsmanship and attention to detail exceeded our expectations.",
    testimonial2Name: "Priya Mehta",
    testimonial2Role: "Interior Designer, Delhi",
    testimonial2Content: "Working with Dancing Drills Designs Interiors has been a pleasure. Their CNC work and custom furniture pieces are unmatched in quality.",
    testimonial3Name: "Amit Patel",
    testimonial3Role: "Business Owner, Ahmedabad",
    testimonial3Content: "They transformed our office space completely. The WPC panels and modern design have impressed all our clients.",

    luxuryCraftsmanship: "Luxury Craftsmanship",
    allRightsReserved: "All rights reserved.",
    before: "Before",
    after: "After",
    transformationShowcase: "Transformation Showcase",
    seeOurTransformations: "See Our Transformations",
    transformationDescription: "Witness the dramatic before and after transformations we've achieved for our clients. Slide to compare.",

    // Services Page
    premiumServices: "Premium Services",
    servicesPageDescription: "From concept to completion, we bring your vision to life with uncompromising attention to detail and premium craftsmanship.",
    service: "Service",
    features: "Features",
    readyToStartProject: "Ready to Start Your Project?",
    contactUsToday: "Contact Us Today",
    scheduleConsultationCta: "Schedule a consultation with our design experts and transform your space.",
    spacePlanning: "Space Planning",
    visualization3d: "3D Visualization",
    materialSelection: "Material Selection",
    projectManagement: "Project Management",
    customSolutions: "Custom Solutions",
    weatherResistant: "Weather Resistant",
    lowMaintenance: "Low Maintenance",
    ecoFriendly: "Eco-Friendly",
    fireRetardant: "Fire Retardant",
    customPatterns: "Custom Patterns",
    highPrecision: "High Precision",
    complexDesigns: "Complex Designs",
    multipleMaterials: "Multiple Materials",
    fastTurnaround: "Fast Turnaround",
    customDesign: "Custom Design",
    expertCraftsmanship: "Expert Craftsmanship",
    deliveryInstallation: "Delivery & Installation",
    warranty: "Warranty",
    vastuCompliant: "Vastu Compliant",
    traditionalCarvings: "Traditional Carvings",
    premiumWoods: "Premium Woods",
    ledIntegration: "LED Integration",
    customSizes: "Custom Sizes",

    // Portfolio Page
    curatedCollection: "A curated collection of our finest work, showcasing the artistry and precision that defines every project we undertake.",
    luxuryLivingRoom: "Luxury Living Room",
    luxuryLivingRoomDesc: "Contemporary elegance with CNC carved wall panels. This project showcases the perfect blend of modern aesthetics and traditional craftsmanship.",
    sacredMandirDesign: "Sacred Mandir Design",
    sacredMandirDesignDesc: "Traditional temple with intricate wood carvings featuring premium teak wood and gold leaf accents.",
    modernConsoleUnit: "Modern Console Unit",
    modernConsoleUnitDesc: "Bespoke walnut wood entertainment center with integrated LED lighting and smart cable management.",
    geometricWallPanels: "Geometric Wall Panels",
    geometricWallPanelsDesc: "WPC panels with contemporary geometric patterns for a modern commercial space.",
    cncArtPanel: "CNC Art Panel",
    cncArtPanelDesc: "Precision carved decorative panel featuring traditional Indian motifs in modern interpretation.",
    executiveOffice: "Executive Office",
    executiveOfficeDesc: "Premium commercial interior design with custom furniture and sophisticated wall treatments.",
    wantToSeeTransformed: "Want to See Your Space Transformed?",
    discussVision: "Let's discuss how we can bring your vision to life.",

    // Temple Page
    whyChooseUs: "Why Choose Us",
    craftedWithDevotion: "Crafted with Devotion",
    craftedWithDevotionDesc: "Every temple we create is a labor of love, combining traditional artistry with modern precision.",
    durableConstruction: "Durable Construction",
    durableConstructionDesc: "Built to last generations with premium quality materials and expert craftsmanship",
    ledIntegrationDesc: "Subtle ambient lighting options to enhance the spiritual atmosphere of your sacred space",
    customSizesDesc: "Designed to fit your space perfectly, from compact apartments to grand pooja rooms",
    ourCreations: "Our Creations",
    templeGallery: "Temple Gallery",
    ourProcess: "Our Process",
    howWeWork: "How We Work",
    consultation: "Consultation",
    consultationDesc: "Discuss your vision, space, and spiritual preferences",
    design: "Design",
    designDesc: "Create detailed 3D renders and select materials",
    crafting: "Crafting",
    craftingDesc: "Expert Dancing Drills Designss bring the design to life",
    installation: "Installation",
    installationDesc: "Careful delivery and professional setup",
    createSacredSpace: "Create Your Sacred Space",
    designTempleHome: "Let us design a temple that brings peace and devotion to your home.",
    getStartedToday: "Get Started Today",
    traditionalTeakMandir: "Traditional Teak Mandir",
    traditionalTeakMandirDesc: "A classic design featuring intricate peacock motifs and gold leaf accents",
    modernMinimalistTemple: "Modern Minimalist Temple",
    modernMinimalistTempleDesc: "Clean lines with subtle traditional elements for contemporary homes",
    cncCarvedJaliMandir: "CNC Carved Jali Mandir",
    cncCarvedJaliMandirDesc: "Featuring precision-cut jali patterns with backlit design",
    traditional: "Traditional",
    contemporary: "Contemporary",
    fusion: "Fusion",

    // Contact Page
    readyToTransform: "Ready to transform your space? Schedule a consultation and let's bring your vision to life with our expert craftsmanship.",
    contactFormDescription: "Fill out the form below and we'll get back to you within 24 hours.",
    contactInformation: "Contact Information",
    contactInfoDescription: "Visit our studio or reach out through any of the channels below. We're here to help bring your vision to life.",
    studioAddress: "Gaya-Bodhgaya Road, near Gyan Deep School, Kendui, Gaya, Bihar 823001",
    phoneNumbers: "+91 88005 70957\n+91 70618 63057",
    emailAddresses: "enquiry@dancingdrills.com",
    workingHoursContent: "Mon - Sat: 10:00 AM - 7:00 PM\nSunday: By Appointment",
    sendingMessage: "Sending...",
    faq: "Frequently Asked Questions",
    faqQuestion1: "How long does a typical project take?",
    faqAnswer1: "Project timelines vary based on scope. Simple furniture pieces take 2-3 weeks, while complete interior projects may take 2-4 months.",
    faqQuestion2: "Do you provide 3D visualizations?",
    faqAnswer2: "Yes, we provide detailed 3D renders for all interior and temple design projects so you can visualize the final result before we begin.",
    faqQuestion3: "What areas do you serve?",
    faqAnswer3: "We primarily serve Mumbai, Pune, Delhi NCR, and Bangalore. For larger projects, we can work across India.",
    faqQuestion4: "What is your payment structure?",
    faqAnswer4: "We typically work with 40% advance, 40% during production, and 20% upon completion and installation.",

    // Blog Page
    ourBlog: "Our Blog",
    designInsights: "Design Insights",
    blogDescription: "Expert tips, trends, and inspiration for creating beautiful spaces that reflect your unique style.",
    searchArticles: "Search articles...",
    interiorDesignCategory: "Interior Design",
    tipsAndTricks: "Tips & Tricks",
    readArticle: "Read Article",
    loadMoreArticles: "Load More Articles",
    noArticlesFound: "No articles found matching your criteria.",
    subscribeNewsletter: "Subscribe to Our Newsletter",
    newsletterDescription: "Get the latest design tips, trends, and exclusive offers delivered to your inbox.",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
  },
  hi: {
    home: "होम",
    services: "सेवाएं",
    templeDesign: "मंदिर डिज़ाइन",
    transformations: "परिवर्तन",
    portfolio: "पोर्टफोलियो",
    blog: "ब्लॉग",
    contact: "संपर्क",
    getQuote: "कोटेशन प्राप्त करें",

    heroTagline: "शानदार शिल्पकला",
    heroTitle1: "जहां पवित्र सुंदरता",
    heroTitle2: "आधुनिक डिज़ाइन से मिलती है",
    heroDescription: "स्थानों को सुंदरता के अभयारण्य में बदलना। उत्कृष्ट मंदिर डिज़ाइन से लेकर विशेष फर्नीचर और वास्तुशिल्प वुडवर्क तक, हम ऐसे शाश्वत इंटीरियर बनाते हैं जो परंपरा का सम्मान करते हुए समकालीन लक्जरी को अपनाते हैं।",
    viewOurWork: "हमारा काम देखें",
    scheduleConsultation: "परामर्श निर्धारित करें",
    yearsExperience: "वर्षों का अनुभव",
    projectsDelivered: "पूर्ण परियोजनाएं",
    templeDesigns: "मंदिर डिज़ाइन",

    ourExpertise: "हमारी विशेषज्ञता",
    craftedWithPrecision: "सटीकता से निर्मित",
    servicesDescription: "अवधारणा से पूर्णता तक, हम विस्तार और प्रीमियम शिल्पकला पर अडिग ध्यान देते हुए आपकी दृष्टि को जीवन में लाते हैं।",
    interiorDesigning: "इंटीरियर डिज़ाइनिंग",
    interiorDesigningDesc: "संपूर्ण आवासीय और व्यावसायिक इंटीरियर समाधान जो सौंदर्य को कार्यक्षमता के साथ मिलाते हैं। अवधारणा से निष्पादन तक, हम ऐसे स्थान बनाते हैं जो प्रेरित करते हैं।",
    wpcPanels: "WPC पैनल",
    wpcPanelsDesc: "दीवारों और छत के लिए प्रीमियम वुड प्लास्टिक कंपोजिट पैनल। टिकाऊ, सुरुचिपूर्ण, और आश्चर्यजनक पैटर्न में उपलब्ध।",
    cncCutting: "CNC वुड कटिंग",
    cncCuttingDesc: "जटिल पैटर्न, जाली और सजावटी तत्वों के लिए सटीक CNC राउटिंग। आधुनिक तकनीक पारंपरिक कलात्मकता से मिलती है।",
    customFurniture: "कस्टम फर्नीचर",
    customFurnitureDesc: "आपकी सटीक विशिष्टताओं के अनुसार विशेष फर्नीचर। प्रत्येक टुकड़ा कला का एक काम है, आपके अनूठे स्थान के पूरक के लिए डिज़ाइन किया गया।",
    templeDesignService: "मंदिर डिज़ाइन",
    templeDesignServiceDesc: "भक्ति के साथ डिज़ाइन किए गए पवित्र स्थान। आधुनिक मंदिर जो समकालीन वास्तुशिल्प सुंदरता को अपनाते हुए परंपरा का सम्मान करते हैं।",

    divineCraftsmanship: "दिव्य शिल्पकला",
    modernTempleDesign: "आधुनिक मंदिर डिज़ाइन",
    forSacredSpaces: "पवित्र स्थानों के लिए",
    templeDescription: "अपने घर में शांति का अभयारण्य बनाएं। हमारे विशेष मंदिर डिज़ाइन प्राचीन आध्यात्मिक परंपराओं को समकालीन सौंदर्य के साथ मिलाते हैं, प्रीमियम लकड़ी और जटिल CNC नक्काशी का उपयोग करते हुए ऐसे स्थान बनाते हैं जो भक्ति और शांति को प्रेरित करते हैं।",
    intricateCarvings: "जटिल नक्काशी",
    intricateCarvingsDesc: "सटीक CNC तकनीक से निर्मित पारंपरिक रूपांकन और पैटर्न",
    sacredGeometry: "पवित्र ज्यामिति",
    sacredGeometryDesc: "वास्तु-अनुपालक डिज़ाइन जो सामंजस्यपूर्ण आध्यात्मिक स्थान बनाते हैं",
    premiumMaterials: "प्रीमियम सामग्री",
    premiumMaterialsDesc: "स्थायी सुंदरता के लिए बेहतरीन सागौन, शीशम और अखरोट की लकड़ी",
    sacredSpacesCreated: "पवित्र स्थान निर्मित",
    designYourTemple: "अपना मंदिर डिज़ाइन करें",

    ourWork: "हमारा काम",
    featuredProjects: "विशेष परियोजनाएं",
    portfolioDescription: "हमारे बेहतरीन कार्य का एक क्यूरेटेड संग्रह, जो हमारी हर परियोजना को परिभाषित करने वाली कलात्मकता और सटीकता को प्रदर्शित करता है।",
    all: "सभी",
    interior: "इंटीरियर",
    temple: "मंदिर",
    furniture: "फर्नीचर",
    panels: "पैनल",

    getInTouch: "संपर्क करें",
    startYourProject: "अपनी परियोजना शुरू करें",
    contactDescription: "अपने स्थान को बदलने के लिए तैयार हैं? परामर्श निर्धारित करें और हमें अपनी विशेषज्ञ शिल्पकला के साथ आपकी दृष्टि को जीवन में लाने दें।",
    visitOurStudio: "हमारे स्टूडियो पर जाएं",
    callUs: "हमें कॉल करें",
    emailUs: "हमें ईमेल करें",
    workingHours: "कार्य समय",
    interactiveMap: "इंटरैक्टिव मैप",
    sendUsMessage: "हमें संदेश भेजें",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    phoneNumber: "फोन नंबर",
    serviceInterestedIn: "रुचि की सेवा",
    selectService: "सेवा चुनें",
    projectDetails: "परियोजना विवरण",
    tellUsAboutProject: "अपनी परियोजना के बारे में बताएं...",
    sendMessage: "संदेश भेजें",
    thankYouMessage: "संपर्क करने के लिए धन्यवाद!",
    thankYouDescription: "हम 24 घंटों के भीतर आपसे संपर्क करेंगे।",

    studioName: "आर्टिसन",
    studioTagline: "इंटीरियर्स स्टूडियो",
    footerDescription: "नवीनतम इंटीरियर डिज़ाइन के लिए सटीकता से निर्मित CNC शीट की कला की खोज करें। हमारे सूक्ष्म शिल्पकला के साथ अपने स्थानों को ऊंचा उठाएं।",
    ourServices: "हमारी सेवाएं",
    company: "कंपनी",
    aboutUs: "हमारे बारे में",
    process: "प्रक्रिया",
    testimonials: "प्रशंसापत्र",
    stayInspired: "प्रेरित रहें",
    subscribeText: "डिज़ाइन प्रेरणा, परियोजना प्रदर्शन और विशेष ऑफ़र के लिए सदस्यता लें।",
    join: "जुड़ें",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",

    testimonialsTitle: "हमारे ग्राहक क्या कहते हैं",
    testimonialsSubtitle: "उन घर मालिकों और व्यवसायों से सुनें जिन्होंने अपने स्थानों के लिए हम पर भरोसा किया।",
    testimonial1Name: "राजेश शर्मा",
    testimonial1Role: "गृहस्वामी, मुंबई",
    testimonial1Content: "उन्होंने हमारे घर के लिए जो मंदिर डिज़ाइन किया वह बिल्कुल आश्चर्यजनक है। शिल्पकला और विस्तार पर ध्यान हमारी अपेक्षाओं से परे था।",
    testimonial2Name: "प्रिया मेहता",
    testimonial2Role: "इंटीरियर डिज़ाइनर, दिल्ली",
    testimonial2Content: "आर्टिसन इंटीरियर्स के साथ काम करना खुशी की बात रही है। उनका CNC काम और कस्टम फर्नीचर गुणवत्ता में बेजोड़ है।",
    testimonial3Name: "अमित पटेल",
    testimonial3Role: "व्यवसाय स्वामी, अहमदाबाद",
    testimonial3Content: "उन्होंने हमारे कार्यालय स्थान को पूरी तरह से बदल दिया। WPC पैनल और आधुनिक डिज़ाइन ने हमारे सभी ग्राहकों को प्रभावित किया है।",

    luxuryCraftsmanship: "शानदार शिल्पकला",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    before: "पहले",
    after: "बाद में",
    transformationShowcase: "परिवर्तन प्रदर्शनी",
    seeOurTransformations: "हमारे परिवर्तन देखें",
    transformationDescription: "हमारे ग्राहकों के लिए किए गए नाटकीय पहले और बाद के परिवर्तनों को देखें। तुलना करने के लिए स्लाइड करें।",

    // Services Page
    premiumServices: "प्रीमियम सेवाएं",
    servicesPageDescription: "अवधारणा से पूर्णता तक, हम विस्तार और प्रीमियम शिल्पकला पर अडिग ध्यान देते हुए आपकी दृष्टि को जीवन में लाते हैं।",
    service: "सेवा",
    features: "विशेषताएं",
    readyToStartProject: "अपनी परियोजना शुरू करने के लिए तैयार हैं?",
    contactUsToday: "आज ही संपर्क करें",
    scheduleConsultationCta: "हमारे डिज़ाइन विशेषज्ञों के साथ परामर्श निर्धारित करें और अपने स्थान को बदलें।",
    spacePlanning: "स्थान योजना",
    visualization3d: "3D विज़ुअलाइज़ेशन",
    materialSelection: "सामग्री चयन",
    projectManagement: "परियोजना प्रबंधन",
    customSolutions: "कस्टम समाधान",
    weatherResistant: "मौसम प्रतिरोधी",
    lowMaintenance: "कम रखरखाव",
    ecoFriendly: "पर्यावरण अनुकूल",
    fireRetardant: "अग्नि प्रतिरोधक",
    customPatterns: "कस्टम पैटर्न",
    highPrecision: "उच्च सटीकता",
    complexDesigns: "जटिल डिज़ाइन",
    multipleMaterials: "विभिन्न सामग्री",
    fastTurnaround: "तेज़ डिलीवरी",
    customDesign: "कस्टम डिज़ाइन",
    expertCraftsmanship: "विशेषज्ञ शिल्पकला",
    deliveryInstallation: "डिलीवरी और इंस्टॉलेशन",
    warranty: "वारंटी",
    vastuCompliant: "वास्तु अनुपालक",
    traditionalCarvings: "पारंपरिक नक्काशी",
    premiumWoods: "प्रीमियम लकड़ी",
    ledIntegration: "LED एकीकरण",
    customSizes: "कस्टम आकार",

    // Portfolio Page
    curatedCollection: "हमारे बेहतरीन कार्य का एक क्यूरेटेड संग्रह, जो हमारी हर परियोजना को परिभाषित करने वाली कलात्मकता और सटीकता को प्रदर्शित करता है।",
    luxuryLivingRoom: "लक्ज़री लिविंग रूम",
    luxuryLivingRoomDesc: "CNC नक्काशीदार वॉल पैनल के साथ समकालीन सुंदरता। यह परियोजना आधुनिक सौंदर्य और पारंपरिक शिल्पकला का सही मिश्रण प्रदर्शित करती है।",
    sacredMandirDesign: "पवित्र मंदिर डिज़ाइन",
    sacredMandirDesignDesc: "प्रीमियम सागौन की लकड़ी और सोने की पत्ती के साथ जटिल लकड़ी की नक्काशी वाला पारंपरिक मंदिर।",
    modernConsoleUnit: "मॉडर्न कंसोल यूनिट",
    modernConsoleUnitDesc: "एकीकृत LED लाइटिंग और स्मार्ट केबल प्रबंधन के साथ विशेष अखरोट की लकड़ी का मनोरंजन केंद्र।",
    geometricWallPanels: "ज्यामितीय वॉल पैनल",
    geometricWallPanelsDesc: "आधुनिक व्यावसायिक स्थान के लिए समकालीन ज्यामितीय पैटर्न के साथ WPC पैनल।",
    cncArtPanel: "CNC आर्ट पैनल",
    cncArtPanelDesc: "आधुनिक व्याख्या में पारंपरिक भारतीय रूपांकनों वाला सटीक नक्काशीदार सजावटी पैनल।",
    executiveOffice: "कार्यकारी कार्यालय",
    executiveOfficeDesc: "कस्टम फर्नीचर और परिष्कृत दीवार उपचार के साथ प्रीमियम व्यावसायिक इंटीरियर डिज़ाइन।",
    wantToSeeTransformed: "अपने स्थान को बदलते देखना चाहते हैं?",
    discussVision: "आइए चर्चा करें कि हम आपकी दृष्टि को कैसे जीवन में ला सकते हैं।",

    // Temple Page
    whyChooseUs: "हमें क्यों चुनें",
    craftedWithDevotion: "भक्ति से निर्मित",
    craftedWithDevotionDesc: "हम जो हर मंदिर बनाते हैं वह प्रेम का काम है, पारंपरिक कलात्मकता को आधुनिक सटीकता के साथ जोड़ता है।",
    durableConstruction: "टिकाऊ निर्माण",
    durableConstructionDesc: "प्रीमियम गुणवत्ता सामग्री और विशेषज्ञ शिल्पकला के साथ पीढ़ियों तक चलने के लिए निर्मित",
    ledIntegrationDesc: "आपके पवित्र स्थान के आध्यात्मिक वातावरण को बढ़ाने के लिए सूक्ष्म परिवेश प्रकाश विकल्प",
    customSizesDesc: "कॉम्पैक्ट अपार्टमेंट से लेकर भव्य पूजा कक्ष तक, आपके स्थान में पूरी तरह फिट होने के लिए डिज़ाइन किया गया",
    ourCreations: "हमारी रचनाएं",
    templeGallery: "मंदिर गैलरी",
    ourProcess: "हमारी प्रक्रिया",
    howWeWork: "हम कैसे काम करते हैं",
    consultation: "परामर्श",
    consultationDesc: "अपनी दृष्टि, स्थान और आध्यात्मिक प्राथमिकताओं पर चर्चा करें",
    design: "डिज़ाइन",
    designDesc: "विस्तृत 3D रेंडर बनाएं और सामग्री चुनें",
    crafting: "निर्माण",
    craftingDesc: "विशेषज्ञ कारीगर डिज़ाइन को जीवन में लाते हैं",
    installation: "इंस्टॉलेशन",
    installationDesc: "सावधानीपूर्वक डिलीवरी और पेशेवर सेटअप",
    createSacredSpace: "अपना पवित्र स्थान बनाएं",
    designTempleHome: "हमें एक ऐसा मंदिर डिज़ाइन करने दें जो आपके घर में शांति और भक्ति लाए।",
    getStartedToday: "आज ही शुरू करें",
    traditionalTeakMandir: "पारंपरिक सागौन मंदिर",
    traditionalTeakMandirDesc: "जटिल मोर रूपांकनों और सोने की पत्ती के साथ एक क्लासिक डिज़ाइन",
    modernMinimalistTemple: "मॉडर्न मिनिमलिस्ट मंदिर",
    modernMinimalistTempleDesc: "समकालीन घरों के लिए सूक्ष्म पारंपरिक तत्वों के साथ स्वच्छ रेखाएं",
    cncCarvedJaliMandir: "CNC नक्काशीदार जाली मंदिर",
    cncCarvedJaliMandirDesc: "बैकलिट डिज़ाइन के साथ सटीक-कट जाली पैटर्न",
    traditional: "पारंपरिक",
    contemporary: "समकालीन",
    fusion: "फ्यूजन",

    // Contact Page
    readyToTransform: "अपने स्थान को बदलने के लिए तैयार हैं? परामर्श निर्धारित करें और हमारी विशेषज्ञ शिल्पकला के साथ अपनी दृष्टि को जीवन में लाएं।",
    contactFormDescription: "नीचे दिए गए फॉर्म को भरें और हम 24 घंटों के भीतर आपसे संपर्क करेंगे।",
    contactInformation: "संपर्क जानकारी",
    contactInfoDescription: "हमारे स्टूडियो में आएं या नीचे दिए गए किसी भी माध्यम से संपर्क करें। हम आपकी दृष्टि को जीवन में लाने में मदद करने के लिए यहां हैं।",
    studioAddress: "गया-बोधगया रोड, ग्यान दीप स्कूल के पास, केंडुई, गया, बिहार 823001",
    phoneNumbers: "+91 88005 70957\n+91 70618 63057",
    emailAddresses: "enquiry@dancingdrills.com",
    workingHoursContent: "सोम - शनि: सुबह 10:00 - शाम 7:00\nरविवार: अपॉइंटमेंट द्वारा",
    sendingMessage: "भेज रहा है...",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    faqQuestion1: "एक सामान्य परियोजना में कितना समय लगता है?",
    faqAnswer1: "परियोजना समयसीमा दायरे के आधार पर भिन्न होती है। साधारण फर्नीचर में 2-3 सप्ताह लगते हैं, जबकि पूर्ण इंटीरियर परियोजनाओं में 2-4 महीने लग सकते हैं।",
    faqQuestion2: "क्या आप 3D विज़ुअलाइज़ेशन प्रदान करते हैं?",
    faqAnswer2: "हां, हम सभी इंटीरियर और मंदिर डिज़ाइन परियोजनाओं के लिए विस्तृत 3D रेंडर प्रदान करते हैं ताकि आप शुरू करने से पहले अंतिम परिणाम की कल्पना कर सकें।",
    faqQuestion3: "आप किन क्षेत्रों में सेवा देते हैं?",
    faqAnswer3: "हम मुख्य रूप से मुंबई, पुणे, दिल्ली एनसीआर और बैंगलोर में सेवा देते हैं। बड़ी परियोजनाओं के लिए, हम पूरे भारत में काम कर सकते हैं।",
    faqQuestion4: "आपकी भुगतान संरचना क्या है?",
    faqAnswer4: "हम आमतौर पर 40% अग्रिम, उत्पादन के दौरान 40%, और पूर्णता और स्थापना पर 20% के साथ काम करते हैं।",

    // Blog Page
    ourBlog: "हमारा ब्लॉग",
    designInsights: "डिज़ाइन अंतर्दृष्टि",
    blogDescription: "सुंदर स्थान बनाने के लिए विशेषज्ञ सुझाव, रुझान और प्रेरणा जो आपकी अनूठी शैली को दर्शाते हैं।",
    searchArticles: "लेख खोजें...",
    interiorDesignCategory: "इंटीरियर डिज़ाइन",
    tipsAndTricks: "टिप्स और ट्रिक्स",
    readArticle: "लेख पढ़ें",
    loadMoreArticles: "और लेख लोड करें",
    noArticlesFound: "आपके मापदंड से मेल खाने वाले कोई लेख नहीं मिले।",
    subscribeNewsletter: "हमारे न्यूज़लेटर की सदस्यता लें",
    newsletterDescription: "नवीनतम डिज़ाइन सुझाव, रुझान और विशेष ऑफ़र अपने इनबॉक्स में प्राप्त करें।",
    enterEmail: "अपना ईमेल दर्ज करें",
    subscribe: "सदस्यता लें",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  // Backend-ready: load translations from API
  loadTranslations?: (lang: Language) => Promise<Translations>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  // Backend-ready: can pass initial language from API (user preference)
  defaultLanguage?: Language;
  // Backend-ready: callback when language changes for syncing to backend
  onLanguageChange?: (lang: Language) => void;
  // Backend-ready: custom translations from API
  customTranslations?: Record<Language, Partial<Translations>>;
}

export const LanguageProvider = ({
  children,
  defaultLanguage = "en",
  onLanguageChange,
  customTranslations,
}: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language") as Language;
      if (stored === "en" || stored === "hi") {
        return stored;
      }
    }
    return defaultLanguage;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    onLanguageChange?.(lang);
  };

  // Merge custom translations with defaults
  const t: Translations = {
    ...translations[language],
    ...customTranslations?.[language],
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
