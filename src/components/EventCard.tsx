import { DocumentReference, Timestamp } from 'firebase/firestore'
import '../sass/EventCard.scss'

interface Props {
	name: string
  duration: string
  date: Timestamp
  price: number
  bar: DocumentReference
	description: string
}

const EventCard = ({ name, duration, date, price, bar, description }: Props) => {
  return (
		<div className='event-card'>
			<h3>{name}</h3>
			<p>{date.toDate().toLocaleString()}</p>
			<p>{duration}</p>
			<p>{price > 0 ? price + '€' : 'GRATIS'}</p>
		</div>
  )
}
export default EventCard
