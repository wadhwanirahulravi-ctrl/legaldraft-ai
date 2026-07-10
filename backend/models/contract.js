const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  rawText: { type: String, required: true },
  textLength: { type: Number },
  status: {
    type: String,
    enum: ['uploaded', 'analysing', 'analysed', 'failed'],
    default: 'uploaded'
  },
  uploadedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Contract', ContractSchema)