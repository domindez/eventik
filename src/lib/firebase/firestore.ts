import { collection, getDocs, CollectionReference, query, where, deleteDoc, doc, DocumentData, QuerySnapshot } from 'firebase/firestore'
import { Condition } from '../interfaces'
import { db } from '.'

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
