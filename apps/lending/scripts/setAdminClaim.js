import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

// Instructions: Place your serviceAccountKey.json in this directory.
// Run with: node scripts/setAdminClaim.js <UID>

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node scripts/setAdminClaim.js <UID>');
    process.exit(1);
}

const uid = args[0];

const serviceAccount = JSON.parse(
    readFileSync('./scripts/serviceAccountKey.json', 'utf8')
);

initializeApp({
    credential: cert(serviceAccount)
});

getAuth()
    .setCustomUserClaims(uid, { admin: true })
    .then(() => {
        console.log(`Successfully set admin claim for user: ${uid}`);
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error setting admin claim:', error);
        process.exit(1);
    });
