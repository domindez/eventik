import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, CollectionReference, query, where, deleteDoc, doc, DocumentData, QuerySnapshot } from 'firebase/firestore'
import { Condition } from './interfaces'

const firebaseConfig = {
  apiKey: 'AIzaSyALoN2baYwLB2ioy0HqviUtRA0w3D-ttPg',
  authDomain: 'eventik-6c00b.firebaseapp.com',
  projectId: 'eventik-6c00b',
  storageBucket: 'eventik-6c00b.appspot.com',
  messagingSenderId: '664858688091',
  appId: '1:664858688091:web:4f47a5b750278304a39d7e',
  measurementId: 'G-6NX3F9YL2H'
}

// init firebase app
initializeApp(firebaseConfig)

// init services
export const db = getFirestore()

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
