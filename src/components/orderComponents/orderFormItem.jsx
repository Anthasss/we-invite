export default function OrderFormItem({ label, children }) {
  return (
    <div>
      <div className="divider divider-neutral divider-start text-neutral text-xl">{label}</div>
      <div className="w-full h-full flex flex-col gap-4">
        {/* Form fields go here */}
        <div className="w-full flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
