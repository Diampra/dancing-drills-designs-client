import { useState } from "react";
import { QuoteData } from "@/types/quote";

interface Props {
  data: QuoteData;
  update: (v: Partial<QuoteData>) => void;
  back: () => void;
  next: () => void;
}

export default function UploadStep({ data, update, back, next }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    update({ image: file });
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Upload a Picture (Optional)
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          e.target.files && handleFile(e.target.files[0])
        }
      />

      {preview && (
        <img
          src={preview}
          className="h-48 object-contain border mt-4"
          alt="Preview"
        />
      )}

      <div className="flex justify-between">
        <button onClick={back}>Back</button>

        <button onClick={next} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
