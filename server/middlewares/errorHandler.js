module.exports = (err, req, res, next) => {
  if (err.name === "Login Validation") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Not Found") {
    res.status(404).json({ message: err.message });
  } else if (err.name === "Token Validation") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Unauthorized") {
    res.status(401).json({ message: err.message });
  } else {
    console.log(err);
  }
};
