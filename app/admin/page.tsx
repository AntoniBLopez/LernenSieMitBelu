import SideNav from "./SideNav"

function Page() {
  return (
    <div className="px-fixed desktop:px-fixedDesktop w-full h-fit">
      <div className="flex flex-col h-screen py-10 text-center">
        <h1 className={`text-6xl text-primaryColor`}>Lernen Sie Mit Belu</h1>
        <SideNav />
      </div>
    </div>
  )
}

export default Page