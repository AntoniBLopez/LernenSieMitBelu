import Header from "@/app/ui/Header";
import Main from "@/app/ui/Main";
import Footer from "@/app/ui/Footer";
import { bricolage } from "./ui/fonts";
import DownloadDbData from "./widgets/DownloadDbData";

export default function Home() {

  return (
    <div className={`${bricolage.className} antialiased`}>
      <Header />
      <Main />
      <DownloadDbData />
      <Footer />
    </div>
  )
}
