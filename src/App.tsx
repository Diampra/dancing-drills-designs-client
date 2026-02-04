import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import TemplePage from "./pages/TemplePage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/Route/adminRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPosts from "./pages/AdminPosts";
import AdminPostForm from "./pages/AdminPostForm";
import AdminCategories from "./pages/AdminCategories";
import AdminPortfolio from "./pages/AdminPortfolio";
import AdminPortfolioForm from "./pages/AdminPortfolioForm";
import AdminPortfolioCategories from "./pages/AdminPortfolioCategories";
import AdminServiceList from "./pages/AdminServiceList";
import AdminServiceForm from "./pages/AdminServiceForm";
import AdminTestimonialsList from "./pages/AdminTestimonialsList";
import AdminTestimonialForm from "./pages/AdminTestimonialForm";
import AdminStorageAudit from "./pages/AdminStorageAudit";
import Auth from "./pages/Auth";
import AdminTransformationForm from "./pages/AdminTransformationForm";
import AdminTransformationList from "./pages/AdminTransformationList";
import TransformationsPage from "./pages/TransformationsPage";
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <LanguageProvider key="language-provider">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/temple" element={<TemplePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/transformations" element={<TransformationsPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="posts" element={<AdminPosts />} />
                  <Route path="posts/:id" element={<AdminPostForm />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="portfolio" element={<AdminPortfolio />} />
                  <Route path="portfolio/new" element={<AdminPortfolioForm />} />
                  <Route path="portfolio/:id" element={<AdminPortfolioForm />} />
                  <Route path="portfolio/categories" element={<AdminPortfolioCategories />} />
                  <Route path="services" element={<AdminServiceList />} />
                  <Route path="services/new" element={<AdminServiceForm />} />
                  <Route path="services/:id" element={<AdminServiceForm />} />
                  <Route path="testimonials" element={<AdminTestimonialsList />} />
                  <Route path="testimonials/:id" element={<AdminTestimonialForm />} />
                  <Route path="transformations" element={<AdminTransformationList />} />
                  <Route path="transformations/new" element={<AdminTransformationForm />} />
                  <Route path="transformations/:id" element={<AdminTransformationForm />} />
                
                  <Route path="storage" element={<AdminStorageAudit />} />
                  {/* <Route path="media-gallery" element={<AdminMediaGallery />} /> */}
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
