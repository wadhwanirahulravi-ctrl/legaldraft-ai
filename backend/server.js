const express = require('express')
const cors    = require('cors')
const dotenv  = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'LegalDraft AI Server is running' })
})

const upload = require('./config/multer')

app.post('/test-upload',
  upload.single('contract'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file received' })
    }
    res.json({
      message: 'File uploaded successfully',
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    })
  }
)

app.use((err, req, res, next) => {
  if (err.message === 'Only PDF files are allowed.') {
    return res.status(400).json({ error: err.message })
  }
  res.status(500).json({ error: 'Something went wrong.' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})