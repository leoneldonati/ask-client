
function parseDate (date: Date): string {

  const isToday = new Date(date).getDay() == new Date(Date.now()).getDay()

  const hour = new Date(date).getHours()

  if (isToday) return `Today, ${hour}hs`


  return `${new Date(date).toLocaleDateString('es')}, ${new Date(date).getHours().toLocaleString('es')}hs`
}

export {
  parseDate
}