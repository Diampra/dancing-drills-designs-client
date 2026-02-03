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
  | "phone"
  | "product"
  | "design"
  | "material"
  | "dimension"
  | "upload";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function QuoteWizard({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>("phone");
  const [data, setData] = useState<QuoteData>({ phone: "" });

  const update = (values: Partial<QuoteData>) =>
    setData((prev) => ({ ...prev, ...values }));

  const next = () =>
    setStep((s) =>
      ({
        phone: "product",
        product: "design",
        design: "material",
        material: "dimension",
        dimension: "upload",
        upload: "upload",
      }[s] as Step)
    );

  const back = () =>
    setStep((s) =>
      ({
        product: "phone",
        design: "product",
        material: "design",
        dimension: "material",
        upload: "dimension",
      }[s] as Step)
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        {step === "phone" && (
          <PhoneStep data={data} update={update} next={next} />
        )}
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
          <UploadStep data={data} update={update} back={back} />
        )}
      </DialogContent>
    </Dialog>
  );
}
