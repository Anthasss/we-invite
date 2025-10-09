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
    <div className="w-full grid grid-cols-2 items-center gap-4 px-4">
      <div className="w-full">
        {/* label spans exactly half the width */}
        <span className="text-neutral w-full">{label}</span>
      </div>

      {/* input spans exactly half the width */}
      <div>
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
