
// Import images
import droneImg from '../assets/projects/droneimg.jpg';
import cameraImg from '../assets/projects/Interface OV7670 Camera module with Arduino.jpg';
import homeAutoImg from '../assets/projects/Home Automation1.jpg';
import obstacleImg from '../assets/projects/obar1.jpg';
import plantImg from '../assets/projects/pms1.jpg';
import doorImg from '../assets/projects/pbdl1.jpg';
import tempImg from '../assets/projects/thm1.jpg';
import lightImg from '../assets/projects/sls.png';
import gpsImg from '../assets/projects/gps1.jpg';
import healthImg from '../assets/projects/hms3.png';
import trafficImg from '../assets/projects/tl1.jpg';
import parkImg from '../assets/projects/pa1.jpg';
import dustbinImg from '../assets/projects/sd1.jpg';
import rfidImg from '../assets/projects/rfid1.webp';

// Detailed details for specific projects
import sd1 from '../assets/projects/sd1.jpg';
import sd2 from '../assets/projects/sd2.jpg';

import ha2 from '../assets/projects/Home Automation2.jpg';
import ha3 from '../assets/projects/Home Automation3.jpg';
import ha4 from '../assets/projects/Home Automation4.jpg';
import ha5 from '../assets/projects/Home Automation5.jpg';
import ha6 from '../assets/projects/Home Automation6.jpg';
import ha7 from '../assets/projects/Home Automation7.jpg';
import ha8 from '../assets/projects/Home Automation8.jpg';
import ha9 from '../assets/projects/Home Automation9.jpg';
import ha10 from '../assets/projects/Home Automation10.jpg';
import ha11 from '../assets/projects/Home Automation11.jpg';
import ha12 from '../assets/projects/Home Automation12.jpg';
import ha13 from '../assets/projects/Home Automation13.jpg';
import ha14 from '../assets/projects/Home Automation14.jpg';
import ha15 from '../assets/projects/Home Automation15.jpg';
import ha16 from '../assets/projects/Home Automation16.jpg';
import ha17 from '../assets/projects/Home Automation17.jpg';
import ha18 from '../assets/projects/Home Automation18.jpg';
import ha19 from '../assets/projects/Home Automation19.jpg';
import ha20 from '../assets/projects/Home Automation20.jpg';
import ha21 from '../assets/projects/Home Automation21.jpg';
import ha22 from '../assets/projects/Home Automation22.jpg';
import ha23 from '../assets/projects/Home Automation23.jpg';
import ha24 from '../assets/projects/Home Automation24.jpg';
import ha25 from '../assets/projects/Home Automation25.jpg';
import ha26 from '../assets/projects/Home Automation26.jpg';
import ha27 from '../assets/projects/Home Automation27.jpg';
import ha28 from '../assets/projects/Home Automation28.jpg';
import ha29 from '../assets/projects/Home Automation29.jpg';
import ha30 from '../assets/projects/Home Automation30.jpg';
import ha31 from '../assets/projects/Home Automation31.jpg';
import ha35 from '../assets/projects/Home Automation35.jpg';

import obar2 from '../assets/projects/obar2.jpg';


export const projectsData = [
    {
        id: 'smart-dustbin',
        title: 'SMART DUSTBIN',
        image: dustbinImg,
        description: 'A DIY smart dustbin using Arduino, ultrasonic sensor, and a servo motor for clear, contact-less waste disposal.',
        details: {
            intro: "It is a DIY smart dustbin using Arduino, ultrasonic sensor, and a servo motor. After the recent covid-19 era, people are trying to adopt a more contact-less approach. Our smart dustbin uses one such approach.",
            components: [
                "Arduino UNO",
                "Ultrasonic sensor HC-SR04",
                "SG-90 micro servo motor",
                "Dustbin",
                "Jumper wires",
                "Battery"
            ],
            working: {
                text: [
                    "The smart dustbin utilizes an Ultrasonic sensor HC-SR04 for object detection in its proximity. Once an object is detected, the sensor sends a signal to the Arduino Uno.",
                    "The Arduino processes this signal and subsequently sends a command to the Servomotor to open the top flap of the dustbin.",
                    "To customize the duration for which the flap remains open, you can easily adjust the code within the Arduino IDE. By making minor modifications to the code, you can change the open duration to your desired value."
                ],
                images: [sd2]
            },
            code: `
#include <Servo.h>  // Include the servo library

Servo servo;        // Create a servo object
int trigPin = 5;    // Define the trigger pin for the ultrasonic sensor
int echoPin = 6;    // Define the echo pin for the ultrasonic sensor
int servoPin = 7;   // Define the pin for controlling the servo motor
int led = 10;       // Define an LED pin for reference
long duration, dist, average;  // Variables for distance measurements
long aver[3];       // Array for averaging

void setup() {
    Serial.begin(9600);
    servo.attach(servoPin);    // Attach the servo to its pin
    pinMode(trigPin, OUTPUT);  // Set trigger pin as an output
    pinMode(echoPin, INPUT);   // Set echo pin as an input
    servo.write(0);            // Close cap on power on
    delay(100);
    servo.detach();
    pinMode(led, OUTPUT);       // Set the LED pin as an output
}

void measure() {
    digitalWrite(led, HIGH);    // Turn on the LED as an indicator
    digitalWrite(trigPin, LOW); // Set the trigger pin low
    delayMicroseconds(5);       // Short delay
    digitalWrite(trigPin, HIGH); // Set the trigger pin high
    delayMicroseconds(15);      // Short delay
    digitalWrite(trigPin, LOW);  // Set the trigger pin low again
    pinMode(echoPin, INPUT);     // Set echo pin as an input
    duration = pulseIn(echoPin, HIGH); // Measure the pulse duration
    dist = (duration / 2) / 29.1;     // Calculate the distance
}

void loop() {
    for (int i = 0; i <= 2; i++) {  // Take three distance measurements for averaging
        measure();
        aver[i] = dist;
        delay(10);   // Delay between measurements
    }
    dist = (aver[0] + aver[1] + aver[2]) / 3; // Calculate the average distance

    if (dist < 50) { // Change distance threshold as per your need
        servo.attach(servoPin); // Attach the servo
        delay(1);
        servo.write(0); // Open the flap
        delay(3000);    // Keep the flap open for 3 seconds
        servo.write(150); // Close the flap
        delay(1000);    // Additional delay for flap closure
        servo.detach();  // Detach the servo
    }
    Serial.print(dist);
}
      `
        }
    },
    {
        id: 'home-automation-esp32',
        title: 'IOT based Home Automation System using ESP32',
        image: homeAutoImg,
        description: 'Control your home appliances from anywhere using ESP32 and Blynk IoT cloud.',
        details: {
            intro: "In this project, we'll learn how to create a smart home system using an ESP32 and Blynk 2.0. We're going to make it possible to control high-power devices in your home like lights, fans, and air conditioners from your phone or computer. We'll also design a custom PCB for a more professional finish.",
            components: [
                "ESP32 DEV Board",
                "Custom PCB",
                "5V DC Relay HE JQC3FC",
                "5MM DC Power Jack",
                "16 Pin IC Base",
                "ULN2003 IC",
                "FR207 Diode",
                "5mm Green LED",
                "3mm Red LED",
                "3Pin 5.08 pitch PCB terminal",
                "220 ohm resistor",
                "LM7805 T0252"
            ],
            sections: [
                {
                    title: "Circuit Diagram",
                    content: "The circuit uses a ULN2003 to drive the relays because the ESP32 operates at 3.3V while the relays require 5V. An LM7805 regulator ensures a stable 5V supply.",
                    images: [ha2]
                },
                {
                    title: "Custom PCB",
                    content: "A custom PCB was designed to handle high voltage safely.",
                    images: [ha3, ha4]
                },
                {
                    title: "Preparing PCB",
                    content: "Soldering components onto the PCB.",
                    images: [ha5, ha6, ha7, ha8, ha9]
                },
                {
                    title: "Blynk IoT Setup",
                    content: "Configuring the Blynk Web Dashboard to create a template and datastreams (Virtual Pins V0, V1, V2, V3).",
                    images: [ha10, ha11, ha12, ha13, ha14, ha15, ha16, ha17, ha18, ha19]
                },
                {
                    title: "Uploading Code",
                    content: "Installing the Blynk library and uploading the code to the ESP32.",
                    images: [ha20, ha21, ha22, ha23]
                },
                {
                    title: "Mobile App Config",
                    content: "Setting up the mobile app to control the devices remotely.",
                    images: [ha25, ha26, ha27, ha28, ha29, ha30, ha31, ha35]
                }

            ],
            code: `
#define BLYNK_TEMPLATE_ID "TMPLjzYOBMQL"
#define BLYNK_TEMPLATE_NAME "ESP32 Home automation"
#define BLYNK_FIRMWARE_VERSION "0.1.0"
#define BLYNK_PRINT Serial
#define APP_DEBUG
#include "BlynkEdgent.h"

BLYNK_WRITE(V0){
    int pinValue = param.asInt();
    digitalWrite(27,pinValue);
}
BLYNK_WRITE(V1){
    int pinValue = param.asInt();
    digitalWrite(26,pinValue);
}
BLYNK_WRITE(V2){
    int pinValue = param.asInt();
    digitalWrite(14,pinValue);
}
BLYNK_WRITE(V3){
    int pinValue = param.asInt();
    digitalWrite(12,pinValue);
}

void setup()
{
    pinMode(27,OUTPUT);
    pinMode(26,OUTPUT);
    pinMode(14,OUTPUT);
    pinMode(12,OUTPUT);
    Serial.begin(115200);
    delay(100);
    BlynkEdgent.begin();
}

void loop() {
    BlynkEdgent.run();
}
      `
        }
    },
    {
        id: 'obstacle-avoiding-robot',
        title: 'Obstacle Avoiding Robot using Arduino',
        image: obstacleImg,
        description: 'A robot that autonomously navigates its environment by detecting and avoiding obstacles using an ultrasonic sensor.',
        details: {
            intro: "This Arduino project involves building a simple robot that uses an ultrasonic sensor to avoid obstacles and navigate its environment. The robot can move forward, backward, turn left, and turn right to avoid obstacles in its path.",
            components: [
                "Arduino board (e.g., Arduino Uno)",
                "Ultrasonic sensor (HC-SR04)",
                "Servo motor",
                "Motor driver (L298N or similar)",
                "Chassis with wheels and motors",
                "Jumper wires",
                "9V battery"
            ],
            sections: [
                {
                    title: "Wiring",
                    content: "Connection of motors, drivers, and sensors.",
                    images: [obar2]
                },
                {
                    title: "How It Works",
                    content: "1. Moves forward until obstacle detected.\n2. Stops and looks left/right with servo.\n3. Turns to the side with more space.\n4. Reverses if blocked."
                }
            ]
        }
    },
    {
        id: 'drone-arduino',
        title: 'Drone Using Arduino Uno',
        image: droneImg,
        description: 'A quadcopter project built using Arduino Uno as the flight controller.',
        details: null
    },
    {
        id: 'camera-interface',
        title: 'Interface OV7670 Camera module with Arduino',
        image: cameraImg,
        description: 'Interfacing a camera module with Arduino for image capture applications.',
        details: null
    },
    {
        id: 'plant-monitoring',
        title: 'Arduino IoT Plant Monitoring System',
        image: plantImg,
        description: 'Monitor soil moisture and environmental conditions for your plants.',
        details: null
    },
    {
        id: 'door-lock',
        title: 'Password based door locking system',
        image: doorImg,
        description: 'Secure door lock system using a keypad and electronic lock.',
        details: null
    },
    {
        id: 'temp-monitor',
        title: 'IoT Temperature and Humidity Monitor',
        image: tempImg,
        description: 'Remote monitoring of ambient temperature and humidity.',
        details: null
    },
    {
        id: 'light-control',
        title: 'IoT Light Control System',
        image: lightImg,
        description: 'Smart lighting system controlled via IoT interface.',
        details: null
    },
    {
        id: 'gps-interface',
        title: 'GPS Module Interfacing With Arduino UNO',
        image: gpsImg,
        description: 'Reading location data from a GPS module using Arduino.',
        details: null
    },
    {
        id: 'health-monitoring',
        title: 'Health Monitoring System',
        image: healthImg,
        description: 'Wearable or station-based system to monitor vital health signs.',
        details: null
    },
    {
        id: 'traffic-light',
        title: 'Arduino Traffic Light Simulation',
        image: trafficImg,
        description: 'Simulation of a traffic light control system.',
        details: null
    },
    {
        id: 'park-assist',
        title: 'Park Assist Simulation',
        image: parkImg,
        description: 'Ultrasonic based parking assistant system.',
        details: null
    },
    {
        id: 'rfid-attendance',
        title: 'RFID-BASED SMART ATTENDANCE SYSTEM',
        image: rfidImg,
        description: 'Automated attendance tracking using RFID tags and readers.',
        details: null
    }
];
