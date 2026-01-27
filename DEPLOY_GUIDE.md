# 🚀 Guia de Deploy - Benny Stand-Up Comedy

## ✅ Status Atual

- ✅ Git inicializado
- ✅ Commit inicial criado
- ✅ .env configurado (NÃO commitado)
- ✅ AUTO_START = false (sistema desativado por padrão)

---

## 📦 1. Criar Repositório no GitHub

### Opção A: Via GitHub CLI (gh)
```bash
cd C:\Users\NEUTRON\Documents\standup
gh repo create benny-standup --public --source=. --remote=origin --push
```

### Opção B: Via Interface Web
1. Acesse: https://github.com/new
2. Nome: `benny-standup`
3. Visibilidade: Public
4. **NÃO** inicialize com README/gitignore
5. Clique em "Create repository"
6. Execute os comandos:

```bash
cd C:\Users\NEUTRON\Documents\standup
git remote add origin https://github.com/SEU_USUARIO/benny-standup.git
git branch -M main
git push -u origin main
```

---

## 🌐 2. Deploy na Vercel

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Login na Vercel
```bash
vercel login
```

### Passo 3: Deploy Inicial
```bash
cd C:\Users\NEUTRON\Documents\standup
vercel
```

Responda:
- **Set up and deploy?** → Yes
- **Which scope?** → Sua conta
- **Link to existing project?** → No
- **What's your project's name?** → benny-standup
- **In which directory is your code located?** → ./
- **Want to override settings?** → No

### Passo 4: Configurar Variáveis de Ambiente

#### Via CLI:
```bash
# Anthropic API Key
vercel env add ANTHROPIC_API_KEY

# Quando perguntar o valor, cole:
sk-ant-api03-N0Z...9QAA

# Quando perguntar em qual environment, selecione:
# Production, Preview, Development (selecione todos com ESPAÇO)

# ElevenLabs API Key
vercel env add ELEVENLABS_API_KEY

# Quando perguntar o valor, cole:
sk_c028a0413ebe12d84180e99e4dffef4e5e2ab67464fb0e33

# Environments: Production, Preview, Development
```

#### Via Dashboard:
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto `benny-standup`
3. Vá em **Settings** → **Environment Variables**
4. Adicione:
   - `ANTHROPIC_API_KEY` = `sk-ant-api03-N0Z...9QAA`
   - `ELEVENLABS_API_KEY` = `sk_c028a0413ebe12d84180e99e4dffef4e5e2ab67464fb0e33`
5. Selecione: Production, Preview, Development

### Passo 5: Deploy para Produção
```bash
vercel --prod
```

---

## 🧪 3. Testar Localmente

### Instalar Dependências
```bash
cd C:\Users\NEUTRON\Documents\standup
npm install
```

### Rodar Servidor Local
```bash
vercel dev
```

Acesse: http://localhost:3000

### Testar UMA piada (no console do navegador)
```javascript
startBenny()  // Inicia o sistema
```

### Parar sistema
```javascript
stopBenny()   // Para o sistema
```

---

## 🎭 4. Ativar o Benny (quando estiver pronto)

Quando quiser ativar o sistema de piadas automaticamente:

### 1. Editar index.html
Mude a linha:
```javascript
const AUTO_START = false; // MANTER FALSE - só ativar quando lançar
```

Para:
```javascript
const AUTO_START = true; // ✅ ATIVADO - Benny começa automaticamente
```

### 2. Commit e Push
```bash
git add index.html
git commit -m "Ativar AUTO_START - Benny está live!"
git push origin main
```

### 3. Vercel faz Deploy Automático
O deploy acontece automaticamente após o push.

---

## 📊 Monitoramento

### Ver Logs de Produção
```bash
vercel logs https://benny-standup.vercel.app
```

### Ver Logs de API Function
```bash
vercel logs https://benny-standup.vercel.app/api/generate-joke
```

### Dashboard
- Vercel: https://vercel.com/dashboard
- GitHub: https://github.com/SEU_USUARIO/benny-standup

---

## 🐛 Debug

### Testar API Localmente
```bash
curl -X POST http://localhost:3000/api/generate-joke \
  -H "Content-Type: application/json"
```

### Ver Console do Navegador
Abra DevTools (F12) e veja:
- `🎭 Sistema de piadas ativado!`
- `🎤 BENNY DISSE: [piada aqui]`
- `✅ Piada finalizada`
- `⏰ Próxima piada em Xs`

### Verificar .env
```bash
cat .env
```

NUNCA commite o .env! Verifique:
```bash
git status
# .env deve aparecer como "untracked" ou não aparecer
```

---

## 🔧 Comandos Úteis

### Reinstalar Vercel Project
```bash
vercel link
```

### Remover do Vercel
```bash
vercel remove benny-standup
```

### Ver Deployments
```bash
vercel ls
```

### Rollback para Deploy Anterior
```bash
vercel rollback [deployment-url]
```

---

## 📝 Checklist Pré-Launch

- [ ] Testar localmente com `vercel dev`
- [ ] Testar `startBenny()` no console
- [ ] Verificar que piadas estão sendo geradas
- [ ] Verificar que áudio está tocando
- [ ] Verificar delay de 8-12 segundos
- [ ] Deploy na Vercel
- [ ] Testar no URL de produção
- [ ] Verificar logs de API
- [ ] Verificar custos de API
- [ ] Mudar AUTO_START para true
- [ ] Push final e deploy

---

## 💰 Custos Estimados

**Por piada:**
- Claude API: ~$0.003 (150 tokens)
- ElevenLabs: ~$0.001 (por caractere)
- Total: ~$0.004 por piada

**Por hora (AUTO_START=true):**
- 1 piada a cada 10s (média) = 6 piadas/min = 360 piadas/hora
- Custo: ~$1.44/hora
- Por dia: ~$34.56

**Recomendação:** Mantenha AUTO_START=false até o lançamento oficial!

---

## 🎉 Pronto!

Seu sistema está configurado. Para ativar:

1. **Teste localmente**: `vercel dev` → abra browser → `startBenny()`
2. **Deploy produção**: `vercel --prod`
3. **Quando quiser lançar**: Mude AUTO_START=true e faça push

**URL de Produção:** https://benny-standup.vercel.app
