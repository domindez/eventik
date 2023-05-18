import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, CollectionReference, query, where, deleteDoc, doc, DocumentData, QuerySnapshot } from 'firebase/firestore'
import { Condition } from './interfaces'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// init firebase app
initializeApp(firebaseConfig)

// init services
export const db = getFirestore()
export const auth = getAuth()

// collection reference
export const barsRef = collection(db, 'bars')
export const eventsRef = collection(db, 'events')

// functions
export const getCollectionData = async (collectionRef: CollectionReference) => {
  try {
    const snap = await getDocs(collectionRef)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.log(error)
  }
}

export async function deleteOneByConditions (collectionRef: CollectionReference<DocumentData>, conditions: Condition[]) {
  let q = query(collectionRef)

  for (const condition of conditions) {
    q = query(q, where(condition.field, condition.operator, condition.value))
  }

  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)

  if (!querySnapshot.empty) {
    const document = querySnapshot.docs[0]
    await deleteDoc(doc(collectionRef, document.id))
  }
}

export async function deleteAllByConditions (collectionRef: CollectionReference<DocumentData>, conditions: Condition[]) {
  let q = query(collectionRef)

  for (const condition of conditions) {
    q = query(q, where(condition.field, condition.operator, condition.value))
  }

  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)

  const deletionPromises = querySnapshot.docs.map(document => deleteDoc(doc(collectionRef, document.id)))
  await Promise.all(deletionPromises)
}
