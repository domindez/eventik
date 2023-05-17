import EventCard from '@/components/EventCard'
import { eventsRef, getCollectionData } from '@/logic/firebase'
import { Event } from '@/logic/interfaces'
import '../sass/HomePage.scss'

// async function getData () {
//   const res = await fetch('http://localhost:3000/api/hello', { next: { revalidate: 1 } })
//   if (!res.ok) throw new Error('Failed to fetch data')
//   return await res.json()
// }

export default async function Home () {
  const events = await getCollectionData(eventsRef) as Event[]
  return (
    <main className='home-page'>
      {events.map((event, index) => (
        <EventCard
        key={index}
        name={event.name}
        duration={event.duration}
        date={event.date}
        price={event.price}
        bar={event.bar}
        description={event.description}
        />
      ))}
    </main>
  )
}
