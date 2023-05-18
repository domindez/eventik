import { db, eventsRef } from '@/logic/firebase'
import { EventRequestBody } from '@/logic/interfaces'
import { GeoPoint, Timestamp, addDoc, doc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET () {
  const res = { msg: 'www' }
  return NextResponse.json(res)
}

export async function POST (request:Request) {
  const body: EventRequestBody = await request.json()
  console.log(body)
  console.log('Creando documento........')
  addDoc(eventsRef, {
    acceptingReservations: true,
    name: body.name,
    date: Timestamp.fromDate(new Date(body.date)),
    duration: body.duration,
    description: body.description,
    price: body.price,
    bar: doc(db, body.bar),
    location: new GeoPoint(body.location.latitude, body.location.longitude)
  })
  return new Response('Ok')
}
