/**
 * Simple controlled form field component.
 * Props:
 * - label: string
 * - value: string | number
 * - setvalue: function to update value
 * - type: 'text' | 'num' (defaults to 'text')
 */
export default function FormField({ label, value, setvalue, type = "text" }) {
  const inputType = type === "num" ? "number" : "text";

  return (
    <div className="w-full grid grid-cols-2 items-center gap-4">
      <div className="w-full">
        {/* label spans exactly half the width */}
        <span className="text-neutral w-full">{label}</span>
      </div>

      {/* input spans exactly half the width */}
      <div>
        <input
          type={inputType}
          value={value}
          onChange={(e) => setvalue(type === "num" ? e.target.valueAsNumber : e.target.value)}
          className="input input-neutral w-full"
        />
      </div>
    </div>
  );
}
