import Header from "@/app/ui/Header";
import Main from "@/app/ui/Main";
import Footer from "@/app/ui/Footer";
import { GoogleOAuthProvider } from '@react-oauth/google'


export default function Home() {
  const clientId = process.env.CLIENT_ID_DEV_ENV || ''

  console.log(clientId)

  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <Header />
      <Main />
      <Footer />
    </GoogleOAuthProvider>
  )
}
