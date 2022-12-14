module.exports.signUpErrors = (err) => {
  let errors = { firstname: '', lastname: '', email: '', password: '' }

  if (err.message.includes('firstname')) errors.firstname = 'Prénom incorrect'

  if (err.message.includes('lastname')) errors.lastname == 'Nom incorrect'

  if (err.message.includes('email'))
    errors.email = 'Email incorrect ou elle est déjà enregistré'

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit faire 6 caractères minimum'

  return errors
}

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' }

  if (err.message.includes('email')) errors.email = 'Email inconnu'

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe ne correspond pas'

  return errors
}

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' }

  if (err.message.includes('invalid file'))
    errors.format = 'Format incompatabile'

  if (err.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 500ko'

  return errors
}
