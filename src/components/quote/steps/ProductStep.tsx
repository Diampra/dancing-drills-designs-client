const products = [
  { id: "DT", name: "Designer Temple", img: "/images/Designer_temple.jpg" },
  { id: "DOORS", name: "Doors", img: "/images/doors1.jpg" },
  { id: "WP", name: "Wall Panels", img: "/images/wall_panel4.jpg" },
];

export default function ProductStep({ update, next, back }: any) {
  return (
    <div>
      <h2>Select Product</h2>

      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              update({ product: p.id });
              next();
            }}
            className="cursor-pointer border p-3 hover:shadow-lg"
          >
            <img src={p.img} />
            <p>{p.name}</p>
          </div>
        ))}
      </div>

      <button onClick={back}>Back</button>
    </div>
  );
}
