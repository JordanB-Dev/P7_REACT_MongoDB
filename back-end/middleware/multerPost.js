const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/bmp': 'bmp',
  'image/gif': 'gif',
  'image/x-icon': 'ico',
  'image/svg+xml': 'svg',
  'image/tiff': 'tif',
  'image/tif': 'tif',
  'image/webp': 'webp',
}
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../../front-end/public/uploads/posts/`)
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]

    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/bmp' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/ico' ||
      file.mimetype === 'image/svg' ||
      file.mimetype === 'image/tiff' ||
      file.mimetype === 'image/tif' ||
      file.mimetype === 'image/webp'
    ) {
      callback(
        null,
        name + '_' + req.user._id + '_' + Date.now() + '.' + extension
      )
    } else {
      console.log('fichier non accepté')
      callback(
        null,
        'isole/' + req.user._id + '_' + name + Date.now() + '.' + extension
      )
    }
  },
})
module.exports = multer({ storage }).single('file')
