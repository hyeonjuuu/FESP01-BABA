const convertDate = (dateString: string) => {
  const dateSplit = dateString.split('T')[0].split('-')
  const timeSplit = dateString.split('T')[1].split(':')
  const year = dateSplit[0]
  const month = Number(dateSplit[1]).toString()
  const day = Number(dateSplit[2]).toString()
  const hour = Number(timeSplit[0]).toString()
  const minute = Number(timeSplit[1]).toString()

  return `${year}/${month}/${day} ${hour}:${minute}`
}

export default convertDate
