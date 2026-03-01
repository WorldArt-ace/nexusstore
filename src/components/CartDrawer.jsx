import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQty, subtotal, total, discountAmount, discount, applyCoupon, clearCart } = useCart();
    const [couponInput, setCouponInput] = useState('');
    const [couponMsg, setCouponMsg] = useState('');

    const handleCoupon = () => {
        if (applyCoupon(couponInput)) {
            setCouponMsg(`Applied — ${discount}% discount active`);
        } else {
            setCouponMsg('Invalid code. Try SAVE10, SAVE20, or NEXUS50');
        }
        setTimeout(() => setCouponMsg(''), 3500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-50 bg-charcoal-900/50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                        className="cart-drawer shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-7 py-5 border-b border-brand-border">
                            <div>
                                <h2 className="font-serif font-medium text-charcoal-800 text-lg">Your Bag</h2>
                                <p className="text-xs font-sans text-charcoal-400 mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {items.length > 0 && (
                                    <button onClick={clearCart} className="text-xs font-sans text-charcoal-400 hover:text-charcoal-700 transition-colors tracking-wider" style={{ letterSpacing: '0.08em' }}>
                                        Clear Bag
                                    </button>
                                )}
                                <button onClick={() => setIsOpen(false)} className="text-charcoal-400 hover:text-charcoal-700 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto py-2">
                            <AnimatePresence>
                                {items.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center h-full text-center px-8 py-20"
                                    >
                                        <ShoppingBag className="w-10 h-10 text-charcoal-300 mb-4" strokeWidth={1} />
                                        <p className="font-serif font-medium text-charcoal-700 text-xl mb-1">Your bag is empty</p>
                                        <p className="text-xs font-sans text-charcoal-400 mb-6">Discover something you love.</p>
                                        <button onClick={() => setIsOpen(false)} className="btn-dark text-xs">
                                            Continue Shopping
                                        </button>
                                    </motion.div>
                                ) : (
                                    items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 px-7 py-5 border-b border-brand-border group hover:bg-cream-200/50 transition-colors"
                                        >
                                            {/* Image */}
                                            <Link to={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                                                <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-cream-200">
                                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                                </div>
                                            </Link>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                                <div>
                                                    <p className="text-xs font-sans font-medium text-gold-500 uppercase tracking-wider mb-0.5" style={{ letterSpacing: '0.1em' }}>{item.category}</p>
                                                    <Link to={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                                                        <p className="font-serif font-medium text-charcoal-800 text-sm leading-snug hover:text-gold-500 transition-colors">{item.name}</p>
                                                    </Link>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    {/* Qty controls */}
                                                    <div className="flex items-center gap-2 border border-brand-border">
                                                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-charcoal-500 hover:bg-cream-300 transition-colors">
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs font-sans font-semibold w-5 text-center text-charcoal-800">{item.qty}</span>
                                                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-charcoal-500 hover:bg-cream-300 transition-colors">
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <p className="font-sans font-semibold text-sm text-charcoal-800">${(item.price * item.qty).toFixed(2)}</p>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <button onClick={() => removeItem(item.id)} className="self-start mt-1 text-charcoal-300 hover:text-charcoal-700 transition-colors opacity-0 group-hover:opacity-100">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="px-7 py-6 border-t border-brand-border space-y-5 bg-cream-200/50">
                                {/* Coupon */}
                                <div className="flex items-end gap-3 border-b border-charcoal-300 pb-2 focus-within:border-gold-400 transition-colors">
                                    <Tag className="w-3.5 h-3.5 text-charcoal-400 mb-1 flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCoupon()}
                                        placeholder="Discount code"
                                        className="flex-1 bg-transparent text-xs font-sans text-charcoal-700 placeholder-charcoal-400 outline-none"
                                    />
                                    <button onClick={handleCoupon} className="text-xs font-sans font-medium text-charcoal-600 hover:text-gold-500 uppercase tracking-wide transition-colors">
                                        Apply
                                    </button>
                                </div>
                                {couponMsg && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`text-xs font-sans ${couponMsg.includes('Applied') ? 'text-green-700' : 'text-red-600'}`}
                                    >
                                        {couponMsg}
                                    </motion.p>
                                )}

                                {/* Totals */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-sans text-charcoal-500">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discountAmount > 0 && (
                                        <div className="flex justify-between text-xs font-sans text-green-700">
                                            <span>Discount ({discount}%)</span>
                                            <span>−${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-xs font-sans text-charcoal-500">
                                        <span>Shipping</span>
                                        <span className="text-green-700">Free</span>
                                    </div>
                                    <div className="flex justify-between font-serif font-medium text-base text-charcoal-800 pt-2 border-t border-brand-border">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full btn-dark flex items-center justify-center gap-3 py-4"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                </Link>
                                <button onClick={() => setIsOpen(false)} className="w-full text-center text-xs font-sans font-medium text-charcoal-400 hover:text-charcoal-700 transition-colors tracking-wide uppercase" style={{ letterSpacing: '0.08em' }}>
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
