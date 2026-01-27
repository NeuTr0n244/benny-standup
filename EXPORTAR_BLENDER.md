# 🎯 GUIA COMPLETO - EXPORTAR GLB DO BLENDER PARA THREE.JS

## ⚠️ PROBLEMA ATUAL
Apenas personagem e palco aparecem, tudo BRANCO sem texturas. Cenário completo não está carregando.

## ✅ SOLUÇÃO: Exportação Correta do Blender

---

## 📋 PREPARAÇÃO NO BLENDER (ANTES DE EXPORTAR)

### 1. VERIFICAR TODOS OS OBJETOS DA CENA

**Abra o Outliner (canto superior direito):**

```
✅ Certifique-se que TODOS os objetos estão visíveis:
   - Ícone de olho (👁️) ativado
   - Ícone de câmera (📷) ativado (renderização)
   - Ícone de monitor (🖥️) ativado (viewport)
```

**IMPORTANTE:** Se algum objeto estiver escondido ou desabilitado, NÃO será exportado!

### 2. VERIFICAR E PREPARAR TEXTURAS

#### A. Verificar se as texturas estão no projeto:

1. **Vá em: Editor de Shader (Shading workspace)**
2. Selecione cada objeto (palco, cortinas, paredes, etc)
3. Verifique no Shader Editor se há nós de "Imagem de Textura"
4. Para cada textura de imagem:
   - Clique na textura
   - Veja o caminho do arquivo (deve estar no projeto ou ser relativo)

#### B. EMBUTIR TEXTURAS NO ARQUIVO BLENDER:

**PASSO CRÍTICO - NÃO PULE!**

1. Vá em: **Menu → Arquivo → Dados Externos**
2. Clique em: **"Empacotar Todos em .blend"** (Pack All into .blend)
3. Confirmação aparecerá dizendo quantos arquivos foram empacotados
4. **Salve o arquivo .blend** (Ctrl+S)

Isso garante que as texturas ficam dentro do arquivo Blender e serão exportadas!

#### C. VERIFICAR MATERIAIS:

Para cada objeto com textura:
1. Selecione o objeto
2. Vá em: **Propriedades → Material** (ícone de esfera 🔴)
3. Certifique-se que o material está usando **Principled BSDF**
4. No Shader Editor, verifique se a textura está conectada ao "Base Color"

### 3. VERIFICAR CÂMERA

1. Selecione a câmera no Outliner
2. Veja no canto inferior esquerdo do Viewport: nome deve ser "Camera" ou similar
3. Posicione a câmera na VIEW que você quer como inicial
4. **Tecla Numpad 0** para ver pela câmera
5. Ajuste até ficar perfeito
6. Certifique-se que a câmera está **visível e habilitada**

### 4. VERIFICAR ILUMINAÇÃO

1. No Outliner, verifique todas as luzes:
   - Spotlights (holofotes do palco)
   - Point Lights (luzes coloridas)
   - Area Lights
2. Todas devem estar **visíveis e habilitadas**
3. Verifique a intensidade (não pode estar em 0)

### 5. VERIFICAR ANIMAÇÕES

1. Vá em: **Editor de Animação** (Animation workspace)
2. Abra o **Dope Sheet** (planilha de animação)
3. Veja se as animações aparecem (braço, boca)
4. Certifique-se que os keyframes estão visíveis

---

## 🚀 EXPORTAR PARA GLB

### PASSO 1: Abrir o Exportador

**Menu → Arquivo → Exportar → glTF 2.0 (.glb/.gltf)**

### PASSO 2: Escolher Local e Nome

- Navegue até a pasta do projeto: `C:\Users\NEUTRON\Documents\standup`
- Nome do arquivo: `mr_penguin.glb`
- **Formato:** GLB Binário (não GLTF separado!)

### PASSO 3: CONFIGURAÇÕES DE EXPORTAÇÃO (CRÍTICO!)

#### ⚙️ ABA "INCLUIR" (Include):

```
☑️ Selecionados Somente: DESMARCADO (exporta tudo)
☑️ Geometria Visível: MARCADO
☑️ Geometria Renderizável: MARCADO
☑️ Ativo: MARCADO

☑️ Pontuação: MARCADO (para luzes!)
☑️ Câmeras: MARCADO
☑️ Luzes Pontuais: MARCADO (IMPORTANTE!)

☑️ Propriedades Customalizadas: MARCADO
☑️ Extras: MARCADO
```

#### 🎨 ABA "TRANSFORMAÇÃO" (Transform):

```
Transform: +Y Cima (padrão do Blender)
  ou
Transform: +Z Cima (se Three.js estiver invertido)

☑️ Aplicar Modificadores: MARCADO
```

#### 📦 ABA "GEOMETRIA" (Geometry):

```
☑️ Aplicar Modificadores: MARCADO
☑️ UVs: MARCADO (essencial para texturas!)
☑️ Normais: MARCADO
☑️ Tangentes: MARCADO (melhora iluminação)
☑️ Atributos de Cor de Vértice: MARCADO
☑️ Material: MARCADO

Compressão: Sem compressão (ou auto)
```

#### 🎬 ABA "ANIMAÇÃO" (Animation):

```
☑️ Usar Animação Atual: DESMARCADO
☑️ Exportar Animações: MARCADO
☑️ Amostrar Animações: MARCADO

☑️ Incluir All Bone Influences: MARCADO (se tiver armadura)
☑️ Otimizar Tamanho de Animação: PODE MARCAR

Deformação de Forma:
  ☑️ Tangentes de Forma: MARCADO
  ☑️ Normais de Forma: MARCADO

Skinning: MARCADO
Baking: MARCADO
```

#### 🖼️ ABA "MATERIAIS" (Materials) - MAIS IMPORTANTE!

```
Materiais: Exportar

☑️ Imagens: MARCADO (exporta texturas!)

Formato de Imagem: Automático
  ou
Formato de Imagem: JPEG + PNG (se tiver transparência)

Qualidade JPEG: 90

Compressão de Imagem: Nenhuma (ou zlib se arquivo muito grande)

☑️ Criar Canvas WebP: PODE DESMARCAR (opcional)

☑️ Materiais não usados: DESMARCAR (só exporta o necessário)
```

### PASSO 4: EXPORTAR!

**Clique no botão: "Exportar glTF 2.0"**

Aguarde a barra de progresso completar.

---

## ✅ CHECKLIST FINAL DE VERIFICAÇÃO

Antes de exportar, confira esta lista:

```
☑️ Todas as texturas estão empacotadas no .blend (Arquivo → Dados Externos → Empacotar)
☑️ Todos os objetos estão visíveis no Outliner (olho ativado)
☑️ Todos os objetos estão habilitados para renderização
☑️ A câmera está posicionada corretamente
☑️ As luzes estão visíveis e com intensidade > 0
☑️ Os materiais estão usando Principled BSDF
☑️ As texturas estão conectadas no Shader Editor
☑️ As animações aparecem no Dope Sheet
☑️ Formato de exportação: GLB Binário (não GLTF)
☑️ Incluir → Câmeras: MARCADO
☑️ Incluir → Luzes Pontuais: MARCADO
☑️ Geometria → UVs: MARCADO
☑️ Materiais → Imagens: MARCADO
```

---

## 🔍 TESTE RÁPIDO NO SITE

Após exportar:

1. Substitua o arquivo `mr_penguin.glb` na pasta do projeto
2. Recarregue o site: **http://localhost:8000** (Ctrl+Shift+R para limpar cache)
3. Abra o Console do navegador (F12)
4. Verifique os logs:
   - "GLB loaded successfully"
   - "Using camera from GLB file"
   - "Light found: SpotLight" (ou PointLight, etc)
   - "Found X animations"

---

## 🐛 TROUBLESHOOTING

### Problema: Ainda está branco sem texturas

**Solução 1:** Verificar se texturas foram empacotadas
```
No Blender:
Menu → Arquivo → Dados Externos → Desempacotar em...
(se a opção estiver disponível, significa que há texturas empacotadas)
```

**Solução 2:** Verificar caminhos de textura
```
1. Selecione objeto com textura
2. Shader Editor
3. Clique no nó de Imagem
4. Se o caminho tiver ícone de alerta (⚠️), a textura está perdida
5. Clique em "Abrir" e recarregue a imagem
6. Depois: Arquivo → Dados Externos → Empacotar
```

**Solução 3:** Converter texturas para formato compatível
```
As texturas devem ser:
- PNG (com transparência)
- JPEG (sem transparência)
- Evite: TIFF, TGA, BMP
```

### Problema: Objetos faltando (cortinas, plateia)

**Solução:**
```
1. No Outliner, verifique se os objetos estão em Collections desabilitadas
2. Clique no ícone de monitor (🖥️) para habilitar no viewport
3. Clique no ícone de câmera (📷) para habilitar na renderização
4. Exporte novamente
```

### Problema: Câmera errada

**Solução:**
```
1. Selecione a câmera
2. Ctrl+Numpad 0 (define câmera ativa)
3. Ajuste posição
4. Exporte novamente com "Câmeras: MARCADO"
```

### Problema: Sem iluminação

**Solução:**
```
1. Verifique se "Luzes Pontuais" está MARCADO na exportação
2. Verifique se as luzes estão visíveis no Outliner
3. Aumente a intensidade das luzes no Blender
4. Exporte novamente
```

---

## 📊 TAMANHO DO ARQUIVO

**GLB com texturas embutidas:**
- Esperado: 5-30 MB (depende das texturas)
- Se < 1 MB: Provavelmente texturas não foram exportadas
- Se > 100 MB: Texturas muito grandes, considere reduzir resolução

**Como reduzir tamanho:**
1. No Blender, selecione a textura no Shader Editor
2. Imagem → Redimensionar
3. Use 1024x1024 ou 2048x2048 (max 4096x4096)
4. Salve
5. Empacotar novamente
6. Exporte

---

## 💡 DICAS IMPORTANTES

1. **SEMPRE empacote texturas antes de exportar!**
2. **SEMPRE salve o .blend antes de exportar!**
3. Se mudar texturas, empacote novamente
4. Use nomes simples sem acentos ou espaços
5. Teste no site após cada exportação
6. Mantenha um backup do .blend funcionando

---

## 🎓 RESUMO ULTRA-RÁPIDO

```
1. Arquivo → Dados Externos → Empacotar Todos
2. Salvar .blend (Ctrl+S)
3. Arquivo → Exportar → glTF 2.0
4. Marcar: Câmeras, Luzes Pontuais, UVs, Imagens
5. Exportar GLB Binário
6. Substituir mr_penguin.glb no projeto
7. Recarregar site (Ctrl+Shift+R)
8. Verificar console (F12)
```

---

**Boa sorte! Se tiver problemas, me avise qual erro aparece no console do navegador.** 🚀
