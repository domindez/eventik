import { DocumentReference, Timestamp, getDoc } from 'firebase/firestore'
import '../sass/EventCard.scss'
import Image from 'next/image'

interface Props {
	name: string
  duration: string
  date: Timestamp
  price: number
  bar: DocumentReference
	description: string
	eventType: string
}

const EventCard = async ({ name, duration, date, price, bar, description, eventType }: Props) => {
  const barData = (await getDoc(bar)).data()
  if (!barData) return

  // eslint-disable-next-line @typescript-eslint/no-var-requires

  return (
		<div className='event-card'>
			<Image src={`/img/events/${eventType}.png`} width={360} height={180} alt='event-image'/>
			<div className='event-card__info'>
				<h3>{name}</h3>
				<p>{barData.name}</p>
				<p>{date.toDate().toLocaleString()}</p>
				<p>{duration}</p>
				<p>{price > 0 ? price + '€' : 'GRATIS'}</p>
				</div>
		</div>
  )
}
// esta linea está porque TS se queja de los compoenente asincronos
// eslint-disable-next-line no-undef
export default EventCard as unknown as (props: Props) => JSX.Element
