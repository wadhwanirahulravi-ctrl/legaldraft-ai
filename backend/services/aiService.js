const OpenAI = require('openai')

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `Analyse the contract and return ONLY a valid JSON object. Do not use markdown blocks.

The JSON must strictly follow this exact structure and use these exact keys:
{
  "summary": "2-3 sentence plain English overview.",
  "clauses": [
    {
      "clauseName": "category name",
      "riskLevel": "low",
      "originalText": "exact clause text",
      "reasoning": "plain English explanation"
    }
  ],
  "redFlags": [
    {
      "clauseName": "category name",
      "riskLevel": "high",
      "originalText": "exact risky clause text",
      "reasoning": "why this is dangerous"
    }
  ],
  "counterDraft": "Provide plain text only. Do not use JSON formatting or braces. Format as: 'Original: [text] | Safer: [text]'"
}

Rules:
- You must strictly use the exact camelCase keys shown above.
- riskLevel must be strictly one of: low, medium, high.
- counterDraft must be a string, not an object or array.`

async function analyseContract(contractText) {
  const text = contractText.substring(0, 12000)

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 2000,
    temperature: 0.1,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: 'Analyse this contract:\n\n' + text
      }
    ]
  })

  const raw = response.choices[0].message.content
  const clean = raw.replace(/```json|```/g, '').trim()

  let result
  try {
    result = JSON.parse(clean)
  } catch (parseErr) {
    throw new Error('AI returned invalid JSON.')
  }

  return result
}

module.exports = { analyseContract }