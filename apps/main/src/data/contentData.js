import { Cpu, Globe, Rocket, Terminal, Wifi } from 'lucide-react';

export const domains = [
    {
        id: 1,
        title: 'Internet of Things',
        icon: Wifi,
        description: 'Connecting the physical world to the internet. Smart homes, sensors, and automation.'
    },
    {
        id: 2,
        title: 'Embedded Systems',
        icon: Cpu,
        description: 'Deep dive into microcontrollers, firmware, and hardware-level programming.'
    },
    {
        id: 3,
        title: 'Robotics',
        icon: Rocket,
        description: 'Building autonomous machines and exploring control systems.'
    },
    {
        id: 4,
        title: 'AI & Automation',
        icon: Terminal,
        description: 'Integrating intelligence into hardware for smarter solutions.'
    }
];

export const projects = [
    {
        id: 1,
        title: 'Smart Campus System',
        description: 'An automated energy management system for MACE classrooms using IoT sensors.',
        tech: ['ESP32', 'React', 'Firebase'],
        year: '2024'
    },
    {
        id: 2,
        title: 'Autonomous Drone',
        description: 'A quadcopter capable of object detection and autonomous navigation.',
        tech: ['Raspberry Pi', 'Python', 'OpenCV'],
        year: '2023'
    }
];
