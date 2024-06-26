import Image from "next/image"
import Link from "next/link"

export default function Privacypolicy() {


  return (
    <div className="w-full h-full bg-bluishBlackColor">
      <div className="w-full h-full px-fixed">
        <section className="flex flex-col gap-8 max-w-xl mx-auto py-16">
          <Link href={"/#footer"} className="w-fit hover:scale-110">
            <Image
              src="/icons/leftArrow.png"
              width={30}
              height={30}
              className="text-black"
              alt="Go back to homepage arrow icon"
            />
          </Link>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <div>
            At Task Ease, safeguarding your privacy is our priority. When you engage with our web application and visit our website at https://www.taskease.click, we collect various types of information to optimize your experience and improve our services. This could encompass a range of data, including but not limited to your name, email address, payment details for subscription processing, and any other information voluntarily provided during your interaction with our platform.
            <br />
            <br />

            Rest assured, we handle your information with utmost care and respect for your privacy. We do not disclose your personal data to third parties without your explicit consent, except when necessary for the functioning of our application or to fulfill legal requirements.
            <br />
            <br />

            Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
            <br />
            <br />

            You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
            <br />
            <br />

            To maintain transparency and keep you informed, any modifications to our privacy policy will be promptly communicated through our website and via email. Should you have any inquiries or concerns regarding the handling of your information, please do not hesitate to reach out to us.
            <br />
            <br />

            Thank you for choosing Task Ease. We value your trust and are dedicated to preserving the confidentiality and security of your data.
            <br />
            <br />

            This policy is effective as of 09 May 2024.
            <div className="text-sm">legal@taskease.click</div>
          </div>
        </section>
      </div>

    </div>
  )
}