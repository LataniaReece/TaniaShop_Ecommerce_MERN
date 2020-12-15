import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(req, file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        req.fileValidationError = 'Only jpg, jpeg or png images can be uploaded!'
        return cb(null, false, req.fileValidationError)
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(req, file, cb)
    },
})

router.post('/', upload.single('image'), async (req, res) => {

    if (req.fileValidationError) {
        return res.status(404).json({ message: req.fileValidationError })
    } else {
        const formattedPath = `/${req.file.path}`.replace(/\\/g, "/")
        res.send(formattedPath)
    }
})

export default router
