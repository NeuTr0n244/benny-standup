// Script para iniciar as piadas manualmente no Firebase
// Execute com: node seed-jokes.js

const fetch = require('node-fetch');

// Configuração Firebase
const FIREBASE_DATABASE_URL = 'https://standup-b42e6-default-rtdb.firebaseio.com';
const API_URL = 'https://standup-iota.vercel.app/api/generate-joke';

async function seedFirstJoke() {
    console.log('🎬 Gerando primeira piada...');

    try {
        // 1. Gerar piada via API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Piada gerada:', data.joke);

        // 2. Publicar no Firebase
        const jokeId = Date.now();
        const jokeData = {
            id: jokeId,
            text: data.joke,
            audio: data.audio,
            audioFormat: data.audioFormat || 'audio/mpeg',
            createdAt: jokeId,
            playAt: jokeId
        };

        const firebaseResponse = await fetch(`${FIREBASE_DATABASE_URL}/currentJoke.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jokeData)
        });

        if (!firebaseResponse.ok) {
            throw new Error(`Firebase error: ${firebaseResponse.status}`);
        }

        console.log('🔥 Piada publicada no Firebase!');
        console.log('📡 ID:', jokeId);
        console.log('');
        console.log('✅ PRONTO! Agora qualquer pessoa que entrar no site vai ouvir essa piada!');
        console.log('🌐 Acesse: https://standup-iota.vercel.app');

    } catch (error) {
        console.error('❌ Erro:', error.message);
        process.exit(1);
    }
}

seedFirstJoke();
