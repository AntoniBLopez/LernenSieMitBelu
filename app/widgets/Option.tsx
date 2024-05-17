
function Option({ name }: { name: string }) {
  return (
    <div className="
      border-2
      border-gray-200
      rounded-lg p-2
      hover:bg-selectedColor
      hover:cursor-pointer
      hover:font-medium
      hover:border-slate-300
    ">
      {name}
    </div>
  )
}

export default Option