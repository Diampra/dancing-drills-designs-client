export default function MaterialBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-2 bg-gold rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
