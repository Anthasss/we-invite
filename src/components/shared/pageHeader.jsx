export default function PageHeader({ title }) {
  return (
    <div className="w-full py-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="divider divider-primary m-0 p-0"></div>
    </div>
  )
}