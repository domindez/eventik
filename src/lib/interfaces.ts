import { DocumentReference, GeoPoint, Timestamp } from 'firebase/firestore'

export interface Condition {
  field: string,
  operator: '<' | '<=' | '==' | '!=' | '>=' | '>',
  value: string | number | boolean
}

export interface Bar {
	id: string,
	name: string,
	location: GeoPoint,
	phone: string
}

export interface Event {
	id: string,
	name: string,
	bar: DocumentReference,
	description: string,
	duration : string,
	price: number,
	date: Timestamp,
	location: GeoPoint,
	acceptingReservations: boolean
}

export interface EventRequestBody {
  id: string,
  name: string,
  bar: string,
  description: string,
  duration : string,
  price: number,
  date: string,
  location: { latitude: number, longitude: number },
  acceptingReservations: boolean
}
