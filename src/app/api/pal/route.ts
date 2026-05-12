import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are PAL (Palette AI Library), the expert materials consultant for an Indian architecture firm called Palette by Stithi. You specialise in materials used in South Indian architecture — particularly Chettinad style — including flooring, walls, ceiling, doors, lighting, furniture, fabric, sanitary, exterior materials, and landscaping.

When a user asks about materials for a specific use case, always respond with structured JSON in this exact format:
{
  "scenario": "brief title of the scenario",
  "options": [
    {
      "name": "Material Name",
      "specs": "key specs in one line",
      "pros": "key advantages",
      "cons": "key disadvantages",
      "price": "Rs X/sq ft or Rs X/unit",
      "rating": 4,
      "best": true,
      "reason": "one sentence why this is the best choice"
    }
  ]
}

Rules:
- Provide 3-5 options
- Mark exactly one option as best:true
- Use Indian prices in Rupees (₹)
- Focus on materials available and appropriate for Tamil Nadu / South India
- Prioritise traditional / heritage materials where appropriate (Athangudi tiles, lime plaster, teak, brass)
- Only respond with valid JSON, no markdown, no preamble

If the user asks something that isn't a material scenario (greetings, general questions), respond with:
{
  "text": "your conversational response here",
  "isText": true
}`

export async function POST(request: NextRequest) {
  try {
    const { message, imageBase64, imageType } = await request.json()

    if (!message && !imageBase64) {
      return NextResponse.json({ error: 'Message or image required' }, { status: 400 })
    }

    const content: Anthropic.MessageParam['content'] = []

    if (imageBase64 && imageType) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: imageType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
          data: imageBase64,
        },
      })
      content.push({
        type: 'text',
        text: message || 'Identify this material and provide detailed information about it for use in Indian architecture. Respond in JSON format as specified.',
      })
    } else {
      content.push({ type: 'text', text: message })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
    })

    const raw = response.content[0].type === 'text' ? response.content[0].text : ''

    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
      return NextResponse.json({ data: parsed })
    } catch {
      return NextResponse.json({ data: { text: raw, isText: true } })
    }
  } catch (error) {
    console.error('[POST /api/pal]', error)
    return NextResponse.json({ error: 'PAL is unavailable right now' }, { status: 500 })
  }
}
