import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { createLendRequest } from '../lib/requests';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Loader2, CheckCircle, Copy, ExternalLink } from 'lucide-react';

export default function RequestForm({ onCancel, onSuccess }) {
    const { currentUser } = useAuth();
    const { cartItems } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: currentUser?.displayName || '',
            email: currentUser?.email || '',
            phone: '',
            admission_no: '',
            student_class: '',
            message: ''
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const userInfo = {
                uid: currentUser.uid,
                ...data
            };

            const result = await createLendRequest({
                userInfo,
                items: cartItems,
                message: data.message
            });

            setSubmittedId(result.id);
            // Don't call onSuccess immediately to show the success state
        } catch (err) {
            setError("Failed to submit request. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submittedId) {
        const adminNumber = "916238463653"; // Replace with actual admin number
        const message = `Hi, I've submitted a component request (ID: ${submittedId}).`;
        const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

        return (
            <div className="space-y-6 text-center py-4">
                <div className="flex justify-center text-green-400">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Request Submitted!</h3>
                <p className="text-slate-400 text-sm">
                    Your request ID is <span className="font-mono text-cyan-400">{submittedId}</span>
                </p>

                <div className="space-y-3">
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Notify Admin (WhatsApp)
                    </a>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            navigator.clipboard.writeText(submittedId);
                        }}
                    >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Request ID
                    </Button>

                    <Button variant="ghost" onClick={onSuccess} className="w-full">
                        Close
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-navy-900/80 p-4 sm:p-6 rounded-xl border border-navy-700 shadow-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 mb-6">Complete Request</h3>

            <Input
                label="Full Name"
                {...register("name", { required: "Name is required" })}
                error={errors.name}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Admission No"
                    {...register("admission_no", { required: "Admission No is required" })}
                    error={errors.admission_no}
                />
                <Input
                    label="Class/Batch"
                    {...register("student_class", { required: "Class is required" })}
                    error={errors.student_class}
                />
            </div>

            <Input
                label="Phone Number"
                type="tel"
                {...register("phone", {
                    required: "Phone is required",
                    pattern: { value: /^\d{10}$/, message: "Invalid phone number" }
                })}
                error={errors.phone}
            />

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                    Purpose / Message (Optional)
                </label>
                <textarea
                    {...register("message")}
                    className="w-full rounded-lg bg-navy-900/50 border-navy-600 text-slate-100 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 focus:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all duration-300 sm:text-sm h-20"
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Request'}
                </Button>
            </div>
        </form>
    );
}
