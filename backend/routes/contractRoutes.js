const router = require('express').Router()
const upload = require('../config/multer')
const { extractText } = require('../services/pdfService')
const { analyseContract } = require('../services/aiService')
const Contract = require('../models/Contract')
const Analysis = require('../models/Analysis')

// POST /api/upload
router.post('/upload',
  upload.single('contract'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'No file uploaded'
        })
      }

      const rawText = await extractText(req.file.path)

      if (!rawText || rawText.trim().length < 50) {
        return res.status(400).json({
          error: 'This PDF appears to be a scanned image. Please upload a PDF with actual text — for example, one created from a Word document or typed directly in a PDF editor.'
        })
      }

      const contract = await Contract.create({
        fileName: req.file.originalname,
        filePath: req.file.path,
        rawText,
        textLength: rawText.length,
        status: 'uploaded'
      })

      res.json({
        success: true,
        contractId: contract._id,
        fileName: contract.fileName,
        textLength: contract.textLength
      })

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
)

// POST /api/analyse/:contractId
router.post('/analyse/:contractId', async (req, res) => {
  try {
    const contract = await Contract.findById(
      req.params.contractId
    )
    if (!contract) {
      return res.status(404).json({
        error: 'Contract not found'
      })
    }

    const result = await analyseContract(contract.rawText)

    console.log("AI Result:");
    console.log(JSON.stringify(result, null, 2));
    console.log("counterDraft:", result.counterDraft);
    console.log("Type:", typeof result.counterDraft);

    const analysis = await Analysis.create({
      contractId: contract._id,
      clauses: result.clauses || [],
      redFlags: result.redFlags || [],
      // The AI sometimes returns an Object for counterDraft, but the schema expects a String.
      // Stringifying it fixes the "Cast to string failed" error.
      counterDraft: typeof result.counterDraft === 'object' ? JSON.stringify(result.counterDraft) : (result.counterDraft || ''),
      summary: result.summary || ''
    })

    contract.status = 'analysed'
    await contract.save()

    res.json({
      success: true,
      analysisId: analysis._id
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/analysis/:contractId
router.get('/analysis/:contractId', async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      contractId: req.params.contractId
    })
    if (!analysis) {
      return res.status(404).json({
        error: 'Analysis not found'
      })
    }
    res.json(analysis)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router