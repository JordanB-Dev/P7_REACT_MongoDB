const UserModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select(['-password', '-email'])
  res.status(200).json(users)
}

module.exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log('ID unknown : ' + err)
  }).select(['-password', '-email'])
}

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    if (req.params.id !== req.user._id) {
      return res.status(403).json('unauthorized request')
    }
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .select(['-password', '-email'])
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    if (req.params.id !== req.user._id) {
      return res.status(403).json('unauthorized request')
    }
    await UserModel.remove({ _id: req.params.id }).exec()
    res.status(200).json({ message: 'Successfully deleted. ' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}
