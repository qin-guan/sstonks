import { addDoc, collection, doc, limit, orderBy, query, setDoc } from 'firebase/firestore'

export const useHouses = createGlobalState(() => {
  const app = useNuxtApp()

  const housesRaw = useFirestore(collection(app.$firebase.db, 'houses'), [])
  const houses = computed(() => {
    return housesRaw.value?.map(doc => ({
      title: `${doc.id[0].toUpperCase()}${doc.id.slice(1)}`,
      id: doc.id,
      points: doc.points,
    }))
  })

  return houses
})

export function useHouse(id: string) {
  const app = useNuxtApp()

  const user = useAuth(app.$firebase.auth)
  const house = useFirestore(doc(app.$firebase.db, 'houses', id), {})
  const txnsQuery = query(collection(app.$firebase.db, 'houses', id, 'transactions'), limit(10), orderBy('timestamp', 'desc'))
  const txnsRaw = useFirestore(txnsQuery, [])

  const txns = computed(() => {
    return txnsRaw.value?.map((value) => {
      const timestamp = new Date(0)
      timestamp.setUTCSeconds(value.timestamp.seconds)
      return {
        delta: value.delta,
        id: value.id,
        timestamp: timestamp.toLocaleDateString(),
        user: value.user, // Email of the user
      }
    })
  })

  async function setPoints(points: number) {
    const delta = points - house.value?.points
    await Promise.all([addDoc(collection(app.$firebase.db, 'houses', id, 'transactions'), {
      delta,
      timestamp: new Date(),
      user: user.user.value?.email,
    }), setDoc(doc(app.$firebase.db, 'houses', id), { points })])
  }

  return {
    house,
    txns,
    setPoints,
  }
}
