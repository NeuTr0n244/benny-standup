# 🐧 Mr. Penguin Stand-Up Comedy - 3D Interactive Website

Um site interativo de stand-up comedy em 3D com um personagem pinguim comediante. Construído com Three.js e WebGL.

![Mr. Penguin](https://img.shields.io/badge/Mr.%20Penguin-Comedy%20Club-ff2d95?style=for-the-badge)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js)

## 🎭 Features

- **Modelo 3D Completo**: Personagem pinguim animado em cenário de stand-up comedy
- **Tela de Loading com Cortinas**: Animação cinematográfica de cortinas vermelhas abrindo
- **Navegação por Câmera**: 3 views diferentes (Home, About, Community)
- **Sistema de Piadas**: Loop infinito de piadas com legendas animadas
- **Efeitos de Som**: Risadas da plateia com visualizador de áudio
- **Painéis Interativos**: Glassmorphism com efeitos neon
- **Efeitos de Partículas**: Confetti burst e animações
- **Navegação Multi-plataforma**: Teclado, mouse e swipe touch
- **100% Responsivo**: Desktop e mobile

## 📋 Requisitos

- Navegador moderno com suporte a WebGL
- Arquivo `mr_penguin.glb` no mesmo diretório do `index.html`
- Servidor HTTP local (não funciona abrindo direto via `file://`)

## 🚀 Como Usar

### Instalação Rápida

1. **Coloque os arquivos no mesmo diretório:**
   ```
   standup/
   ├── index.html
   ├── mr_penguin.glb
   └── README.md
   ```

2. **Inicie um servidor HTTP local:**

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   **Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **PHP:**
   ```bash
   php -S localhost:8000
   ```

   **VS Code:**
   - Instale a extensão "Live Server"
   - Clique com botão direito em `index.html` > "Open with Live Server"

3. **Abra no navegador:**
   ```
   http://localhost:8000
   ```

## ⚙️ Configuração

Edite o objeto `CONFIG` no início do JavaScript dentro do `index.html`:

```javascript
const CONFIG = {
    modelPath: './mr_penguin.glb',
    contractAddress: 'SEU_CONTRACT_ADDRESS_AQUI',
    twitterUrl: 'https://x.com/SeuTwitter',
    buyUrl: 'https://pump.fun/seu-token',

    camera: {
        home: { x: 0, y: 1.5, z: 5 },
        about: { x: -6, y: 1.5, z: 3 },
        community: { x: 6, y: 1.5, z: 3 }
    },

    lookAt: { x: 0, y: 1, z: 0 },

    jokes: [
        "Sua piada aqui! 😄",
        "Outra piada engraçada! 🎤",
        // Adicione mais piadas...
    ],

    jokeDisplayTime: 5000,  // ms que cada piada fica visível
    jokePauseTime: 1500     // ms entre piadas
};
```

### Personalizações Comuns

**Trocar Contract Address:**
```javascript
contractAddress: '0x123456789...',
```

**Trocar Links Sociais:**
```javascript
twitterUrl: 'https://x.com/mrpenguintoken',
buyUrl: 'https://raydium.io/swap/?inputCurrency=...',
```

**Adicionar Mais Piadas:**
```javascript
jokes: [
    "Nova piada 1! 😂",
    "Nova piada 2! 🎭",
    "Nova piada 3! 🎪",
],
```

**Ajustar Posição da Câmera:**
```javascript
camera: {
    home: { x: 0, y: 2, z: 6 },     // Câmera mais alta e distante
    about: { x: -7, y: 1.5, z: 3 },  // Mais à esquerda
    community: { x: 7, y: 1.5, z: 3 } // Mais à direita
}
```

## 🎮 Controles

### Navegação

- **Botões na Tela**: Clique em `ABOUT`, `HOME` ou `COMMUNITY`
- **Teclado**:
  - `←` = About
  - `→` = Community
  - `Esc` ou `Espaço` = Home
  - `M` = Mute/Unmute
- **Touch (Mobile)**: Swipe esquerda/direita

### Features

- **Botão de Volume** (canto superior direito): Liga/desliga som das risadas
- **Copy Contract**: Clica uma vez para copiar o endereço
- **Painéis**: Aparecem automaticamente ao navegar para About/Community

## 🎨 Personalização do Visual

### Cores Neon

No CSS, procure por estas variáveis para trocar as cores:

```css
/* Neon Rosa */
border: 3px solid #ff2d95;

/* Neon Azul */
border: 3px solid #00f5ff;

/* Neon Amarelo */
border: 2px solid #ffea00;

/* Neon Verde */
background: linear-gradient(135deg, #39ff14, #2dd60f);
```

### Fontes

Trocando as Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@300;400;700&display=swap" rel="stylesheet">
```

```css
font-family: 'SuaFonte', sans-serif;
```

## 🔧 Troubleshooting

### Problema: Modelo 3D não carrega

**Soluções:**
- Verifique se `mr_penguin.glb` está no mesmo diretório
- Certifique-se de estar usando um servidor HTTP (não `file://`)
- Veja o console do navegador (F12) para erros
- Verifique se o caminho em `modelPath` está correto

### Problema: Cortinas não abrem

**Soluções:**
- Aguarde o modelo carregar completamente
- Verifique a barra de progresso
- Se travar em 100%, recarregue a página

### Problema: Sem som

**Soluções:**
- Clique em qualquer lugar da tela (navegadores bloqueiam áudio até interação)
- Verifique se não está mutado (botão de volume)
- Verifique o volume do sistema

### Problema: Câmera em posição errada

**Soluções:**
- Ajuste os valores em `CONFIG.camera`
- Use valores maiores em `z` para afastar a câmera
- Use valores maiores em `y` para elevar a câmera

### Problema: Performance lenta

**Soluções:**
- Feche outras abas do navegador
- Reduza a qualidade do modelo GLB
- Desative sombras no código (comentar `renderer.shadowMap.enabled`)

## 📱 Suporte Mobile

O site é totalmente responsivo:
- Layout adaptativo
- Navegação por swipe
- Botões otimizados para touch
- Performance otimizada

## 🌐 Deploy

### GitHub Pages

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Ative GitHub Pages nas configurações
4. Acesse: `https://seuusuario.github.io/seu-repo`

### Netlify

1. Arraste a pasta para [Netlify Drop](https://app.netlify.com/drop)
2. Ou conecte seu repositório GitHub
3. Deploy automático!

### Vercel

```bash
npm i -g vercel
cd standup
vercel
```

## 📄 Estrutura do Código

```
index.html
├── HTML Structure
│   ├── Canvas Container (Three.js)
│   ├── Curtains (Loading)
│   ├── UI Layer (Botões, Painéis)
│   └── Particles Container
├── CSS Styles
│   ├── Layout & Positioning
│   ├── Neon Effects
│   ├── Glassmorphism
│   ├── Animations
│   └── Responsive
└── JavaScript
    ├── CONFIG (Configurações)
    ├── Three.js Setup
    ├── Model Loading
    ├── Camera Navigation
    ├── Joke System
    ├── Audio System
    └── Event Handlers
```

## 🎯 Checklist de Lançamento

- [ ] Trocar `contractAddress` com o endereço real
- [ ] Atualizar `twitterUrl` com perfil do Twitter/X
- [ ] Atualizar `buyUrl` com link da DEX
- [ ] Adicionar piadas personalizadas em `jokes`
- [ ] Testar em desktop (Chrome, Firefox, Safari)
- [ ] Testar em mobile (iOS, Android)
- [ ] Verificar se o modelo GLB carrega corretamente
- [ ] Testar navegação (botões, teclado, swipe)
- [ ] Testar sistema de áudio
- [ ] Verificar copy do contract address
- [ ] Testar links sociais (Twitter, Buy)

## 🐛 Reportar Bugs

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Tire um screenshot do erro
3. Anote os passos para reproduzir
4. Inclua informações do navegador/SO

## 📜 Licença

Este projeto é open source e está disponível para uso pessoal e comercial.

## 🙏 Créditos

- **Three.js**: Biblioteca 3D
- **Google Fonts**: Bebas Neue & Outfit
- **Web Audio API**: Sistema de som

---

**Feito com 💙 para a comunidade crypto**

*"Why so serious? Let's bring some laughter to your portfolio!" - Mr. Penguin* 🐧🎤
