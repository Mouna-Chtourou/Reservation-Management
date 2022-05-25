const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../client/public/uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, uuidv4() + '_' + Date.now() + file.originalname)
    //callback(null, uuidv4()+'_'+Date.now()+path.extname(file.originalname));
  },
})

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    callback(null, true)
  } else {
    callback({ message: 'Format de fichier non pris en charge' }, false)
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
})

module.exports = upload
