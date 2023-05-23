import { collection, getDocs, query, where, deleteDoc, doc, DocumentData, QuerySnapshot, CollectionReference } from 'firebase/firestore'
import { Condition } from '../interfaces'
import { db } from '.'

export class FirestoreService {
  barsRef: CollectionReference<DocumentData>
  eventsRef: CollectionReference<DocumentData>

  constructor () {
    this.barsRef = collection(db, 'bars')
    this.eventsRef = collection(db, 'events')
  }

  async getCollectionData (collectionRef:CollectionReference) {
    try {
      const snap = await getDocs(collectionRef)
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.log(error)
    }
  }

  async deleteOneByConditions (collectionRef: CollectionReference<DocumentData>, conditions: Condition[]) {
    let q = query(collectionRef)

    for (const condition of conditions) {
      q = query(q, where(condition.field, condition.operator, condition.value))
    }

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const document = querySnapshot.docs[0]
      await deleteDoc(doc(collectionRef, document.id))
    }
  }

  async deleteAllByConditions (
    collectionRef: CollectionReference<DocumentData>,
    conditions: Condition[]) {
    let q = query(collectionRef)
    for (const condition of conditions) {
      q = query(q, where(condition.field, condition.operator, condition.value))
    }

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)

    const deletionPromises = querySnapshot.docs.map(document => deleteDoc(doc(collectionRef, document.id)))
    await Promise.all(deletionPromises)
  }
}
