// Script para LANÇAR o show ao vivo (inicia as piadas para todos os clientes)
const admin = require('firebase-admin');

// Inicializar Firebase Admin (usa as mesmas credenciais do Firebase)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "standup-b42e6",
      clientEmail: "firebase-adminsdk-xxx@standup-b42e6.iam.gserviceaccount.com", // Substitua se tiver service account
      privateKey: process.env.FIREBASE_PRIVATE_KEY || "dummy" // Vai usar as credenciais do client SDK
    }),
    databaseURL: "https://standup-b42e6-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();

async function launchShow() {
  console.log('🚀 LANÇANDO O SHOW AO VIVO...');

  try {
    // Setar flag de lançamento
    await db.ref('liveShow/isLaunched').set(true);

    console.log('✅ SHOW LANÇADO COM SUCESSO!');
    console.log('🎭 Todos os clientes conectados iniciarão as piadas agora!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao lançar show:', error);
    process.exit(1);
  }
}

launchShow();
