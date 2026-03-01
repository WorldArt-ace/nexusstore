import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch { return []; }
    });
    const [isOpen, setIsOpen] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product, qty = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            }
            return [...prev, { ...product, qty }];
        });
        setIsOpen(true);
    };

    const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

    const updateQty = (id, qty) => {
        if (qty < 1) return removeItem(id);
        setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    };

    const clearCart = () => setItems([]);

    const applyCoupon = (code) => {
        const codes = { 'SAVE10': 10, 'SAVE20': 20, 'NEXUS50': 50 };
        if (codes[code.toUpperCase()]) {
            setDiscount(codes[code.toUpperCase()]);
            setCoupon(code.toUpperCase());
            return true;
        }
        return false;
    };

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{
            items, addItem, removeItem, updateQty, clearCart,
            isOpen, setIsOpen,
            coupon, setCoupon, discount, applyCoupon,
            subtotal, discountAmount, total, itemCount,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
