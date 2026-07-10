const mongoose = require('mongoose')

const ClauseSchema = new mongoose.Schema({
  text: String,
  category: String,
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  explanation: String
})

const RedFlagSchema = new mongoose.Schema({
  clauseText: String,
  reason: String,
  severity: {
    type: String,
    enum: ['warning', 'critical']
  }
})

const AnalysisSchema = new mongoose.Schema({
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true
  },
  clauses: [ClauseSchema],
  redFlags: [RedFlagSchema],
  counterDraft: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Analysis', AnalysisSchema)