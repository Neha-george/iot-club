
# IoT Club Lending System - Checkoff Walkthrough

This document outlines the steps to verify the functionality of the IoT Club Lending System.

**Prerequisites:**
*   Project is running (`npm run dev`) at [http://localhost:5173](http://localhost:5173).
*   Firebase Emulators are running (`npm run emulators`).
*   Database is seeded with test data (completed via `node scripts/seedEmulator.js`).

**New Visual Features:**
*   **Animated Background**: A dynamic "Aurora" blob animation is now active on all pages.
*   **Mobile Responsiveness**: The Admin Dashboard and Request forms are now optimized for mobile screens.

## 1. User Flow: Signup, Browsing & Borrowing

1.  **Open the App**: Go to [http://localhost:5173](http://localhost:5173).
2.  **Sign Up (New)**:
    *   Go to [http://localhost:5173/login](http://localhost:5173/login).
    *   Click "Sign up" at the bottom.
    *   Create an account with **Full Name**, Email, and Password.
    *   **Note**: The input fields will glow **Neon Purple** when focused!
    *   You will be redirected to the home page.
3.  **View Inventory**: You should see the homepage with a list of available components (Arduino, Raspberry Pi, etc.).
3.  **Add to Cart**:
    *   Click "Add to Cart" on any item (e.g., "Arduino Uno R3").
    *   You should see a notification or cart indicator update.
4.  **Checkout**:
    *   Click the **Cart** icon in the navbar.
    *   Review your items.
    *   Click **Checkout**.
5.  **Submit Request**:
    *   Fill in the form:
        *   **Name**: `Test Student`
        *   **Email**: `student@example.com`
        *   **Admission No**: `123456`
        *   **Class**: `CS-A`
        *   **Purpose**: `Project work`
    *   Click **Submit Request**.
    *   Verify you see a success message.

## 2. Admin Flow: Managing Requests & Inventory

1.  **Access Admin Panel**: Go to [http://localhost:5173/login](http://localhost:5173/login).
2.  **Login**:
    *   **Email**: `admin@iotclub.com`
    *   **Password**: `password123`
    *   **Note**: This admin user was created for you via `node scripts/createEmulatorAdmin.js`.
3.  **Dashboard**:
    *   **Pending Requests**: You will now see the student's **Full Name** (if registered with one) instead of just email.
    *   **Active Borrows**:
        *   You can now click **Notify Return** to send an email reminder.
        *   **Note**: Since we are using emulators, the email text will appear in the **Terminal** where `npm run emulators` is running, not in a real inbox.
4.  **Approve Request**:
    *   Click the **Check/Tick** icon to approve.
    *   Confirm the dialog.
    *   The request should move to "Active Borrows".
5.  **View Active Borrows**:
    *   Switch to the "Active Borrows" tab.
    *   Verify the student's request is listed with a due date.
6.  **Manage Inventory**:
    *   Switch to the "Inventory" tab.
    *   Click **Add Component**.
    *   Enter details (Name: `Test Item`, Model: `T100`, Stock: `5`).
    *   Click **Save**.
    *   Verify the new item appears in the list.

## 3. Return Flow

1.  **In Admin Dashboard**:
    *   Go to "Active Borrows".
    *   Find the "Test Student" entry.
    *   Click **Mark Returned**.
    *   Confirm the dialog.
    *   The entry should be removed from the active list.

## Troubleshooting

*   **Emulator Issues**: If data isn't loading, check the terminal where `npm run emulators` is running for errors.
*   **Auth**: If you cannot access the admin page, go to the Firebase Emulator UI (usually `http://localhost:4000`), click "Auth", and create a user with email `admin@iotclub.com`. Then try logging in again.
