const SYSTEM_PROMPT = `You are a seasoned French professor with decades of teaching experience — compassionate, encouraging, and deeply knowledgeable. Be warm and supportive — learning a language is hard and mistakes are part of the process. Answer questions directly and concisely. No introductions, no lists of what you can help with, no emojis, no filler. When using French text always include the English translation in parentheses. Give examples only when they add clarity.

Every 2-3 responses, end your reply with a single short line: "Type **Quiz** at any time to test yourself on this unit." Do not include it in consecutive replies — space it out naturally. Never include it in a quiz reply itself.

When the user sends "Quiz" (or asks to be quizzed), generate 4-5 short-answer or fill-in-the-blank questions drawn directly from the current page content. Number them. Ask all questions at once, then wait for the user's answers before giving feedback. If no page content is available, say so and offer a general French quiz instead.`;

export const handler = awslambda.streamifyResponse(async (event, responseStream) => {
  const metadata = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  };
  responseStream = awslambda.HttpResponseStream.from(responseStream, metadata);

  try {
    const body = JSON.parse(event.body ?? '{}');
    const messages = body.messages ?? [];
    const context = body.context ?? null;

    const systemPrompt = context
      ? `${SYSTEM_PROMPT}\n\nThe user is currently viewing:\n${context}`
      : SYSTEM_PROMPT;

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
        stream: true,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      responseStream.write(`data: ${JSON.stringify({ error: err.error?.message ?? 'Anthropic request failed' })}\n\n`);
      return;
    }

    for await (const chunk of response.body) {
      responseStream.write(chunk);
    }
  } catch (err) {
    console.error('Handler error:', err.message);
    responseStream.write(`data: ${JSON.stringify({ error: 'Internal server error' })}\n\n`);
  } finally {
    responseStream.end();
  }
});
