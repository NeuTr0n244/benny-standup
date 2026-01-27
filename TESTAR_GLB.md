# 🧪 GUIA DE TESTE - NOVO GLB EXPORTADO

## ✅ Código Atualizado!

O código foi atualizado para:

### 1. **Texturas (colorSpace)**
```javascript
✅ renderer.outputColorSpace = THREE.SRGBColorSpace
✅ material.map.colorSpace = THREE.SRGBColorSpace
✅ Todas texturas configuradas corretamente
```

### 2. **Câmera do GLB**
```javascript
✅ Usa câmera do arquivo GLB
✅ Salva posição/rotação original
✅ Usa como referência para view HOME
✅ Logs detalhados de posição e FOV
```

### 3. **Luzes do GLB**
```javascript
✅ Usa TODAS as luzes do arquivo
✅ Conta e lista cada luz encontrada
✅ Mostra Power/Intensity de cada luz
✅ Fallback apenas se GLB não tiver luzes
```

### 4. **Animações em Loop**
```javascript
✅ Todas animações tocam automaticamente
✅ Loop infinito (THREE.LoopRepeat)
✅ Logs mostram nome e duração de cada animação
```

---

## 🧪 COMO TESTAR

### PASSO 1: Substitua o arquivo GLB

1. Copie o novo arquivo `mr_penguin.glb` exportado do Blender
2. Cole em: `C:\Users\NEUTRON\Documents\standup\`
3. Substitua o arquivo antigo

### PASSO 2: Recarregue o site

1. Abra ou volte para: **http://localhost:8000**
2. **LIMPE O CACHE:** Pressione `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
3. Aguarde carregar (barra de progresso + cortinas)

### PASSO 3: Abra o Console do Navegador

**Tecla F12** ou:
- Chrome/Edge: `Ctrl + Shift + J`
- Firefox: `Ctrl + Shift + K`
- Safari: `Cmd + Option + C`

### PASSO 4: Verifique os Logs

Você deve ver algo assim no console:

```
═══════════════════════════════════════════════════
✅ GLB LOADED SUCCESSFULLY
═══════════════════════════════════════════════════

✅ Camera found in gltf.cameras
  Camera position: (5.23, 3.12, 8.45)
  Camera FOV: 45°

Scene contains 150 meshes and 8 lights

Light found: SpotLight Power: 800
Light found: SpotLight Power: 2000
Light found: SpotLight Power: 1500
Light found: PointLight Power: 500
... (mais luzes)

✅ Using 8 lights from GLB file

✅ Found 2 animations
  Animation 1: "ArmatureAction" (5.00s)
  Animation 2: "MouthAction" (2.50s)

═══════════════════════════════════════════════════
📦 SCENE SUMMARY
  Objects: 30 top-level children
  Meshes: 150
  Lights: 8
  Animations: 2
  Camera: Using GLB camera
═══════════════════════════════════════════════════
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO VISUAL

Após carregar, verifique na tela:

### Cenário Completo:
- [ ] **Palco** com textura de madeira (não branco!)
- [ ] **Cortinas vermelhas** (fundo do palco)
- [ ] **Mesas e cadeiras** da plateia
- [ ] **Paredes** e estrutura do teatro
- [ ] **Letreiro "STAND UP"** (se tiver)
- [ ] **Personagem** colorido (azul, laranja, não branco!)

### Iluminação:
- [ ] **Spotlights** iluminando o palco
- [ ] **Luzes coloridas** no ambiente
- [ ] **Sombras** visíveis
- [ ] Iluminação dramática (não tudo achatado)

### Animações:
- [ ] **Braços** do personagem se movendo
- [ ] **Boca** abrindo e fechando
- [ ] Movimento suave e contínuo (loop)

### Câmera:
- [ ] Posição inicial enquadra bem o personagem
- [ ] View do Blender foi preservada

### UI:
- [ ] **Piadas** aparecem na legenda
- [ ] **Botões** funcionam (About, Home, Community)
- [ ] **Câmera** navega entre as views

---

## 🐛 PROBLEMAS COMUNS

### ❌ Ainda está tudo branco

**Possíveis causas:**
1. **Texturas não foram empacotadas no Blender**
   - Volte ao Blender
   - Arquivo → Dados Externos → Empacotar Todos
   - Salve e exporte novamente

2. **Exportação sem "Imagens"**
   - Na exportação GLB, vá na aba "Materiais"
   - Marque: ☑️ Imagens
   - Exporte novamente

3. **Cache do navegador**
   - Feche o navegador completamente
   - Reabra e use Ctrl+Shift+R

### ❌ Console mostra: "No lights found"

**Solução:**
- No Blender, verifique se as luzes estão:
  - Visíveis no Outliner (ícone 👁️)
  - Habilitadas para render (ícone 📷)
- Na exportação GLB, marque: ☑️ Luzes Pontuais
- Exporte novamente

### ❌ Console mostra: "No camera found"

**Solução:**
- No Blender, certifique-se que a câmera está:
  - Selecionada e visível
  - Habilitada
- Na exportação GLB, marque: ☑️ Câmeras
- Exporte novamente

### ❌ Objetos faltando (cadeiras, cortinas)

**Solução:**
- No Outliner do Blender, verifique se todos objetos têm:
  - Ícone olho 👁️ ativado (visível)
  - Ícone monitor 🖥️ ativado (viewport)
  - Ícone câmera 📷 ativado (render)
- Não exporte com "Selecionados Somente" marcado
- Exporte novamente

### ❌ Sem animações

**Solução:**
- Verifique no Dope Sheet do Blender se há keyframes
- Na exportação GLB, marque:
  - ☑️ Exportar Animações
  - ☑️ Amostrar Animações
- Exporte novamente

---

## 📊 TAMANHO DO ARQUIVO

Verifique o tamanho do arquivo `mr_penguin.glb`:

- **< 1 MB**: ❌ Texturas NÃO foram exportadas
- **1-5 MB**: ⚠️ Poucas texturas ou baixa resolução
- **5-30 MB**: ✅ Tamanho normal com texturas
- **30-100 MB**: ⚠️ Texturas em resolução muito alta
- **> 100 MB**: ❌ Arquivo muito pesado, reduzir texturas

**Para ver o tamanho:**
- Windows: Clique direito no arquivo → Propriedades
- Mac: Clique direito → Obter Informações

---

## 🎯 RESULTADO ESPERADO

Quando tudo estiver certo, você deve ver:

1. **Loading com cortinas vermelhas**
2. **Cortinas abrem com animação**
3. **Confetti colorido cai**
4. **Cenário 3D completo e texturizado**
5. **Personagem colorido animado**
6. **Iluminação dramática com spots**
7. **Piadas aparecem embaixo**
8. **Som de risadas (se não mutado)**
9. **Console cheio de ✅ verde**

---

## 💬 REPORTAR RESULTADO

Após testar, me diga:

1. **Tamanho do arquivo GLB:** ___ MB
2. **O que aparece no console?** (cole os logs principais)
3. **O que você VÊ na tela?**
   - [ ] Tudo branco
   - [ ] Algumas texturas aparecem
   - [ ] Tudo texturizado e colorido
4. **Iluminação está funcionando?** Sim / Não
5. **Animações estão rodando?** Sim / Não
6. **Algum erro no console?** Sim (qual?) / Não

---

🚀 **BOA SORTE NO TESTE!**
