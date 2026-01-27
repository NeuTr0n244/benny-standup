# 🔧 Configurar CORS no Cloudflare R2

## ❌ Problema

Mesmo hospedando no R2, o arquivo GLB está sendo bloqueado por CORS:

```
Access to fetch at 'https://pub-8d7b1a002dc7461881f41950b1c60105.r2.dev/mr_penguin.glb'
from origin 'https://standup-iota.vercel.app' has been blocked by CORS policy
```

**Causa:** O bucket R2 precisa de uma **política CORS** configurada explicitamente.

---

## ✅ Solução: Adicionar Política CORS

### Passo a Passo (5 minutos)

#### 1️⃣ Acessar o Bucket

1. Vá para: https://dash.cloudflare.com
2. Menu lateral → **R2**
3. Clique no bucket **benny-assets**

#### 2️⃣ Abrir Settings

Dentro do bucket, procure:
- Aba **"Settings"** (topo)
- Ou menu **"⋮"** → Settings
- Ou seção "Configurações"

#### 3️⃣ Localizar CORS Policy

Procure por:
- **CORS Policy**
- **CORS Configuration**
- **Cross-Origin Resource Sharing (CORS)**

💡 Se não encontrar:
- Role até o final da página
- Procure em "Advanced Settings"
- Use Ctrl+F e busque "CORS"

#### 4️⃣ Adicionar Política

Clique em **"Edit"** ou **"Configure"** e cole:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

**IMPORTANTE:**
- ✅ Cole o JSON COMPLETO (incluindo os colchetes `[]`)
- ✅ NÃO modifique nada
- ✅ Se já existe alguma config, SUBSTITUA completamente

#### 5️⃣ Salvar

Clique em **"Save"** ou **"Apply"**

Você deve ver:
- ✅ "CORS policy updated successfully"
- ✅ "Configuration saved"

⏱️ **Aguarde 30-60 segundos** para propagar na CDN

#### 6️⃣ Testar

1. Abra: https://standup-iota.vercel.app
2. Console (F12)
3. Recarregue (F5)
4. Veja se o modelo 3D carrega

✅ **Se funcionou:**
- Modelo 3D aparece
- Sem erros de CORS no console

❌ **Se ainda dá erro:**
- Aguarde mais 1-2 minutos
- Limpe cache (Ctrl+Shift+Delete)
- Tente aba anônima (Ctrl+Shift+N)
- Me avise!

---

## 📋 Política CORS Explicada

```json
{
  "AllowedOrigins": ["*"],        // Permite qualquer domínio acessar
  "AllowedMethods": ["GET", "HEAD"], // Permite ler o arquivo
  "AllowedHeaders": ["*"],        // Permite todos os headers
  "MaxAgeSeconds": 3600           // Cache de 1 hora
}
```

**Por que `"*"` (qualquer origem)?**
- O arquivo é público (modelo 3D)
- Não tem dados sensíveis
- Queremos que funcione em qualquer ambiente (dev, prod)

**Alternativa mais restrita (opcional):**
```json
{
  "AllowedOrigins": [
    "https://standup-iota.vercel.app",
    "http://localhost:3000"
  ],
  "AllowedMethods": ["GET", "HEAD"],
  "AllowedHeaders": ["*"],
  "MaxAgeSeconds": 3600
}
```

---

## 🐛 Troubleshooting

### Não encontro a seção CORS

**Possíveis localizações:**
1. Settings → CORS Policy
2. Settings → Advanced → CORS
3. Bucket → Configuration → CORS
4. Bucket → Policies → CORS

**Se realmente não tem:**
- Pode ser que sua conta precise ativar billing primeiro
- Ou a UI mudou (Cloudflare atualiza frequente)
- Me avise para investigar alternativas

### JSON dá erro de sintaxe

Copie EXATAMENTE desta forma:
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

**Erros comuns:**
- ❌ Faltou o colchete inicial `[`
- ❌ Faltou o colchete final `]`
- ❌ Aspas erradas (use `"` não `'`)
- ❌ Vírgula no último item

### Ainda dá erro de CORS após configurar

1. **Aguarde:** Propagação CDN leva 1-2 minutos
2. **Limpe cache:** Ctrl+Shift+Delete → Cached images
3. **Aba anônima:** Ctrl+Shift+N
4. **Verifique console:** F12 → Console → qual erro exato?
5. **Me avise:** Cole o erro aqui

---

## 📺 Recursos Adicionais

### Vídeos no YouTube:
- "Cloudflare R2 CORS configuration"
- "How to enable CORS on Cloudflare R2"

### Documentação Oficial:
- https://developers.cloudflare.com/r2/api/s3/api/#cors

---

## 🎯 Checklist

- [ ] Acessei o bucket benny-assets
- [ ] Encontrei Settings
- [ ] Localizei CORS Policy
- [ ] Colei a configuração JSON
- [ ] Salvei (apareceu mensagem de sucesso)
- [ ] Aguardei 1 minuto
- [ ] Testei o site
- [ ] Modelo 3D carrega sem erros!

---

## 💬 Próxima Mensagem

Depois de configurar, me informe:
- ✅ **"CORS configurado"**
- ✅ **"Funcionando"**
- ❌ **"Ainda dá erro"** (+ mensagem de erro)

---

## 🎉 Resultado Esperado

Após configurar o CORS:
- ✅ https://standup-iota.vercel.app carrega o GLB
- ✅ Sem erros de CORS no console
- ✅ Modelo 3D aparece e anima
- ✅ Sistema 100% funcional

**Esta é a última barreira técnica!** 🐧🎤
