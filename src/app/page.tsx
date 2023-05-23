import EventCard from '@/components/EventCard'
import { Event } from '@/lib/interfaces'
import '../sass/HomePage.scss'
import { FirestoreService } from '@/lib/firebase/firestore'
import sort from '@/lib/utils/sort'

// async function getData () {
//   const res = await fetch('http://localhost:3000/api/hello', { next: { revalidate: 1 } })
//   if (!res.ok) throw new Error('Failed to fetch data')
//   return await res.json()
// }

const firestoreService = new FirestoreService()

export default async function Home () {
  let events = await firestoreService.getCollectionData(firestoreService.eventsRef) as Event[]
  events = sort(events, 'up')
  return (
    <div className='home-page'>
      {events.map((event, index) => (
        <EventCard
        key={index}
        name={event.name}
        duration={event.duration}
        date={event.date}
        price={event.price}
        bar={event.bar}
        description={event.description}
        eventType={event.eventType}
        />
      ))}
    </div>
  )
}
