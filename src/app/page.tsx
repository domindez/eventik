import EventCard from '@/components/EventCard'
import { Event } from '@/lib/interfaces'
import '../sass/HomePage.scss'
import { eventsRef, getCollectionData } from '@/lib/firebase/firestore'

// async function getData () {
//   const res = await fetch('http://localhost:3000/api/hello', { next: { revalidate: 1 } })
//   if (!res.ok) throw new Error('Failed to fetch data')
//   return await res.json()
// }

export default async function Home () {
  console.log('#######################################################')
  let events = await getCollectionData(eventsRef) as Event[]
  // Ordena los eventos por la fecha.
  events = events.sort((a, b) => {
    const dateA = a.date.toDate()
    const dateB = b.date.toDate()
    return dateA.getTime() - dateB.getTime()
  })
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
