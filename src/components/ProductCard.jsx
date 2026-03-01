import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Plus, Zap } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const { toggle, isWishlisted } = useWishlist();
    const [imgIndex, setImgIndex] = useState(0);
    const [adding, setAdding] = useState(false);
    const [hovered, setHovered] = useState(false);

    const wishHovered = isWishlisted(product.id);

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAdding(true);
        addItem(product);
        setTimeout(() => setAdding(false), 1200);
    };

    const wishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
    };

    const nextImg = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgIndex((i) => (i + 1) % product.images.length);
    };

    const prevImg = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgIndex((i) => (i - 1 + product.images.length) % product.images.length);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="product-card group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link to={`/product/${product.id}`} className="block">
                {/* Image */}
                <div className="card-image bg-cream-200">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={imgIndex}
                            src={product.images[imgIndex]}
                            alt={product.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Overlay */}
                    <div className="card-overlay">
                        {/* Add to Cart on hover */}
                        <AnimatePresence>
                            {hovered && (
                                <motion.button
                                    initial={{ y: 12, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 8, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    onClick={addToCart}
                                    className={`overlay-btn mx-4 w-full max-w-xs btn-dark text-xs py-3 shadow-lg ${adding ? 'bg-gold-500 text-charcoal-900' : ''}`}
                                >
                                    {adding ? (
                                        <><Zap className="w-3 h-3" /> Added!</>
                                    ) : (
                                        <><ShoppingBag className="w-3 h-3" /> Add to Bag</>
                                    )}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                        <div className="absolute top-3 left-3 bg-cream-100 text-charcoal-700 luxury-badge px-2.5 py-1" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
                            {product.badge}
                        </div>
                    )}

                    {/* Discount badge */}
                    {product.discount && (
                        <div className="absolute top-3 right-10 bg-charcoal-800 text-cream-100 luxury-badge px-2 py-1" style={{ fontSize: '9px' }}>
                            -{product.discount}%
                        </div>
                    )}

                    {/* Wishlist */}
                    <button
                        onClick={wishlist}
                        className="absolute top-3 right-3 p-1.5 text-charcoal-600 hover:text-gold-500 transition-colors"
                        aria-label="Wishlist"
                    >
                        <Heart className={`w-4 h-4 ${wishHovered ? 'fill-gold-400 text-gold-400' : ''}`} />
                    </button>

                    {/* Image navigation dots */}
                    {product.images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {product.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImgIndex(i); }}
                                    className={`rounded-full transition-all duration-300 ${i === imgIndex ? 'w-4 h-1.5 bg-cream-100' : 'w-1.5 h-1.5 bg-cream-100/50'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Card Info */}
                <div className="pt-4 pb-1 px-1 text-center">
                    <p className="card-label">{product.category}</p>
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-price mt-1.5">
                        ${product.price.toFixed(2)}
                        {product.originalPrice > product.price && (
                            <span className="text-charcoal-300 line-through ml-2 text-xs">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
