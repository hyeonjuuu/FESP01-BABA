const convertDate = (dateString: string) => {
  const dateSplit = dateString.split('T')[0].split('-')
  const year = dateSplit[0]
  const month = Number(dateSplit[1]).toString()
  const day = Number(dateSplit[2]).toString()

  return `${year}/${month}/${day} `
}

export default convertDate
