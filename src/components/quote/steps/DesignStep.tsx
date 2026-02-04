import { DesignCategory, designs } from "@/data/designs";
import { useMemo, useState } from "react";

interface Props {
  update: (v: any) => void;
  next: () => void;
  back: () => void;
}

export default function DesignStep({ update, next, back }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    DesignCategory[]
  >([]);
  const [selected, setSelected] = useState<string | null>(null);

  const toggleCategory = (cat: DesignCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  const filteredDesigns = useMemo(() => {
    return designs.filter((d) => {
      const matchSearch = d.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategories.length === 0 ||
        d.category.some((c) => selectedCategories.includes(c));

      return matchSearch && matchCategory;
    });
  }, [search, selectedCategories]);

  const handleNext = () => {
    if (!selected) return;
    update({ design: selected });
    next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select a Design</h2>

      {/* Search + Filter */}
      <div className="flex gap-4">
        <input
          placeholder="Search designs..."
          className="border p-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          {["artistic", "devotional", "floral", "geometric"].map((cat) => (
            <button
              key={cat}
              onClick={() =>
                toggleCategory(cat as DesignCategory)
              }
              className={`px-3 py-1 border rounded ${
                selectedCategories.includes(cat as DesignCategory)
                  ? "bg-gold text-white"
                  : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
        {filteredDesigns.map((d) => (
          <div
            key={d.id}
            onClick={() => setSelected(d.id)}
            className={`cursor-pointer border p-2 ${
              selected === d.id ? "border-gold" : ""
            }`}
          >
            <img src={d.image} className="h-32 w-full object-cover" />
            <p className="text-sm mt-2">{d.name}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between">
        {/* <button onClick={back}>Back</button> */}

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
