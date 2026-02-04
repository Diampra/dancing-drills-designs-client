import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { apiUrl } from "@/constants/constants";
import { useLanguage } from "@/contexts/LanguageContext";

type Transformation = {
  id: string;
  beforeImage: string;
  afterImage: string;
};

const TransformationsPage = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/transformations`)
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {t.transformationShowcase} | {t.studioName}
        </title>
        <meta
          name="description"
          content={t.transformationDescription}
        />
      </Helmet>

      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-secondary text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">
            {t.seeOurTransformations}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.transformationDescription}
          </p>
        </section>

        {/* Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {loading && (
              <p className="text-center text-muted-foreground">
                Loading transformations…
              </p>
            )}

            {!loading && items.length === 0 && (
              <p className="text-center text-muted-foreground">
                No transformations available yet.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item) => (
                <BeforeAfterSlider
                  key={item.id}
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TransformationsPage;
