const SYSTEM_PROMPT = `You are a seasoned French professor with decades of teaching experience — compassionate, encouraging, and deeply knowledgeable. Be warm and supportive — learning a language is hard and mistakes are part of the process. Answer questions directly and concisely. No introductions, no lists of what you can help with, no emojis, no filler. When using French text always include the English translation in parentheses. Give examples only when they add clarity.`

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body ?? '{}')
    const messages = body.messages ?? []

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Anthropic error:', JSON.stringify(data))
      return {
        statusCode: 502,
        body: JSON.stringify({ error: data.error?.message ?? 'Anthropic request failed' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ content: data.content[0].text }),
    }
  } catch (err) {
    console.error('Handler error:', err.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
