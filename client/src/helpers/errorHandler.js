function errorHandler(res) {
  let msg = ''
  res.data.errors.forEach(errMsg => (
    msg += `${errMsg} <br />`
  ))
  return msg
}

export default errorHandler