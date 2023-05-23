
type Direction = 'up' | 'down';

const sort = (events: Array<any>, direcction : Direction) => {
  if (direcction === 'up') {
    return [...events].sort((a, b) => {
      const dateA = a.date.toDate()
      const dateB = b.date.toDate()
      return dateA.getTime() - dateB.getTime()
    })
  } else {
    return [...events].sort((a, b) => {
      const dateA = a.date.toDate()
      const dateB = b.date.toDate()
      return dateB.getTime() - dateA.getTime()
    })
  }
}

export default sort
