import { dimensionRules } from "@/components/utils/dimensionRules";
import { QuoteData } from "@/types/quote";

interface Props {
  data: QuoteData;
  update: (v: Partial<QuoteData>) => void;
  next: () => void;
  back: () => void;
}

export default function DimensionStep({
  data,
  update,
  next,
  back,
}: Props) {
  if (!data.product) return null;

  const fields = dimensionRules[data.product];

  const isValid = fields.every(
    (f) => Number(data[f.key]) > 0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Enter Dimensions (in inches)
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block mb-2 font-medium">
              {field.label}
            </label>
            <input
              type="number"
              min={1}
              value={data[field.key] || ""}
              onChange={(e) =>
                update({ [field.key]: Number(e.target.value) })
              }
              className="border p-3 w-full rounded"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={back}>Back</button>

        <button
          disabled={!isValid}
          onClick={next}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
}
