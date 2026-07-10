const OpenAI = require('openai')

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are a legal contract analyst
helping ordinary people in India understand contracts
written in legal English. Your users are tenants,
employees, small business owners and freelancers.
They are not lawyers and may have zero legal knowledge.

Analyse the provided contract and return ONLY a valid
JSON object. Do not write any text, explanation, or
markdown outside the JSON. Do not wrap the response in
json code fences.

The JSON must have exactly these fields:

{
  "summary": "2-3 sentence plain English overview of the
  contract. The final sentence must always be: This
  analysis is for informational purposes only. Always
  consult a qualified legal professional.",

  "clauses": [
    {
      "text": "exact clause text from the contract",
      "category": "Payment / Termination / Liability /
      Confidentiality / Intellectual Property /
      Dispute Resolution / or other suitable category",
      "riskLevel": "low",
      "explanation": "what this means in plain English,
      no legal jargon"
    }
  ],

  "redFlags": [
    {
      "clauseText": "exact risky clause text",
      "reason": "why this is dangerous in plain language",
      "severity": "warning"
    }
  ],

  "counterDraft": "For each high-risk clause write:
  ORIGINAL: [exact clause text]
  SAFER: [rewritten version that better protects the user]"
}

Rules:
- riskLevel must be exactly one of: low, medium, high
- severity must be exactly one of: warning, critical
- If a section has no items return an empty array []
- Never omit any field from the JSON object
- Explain everything in simple everyday English
- Never use legal jargon in explanations`

async function analyseContract(contractText) {
  // Truncate to avoid token limit (GPT-4o-mini handles ~16k)
  const text = contractText.substring(0, 12000)

  const response = await client.chat.completions.create({
    model:       'gpt-4o-mini',
    max_tokens:  2000,
    temperature: 0.3,
    messages: [
      {
        role:    'system',
        content: SYSTEM_PROMPT
      },
      {
        role:    'user',
        content: 'Analyse this contract:\n\n' + text
      }
    ]
  })

  const raw   = response.choices[0].message.content
  const clean = raw.replace(/```json|```/g, '').trim()

  let result
  try {
    result = JSON.parse(clean)
  } catch (parseErr) {
    throw new Error(
      'AI returned invalid JSON. Please try again.'
    )
  }

  return result
}

module.exports = { analyseContract }
