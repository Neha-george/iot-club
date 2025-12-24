# IoT Club Component Lending System

A production-ready, full-stack web application for managing IoT component lending. Built with React (Vite), TailwindCSS, and Firebase.

## ⚠️ Important Installation Note
**Do NOT run any global npm installs.**
This project is configured to keep all dependencies and caches local to the project directory to respect storage constraints.
- An `.npmrc` file is included to set `cache=./.npm-cache`.
- Use `npx` for running binaries (e.g., `npx firebase`).

## Features
- **Modern UI**: IoT-themed, dark mode, responsive, and accessible.
- **Real-time Inventory**: Live stock updates using Firestore.
- **Role-Based Access**: Admin dashboard for managing requests and inventory.
- **Transactional Logic**: Robust handling of lending and returning items.
- **No Image Uploads**: Text-only component management to save storage.

## Prerequisites
- Node.js (v16 or higher)
- Java (for Firebase Emulators)

## Setup Instructions

### 1. Install Dependencies
Run this command in the project root:
```bash
npm ci
```
*This will install all dependencies using the lockfile and store the cache in `./.npm-cache`.*

### 2. Firebase Setup
This project uses Firebase Emulators for local development.
1. Create a `scripts/serviceAccountKey.json` if you plan to run the admin scripts against a live project.
2. For local testing, you can skip the service account if you configure the scripts to use the emulator environment variables.

### 3. Start Local Environment
Open two terminal windows:

**Terminal 1: Start Emulators (Database & Auth)**
```bash
npm run emulators
```
*Wait until you see "All emulators ready".*

**Terminal 2: Start Web Server**
```bash
npm run dev
```

### 4. Seed Test Data (Important!)
Since emulators start empty every time, you need to load the test data:

1.  Keep the emulators running.
2.  Open a **new** terminal window.
3.  Run these commands:
    ```bash
    # Restore components (Arduino, Raspberry Pi, etc.)
    node scripts/seedEmulator.js

    # Create the Admin user
    node scripts/createEmulatorAdmin.js
    ```

## 🧪 Testing the App
1.  Open [http://localhost:5173](http://localhost:5173).
2.  **Login as Admin**:
    - Email: `admin@iotclub.com`
    - Password: `password123`
3.  **Test User Flow**:
    - Open an Incognito window.
    - Sign up as a new student.
    - Request a component.
4.  **Check Admin Dashboard**:
    - Go back to the Admin window.
    - Approve the request.

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on how to push to GitHub and host on Firebase.

## Project Structure
- `src/components`: Reusable UI components.
- `src/contexts`: React Contexts (Auth, Cart).
- `src/lib`: Firebase init and helper functions.
- `src/pages`: Main application pages.
- `functions`: Cloud Functions triggers.
- `scripts`: Admin maintenance scripts.

## Testing
See [TESTING.md](./TESTING.md) for detailed instructions on how to run manual tests and verify the system.
