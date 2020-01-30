module.exports = (err, req, res, next) => {
  if (err.name == 'ValidationError') {
    let errors = []
    const errs = err.errors
    for (const error in errs) {
      errors.push(errs[error].message)
    }
    res.status(400).json(errors)
  } else if (err.name == 'Auth error') {
    res.status(401).json('Wrong email or password')
  } else if (err.name == 'JsonWebTokenError') {
    res.status(401).json('Invalid Token')
  } else if (err.name == 'Unallowed Action') {
    res.status(401).json(err.message)
  } else if (err.name == 'Not Found') {
    res.status(404).json(err.message)
  } else {
    console.log(err)
    res.json(err)
  }
}
