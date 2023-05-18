import { DocumentReference, Timestamp, getDoc } from 'firebase/firestore'
import '../sass/EventCard.scss'

interface Props {
	name: string
  duration: string
  date: Timestamp
  price: number
  bar: DocumentReference
	description: string
}

const EventCard = async ({ name, duration, date, price, bar, description }: Props) => {
  const barData = (await getDoc(bar)).data()
  if (!barData) return
  return (
		<div className='event-card'>
			<h3>{name}</h3>
			<p>{barData.name}</p>
			<p>{date.toDate().toLocaleString()}</p>
			<p>{duration}</p>
			<p>{price > 0 ? price + '€' : 'GRATIS'}</p>
		</div>
  )
}
// esta linea está porque TS se queja de los compoenente asincronos
// eslint-disable-next-line no-undef
export default EventCard as unknown as (props: Props) => JSX.Element
