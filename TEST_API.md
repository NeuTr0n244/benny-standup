# 🧪 Guia de Teste da API

## ⚠️ Problema Identificado e Corrigido

**Erro:** 405 (Method Not Allowed)

**Causas:**
1. ❌ API estava usando ES Modules (`import/export`) - não totalmente compatível com Vercel
2. ❌ vercel.json tinha configuração antiga com `builds` e `routes`
3. ❌ Faltava dependência `node-fetch`

**Correções Aplicadas:**
1. ✅ Convertido para CommonJS (`require`/`module.exports`)
2. ✅ Simplificado vercel.json
3. ✅ Adicionado `node-fetch` ao package.json

---

## 🚀 Teste Local com Vercel Dev

### 1. Instalar Dependências
```bash
cd C:\Users\NEUTRON\Documents\standup
npm install
```

### 2. Criar arquivo .env local (se ainda não existir)
```bash
# Crie o arquivo .env com:
ANTHROPIC_API_KEY=sua-chave-anthropic
ELEVENLABS_API_KEY=sk_c028a0413ebe12d84180e99e4dffef4e5e2ab67464fb0e33
```

### 3. Iniciar Servidor Local
```bash
vercel dev
```

Aguarde até ver:
```
Ready! Available at http://localhost:3000
```

### 4. Testar a API

#### Opção A - Usar test-api.html (RECOMENDADO)
1. Com `vercel dev` rodando
2. Abra no navegador: `test-api.html`
3. Clique em "Generate Joke"
4. Veja o resultado e ouça o áudio

#### Opção B - Usar curl
```bash
curl -X POST http://localhost:3000/api/generate-joke \
  -H "Content-Type: application/json" \
  -v
```

#### Opção C - Usar Postman/Insomnia
- Method: POST
- URL: http://localhost:3000/api/generate-joke
- Headers: Content-Type: application/json
- Body: {} (vazio)

---

## ✅ Resultado Esperado

### Response (Success - 200)
```json
{
  "success": true,
  "joke": "I tried to organize a hide and seek competition... but it was a total failure. Good players are hard to find.",
  "audio": "base64_encoded_audio_data...",
  "audioFormat": "audio/mpeg"
}
```

### Response (Error - 405)
```json
{
  "error": "Method not allowed"
}
```

### Response (Error - 500)
```json
{
  "success": false,
  "error": "Failed to generate joke",
  "message": "Error details..."
}
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@anthropic-ai/sdk'"
**Solução:**
```bash
npm install
```

### Erro: "ANTHROPIC_API_KEY is not defined"
**Solução:**
1. Verifique se o arquivo `.env` existe
2. Verifique se a chave está correta
3. Reinicie `vercel dev`

### Erro: "ElevenLabs API error: 401"
**Solução:**
- Chave do ElevenLabs está incorreta ou expirada
- Atualize no arquivo `.env`

### Porta 3000 já está em uso
**Solução:**
```bash
# Vercel usará porta alternativa automaticamente
# Ou especifique outra porta:
vercel dev --listen 3001
```

---

## 📝 Verificar se a Correção Funcionou

### 1. Teste Local (vercel dev)
```bash
cd C:\Users\NEUTRON\Documents\standup
vercel dev
# Abrir test-api.html no navegador
```

### 2. Deploy e Teste em Produção
```bash
# Commit das alterações
git add .
git commit -m "Fix API 405 error - convert to CommonJS"
git push origin main

# Deploy (se não estiver conectado ao GitHub)
vercel --prod

# Testar em produção
curl -X POST https://standup-iota.vercel.app/api/generate-joke \
  -H "Content-Type: application/json" \
  -v
```

---

## 📊 Status Codes

| Code | Significado | Causa |
|------|-------------|-------|
| 200 | ✅ Success | Piada gerada com sucesso |
| 405 | ❌ Method Not Allowed | Método HTTP incorreto (use POST) |
| 500 | ❌ Internal Server Error | Erro ao gerar piada ou áudio |

---

## 🎯 Próximos Passos

Após testar localmente:

1. **Commit e Push:**
```bash
git add .
git commit -m "Fix API 405 error - convert to CommonJS and simplify config"
git push origin main
```

2. **Deploy em Produção:**
```bash
vercel --prod
```

3. **Testar no Site:**
- Abra: https://standup-iota.vercel.app
- Console (F12): `startBenny()`
- Veja as piadas sendo geradas!

---

## ✨ Diferenças entre ES Modules e CommonJS

### ES Modules (NÃO funcionou bem)
```javascript
import Anthropic from '@anthropic-ai/sdk';
export default async function handler(req, res) { ... }
```

### CommonJS (FUNCIONA)
```javascript
const Anthropic = require('@anthropic-ai/sdk');
module.exports = async function handler(req, res) { ... };
```

**Por quê?** Vercel serverless functions têm melhor compatibilidade com CommonJS.
