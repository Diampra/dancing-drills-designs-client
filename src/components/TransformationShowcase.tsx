import { useEffect, useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiUrl } from "@/constants/constants";

type Transformation = {
  id: string;
  beforeImage: string;
  afterImage: string;
};

const TransformationShowcase = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<Transformation[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/transformations`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null; // hide section if empty

  return (
    <section id="transformations" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
              {t.transformationShowcase}
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mb-4">
            {t.seeOurTransformations}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.transformationDescription}
          </p>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
  );
};

export default TransformationShowcase;
