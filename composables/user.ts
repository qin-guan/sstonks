export function useCustomCurrentUser() {
  return useCurrentUser()
}

// export function useStudents(db: Firestore, page = 1) {
//   return useLazyAsyncData(`students-${page}`, async () => {
//     const d = await query(collection(db, 'users'), limit(50), ))
//     return d.docs.map(doc => ({
//       title: `${doc.id[0].toUpperCase()}${doc.id.slice(1)}`,
//       id: doc.id,
//       points: doc.data().points,
//     }))
//   }, { server: false })
// }
