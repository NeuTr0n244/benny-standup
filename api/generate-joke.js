const Anthropic = require('@anthropic-ai/sdk');

module.exports = async function handler(req, res) {
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
    let jokeText;

    // 1. Verificar se tem texto customizado
    if (req.body && req.body.customText) {
      // Usar texto customizado (não chama Claude)
      jokeText = req.body.customText;
      console.log('📝 Usando texto customizado:', jokeText);
    } else {
      // Gerar piada com Claude
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: 'Generate one joke.'
        }],
        system: `You are Benny, a savage stand-up comedian penguin. Generate ONE short joke (max 2 sentences).

Style: Dark humor, edgy, adult comedy, roasts, slightly offensive but hilarious.
Topics: life, relationships, internet, crypto, anything. Be creative and unpredictable.

IMPORTANT: After the joke, rate it on a new line:
- "RATING: 1" for subtle/clever jokes (light humor)
- "RATING: 2" for very funny/hilarious jokes (big laughs)
- "RATING: 3" for medium/good jokes (normal funny)

Format:
[joke text]
RATING: [1, 2, or 3]`
      });

      const fullText = message.content[0].text;
      console.log('🤖 Resposta completa:', fullText);

      // Extrair piada e rating
      const lines = fullText.trim().split('\n');
      const ratingLine = lines.find(l => l.toUpperCase().includes('RATING:'));
      let rating = 3; // padrão: média

      if (ratingLine) {
        const match = ratingLine.match(/\d+/);
        if (match) {
          rating = parseInt(match[0]);
          // Garantir que rating está entre 1-3
          if (rating < 1) rating = 1;
          if (rating > 3) rating = 3;
        }
      }

      // Remover linha de RATING do texto da piada
      jokeText = lines.filter(l => !l.toUpperCase().includes('RATING:')).join(' ').trim();

      console.log('🤖 Piada:', jokeText);
      console.log('⭐ Rating:', rating);
    }

    // 2. Converter para áudio com ElevenLabs
    const fetch = (await import('node-fetch')).default;
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
          model_id: 'eleven_multilingual_v2',  // Modelo com mais controle de voz
          voice_settings: {
            stability: 0.3,              // MENOR = mais variação e menos robótico (era 0.5)
            similarity_boost: 0.5,       // MENOR = voz menos grave, mais fina (era 0.75)
            style: 0.7,                  // Mais expressivo e com emoção
            use_speaker_boost: true      // Melhora clareza e qualidade
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

    // Se não tem rating (texto customizado), usar padrão 3
    const jokeRating = (req.body && req.body.customText) ? 3 : rating;

    return res.status(200).json({
      success: true,
      joke: jokeText,
      audio: audioBase64,
      rating: jokeRating,  // 1 = leve, 2 = forte, 3 = média
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
};
