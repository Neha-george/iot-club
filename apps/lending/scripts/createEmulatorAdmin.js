
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Set emulator environment variables
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.GCLOUD_PROJECT = 'demo-project';

initializeApp({
    projectId: 'demo-project'
});

const args = process.argv.slice(2);
const defaultEmail = 'admin@iotclub.com';
const defaultPassword = 'password123';

const email = args[0] || defaultEmail;
const password = args[1] || defaultPassword;

async function createAdmin() {
    try {
        let user;
        try {
            user = await getAuth().getUserByEmail(email);
            console.log(`User ${email} already exists with UID: ${user.uid}`);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.log(`Creating user ${email}...`);
                user = await getAuth().createUser({
                    email,
                    password
                });
                console.log(`Created user with UID: ${user.uid}`);
            } else {
                throw error;
            }
        }

        await getAuth().setCustomUserClaims(user.uid, { admin: true });
        console.log(`Successfully set admin claim for user: ${email}`);
        console.log('You can now log in with these credentials at /login');

    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
