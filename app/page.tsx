import Header from "@/app/ui/Header";
import Main from "@/app/ui/Main";
import Footer from "@/app/ui/Footer";
import { bricolage } from "./ui/fonts";
// import { GoogleOAuthProvider } from '@react-oauth/google'


export default function Home() {
  // const clientId = process.env.GOOGLE_CLIENT_ID || ''

  return (
    // <GoogleOAuthProvider clientId={`${clientId}`}>
    <div className={`${bricolage.className} antialiased`}>
      <Header />
      <Main />
      <Footer />
    </div>
    // </GoogleOAuthProvider>
  )
}
