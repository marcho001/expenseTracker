module.exports = date => {
  const YYYY = timeNow.getFullYear()
  const MM = (timeNow.getMonth() + 1).toString()
  const DD = (timeNow.getDate()).toString()
  const newDate = `${YYYY}-${MM.padStart(2, '0')}-${DD.padStart(2, '0')}`
  return newDate
}