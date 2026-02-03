interface Props {
  data: any;
  update: (v: any) => void;
  next: () => void;
}

export default function PhoneStep({ data, update, next }: Props) {
  const valid = /^[0-9]{10}$/.test(data.phone);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Enter Phone Number</h2>

      <input
        type="tel"
        value={data.phone}
        onChange={(e) => update({ phone: e.target.value })}
        className="border p-3 w-full"
        placeholder="10 digit number"
      />

      <button
        disabled={!valid}
        onClick={next}
        className="btn-primary w-full"
      >
        Next
      </button>
    </div>
  );
}
