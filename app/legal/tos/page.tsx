import Image from "next/image"
import Link from "next/link"

export default function ToS() {
  return (
    <div className="w-full h-full bg-bluishBlackColor">
      <section className="flex flex-col gap-8 mx-[30%] py-16">
        <Link href={"/"} className="w-fit">
          <Image
            src="/icons/whiteBackArrow.png"
            width={30}
            height={30}
            className="text-black"
            alt="Go back to homepage arrow icon"
          />
        </Link>
        <h1 className="text-3xl text-grayColor font-bold">Terms of Service</h1>
        <div className="text-grayColor">
          By accessing or using the Service, you agree to be bound by these Terms.
          <br />
          <br />
          <h3 className="text-xl">1. Accounts</h3>

          When creating an account with Task Ease, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          <br />

          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
          <br />
          <br />

          <h3 className="text-xl">2. Content</h3>

          The Task Ease Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
          <br />

          By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant Task Ease the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person or entity. Task Ease reserves the right to terminate the account of anyone found to be infringing on a copyright.
          <br />

          You retain any and all of your rights to any Content you submit, post, or display on or through the Service, and you are responsible for protecting those rights. Task Ease takes no responsibility and assumes no liability for Content you or any third party posts on or through the Service. However, by posting Content using the Service, you grant Task Ease the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You agree that this license includes the right for Task Ease to make your Content available to other users of the Service, who may also use your Content subject to these Terms.
          <br />
          <br />

          <h3 className="text-xl">3. Subscription Plans</h3>

          Task Ease offers subscription plans on the Service. By subscribing to a plan, you agree to pay the applicable fees and abide by the terms of the subscription.
          <br />
          <br />

          <h3 className="text-xl">4. Property</h3>

          The Task Ease Service and its original content, features, and functionality are and will remain the exclusive property of Task Ease and its licensors. The Service is protected by copyright, trademark, and other laws of both the [country] and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Task Ease.

          <br />
          <br />
          <h3 className="text-xl">5. Feedback and Suggestions</h3>

          Task Ease welcomes feedback and suggestions from users. By providing Task Ease with feedback or suggestions, you grant Task Ease the right to use such feedback or suggestions without any compensation or credits given to you.
          <br />

          Promotions, Contests, Sweepstakes
          <br />

          From time to time, Task Ease may offer promotions, contests, or sweepstakes. Participation in these events is subject to additional terms and conditions, which will be made available at the time of the event.
          <br />
          <br />

          <h3 className="text-xl">6. Changes to Terms</h3>

          Task Ease reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, Task Ease will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at Task Ease&apos;s sole discretion.
          <br />

          By continuing to access or use the Task Ease Service after those revisions become effective, you agree to be bound by the revised terms.
          <br />
          <br />

          <h3 className="text-xl">7. Contact Us</h3>

          If you have any questions about these Terms, please contact Task Ease at contact@taskease.click
          <br />
          <br />

          Last updated: 09 May 2024.
        </div>
      </section>
    </div>
  )
}