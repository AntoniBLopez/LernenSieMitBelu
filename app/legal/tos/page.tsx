import Image from "next/image"
import Link from "next/link"

export default function ToS() {
  return (
    <div className="w-full h-full bg-bluishBlackColor">
      <div className="w-full h-full px-fixed">
        <section className="flex flex-col gap-8 max-w-xl mx-auto py-16">
          <Link href={"/"} className="w-fit">
            <Image
              src="/icons/whiteBackArrow.png"
              width={30}
              height={30}
              alt="Go back to homepage arrow icon"
            />
          </Link>
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <div>
            <h3 className="text-xl">1. Introduction</h3>
            By accessing or using the Service, you agree to be bound by these Terms and Conditions.
            <br />
            <br />
            <h3 className="text-xl">2. Accounts</h3>

            Note that you are responsible for safeguarding the password that you use to access our Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            <br />
            <br />

            <h3 className="text-xl">3. Content</h3>

            The TaskEase Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
            <br />

            By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant TaskEase the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person or entity. TaskEase reserves the right to terminate the account of anyone found to be infringing on a copyright.
            <br />

            You retain any and all of your rights to any Content you submit, post, or display on or through the Service, and you are responsible for protecting those rights. TaskEase takes no responsibility and assumes no liability for Content you or any third party posts on or through the Service. However, by posting Content using the Service, you grant TaskEase the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You agree that this license includes the right for TaskEase to make your Content available to other users of the Service, who may also use your Content subject to these Terms.
            <br />
            <br />

            <h3 className="text-xl">4. Subscription Plans</h3>

            TaskEase offers subscription plans on the Service. By subscribing to a plan, you agree to pay the applicable fees and abide by the terms of the subscription.
            <br />
            <br />

            <h3 className="text-xl">5. Property</h3>

            The TaskEase Service and its original content, features, and functionality are and will remain the exclusive property of TaskEase and its licensors. The Service is protected by copyright, trademark, and other laws of both the Spain country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of TaskEase.

            <br />
            <br />
            <h3 className="text-xl">6. Feedback and Suggestions</h3>

            TaskEase welcomes feedback and suggestions from users. By providing us with feedback or suggestions, you grant TaskEase the right to use such input without any compensation or credits given to you.
            <br />
            <br />

            <h3 className="text-xl">7. Changes to Terms</h3>

            TaskEase reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, TaskEase will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at TaskEase&apos;s sole discretion.
            <br />

            By continuing to access or use the TaskEase Service after those revisions become effective, you agree to be bound by the revised terms.
            <br />
            <br />


            If you have any questions about these Terms, please contact TaskEase at:
            <br />
            <div className="text-sm">legal@taskease.click</div>
            <br />

            Last updated: 09 May 2024.
          </div>
        </section>
      </div>
    </div>
  )
}