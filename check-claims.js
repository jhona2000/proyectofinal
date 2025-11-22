const admin = require('firebase-admin');

try {
  admin.initializeApp({
    credential: admin.credential.cert(require('./serviceAccountKey.json'))
  });
} catch (e) {
  console.error('Error inicializando Admin SDK:', e.message || e);
  process.exit(1);
}

async function check(email){
  try {
    const user = await admin.auth().getUserByEmail(email);
    console.log('customClaims:', user.customClaims);
  } catch (err) {
    console.error('Error al obtener usuario:', err.message || err);
    process.exit(1);
  }
}

check('jh0natanrch43@gmail.com');
