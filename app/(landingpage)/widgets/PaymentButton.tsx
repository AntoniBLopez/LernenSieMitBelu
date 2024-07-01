import Link from 'next/link'
import { CalendarIcon } from "@heroicons/react/24/outline"

export const plan = [
  {
    name: 'Basic',
    link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_5kAg1Q9SKft64808wx' : '',
    price: 29,
    priceId: process.env.NODE_ENV === 'development' ? 'price_1PIrTxP5cKLXtNbFuCrY71RM' : '',
    DURATION: 'lifetime',
  },
  {
    name: 'Pro',
    price: 0,
    features: [
      'Basic features',
      'Basic features',
      'More features',
    ],
  },
]

function PaymentButton({ size }: { size: string }) {
  return (
    <Link
      className={`
        flex
        flex-row
        ${size}
        gap-2
        px-4
        py-2
        justify-center
        text-center
        items-center
        font-bold
        bg-LPPrimaryColor
        hover:bg-LPPrimaryColorHover
        filter
        rounded-lg
        drop-shadow-PaymentButton
        hover:drop-shadow-PaymentButtonHover
        `}
        // hover:drop-shadow-md
      href={
        plan[0].link +
        '?prefilled_email=' +
        // session?.user?.email // NextAuth.js
        'antonilopezdev@gmail.com' +
        '&prefilled_promo_code=' +
        'EARLYADOPTER'
      }
      target='_blank'
    >
      <CalendarIcon
        width={20}
        height={20}
        className=""
      />
      Subscribe
    </Link>
  )
}

export default PaymentButton