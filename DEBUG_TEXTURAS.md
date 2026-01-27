# 🐛 DEBUG - TEXTURAS BRANCAS (GLB 193MB)

## 📊 SITUAÇÃO ATUAL

- ✅ GLB: 193 MB (texturas estão no arquivo!)
- ✅ Meshes: 150
- ✅ Lights: 8
- ✅ Animations: 2
- ✅ Camera: Correta
- ❌ PROBLEMA: Tudo aparece branco/sem cor

---

## 🔍 CÓDIGO ATUALIZADO COM DEBUG

O código foi atualizado com logs detalhados que vão mostrar:

### 1. **Configuração do Renderer**
```
🖥️ RENDERER CONFIGURATION:
  outputColorSpace: srgb
  toneMapping: 4
  toneMappingExposure: 1.2
  pixelRatio: 1
```

### 2. **Análise de Materiais (primeiros 10 meshes)**
Para cada mesh, mostra:
```
Mesh #1: "PalcoMadeira"
  Material: MeshStandardMaterial
  Has map (texture): YES ✅  ou  NO ❌
    Texture image: loaded ✅  ou  not loaded ❌
    Texture size: 2048x2048
  Base color: rgb(255, 255, 255)
```

### 3. **Resumo de Materiais**
```
📊 MATERIAL ANALYSIS
  Total meshes: 150
  Meshes with textures: 45  <-- NÚMERO CRÍTICO!
  Material types: { MeshStandardMaterial: 120, MeshBasicMaterial: 30 }
```

---

## 🧪 TESTE ATUALIZADO

### PASSO 1: Recarregue o site
```
http://localhost:8000
Ctrl + Shift + R (limpar cache!)
```

### PASSO 2: Abra o Console (F12)

### PASSO 3: PROCURE ESTAS INFORMAÇÕES

#### A. Quantos meshes têm texturas?
```
Meshes with textures: ___
```

**Se for 0 ou muito baixo:**
- ❌ As texturas NÃO foram exportadas corretamente
- Volte ao Blender e siga o passo de EMPACOTAR

**Se for > 40:**
- ✅ Texturas estão no GLB
- Problema é no carregamento/renderização

#### B. Verifique os primeiros 10 meshes

Procure por linhas como:
```
Mesh #1: "Palco"
  Material: MeshStandardMaterial
  Has map (texture): YES ✅
    Texture image: loaded ✅
    Texture size: 2048x2048
  Base color: rgb(255, 255, 255)
```

**COISAS IMPORTANTES:**

1. **"Has map (texture): NO ❌"**
   - Material não tem textura atribuída
   - Verifique no Blender se a textura está conectada ao Base Color

2. **"Texture image: not loaded ❌"**
   - Textura existe mas não carregou
   - Problema no GLTFLoader ou formato de imagem

3. **"Base color: rgb(255, 255, 255)"**
   - Cor branca é o padrão
   - Se não tem textura, vai aparecer branco

4. **"Base color: rgb(100, 50, 200)"**
   - Se tiver cor diferente de branco, deve aparecer colorido
   - Se ainda aparece branco, problema é na iluminação

---

## 🎯 DIAGNÓSTICOS POSSÍVEIS

### CASO 1: "Meshes with textures: 0"

**DIAGNÓSTICO:** Texturas não foram exportadas do Blender

**SOLUÇÃO:**
```
1. Abra o arquivo .blend
2. Menu → Arquivo → Dados Externos → Empacotar Todos em .blend
3. Aguarde mensagem confirmando empacotamento
4. Salvar .blend (Ctrl+S)
5. Arquivo → Exportar → glTF 2.0
6. ABA "MATERIAIS" → Marcar ☑️ "Imagens"
7. Exportar novamente
```

---

### CASO 2: "Has map: YES ✅" mas "Texture image: not loaded ❌"

**DIAGNÓSTICO:** Texturas no GLB mas não estão carregando

**POSSÍVEIS CAUSAS:**
1. Formato de imagem incompatível (use PNG ou JPEG)
2. Textura corrompida
3. Tamanho muito grande (> 4096x4096)

**SOLUÇÃO:**
```
No Blender, para cada textura:
1. Shader Editor → Selecione nó de Imagem
2. Imagem → Redimensionar → 2048x2048
3. Imagem → Salvar Como → PNG ou JPEG
4. Arquivo → Dados Externos → Empacotar Todos
5. Exportar novamente
```

---

### CASO 3: Texturas carregadas MAS aparecem brancas

**DIAGNÓSTICO:** Problema de iluminação ou material

**VERIFICAR NO CONSOLE:**
```
Light found: SpotLight Power: 800
```

Se Power/Intensity estiver muito baixo (< 100), aumente no Blender.

**SOLUÇÃO A - Aumentar luzes:**
```
No Blender:
1. Selecione cada luz
2. Propriedades da Luz → Power
3. Aumente para 800-2000 (Spotlights)
4. Exporte novamente
```

**SOLUÇÃO B - Material errado:**
```
No Blender:
1. Selecione objeto branco
2. Material Properties → Surface
3. Certifique-se que é "Principled BSDF"
4. Veja se Base Color tem textura conectada (fio amarelo)
5. Se estiver usando "Emission" ou outro shader, mude para Principled BSDF
```

---

### CASO 4: Console mostra "MeshBasicMaterial"

**DIAGNÓSTICO:** Material errado (MeshBasicMaterial não usa iluminação)

**SOLUÇÃO:**
```
No Blender:
1. Selecione objetos com problema
2. Material Properties
3. Certifique-se que está usando:
   - Principled BSDF (recomendado)
   - Diffuse BSDF (OK)
   - NÃO usar: Emission, Transparent, etc
4. Exporte novamente
```

---

## 📸 TESTE RÁPIDO - Material Simples

Se quiser testar se o Three.js está funcionando:

**No Console do Navegador, digite:**
```javascript
// Cria um cubo vermelho simples
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 2, 0);
scene.add(cube);
```

Se o cubo vermelho **aparecer** = Three.js e iluminação OK, problema é no GLB

Se o cubo **não aparecer** ou aparecer preto = Problema na iluminação da cena

---

## 🔧 MUDANÇAS NO CÓDIGO

Fiz estas alterações:

1. **Logs detalhados de cada material**
   - Mostra nome, tipo, se tem textura, cor base

2. **Contador de texturas**
   - Alerta se nenhuma textura foi encontrada

3. **DoubleSide rendering**
   - `material.side = THREE.DoubleSide`
   - Renderiza dos dois lados (útil para debug)

4. **Tone mapping exposure aumentado**
   - `renderer.toneMappingExposure = 1.2`
   - Cena mais clara

5. **Alpha false no renderer**
   - `alpha: false`
   - Remove transparência que pode causar problemas

---

## 📋 CHECKLIST DE DEBUG

Após recarregar, me envie estas informações:

```
[ ] Meshes with textures: ___
[ ] Material types: { ___ }
[ ] Primeiros 3 meshes:
    Mesh #1: "___"
      Has map: ___
      Texture image: ___
      Base color: ___

    Mesh #2: "___"
      Has map: ___
      Texture image: ___
      Base color: ___

    Mesh #3: "___"
      Has map: ___
      Texture image: ___
      Base color: ___

[ ] Console tem algum ERRO (vermelho)? Qual?
[ ] Console tem algum WARNING (amarelo)? Qual?
```

---

## 🎨 TESTE DE COR MANUAL

Se quiser forçar uma cor em todos os materiais (para teste):

**No Console do Navegador:**
```javascript
// Força cor vermelha em todos materiais
model.traverse((child) => {
    if (child.isMesh && child.material) {
        child.material.color.set(0xff0000);
        child.material.needsUpdate = true;
    }
});
```

Se os objetos ficarem **vermelhos** = Materiais funcionam, problema é nas texturas

Se continuar **branco** = Problema mais profundo (iluminação ou outro)

---

## 💡 DICA FINAL

O GLB tem 193MB então as texturas ESTÃO LÁ.

Os problemas mais comuns são:
1. ❌ Texturas não conectadas aos materiais no Blender
2. ❌ Material errado (Emission, Basic)
3. ❌ Iluminação muito fraca
4. ❌ Texturas não empacotadas antes de exportar

**Siga os logs do console e me envie os resultados!** 🚀
