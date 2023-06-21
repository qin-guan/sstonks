import type { Firestore } from 'firebase/firestore'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

export function useHouses(db: Firestore) {
  return useLazyAsyncData('houses', async () => {
    const d = await getDocs(collection(db, 'houses'))
    return d.docs.map(doc => ({
      title: `${doc.id[0].toUpperCase()}${doc.id.slice(1)}`,
      id: doc.id,
      points: doc.data().points,
    }))
  }, { server: false })
}

export function useHouse(db: Firestore, id: string) {
  return useLazyAsyncData(`house-${id}`, async () => {
    const [house, txns] = await Promise.all([
      getDoc(doc(db, 'houses', id)),
      getDocs(collection(db, 'houses', id, 'transactions')),
    ])

    const houseData = house.data()

    return {
      points: houseData?.points,
      transactions: txns.docs.map((doc) => {
        const txnData = doc.data()
        return {
          id: doc.id,
          data: {
            delta: txnData.delta,
            user: txnData.user.path.split('/').pop(),
          },
        }
      }),
    }
  }, { server: false })
}

export async function setHousePoints(db: Firestore, id: string, points: number) {
  return await setDoc(doc(db, 'houses', id), { points })
}
