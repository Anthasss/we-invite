/**
 * Simple controlled form field component.
 * Props:
 * - label: string
 * - value: string | number
 * - setvalue: function to update value
 * - type: 'text' | 'num' | 'date' | 'time' | 'file' (defaults to 'text')
 */
export default function FormField({ label, value, setvalue, type = "text" }) {
  const getInputType = () => {
    switch (type) {
      case "num": return "number";
      case "date": return "date";
      case "time": return "time";
      case "file": return "file";
      default: return "text";
    }
  };
  
  const inputType = getInputType();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-4 px-4">
      <div className="w-full">
        {/* label spans full width on mobile, half on desktop */}
        <span className="text-neutral w-full font-medium">{label}</span>
      </div>

      {/* input spans full width on mobile, half on desktop */}
      <div className="w-full">
        <input
          type={inputType}
          value={type === "file" ? undefined : value}
          onChange={(e) => {
            if (type === "num") {
              setvalue(e.target.valueAsNumber);
            } else if (type === "file") {
              setvalue(e.target.files);
            } else {
              setvalue(e.target.value);
            }
          }}
          className="input input-neutral w-full"
        />
      </div>
    </div>
  );
}
