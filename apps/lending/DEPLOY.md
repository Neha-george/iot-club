# Deployment Guide to Firebase Hosting (Free Tier)

Follow these steps to get your IoT Club Lending System online.

## 1. Prerequisites
- You must have a Google Account.
- You must have the project folder open in your terminal/command prompt.
  - **Important**: Make sure you are inside the `iot-club-register` folder:
    ```powershell
    cd "d:\Project\IoT Club\Lending\iot-club-register"
    ```

## 2. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Create a project**.
   - Name it (e.g., `iot-club-app`).
   - Disable Google Analytics (optional, saves time).
   - Click **Create Project**.
3. **Setup Authentication**:
   - In the sidebar, click **Build > Authentication**.
   - Click **Get started**.
   - Select **Google**, enable it, and save.
   - Select **Email/Password**, enable it, and save.
4. **Setup Firestore Database**:
   - In the sidebar, click **Build > Firestore Database**.
   - Click **Create database**.
   - Select a location (e.g., `asia-south1` or `us-central1`).
   - Select **Start in production mode** and click **Create**.

## 3. Connect Project Locally
In your terminal (ensure you are in `iot-club-register`):

1. **Login to Firebase**:
   ```powershell
   npx firebase login
   ```
   *Follow the browser prompt to login.*

2. **Initialize Project**:
   ```powershell
   npx firebase init
   ```
   *   **Which features?** Select `Hosting: Configure files...` and `Firestore: Configure security rules...`.
       *   *Do NOT select Functions (unless you pay).*
   *   **Project Setup**: Select "Use an existing project" -> Choose `iot-club-app` (or whatever you named it).
   *   **Firestore Rules File**: Press Enter to accept `firestore.rules`.
   *   **Firestore Indexes File**: Press Enter to accept `firestore.indexes.json`.
   *   **Public directory?**: Type `dist` and press Enter.
   *   **Configure as SPA?**: Type `y` and press Enter.
   *   **Automatic builds?**: Type `n`.
   *   **Overwrite index.html?**: Type `n` (Important! Do not overwrite).

## 4. Build and Deploy
1. **Build the Application**:
   ```powershell
   npm run build
   ```
2. **Deploy to Free Tier**:
   ```powershell
   npx firebase deploy --only hosting,firestore:rules
   ```

## 5. Post-Deployment Setup (Admin Access)
Once deployed, the site is live but has no data and no admin.

1. **Create Account**: Open your live website URL and register/login.
2. **Set Admin Claim**:
   - Go to [Firebase Console](https://console.firebase.google.com/) > Authentication.
   - Copy your User UID (a long string of characters).
   - **Method A (Easiest for 1-time)**:
     - Go to **Firestore Database** in Console.
     - Start a collection `devices` (if empty).
     - Manually add device data (or see Method B).
     - To make yourself admin without scripts: You can temporarily edit `firestore.rules` in the console to allow your UID specifically, OR just use the script (Method B).
   - **Method B (The Script - Recommended)**:
     - Generate a private key: Project Settings > Service Accounts > Generate new private key.
     - Save it as `scripts/serviceAccountKey.json` inside your project.
     - Run: `node scripts/setAdminClaim.js <YOUR_UID>`
     - Run: `node scripts/seedDevices.js`

You are now live!
