const Clarifai = require("clarifai");
// my api key
const app = new Clarifai.App({
  apiKey: "cc88967295284ba2b456bdb27e155cae",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};
const handleImage = (req, res, db) => {
  const { id, count } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", count)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]["entries"]);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
