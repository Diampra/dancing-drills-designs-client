import BeforeAfterSlider from "./BeforeAfterSlider";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/Gemini_Generated_Image_gmc3aygmc3aygmc3.png";
import furnitureImage from "@/assets/furniture.jpg";
import wpcImage from "@/assets/wpc-panels.jpg";
import cncImage from "@/assets/cnc-cutting.jpg";

const TransformationShowcase = () => {
  const { t } = useLanguage();

  const transformations = [
    {
      id: 1,
      beforeImage: wpcImage,
      afterImage: heroImage,
    },
    {
      id: 2,
      beforeImage: cncImage,
      afterImage: furnitureImage,
    },
  ];

  return (
    <section id="transformations" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
              {t.transformationShowcase}
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-medium mb-4">
            {t.seeOurTransformations}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.transformationDescription}
          </p>
        </div>

        {/* Before/After Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transformations.map((item) => (
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
