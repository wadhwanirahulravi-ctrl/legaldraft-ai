const express = require('express')
const cors    = require('cors')
const dotenv  = require('dotenv')

dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB error:', err.message))

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'LegalDraft AI Server is running' })
})

const upload = require('./config/multer')
const { extractText } = require('./services/pdfService')

app.use('/api', require('./routes/contractRoutes'))

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