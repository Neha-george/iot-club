# Testing Guide

This guide explains how to run the project locally using Firebase Emulators.

## Prerequisites
- Node.js installed
- Java (required for Firebase Emulators)

## 1. Start Emulators
Run the following command in the project root:
```bash
npm run emulators
```
This will start:
- Authentication Emulator: http://localhost:9099
- Firestore Emulator: http://localhost:8080
- Functions Emulator: http://localhost:5001
- Emulator UI: http://localhost:4000

## 2. Seed Data
Open a new terminal and run the seeding script to populate Firestore with sample devices:
```bash
# Ensure you have a serviceAccountKey.json in scripts/ if connecting to real project, 
# BUT for emulators, the script needs to be adjusted or you can manually add data via Emulator UI.
# For this project, we've provided a script that works with the Admin SDK.
# To make it work with Emulators, set the FIRESTORE_EMULATOR_HOST env var.

$env:FIRESTORE_EMULATOR_HOST="localhost:8080"
$env:FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
node scripts/seedDevices.js
```
*Note: The provided `seedDevices.js` uses the Admin SDK. To use it with emulators without a service account, you might need to bypass the credential check or use a dummy service account.*

## 3. Test Flows

### User Flow
1. Open http://localhost:5173 (Frontend).
2. Click "Login" -> Register a new user (e.g., `student@test.com`).
3. Browse components and add items to the cart.
4. Open Cart -> Click "Proceed to Request".
5. Fill in details (Admission No, Class, etc.) and Submit.
6. Verify the "Request Submitted" screen appears with a Request ID.

### Admin Flow
1. Create another user (e.g., `admin@test.com`).
2. Make this user an admin:
   - Open Emulator UI (http://localhost:4000) -> Auth.
   - Find the UID of `admin@test.com`.
   - Run: `node scripts/setAdminClaim.js <UID>` (Ensure env vars are set if targeting emulator).
   - Alternatively, edit the user in Emulator UI and add Custom Claim: `{"admin": true}`.
3. Login as `admin@test.com` on the frontend.
4. You should see the "Admin" button in the navbar.
5. Go to Admin Dashboard.
6. **Accept Request**: Find the pending request from the student and click the Checkmark.
7. **Verify Stock**: Go to "Inventory" tab and check if stock decreased.
8. **Return Item**: Go to "Active Borrows" tab, find the log, and click "Mark Returned".
9. **Verify Stock**: Check if stock increased back.

## 4. Concurrency Test
1. Open two different browsers (or Incognito).
2. Log in as two different students.
3. Both add the *last remaining unit* of a component to their cart.
4. Student A submits request -> Success.
5. Student B submits request -> Should fail (or Admin acceptance will fail later depending on implementation).
   - *Current implementation checks stock at "Accept" time.*
   - So both requests will be "Pending".
   - Admin accepts Student A -> Success.
   - Admin tries to accept Student B -> Error: "Insufficient stock".
