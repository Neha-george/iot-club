import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import DeviceCard from '../components/DeviceCard';
import DeviceModal from '../components/DeviceModal';
import { Search, Loader2 } from 'lucide-react';

export default function Home() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'devices'), orderBy('name'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const devicesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDevices(devicesData);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">Component Library</h1>
                    <p className="text-slate-400 mt-2">Browse and request components for your projects.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-navy-800 border border-navy-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDevices.map(device => (
                    <DeviceCard
                        key={device.id}
                        device={device}
                        onClick={() => setSelectedDevice(device)}
                    />
                ))}
            </div>

            {filteredDevices.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No components found matching your search.
                </div>
            )}

            <DeviceModal
                device={selectedDevice}
                isOpen={!!selectedDevice}
                onClose={() => setSelectedDevice(null)}
            />
        </div>
    );
}
