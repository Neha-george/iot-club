# IoT Club Membership Portal

A standalone React application for registering new members to the IoT Club. This app handles data collection, mock payment processing, and digital membership card generation.

## Features
- **Registration Form**: Collects student details.
- **Mock Payment**: Simulates Razorpay checkout flow.
- **Digital Card**: auto-generates a downloadable PNG membership card.

## Project Structure
- `src/pages`: Main views (Register, Payment, Success).
- `src/components`: Reusable UI components.
- `src/lib`: Mock backend logic.

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run dev server:
   ```bash
   npm run dev
   ```

## Integration Points (For Future)

### 1. Firebase Firestore
Locate `src/pages/Success.jsx`.
Replace the mock data saving logic with a Firestore `addDoc` call to save the member details.

### 2. Razorpay
Locate `src/pages/Payment.jsx` and `src/lib/paymentMock.js`.
- Replace `createOrder` with a call to your backend Cloud Function.
- Use the real `window.Razorpay` object in the frontend to open the checkout.

### 3. Email Automation
This should remain backend-side. Trigger a Cloud Function on Firestore document creation to send the welcome email.

## Mock Functions
- `src/lib/paymentMock.js`: Simulates order creation and verification.
- `src/lib/membershipIdMock.js`: Generates a random ID. Replace with database-driven auto-increment logic if needed.
