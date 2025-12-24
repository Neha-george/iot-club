const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

// Stub: Trigger when a new lend request is created
exports.onLendRequestCreated = onDocumentCreated("lendRequests/{requestId}", (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        return;
    }
    const data = snapshot.data();

    logger.info(`New Lend Request Created: ${event.params.requestId}`, data);

    // PLACEHOLDER: Send notification to Admin
    // Example: 
    // sendEmailToAdmin({
    //   subject: "New Lend Request",
    //   body: `User ${data.user_name} requested ${data.items.length} items.`
    // });
});

// Stub: Scheduled overdue reminder (Requires Blaze Plan)
// Runs every day at 10:00 AM Asia/Kolkata
exports.scheduledOverdueReminder = onSchedule({
    schedule: "every day 10:00",
    timeZone: "Asia/Kolkata",
}, async (event) => {
    logger.info("Running scheduled overdue check...");

    const now = new Date();
    const borrowedSnapshot = await db.collection('borrowLogs')
        .where('status', '==', 'Borrowed')
        .get();

    borrowedSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.expected_return_date) {
            const returnDate = data.expected_return_date.toDate();
            if (returnDate < now) {
                logger.info(`Overdue item found for log ${doc.id}. User: ${data.user_email}`);

                // PLACEHOLDER: Send reminder to user
                // sendEmail(data.user_email, "Overdue Item", "Please return your item.");
            }
        }
    });
});
const { onCall } = require("firebase-functions/v2/https");

// Callable Function: Send Return Notification
// Helper to "send" email (logs to console in emulator)
exports.sendReturnNotification = onCall(async (request) => {
    // Check if user is admin (optional security step, skipping for demo simplicity or relying on client-side check)
    // const uid = request.auth.uid; 

    const { email, userName, items } = request.data;
    const itemsList = items.map(i => `${i.quantity}x ${i.device_name}`).join(', ');

    logger.info(`Sending return notification to ${email}...`);
    logger.info(`Subject: Return Reminder - IoT Club`);
    logger.info(`Body: Hi ${userName || 'Student'}, please return the following items: ${itemsList}`);

    return { message: `Email sent to ${email}` };
});
