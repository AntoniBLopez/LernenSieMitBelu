import Image from "next/image";
import Footer from "@/app/ui/Footer";

export default function Home() {

  return (
    <div className="flex flex-col gap-10 mx-32">
      <header>
        <h1>TaskEase Title</h1>
      </header>

      <main>
        <div>main</div>
      </main>

      <Footer />
    </div>
  )
}
