export default function PageHeader({ title, onSearch, onAction, actionLabel = "Add New", searchPlaceholder = "Search..." }) {
  const showControls = onSearch || onAction;

  return (
    <div className="w-full py-4 mt-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      {/* <div className="divider divider-primary m-0 p-0"></div> */}
      {showControls && (
        <div className="flex justify-between items-center gap-4 mt-4">
          {onSearch && (
            <div className="flex-1">
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="input input-bordered w-full max-w-md"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}
          {onAction && (
            <button className="btn btn-primary" onClick={onAction}>
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}