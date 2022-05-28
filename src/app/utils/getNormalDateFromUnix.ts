export const getNormalDateFromUnix = (unixDate: number) => {
  return new Date(unixDate).toLocaleString('default', { month: 'long', day: '2-digit' })
}
