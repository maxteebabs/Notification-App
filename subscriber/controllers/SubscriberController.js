const display = (req, res) => {
  const {topic} = req.params;
  console.log(`Data received as subscriber ${req.body}`);
  res.status(200).send({
    topic,
    data: req.body
  });
}

module.exports = {
  display
}