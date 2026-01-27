// Endpoint para PARAR o show ao vivo
// Chame POST /api/stop-show para parar as piadas para todos os clientes

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
    // Usar Firebase REST API para setar o flag como false
    const fetch = (await import('node-fetch')).default;

    const firebaseUrl = 'https://standup-b42e6-default-rtdb.firebaseio.com/liveShow/isLaunched.json';

    const response = await fetch(firebaseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(false)
    });

    if (!response.ok) {
      throw new Error(`Firebase error: ${response.status}`);
    }

    console.log('⏸️ SHOW PARADO COM SUCESSO!');

    return res.status(200).json({
      success: true,
      message: 'Show parado! Todos os clientes pararam de tocar piadas.'
    });

  } catch (error) {
    console.error('Erro ao parar show:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to stop show',
      message: error.message
    });
  }
};
