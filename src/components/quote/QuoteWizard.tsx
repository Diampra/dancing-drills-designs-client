import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuoteData } from "@/types/quote";
import PhoneStep from "./steps/PhoneStep";
import ProductStep from "./steps/ProductStep";
import DesignStep from "./steps/DesignStep";
import MaterialStep from "./steps/MaterialStep";
import UploadStep from "./steps/UploadStep";
import DimensionStep from "./steps/DimensionStep";

type Step =
  | "product"
  | "design"
  | "material"
  | "dimension"
  | "upload"
  | "phone";

interface Props {
  open: boolean;
  onClose: () => void;
}

const stepConfig = [
  { key: "product", label: "Product" },
  { key: "design", label: "Design" },
  { key: "material", label: "Material" },
  { key: "dimension", label: "Dimensions" },
  { key: "upload", label: "Upload" },
  { key: "phone", label: "Contact" },
];

export default function QuoteWizard({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>("product");
  const [data, setData] = useState<QuoteData>({ phone: "" });

  const update = (values: Partial<QuoteData>) =>
    setData((prev) => ({ ...prev, ...values }));

  const next = () =>
    setStep((s) =>
      ({
        product: "design",
        design: "material",
        material: "dimension",
        dimension: "upload",
        upload: "phone",
        phone: "phone",
      }[s] as Step)
    );

  const back = () =>
    setStep((s) =>
      ({
        design: "product",
        material: "design",
        dimension: "material",
        upload: "dimension",
        phone: "upload",
      }[s] as Step)
    );

  const currentStepIndex = stepConfig.findIndex((s) => s.key === step);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          {/* Progress Bar */}
          <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 bg-gradient-to-b from-amber-50 to-white border-b">
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Get Your Custom Quote
              </h1>
              <p className="text-sm text-gray-600">
                Step {currentStepIndex + 1} of {stepConfig.length}
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden sm:flex items-center justify-between mb-2">
              {stepConfig.map((s, idx) => (
                <div key={s.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        idx < currentStepIndex
                          ? "bg-amber-600 text-white"
                          : idx === currentStepIndex
                          ? "bg-amber-500 text-white ring-4 ring-amber-200"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {idx < currentStepIndex ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className="text-xs mt-2 font-medium text-gray-700 text-center">
                      {s.label}
                    </span>
                  </div>
                  {idx < stepConfig.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all ${
                        idx < currentStepIndex
                          ? "bg-amber-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Progress Bar */}
            <div className="sm:hidden">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStepIndex + 1) / stepConfig.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            {step === "product" && (
              <ProductStep update={update} next={next} back={back} />
            )}
            {step === "design" && (
              <DesignStep update={update} next={next} back={back} />
            )}
            {step === "material" && (
              <MaterialStep update={update} next={next} back={back} />
            )}
            {step === "dimension" && (
              <DimensionStep data={data} update={update} next={next} back={back} />
            )}
            {step === "upload" && (
              <UploadStep data={data} update={update} next={next} back={back} />
            )}
            {step === "phone" && (
              <PhoneStep data={data} update={update} onSubmit={onClose} back={back} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}