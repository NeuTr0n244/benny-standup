#!/bin/bash

# Script para atualizar a URL do GLB no index.html
# Uso: ./update-glb-url.sh "https://github.com/.../mr_penguin.glb"

GLB_URL="$1"

if [ -z "$GLB_URL" ]; then
    echo "❌ Erro: URL não fornecida!"
    echo ""
    echo "Uso: ./update-glb-url.sh \"URL_DO_GLB\""
    echo ""
    echo "Exemplo:"
    echo "./update-glb-url.sh \"https://github.com/NeuTr0n244/benny-standup/releases/download/v1.0-assets/mr_penguin.glb\""
    exit 1
fi

# Validar URL
if [[ ! "$GLB_URL" =~ ^https://github\.com/.*/releases/download/.*\.glb$ ]]; then
    echo "⚠️ Aviso: A URL não parece ser de um GitHub Release"
    echo "URL fornecida: $GLB_URL"
    echo ""
    read -p "Deseja continuar mesmo assim? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Operação cancelada"
        exit 1
    fi
fi

echo "🔍 URL do GLB: $GLB_URL"
echo ""

# Fazer backup do index.html
cp index.html index.html.backup
echo "💾 Backup criado: index.html.backup"

# Atualizar index.html
sed -i "s|modelPath: './mr_penguin.glb'|modelPath: '$GLB_URL'|g" index.html
sed -i "s|modelPath: \"./mr_penguin.glb\"|modelPath: \"$GLB_URL\"|g" index.html

echo "✅ URL atualizada no index.html!"
echo ""
echo "📝 Próximos passos:"
echo "   1. git add index.html"
echo "   2. git commit -m \"Update GLB path to GitHub Releases\""
echo "   3. git push origin main"
echo "   4. vercel --prod"
echo ""
echo "🎉 Feito!"
