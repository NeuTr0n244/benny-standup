// Sistema de chat em tempo real (polling)
// Armazena últimas 100 mensagens em memória

let messages = [];
const MAX_MESSAGES = 100;

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

  // GET - Buscar mensagens
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      messages: messages
    });
  }

  // POST - Enviar mensagem
  if (req.method === 'POST') {
    try {
      const { nickname, message } = req.body;

      // Validação
      if (!nickname || !message) {
        return res.status(400).json({
          success: false,
          error: 'Nickname e mensagem são obrigatórios'
        });
      }

      if (nickname.length > 20) {
        return res.status(400).json({
          success: false,
          error: 'Nickname muito longo (max 20 caracteres)'
        });
      }

      if (message.length > 500) {
        return res.status(400).json({
          success: false,
          error: 'Mensagem muito longa (max 500 caracteres)'
        });
      }

      // Criar mensagem
      const newMessage = {
        id: Date.now() + Math.random(), // ID único
        nickname: nickname.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString()
      };

      // Adicionar à lista
      messages.push(newMessage);

      // Manter apenas as últimas 100 mensagens
      if (messages.length > MAX_MESSAGES) {
        messages = messages.slice(-MAX_MESSAGES);
      }

      return res.status(200).json({
        success: true,
        message: newMessage
      });

    } catch (error) {
      console.error('Error processing chat message:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao processar mensagem',
        message: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
