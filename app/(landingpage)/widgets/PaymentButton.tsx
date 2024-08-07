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

function PaymentButton({ size, header = false, hidden = false }: { size: string, header?: boolean, hidden?: boolean }) {
  return (
    <Link
      className={`
        ${hidden ? 'hidden' : ''}
        flex
        flex-row
        ${size}
        gap-2
        px-4
        ${header ? 'py-1' : 'py-2'}
        justify-center
        text-center
        items-center
        font-bold
        bg-LPPrimaryColor
        dark:bg-primaryColor
        hover:bg-LPPrimaryColorHover
        text-black
        filter
        rounded-lg
        hover:drop-shadow-md
        border-2
        border-primaryDarkColor
        hover:scale-105
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
        width={22}
        height={22}
        className=""
      />
      Anfangen
    </Link>
  )
}

export default PaymentButton