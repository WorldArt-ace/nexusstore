import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, Lock, ChevronRight, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const steps = ['Cart', 'Shipping', 'Payment', 'Confirm'];

export default function CheckoutPage() {
    const { items, subtotal, total, discountAmount, discount, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [placed, setPlaced] = useState(false);
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', zip: '', country: 'United States',
        cardName: '', cardNumber: '', expiry: '', cvv: '',
    });

    const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const placeOrder = () => {
        setPlaced(true);
        clearCart();
    };

    if (placed) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30"
                    >
                        <Check className="w-12 h-12 text-white" strokeWidth={3} />
                    </motion.div>
                    <h1 className="font-display font-black text-4xl mb-3">Order Placed! 🎉</h1>
                    <p className="text-slate-400 mb-2">Thank you for your purchase!</p>
                    <p className="text-slate-400 text-sm mb-8">Your order <span className="text-primary-500 font-bold">#NSX-{Date.now().toString().slice(-6)}</span> has been confirmed and will be shipped soon.</p>
                    <div className="flex gap-3 justify-center">
                        <Link to="/account/orders" className="btn-primary">Track Order</Link>
                        <Link to="/products" className="btn-secondary">Continue Shopping</Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display font-black text-3xl mb-8"
                >
                    Checkout
                </motion.h1>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-10 overflow-x-auto">
                    {steps.map((s, i) => (
                        <div key={s} className="flex items-center gap-2 flex-shrink-0">
                            <div className={`flex items-center gap-2 ${i < step ? 'cursor-pointer' : ''}`} onClick={() => i > 0 && i < step && setStep(i)}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-primary-500 text-white' : 'bg-white/10 text-slate-400'
                                    }`}>
                                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`text-sm font-medium ${i === step ? 'text-primary-500' : 'text-slate-400'}`}>{s}</span>
                            </div>
                            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-6 border border-white/10">
                                <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary-400" /> Shipping Information
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { k: 'firstName', label: 'First Name', placeholder: 'John', col: 1 },
                                        { k: 'lastName', label: 'Last Name', placeholder: 'Doe', col: 1 },
                                        { k: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email', col: 2 },
                                        { k: 'phone', label: 'Phone', placeholder: '+1 234 567 8900', col: 1 },
                                        { k: 'address', label: 'Address', placeholder: '123 Main Street', col: 2 },
                                        { k: 'city', label: 'City', placeholder: 'San Francisco', col: 1 },
                                        { k: 'zip', label: 'ZIP Code', placeholder: '94102', col: 1 },
                                    ].map(({ k, label, placeholder, type = 'text', col }) => (
                                        <div key={k} className={col === 2 ? 'sm:col-span-2' : ''}>
                                            <label className="block text-sm font-medium mb-1.5">{label}</label>
                                            <input
                                                type={type}
                                                value={form[k]}
                                                onChange={(e) => update(k, e.target.value)}
                                                placeholder={placeholder}
                                                className="input-field"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setStep(2)}
                                    className="btn-primary mt-6 flex items-center gap-2"
                                >
                                    Continue to Payment <ChevronRight className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-6 border border-white/10">
                                <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary-400" /> Payment Details
                                    <Lock className="w-4 h-4 text-green-500 ml-auto" />
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Card Number</label>
                                        <input
                                            type="text"
                                            value={form.cardNumber}
                                            onChange={(e) => update('cardNumber', e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19))}
                                            placeholder="1234 5678 9012 3456"
                                            className="input-field font-mono"
                                            maxLength={19}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Cardholder Name</label>
                                        <input type="text" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} placeholder="John Doe" className="input-field" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1.5">Expiry</label>
                                            <input type="text" value={form.expiry} onChange={(e) => update('expiry', e.target.value)} placeholder="MM / YY" className="input-field" maxLength={7} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1.5">CVV</label>
                                            <input type="text" value={form.cvv} onChange={(e) => update('cvv', e.target.value.replace(/\D/g, ''))} placeholder="123" className="input-field" maxLength={3} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => setStep(1)} className="btn-ghost flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">
                                        Review Order <ChevronRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-6 border border-white/10">
                                <h2 className="font-display font-bold text-xl mb-5">Order Review</h2>
                                <div className="space-y-3 mb-6">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-3 items-center">
                                            <img src={item.images[0]} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                                            </div>
                                            <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-white/10 pt-4 space-y-2 text-sm mb-6">
                                    <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                    {discountAmount > 0 && <div className="flex justify-between text-green-500"><span>Discount ({discount}%)</span><span>-${discountAmount.toFixed(2)}</span></div>}
                                    <div className="flex justify-between text-slate-400"><span>Shipping</span><span className="text-green-500">Free</span></div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10"><span>Total</span><span className="gradient-text">${total.toFixed(2)}</span></div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(2)} className="btn-ghost flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={placeOrder}
                                        className="btn-primary flex items-center gap-2 flex-1 justify-center"
                                    >
                                        <Lock className="w-4 h-4" /> Place Order ${total.toFixed(2)}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="glass rounded-2xl p-6 border border-white/10 h-fit sticky top-24">
                        <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-3 items-center">
                                    <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-slate-400">×{item.qty}</p>
                                    </div>
                                    <span className="text-sm font-bold">${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-slate-400"><span>Shipping</span><span className="text-green-500">Free</span></div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                                <span>Total</span><span className="gradient-text">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
