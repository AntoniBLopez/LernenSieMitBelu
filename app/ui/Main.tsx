
export default function Main() {
  return (
    <main className="h-fit w-full">
      <div className="px-fixed w-full h-fit bg-bluishBlackColor">
        <div className="flex flex-wrap h-screen py-10" id="pricing">
          <div className="w-[50%] h-full">
            <h1>Main 1 - Headline</h1>

          </div>
          <div className="w-[50%] h-full">
            <h1>Main 1 - Demo</h1>

          </div>
        </div>
      </div>

      <div className="px-fixed w-full h-fit bg-black2Color">
        <div className="h-screen py-10">

          <h1>Main 2</h1>
        </div>
      </div>

      <div className="px-fixed w-full h-fit bg-bluishBlackColor">
        <div className="h-screen py-10">

          <h1>Main 3</h1>
        </div>
      </div>
    </main>
  )
}