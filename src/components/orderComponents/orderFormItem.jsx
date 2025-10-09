export default function OrderFormItem({ label, children }) {
  return (
    <div>
      <div className="divider divider-neutral divider-start text-neutral text-xl">{label}</div>
      {children}
    </div>
  )
}