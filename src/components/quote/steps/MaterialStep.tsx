import { useState } from "react";
import MaterialBar from "../MaterialBar";
import { materials } from "@/data/materials";

interface Props {
  update: (v: any) => void;
  next: () => void;
  back: () => void;
}

export default function MaterialStep({ update, next, back }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected) return;
    update({ material: selected });
    next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select a Material</h2>

      <div className="grid grid-cols-3 gap-6 max-h-[450px] overflow-y-auto pr-2">
        {materials.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`cursor-pointer border p-4 rounded-lg shadow-sm transition ${
              selected === m.id
                ? "border-gold ring-2 ring-gold"
                : "hover:shadow-md"
            }`}
          >
            <div className="flex justify-center mb-3">
              <img src={m.image} className="h-24 object-contain" />
            </div>

            <h3 className="text-lg font-semibold text-center">
              {m.name}
            </h3>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <strong>Made of:</strong>
                <span>{m.madeOf}</span>
              </div>

              <div>
                <strong>Strength:</strong>
                <MaterialBar value={m.strength} />
              </div>

              <div>
                <strong>Finish:</strong>
                <MaterialBar value={m.finish} />
              </div>

              <div className="flex justify-between">
                <strong>Waterproof:</strong>
                <span>{m.waterproof}</span>
              </div>

              <div className="flex justify-between">
                <strong>Cost:</strong>
                <span>{m.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between">
        <button onClick={back}>Back</button>
        <button
          disabled={!selected}
          onClick={handleNext}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
}
