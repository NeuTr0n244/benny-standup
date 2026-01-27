import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Gerar piada com Claude
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: 'Generate one joke.'
      }],
      system: "You are Benny, a savage stand-up comedian penguin. Generate ONE short joke (max 2 sentences). Style: Dark humor, edgy, adult comedy, roasts, slightly offensive but hilarious. Topics: life, relationships, internet, crypto, anything. Be creative and unpredictable. Output ONLY the joke, nothing else."
    });

    const jokeText = message.content[0].text;

    // 2. Converter para áudio com ElevenLabs
    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/fIGaHjfrR8KmMy0vGEVJ`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: jokeText,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      }
    );

    if (!elevenLabsResponse.ok) {
      throw new Error(`ElevenLabs API error: ${elevenLabsResponse.status}`);
    }

    // Converter áudio para base64
    const audioBuffer = await elevenLabsResponse.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    return res.status(200).json({
      success: true,
      joke: jokeText,
      audio: audioBase64,
      audioFormat: 'audio/mpeg'
    });

  } catch (error) {
    console.error('Error generating joke:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate joke',
      message: error.message
    });
  }
}
