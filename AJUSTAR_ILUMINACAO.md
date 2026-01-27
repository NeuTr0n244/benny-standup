# 💡 GUIA DE AJUSTE DE ILUMINAÇÃO

## 🎯 PROBLEMA RESOLVIDO

Luzes do Blender com Power 800-2000 são muito fortes para Three.js, causando **overexposure** (tudo branco).

## ✅ SOLUÇÃO IMPLEMENTADA

O código agora:
1. **Reduz automaticamente** a intensidade das luzes do GLB
2. **Ajusta o tone mapping exposure** para evitar overexposure
3. **Permite ajuste fácil** via objeto CONFIG

---

## ⚙️ CONFIGURAÇÕES (no início do código)

Edite estas linhas no objeto `CONFIG`:

```javascript
const CONFIG = {
    // ... outras configurações ...

    // Lighting and rendering adjustments
    lightIntensityMultiplier: 0.001,  // Multiplica intensidade das luzes
    toneMappingExposure: 0.5,         // Exposição geral da cena
    minLightIntensity: 0.1,           // Intensidade mínima após ajuste
};
```

---

## 🔧 COMO AJUSTAR

### Se a cena está **MUITO CLARA** (branco, estourado):

**OPÇÃO 1 - Reduzir multiplicador de luz:**
```javascript
lightIntensityMultiplier: 0.0005,  // Metade da intensidade (era 0.001)
```

**OPÇÃO 2 - Reduzir exposição:**
```javascript
toneMappingExposure: 0.3,  // Mais escuro (era 0.5)
```

**OPÇÃO 3 - Ambos:**
```javascript
lightIntensityMultiplier: 0.0001,  // Muito mais fraco
toneMappingExposure: 0.2,          // Bem mais escuro
```

---

### Se a cena está **MUITO ESCURA** (quase preta):

**OPÇÃO 1 - Aumentar multiplicador de luz:**
```javascript
lightIntensityMultiplier: 0.002,  // Dobro da intensidade (era 0.001)
```

**OPÇÃO 2 - Aumentar exposição:**
```javascript
toneMappingExposure: 0.8,  // Mais claro (era 0.5)
```

**OPÇÃO 3 - Ambos:**
```javascript
lightIntensityMultiplier: 0.005,  // 5x mais forte
toneMappingExposure: 1.0,         // Exposição normal
```

---

### Se algumas luzes estão **MUITO FRACAS**:

```javascript
minLightIntensity: 0.5,  // Aumenta o mínimo (era 0.1)
```

---

## 📊 VALORES RECOMENDADOS

### Configuração Padrão (atual):
```javascript
lightIntensityMultiplier: 0.001   // Para luzes Blender 800-2000
toneMappingExposure: 0.5         // Exposição média
minLightIntensity: 0.1           // Mínimo baixo
```

### Cena Escura/Dramática:
```javascript
lightIntensityMultiplier: 0.0005
toneMappingExposure: 0.3
minLightIntensity: 0.05
```

### Cena Clara/Iluminada:
```javascript
lightIntensityMultiplier: 0.002
toneMappingExposure: 0.8
minLightIntensity: 0.2
```

### Cena Muito Clara (tipo comedy show):
```javascript
lightIntensityMultiplier: 0.005
toneMappingExposure: 1.2
minLightIntensity: 0.5
```

---

## 🧪 TESTE PASSO A PASSO

### 1. **Estado Inicial**

Recarregue o site e veja como está:
```
http://localhost:8000
Ctrl + Shift + R
```

Abra o console (F12) e veja:
```
💡 ADJUSTING LIGHT INTENSITIES...
  Multiplier: 0.001
  Minimum intensity: 0.1

  SpotLight "Spot1"
    Original: 800.00
    Adjusted: 0.80

  SpotLight "Spot2"
    Original: 2000.00
    Adjusted: 2.00
```

### 2. **A Cena Está...**

#### 🌞 MUITO CLARA / BRANCA?

1. Abra o `index.html`
2. Procure por `CONFIG` (linha ~625)
3. Mude:
   ```javascript
   toneMappingExposure: 0.3,  // de 0.5 para 0.3
   ```
4. Salve e recarregue (Ctrl+Shift+R)
5. Ainda muito clara? Tente `0.2` ou `0.1`

#### 🌑 MUITO ESCURA / PRETA?

1. Mude:
   ```javascript
   lightIntensityMultiplier: 0.002,  // de 0.001 para 0.002
   toneMappingExposure: 0.8,         // de 0.5 para 0.8
   ```
2. Salve e recarregue
3. Ainda escura? Tente valores maiores

#### ✅ BOA, MAS...

**Texturas ainda brancas?**
- Problema não é iluminação
- Veja arquivo `DEBUG_TEXTURAS.md`

**Algumas áreas muito claras, outras muito escuras?**
- Ajuste no Blender:
  - Redistribua as luzes
  - Adicione mais luzes nas áreas escuras
  - Reduza luzes nas áreas claras

---

## 🎨 AJUSTE FINO

### Para ajustar cada tipo de luz separadamente:

No código, após a linha que ajusta intensidade:

```javascript
// Dentro do model.traverse((child) => {...})
if (child.isLight) {
    const originalIntensity = child.intensity;
    child.intensity = child.intensity * CONFIG.lightIntensityMultiplier;

    // ADICIONE ISTO:
    // Ajuste por tipo de luz
    if (child.isSpotLight) {
        child.intensity *= 1.5;  // Spots 50% mais fortes
    }
    if (child.isPointLight) {
        child.intensity *= 0.5;  // Points 50% mais fracos
    }
    if (child.isDirectionalLight) {
        child.intensity *= 2.0;  // Directionals 2x mais fortes
    }

    // Resto do código...
}
```

---

## 📈 TABELA DE CONVERSÃO

Luzes do Blender → Three.js com multiplicador 0.001:

| Blender Power | Multiplicador | Three.js Intensity |
|---------------|---------------|--------------------|
| 100           | 0.001         | 0.1                |
| 500           | 0.001         | 0.5                |
| 800           | 0.001         | 0.8                |
| 1000          | 0.001         | 1.0                |
| 2000          | 0.001         | 2.0                |
| 5000          | 0.001         | 5.0 (muito forte)  |

**Valores recomendados no Three.js:**
- Ambient: 0.2 - 0.5
- Directional: 0.5 - 1.5
- Point: 0.5 - 2.0
- Spot: 1.0 - 3.0

---

## 🔍 LOGS NO CONSOLE

Ao carregar, você verá:

```
🖥️ RENDERER CONFIGURATION:
  outputColorSpace: srgb
  toneMapping: 4
  toneMappingExposure: 0.5    <-- ESTE VALOR
  pixelRatio: 1

💡 ADJUSTING LIGHT INTENSITIES...
  Multiplier: 0.001            <-- ESTE VALOR
  Minimum intensity: 0.1       <-- ESTE VALOR

  SpotLight "Spot.001"
    Original: 800.00           <-- Do Blender
    Adjusted: 0.80             <-- No Three.js

  SpotLight "Spot.002"
    Original: 2000.00
    Adjusted: 2.00

✅ Light intensities adjusted
```

---

## 💡 DICAS

1. **Comece com valores baixos** e aumente aos poucos
2. **toneMappingExposure** afeta a cena inteira (mais rápido de ajustar)
3. **lightIntensityMultiplier** afeta só as luzes (mais preciso)
4. **Sempre recarregue com Ctrl+Shift+R** para limpar cache
5. **Veja o console** para saber os valores aplicados
6. **Anote os valores** que funcionaram bem

---

## 🎯 VALORES RÁPIDOS PARA TESTAR

Se estiver tudo branco, teste estes em ordem:

```javascript
// Teste 1
toneMappingExposure: 0.3,

// Teste 2 (se ainda branco)
toneMappingExposure: 0.2,

// Teste 3 (se ainda branco)
lightIntensityMultiplier: 0.0005,
toneMappingExposure: 0.2,

// Teste 4 (se ainda branco)
lightIntensityMultiplier: 0.0001,
toneMappingExposure: 0.1,
```

Se estiver tudo preto, teste estes:

```javascript
// Teste 1
toneMappingExposure: 0.8,

// Teste 2 (se ainda escuro)
toneMappingExposure: 1.2,

// Teste 3 (se ainda escuro)
lightIntensityMultiplier: 0.005,
toneMappingExposure: 1.2,

// Teste 4 (se ainda escuro)
lightIntensityMultiplier: 0.01,
toneMappingExposure: 1.5,
```

---

## ❓ FAQ

**P: Por que as luzes do Blender são tão fortes?**
R: Blender usa unidades de Power (Watts), Three.js usa intensity sem unidade. Escalas diferentes.

**P: Posso desabilitar este ajuste?**
R: Sim, mude `lightIntensityMultiplier: 1.0` (sem alteração) e ajuste só o exposure.

**P: E se eu quiser usar luzes completamente customizadas?**
R: Depois do modelo carregar, remova as luzes do GLB e adicione suas próprias.

**P: O ajuste afeta animações das luzes?**
R: Não, só a intensidade inicial. Animações continuam funcionando.

---

## 🚀 PRÓXIMO TESTE

1. **Recarregue o site:** http://localhost:8000
2. **Veja o console** para os valores ajustados
3. **Avalie a iluminação:**
   - Muito clara? Reduza toneMappingExposure
   - Muito escura? Aumente lightIntensityMultiplier
4. **Ajuste no CONFIG**
5. **Repita até ficar perfeito**

---

**Boa sorte! Me avise como ficou após o ajuste.** 💡
