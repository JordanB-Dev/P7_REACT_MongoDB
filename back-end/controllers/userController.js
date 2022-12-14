const UserModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')

/*****************************************************
 ** GETALLUSERS AFFICHE TOUT LES UTILISATEUR
 ******************************************************/
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select(['-password', '-email'])
  res.status(200).json(users)
}

/*****************************************************
 ** GETONEUSER AFFICHE UN UTILISATEUR
 ******************************************************/
module.exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log('ID unknown : ' + err)
  }).select(['-password', '-email'])
}

/*****************************************************
 ** UPDATEUSER MODIFIER SON PRENOM NOM....
 ******************************************************/
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    if (req.params.id !== req.user._id) {
      return res.status(403).json('unauthorized request')
    }
    const { firstname, lastname, email, bio } = req.body

    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          bio: bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** UPDATEPASSWORD MODIFIER SON MOT DE PASSE
 ******************************************************/
module.exports.updatePassword = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    if (req.params.id !== req.user._id) {
      return res.status(403).json('unauthorized request')
    }
    const hashedPwd = await bcrypt.hash(req.body.password, 10)

    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          password: hashedPwd,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** DISABLEDACCOUND DESACTIVER SON COMPTE
 ******************************************************/
module.exports.disabledAccound = async (req, res) => {
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
          isAccound: false,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** ACTIVEACCOUND ACTIVER SON COMPTE A NOUVEAU
 ******************************************************/
module.exports.activeAccound = async (req, res) => {
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
          isAccound: true,
        },
      }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}
