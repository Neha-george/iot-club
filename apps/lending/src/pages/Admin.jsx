import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ClipboardList, History } from 'lucide-react';
import { clsx } from 'clsx';
import Dashboard from '../components/Admin/Dashboard';
import InventoryForm from '../components/Admin/InventoryForm';

export default function Admin() {
    const location = useLocation();

    const tabs = [
        { name: 'Overview', path: '/admin', icon: LayoutDashboard },
        // { name: 'Inventory', path: '/admin/inventory', icon: Package }, // Integrated into Dashboard for simplicity or separate if complex
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-100">Admin Console</h1>
            </div>

            <Dashboard />
        </div>
    );
}
