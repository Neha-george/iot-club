import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Instructions: Place your serviceAccountKey.json in this directory.
// Run with: node scripts/seedDevices.js

const serviceAccount = JSON.parse(
    readFileSync('./scripts/serviceAccountKey.json', 'utf8')
);

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const devices = [
    {
        name: "Arduino Uno R3",
        model: "A000066",
        description: "Microcontroller board based on the ATmega328P. Essential for prototyping.",
        total_stock: 10,
        available_stock: 10,
        min_stock_alert: 2
    },
    {
        name: "Raspberry Pi 4 Model B",
        model: "Pi 4B 4GB",
        description: "High-performance single-board computer with 4GB RAM.",
        total_stock: 5,
        available_stock: 5,
        min_stock_alert: 1
    },
    {
        name: "ESP8266 NodeMCU",
        model: "CP2102",
        description: "Wi-Fi enabled microcontroller for IoT projects.",
        total_stock: 15,
        available_stock: 15,
        min_stock_alert: 3
    },
    {
        name: "Ultrasonic Sensor",
        model: "HC-SR04",
        description: "Distance measuring sensor module.",
        total_stock: 20,
        available_stock: 20,
        min_stock_alert: 5
    },
    {
        name: "Servo Motor",
        model: "SG90",
        description: "Micro servo motor for angular position control.",
        total_stock: 12,
        available_stock: 12,
        min_stock_alert: 2
    }
];

async function seed() {
    const batch = db.batch();

    for (const device of devices) {
        const docRef = db.collection('devices').doc();
        batch.set(docRef, device);
    }

    await batch.commit();
    console.log('Seeding completed successfully.');
}

seed().catch(console.error);
