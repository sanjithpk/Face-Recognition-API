const Clarifai = require('clarifai');

const handleApiCall = () => (req, res) => {
    const app = new Clarifai.App({
        apiKey: '6123f19628954f1ca72a66871ca6b04e'
    });

    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (db) => (req,res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries)
  })
  .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}