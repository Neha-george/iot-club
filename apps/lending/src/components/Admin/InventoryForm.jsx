import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Loader2 } from 'lucide-react';

export default function InventoryForm({ initialData, onSuccess, onCancel }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            name: '',
            model: '',
            description: '',
            total_stock: 1,
            available_stock: 1,
            min_stock_alert: 2
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Ensure numbers are numbers
            const formattedData = {
                ...data,
                total_stock: parseInt(data.total_stock),
                available_stock: parseInt(data.available_stock),
                min_stock_alert: parseInt(data.min_stock_alert)
            };

            if (initialData) {
                await updateDoc(doc(db, 'devices', initialData.id), formattedData);
            } else {
                await addDoc(collection(db, 'devices'), formattedData);
            }
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('Failed to save component');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Component Name"
                    {...register("name", { required: "Name is required" })}
                    error={errors.name}
                />
                <Input
                    label="Model / Part No"
                    {...register("model", { required: "Model is required" })}
                    error={errors.model}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                    Description
                </label>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    className="w-full rounded-md bg-navy-900 border-navy-600 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm h-20"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Input
                    label="Total Stock"
                    type="number"
                    {...register("total_stock", { required: true, min: 0 })}
                    error={errors.total_stock}
                />
                <Input
                    label="Available"
                    type="number"
                    {...register("available_stock", { required: true, min: 0 })}
                    error={errors.available_stock}
                />
                <Input
                    label="Low Stock Alert"
                    type="number"
                    {...register("min_stock_alert", { required: true, min: 0 })}
                    error={errors.min_stock_alert}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (initialData ? 'Update Component' : 'Add Component')}
                </Button>
            </div>
        </form>
    );
}
