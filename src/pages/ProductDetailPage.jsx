import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Shield, Truck, RefreshCw, ArrowLeft, Minus, Plus, Zap } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const { addItem } = useCart();
    const { toggle, isWishlisted } = useWishlist();
    const [imgIndex, setImgIndex] = useState(0);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);
    const [tab, setTab] = useState('description');

    if (!product) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="font-display font-bold text-2xl mb-4">Product not found</h2>
                <Link to="/products" className="btn-primary inline-flex">Back to Products</Link>
            </div>
        </div>
    );

    const handleAddToCart = () => {
        setAdding(true);
        addItem(product, qty);
        setTimeout(() => setAdding(false), 1500);
    };

    const reviews = [
        { id: 1, name: "Alex Chen", avatar: "https://i.pravatar.cc/60?img=3", rating: 5, comment: "Absolutely love this product! Exceeded all my expectations.", date: "1 week ago" },
        { id: 2, name: "Maria Santos", avatar: "https://i.pravatar.cc/60?img=7", rating: 4, comment: "Great quality and fast shipping. Would definitely buy again.", date: "2 weeks ago" },
        { id: 3, name: "Ryan Park", avatar: "https://i.pravatar.cc/60?img=11", rating: 5, comment: "Perfect in every way. The build quality is exceptional.", date: "3 weeks ago" },
    ];

    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-sm text-slate-400 mb-8"
                >
                    <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-primary-500 transition-colors">Products</Link>
                    <span>/</span>
                    <Link to={`/products/${product.category}`} className="hover:text-primary-500 transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span className="text-slate-600 dark:text-slate-300 truncate">{product.name}</span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative glass rounded-2xl overflow-hidden aspect-square mb-4 group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={imgIndex}
                                    src={product.images[imgIndex]}
                                    alt={product.name}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Badge */}
                            <div className={`absolute top-4 left-4 badge text-white ${product.badgeColor}`}>
                                {product.badge}
                            </div>

                            {/* Nav buttons */}
                            <button
                                onClick={() => setImgIndex(i => (i - 1 + product.images.length) % product.images.length)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setImgIndex(i => (i + 1) % product.images.length)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setImgIndex(i)}
                                    className={`relative rounded-xl overflow-hidden flex-shrink-0 w-20 h-20 border-2 transition-all duration-200 ${i === imgIndex ? 'border-primary-500 shadow-lg shadow-primary-500/30' : 'border-white/20 hover:border-white/50'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col gap-5"
                    >
                        <div>
                            <p className="text-sm font-semibold text-primary-500 uppercase tracking-wide mb-1">{product.category}</p>
                            <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-3">{product.name}</h1>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className={`w-4 h-4 ${j < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-slate-300'}`} />
                                    ))}
                                </div>
                                <span className="font-bold text-gold-500">{product.rating}</span>
                                <span className="text-slate-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
                            </div>

                            <div className="flex items-baseline gap-3">
                                <span className="font-display font-black text-4xl gradient-text">${product.price.toFixed(2)}</span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-xl text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                                        <span className="badge bg-accent-500 text-white">-{product.discount}% OFF</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{product.description}</p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-2">
                            {product.features.map((f) => (
                                <div key={f} className="flex items-center gap-2 text-sm glass rounded-lg px-3 py-2 border border-white/10">
                                    <Zap className="w-3 h-3 text-primary-400 flex-shrink-0" />
                                    {f}
                                </div>
                            ))}
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-sm">Quantity:</span>
                            <div className="flex items-center gap-3 glass rounded-xl border border-white/20 px-3 py-2">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="hover:text-primary-500 transition-colors">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold w-8 text-center">{qty}</span>
                                <button onClick={() => setQty(q => q + 1)} className="hover:text-primary-500 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className={`text-sm font-semibold ${product.inStock ? 'text-green-500' : 'text-accent-500'}`}>
                                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                            </span>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleAddToCart}
                                disabled={!product.inStock || adding}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all duration-300 ${adding ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'btn-primary'
                                    }`}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {adding ? 'Added to Cart!' : 'Add to Cart'}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggle(product)}
                                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${isWishlisted(product.id)
                                        ? 'border-accent-500 bg-accent-500 text-white'
                                        : 'border-white/20 hover:border-accent-500 hover:text-accent-500 glass'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-white' : ''}`} />
                            </motion.button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-3 pt-2">
                            {[
                                { icon: Truck, title: 'Free Shipping', text: 'Orders over $50' },
                                { icon: Shield, title: 'Secure Payment', text: '100% Protected' },
                                { icon: RefreshCw, title: 'Easy Returns', text: '30-day policy' },
                            ].map(({ icon: Icon, title, text }) => (
                                <div key={title} className="text-center glass rounded-xl p-3 border border-white/10">
                                    <Icon className="w-5 h-5 mx-auto text-primary-400 mb-1" />
                                    <p className="font-semibold text-xs">{title}</p>
                                    <p className="text-xs text-slate-400">{text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Tabs: Description / Reviews */}
                <div className="mt-16">
                    <div className="flex gap-1 border-b border-white/10 mb-8">
                        {['description', 'reviews'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-6 py-3 font-semibold text-sm capitalize transition-all duration-200 relative ${tab === t ? 'text-primary-500' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {t}
                                {tab === t && (
                                    <motion.div
                                        layoutId="tab-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {tab === 'description' ? (
                            <motion.div
                                key="desc"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="prose dark:prose-invert max-w-none"
                            >
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{product.description}</p>
                                <div className="mt-6 grid md:grid-cols-2 gap-4">
                                    {product.features.map(f => (
                                        <div key={f} className="flex items-center gap-3 glass rounded-xl p-4 border border-white/10">
                                            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-primary-400" />
                                            </div>
                                            <span className="font-medium">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="reviews"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                {reviews.map(r => (
                                    <div key={r.id} className="glass rounded-xl p-5 border border-white/10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold">{r.name}</p>
                                                <p className="text-xs text-slate-400">{r.date}</p>
                                            </div>
                                            <div className="ml-auto flex items-center gap-1">
                                                {[...Array(5)].map((_, j) => (
                                                    <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? 'text-gold-400 fill-gold-400' : 'text-slate-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{r.comment}</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <h2 className="font-display font-bold text-2xl mb-6">Related Products</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
