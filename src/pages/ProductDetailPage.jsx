import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart, Heart, Star, ChevronLeft, ChevronRight,
    Shield, Truck, RefreshCw, Minus, Plus, Zap, Check,
    Package, Award, ThumbsUp, Share2, MessageSquare, Clock,
    Tag, BarChart2, ChevronDown, ChevronUp
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

/* ─── helpers ─── */
function Stars({ rating, size = 'sm' }) {
    const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, j) => (
                <Star key={j} className={`${cls} ${j < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : j < rating ? 'text-amber-300 fill-amber-300' : 'text-slate-300 dark:text-slate-600'}`} />
            ))}
        </div>
    );
}

const COLORS = ['#1a1a2e', '#e94560', '#0f3460', '#533483', '#16213e'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const reviewsData = [
    { id: 1, name: "Alex Chen", avatar: "https://i.pravatar.cc/80?img=3", rating: 5, title: "Absolutely mind-blowing!", comment: "Best purchase I've made this year. The build quality is incredible and it works exactly as advertised. Highly recommend to anyone considering it.", date: "1 week ago", helpful: 42, verified: true },
    { id: 2, name: "Maria Santos", avatar: "https://i.pravatar.cc/80?img=7", rating: 4, title: "Great quality, fast shipping", comment: "Really happy with my order. Packaging was premium, arrived 2 days early. Only small gripe is could be a tiny bit lighter, but overall 10/10.", date: "2 weeks ago", helpful: 28, verified: true },
    { id: 3, name: "Ryan Park", avatar: "https://i.pravatar.cc/80?img=11", rating: 5, title: "Exceeded every expectation", comment: "I was skeptical at first but this is genuinely excellent. The attention to detail is clear from the moment you open the box.", date: "3 weeks ago", helpful: 19, verified: true },
    { id: 4, name: "Priya Nair", avatar: "https://i.pravatar.cc/80?img=25", rating: 4, title: "Solid product, great value", comment: "Compared to competitors at twice the price, this punches way above its weight. Would definitely buy from this store again.", date: "1 month ago", helpful: 15, verified: false },
    { id: 5, name: "Jordan Lee", avatar: "https://i.pravatar.cc/80?img=32", rating: 5, title: "Perfect gift choice", comment: "Bought as a gift and the recipient was absolutely thrilled. Looks even better in person than in the photos.", date: "1 month ago", helpful: 11, verified: true },
    { id: 6, name: "Sophie Turner", avatar: "https://i.pravatar.cc/80?img=47", rating: 3, title: "Good but leave room to improve", comment: "Solid product overall. The core function works great but a few minor UX things could be smoother. Still a positive experience.", date: "2 months ago", helpful: 7, verified: false },
];

const ratingBuckets = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviewsData.filter(r => Math.round(r.rating) === star).length,
    pct: Math.round((reviewsData.filter(r => Math.round(r.rating) === star).length / reviewsData.length) * 100)
}));

export default function ProductDetailPage() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const { addItem } = useCart();
    const { toggle, isWishlisted } = useWishlist();

    const [imgIndex, setImgIndex] = useState(0);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);
    const [tab, setTab] = useState('description');
    const [selColor, setSelColor] = useState(COLORS[0]);
    const [selSize, setSelSize] = useState('M');
    const [expandSpec, setExpandSpec] = useState(false);
    const [helpfulIds, setHelpfulIds] = useState([]);

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
        setTimeout(() => setAdding(false), 1800);
    };

    const markHelpful = (reviewId) => {
        setHelpfulIds(prev => prev.includes(reviewId) ? prev.filter(x => x !== reviewId) : [...prev, reviewId]);
    };

    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const avgRating = (reviewsData.reduce((s, r) => s + r.rating, 0) / reviewsData.length).toFixed(1);

    const specs = [
        { label: 'Brand', value: 'NexusStore Premium' },
        { label: 'Model', value: product.name },
        { label: 'Category', value: product.category },
        { label: 'Warranty', value: '2-year limited' },
        { label: 'Material', value: 'Premium Grade' },
        { label: 'Weight', value: '380g' },
        { label: 'Dimensions', value: '18 × 14 × 8 cm' },
        { label: 'Color', value: 'Multiple options' },
        { label: 'In The Box', value: 'Product, Manual, Accessories' },
        { label: 'Made In', value: 'Japan / South Korea' },
    ];

    const visibleSpecs = expandSpec ? specs : specs.slice(0, 5);

    return (
        <div className="min-h-screen pt-20 pb-20 bg-white dark:bg-dark-300 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Breadcrumb ── */}
                <motion.nav
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-8 pt-4"
                >
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        { label: product.category, href: `/products/${product.category}` },
                        { label: product.name, href: null },
                    ].map((crumb, i, arr) => (
                        <span key={i} className="flex items-center gap-1.5">
                            {crumb.href
                                ? <Link to={crumb.href} className="hover:text-primary-500 transition-colors capitalize">{crumb.label}</Link>
                                : <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[160px]">{crumb.label}</span>
                            }
                            {i < arr.length - 1 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
                        </span>
                    ))}
                </motion.nav>

                {/* ── Main grid ── */}
                <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

                    {/* LEFT: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:sticky lg:top-24 self-start"
                    >
                        {/* Main image */}
                        <div className="relative glass rounded-3xl overflow-hidden aspect-square mb-4 group shadow-2xl border border-white/10">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={imgIndex}
                                    src={product.images[imgIndex]}
                                    alt={product.name}
                                    initial={{ opacity: 0, scale: 1.08 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.93 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Badge */}
                            <div className={`absolute top-4 left-4 badge text-white text-xs font-bold px-3 py-1 rounded-full ${product.badgeColor}`}>
                                {product.badge}
                            </div>

                            {/* Discount pill */}
                            {product.originalPrice > product.price && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    -{product.discount}% OFF
                                </div>
                            )}

                            {/* Wishlist overlay */}
                            <motion.button
                                whileTap={{ scale: 0.88 }}
                                onClick={() => toggle(product)}
                                className={`absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${isWishlisted(product.id) ? 'bg-red-500 text-white' : 'bg-black/40 backdrop-blur-sm text-white hover:bg-red-500'}`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-white' : ''}`} />
                            </motion.button>

                            {/* Nav arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setImgIndex(i => (i - 1 + product.images.length) % product.images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setImgIndex(i => (i + 1) % product.images.length)}
                                        className="absolute right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            {/* Image counter */}
                            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                {imgIndex + 1} / {product.images.length}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {product.images.map((img, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setImgIndex(i)}
                                    className={`relative rounded-2xl overflow-hidden flex-shrink-0 w-20 h-20 border-2 transition-all duration-200 ${i === imgIndex ? 'border-primary-500 shadow-lg shadow-primary-500/30 scale-105' : 'border-white/20 hover:border-white/50'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    {i === imgIndex && (
                                        <div className="absolute inset-0 bg-primary-500/10" />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Share & Report row */}
                        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10">
                            <span className="text-xs text-slate-400 font-medium">Share:</span>
                            {['Twitter', 'Facebook', 'Copy Link'].map(s => (
                                <button key={s} className="text-xs text-slate-500 hover:text-primary-500 transition-colors px-2 py-1 glass rounded-lg border border-white/10">
                                    {s}
                                </button>
                            ))}
                            <button className="ml-auto flex items-center gap-1 text-xs text-slate-400 hover:text-primary-500 transition-colors">
                                <Share2 className="w-3.5 h-3.5" /> Share
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT: Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Category + Title + Rating */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-widest bg-primary-500/10 px-3 py-1 rounded-full">
                                    {product.category}
                                </span>
                                {product.inStock
                                    ? <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-3 py-1 rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> In Stock</span>
                                    : <span className="text-xs font-semibold text-red-500 bg-red-500/10 px-3 py-1 rounded-full">Out of Stock</span>
                                }
                            </div>

                            <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-3 dark:text-white">
                                {product.name}
                            </h1>

                            {/* Rating row */}
                            <div className="flex flex-wrap items-center gap-3">
                                <Stars rating={product.rating} size="md" />
                                <span className="font-black text-amber-500 text-lg">{product.rating}</span>
                                <span className="text-slate-400 text-sm">({product.reviews.toLocaleString()} verified reviews)</span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Award className="w-3.5 h-3.5 text-primary-400" /> Top Rated
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 p-4 glass rounded-2xl border border-white/10">
                            <span className="font-display font-black text-4xl gradient-text">${product.price.toFixed(2)}</span>
                            {product.originalPrice > product.price && (
                                <>
                                    <span className="text-xl text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                                    <span className="text-sm font-bold text-green-500">
                                        You save ${(product.originalPrice - product.price).toFixed(2)}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                            {product.description}
                        </p>

                        {/* Key Features */}
                        <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Key Features</h3>
                            <div className="grid grid-cols-2 gap-2.5">
                                {product.features.map((f, i) => (
                                    <motion.div
                                        key={f}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-2.5 glass rounded-xl px-3 py-2.5 border border-white/10 hover:border-primary-500/30 transition-colors"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                                            <Zap className="w-3.5 h-3.5 text-primary-400" />
                                        </div>
                                        <span className="text-xs font-medium leading-tight">{f}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Color Selector */}
                        <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">
                                Color: <span className="text-slate-600 dark:text-slate-300 normal-case capitalize font-bold">
                                    {selColor === '#1a1a2e' ? 'Midnight' : selColor === '#e94560' ? 'Rose' : selColor === '#0f3460' ? 'Navy' : selColor === '#533483' ? 'Purple' : 'Dark'}
                                </span>
                            </h3>
                            <div className="flex gap-3">
                                {COLORS.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setSelColor(c)}
                                        title={c}
                                        style={{ backgroundColor: c }}
                                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${selColor === c ? 'border-primary-500 scale-110 shadow-lg' : 'border-white/20 hover:scale-105'}`}
                                    >
                                        {selColor === c && <Check className="w-4 h-4 text-white mx-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">
                                    Size: <span className="text-slate-600 dark:text-slate-300 normal-case font-bold">{selSize}</span>
                                </h3>
                                <button className="text-xs text-primary-500 hover:underline">Size Guide</button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {SIZES.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelSize(s)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${selSize === s
                                            ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                                            : 'border-white/20 hover:border-white/50 glass text-slate-500 dark:text-slate-400'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity + Stock */}
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-sm text-slate-400 uppercase tracking-wider">Qty:</span>
                            <div className="flex items-center glass rounded-xl border border-white/20 overflow-hidden">
                                <button
                                    onClick={() => setQty(q => Math.max(1, q - 1))}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-black w-10 text-center text-base">{qty}</span>
                                <button
                                    onClick={() => setQty(q => q + 1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-green-500 font-semibold">In Stock</span>
                                <span className="text-slate-400">· Only 12 left</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleAddToCart}
                                disabled={!product.inStock || adding}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg ${adding
                                    ? 'bg-green-500 text-white shadow-green-500/30'
                                    : 'btn-primary'
                                    }`}
                            >
                                {adding ? (
                                    <><Check className="w-5 h-5" /> Added to Cart!</>
                                ) : (
                                    <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggle(product)}
                                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${isWishlisted(product.id)
                                    ? 'border-red-500 bg-red-500 text-white'
                                    : 'border-white/20 hover:border-red-500 hover:text-red-500 glass'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-white' : ''}`} />
                            </motion.button>
                        </div>

                        {/* Buy Now secondary */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-2xl font-bold border-2 border-primary-500/50 text-primary-500 hover:bg-primary-500/10 transition-all duration-200 text-sm"
                        >
                            ⚡ Buy Now — Instant Checkout
                        </motion.button>

                        {/* Delivery estimator */}
                        <div className="glass rounded-2xl border border-white/10 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Truck className="w-4 h-4 text-primary-400" />
                                <span className="font-semibold text-sm">Estimated Delivery</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                {[
                                    { label: 'Standard', time: '5–7 days', price: 'Free' },
                                    { label: 'Express', time: '2–3 days', price: '$9.99' },
                                    { label: 'Overnight', time: 'Next day', price: '$24.99' },
                                ].map(opt => (
                                    <div key={opt.label} className="bg-white/5 rounded-xl p-2.5">
                                        <p className="font-bold text-slate-600 dark:text-slate-300">{opt.label}</p>
                                        <p className="text-primary-400 font-semibold">{opt.time}</p>
                                        <p className="text-slate-400">{opt.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: Truck, title: 'Free Shipping', text: 'Orders over $50', color: 'text-blue-400' },
                                { icon: Shield, title: 'Secure Pay', text: '100% Protected', color: 'text-green-400' },
                                { icon: RefreshCw, title: 'Easy Returns', text: '30-day policy', color: 'text-purple-400' },
                            ].map(({ icon: Icon, title, text, color }) => (
                                <div key={title} className="text-center glass rounded-2xl p-3 border border-white/10 hover:border-primary-500/20 transition-colors">
                                    <Icon className={`w-5 h-5 mx-auto ${color} mb-1.5`} />
                                    <p className="font-bold text-xs">{title}</p>
                                    <p className="text-xs text-slate-400">{text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── Tabs Section ── */}
                <div className="mt-20">
                    {/* Tab nav */}
                    <div className="flex gap-1 border-b border-white/10 mb-8 overflow-x-auto">
                        {[
                            { key: 'description', label: 'Description', icon: Tag },
                            { key: 'specs', label: 'Specifications', icon: BarChart2 },
                            { key: 'reviews', label: `Reviews (${reviewsData.length})`, icon: MessageSquare },
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setTab(key)}
                                className={`flex items-center gap-2 px-5 py-3.5 font-semibold text-sm whitespace-nowrap transition-all duration-200 relative ${tab === key ? 'text-primary-500' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                                {tab === key && (
                                    <motion.div
                                        layoutId="tab-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {/* DESCRIPTION TAB */}
                        {tab === 'description' && (
                            <motion.div
                                key="desc"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                <div className="max-w-3xl">
                                    <h2 className="font-display font-bold text-2xl mb-4">About This Product</h2>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{product.description}</p>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Designed for those who demand the best, this product combines cutting-edge technology with premium materials to deliver an experience unlike any other. Whether you're a professional or an enthusiast, every detail has been crafted with you in mind.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-4">What's In The Box</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {['Main Product Unit', 'Premium Carrying Case', 'USB-C Charging Cable', 'Quick Start Guide', 'Warranty Card', '2-Year Warranty'].map((item, i) => (
                                            <div key={item} className="flex items-center gap-3 glass rounded-xl px-4 py-3 border border-white/10">
                                                <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 text-xs flex items-center justify-center font-bold flex-shrink-0">
                                                    {i + 1}
                                                </div>
                                                <span className="text-sm font-medium">{item}</span>
                                                <Check className="w-4 h-4 text-green-500 ml-auto" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-4">All Features</h3>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {product.features.map((f, i) => (
                                            <motion.div
                                                key={f}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="flex items-center gap-3 glass rounded-xl p-4 border border-white/10 hover:border-primary-500/30 transition-colors"
                                            >
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
                                                    <Zap className="w-4 h-4 text-primary-400" />
                                                </div>
                                                <span className="font-medium text-sm">{f}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* SPECS TAB */}
                        {tab === 'specs' && (
                            <motion.div
                                key="specs"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <h2 className="font-display font-bold text-2xl mb-6">Technical Specifications</h2>
                                <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                                    {visibleSpecs.map((s, i) => (
                                        <div key={s.label} className={`flex items-center justify-between px-5 py-4 text-sm ${i % 2 === 0 ? 'bg-white/3' : ''} ${i < visibleSpecs.length - 1 ? 'border-b border-white/10' : ''}`}>
                                            <span className="text-slate-400 font-medium">{s.label}</span>
                                            <span className="font-semibold text-right dark:text-white">{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setExpandSpec(!expandSpec)}
                                    className="flex items-center gap-2 mt-3 text-sm text-primary-500 hover:text-primary-400 transition-colors font-semibold"
                                >
                                    {expandSpec ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All Specs</>}
                                </button>
                            </motion.div>
                        )}

                        {/* REVIEWS TAB */}
                        {tab === 'reviews' && (
                            <motion.div
                                key="reviews"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                {/* Rating Summary */}
                                <div className="grid md:grid-cols-2 gap-8 glass rounded-2xl border border-white/10 p-6">
                                    {/* Left: big score */}
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <span className="font-black text-7xl gradient-text leading-none">{avgRating}</span>
                                        <Stars rating={Number(avgRating)} size="md" />
                                        <p className="text-slate-400 text-sm mt-2">{reviewsData.length} reviews</p>
                                        <div className="flex gap-1 mt-3 text-xs text-slate-400">
                                            <Package className="w-3.5 h-3.5 text-green-400" />
                                            {reviewsData.filter(r => r.verified).length} verified purchases
                                        </div>
                                    </div>

                                    {/* Right: bar chart */}
                                    <div className="space-y-2.5">
                                        {ratingBuckets.map(({ star, count, pct }) => (
                                            <div key={star} className="flex items-center gap-3 text-sm">
                                                <span className="text-slate-400 w-8 text-right font-medium">{star}★</span>
                                                <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ duration: 0.8, delay: star * 0.05 }}
                                                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                                                    />
                                                </div>
                                                <span className="text-slate-400 w-6">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Review Cards */}
                                <div className="space-y-4">
                                    {reviewsData.map((r, i) => (
                                        <motion.div
                                            key={r.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                            className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-colors"
                                        >
                                            <div className="flex items-start gap-4">
                                                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-white/10" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <span className="font-bold text-sm">{r.name}</span>
                                                        {r.verified && (
                                                            <span className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                                                                <Check className="w-3 h-3" /> Verified
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                                                            <Clock className="w-3 h-3" /> {r.date}
                                                        </span>
                                                    </div>
                                                    <Stars rating={r.rating} size="sm" />
                                                    <p className="font-semibold text-sm mt-2 mb-1">{r.title}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{r.comment}</p>
                                                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
                                                        <span className="text-xs text-slate-400">Helpful?</span>
                                                        <motion.button
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => markHelpful(r.id)}
                                                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${helpfulIds.includes(r.id) ? 'bg-primary-500/20 text-primary-500' : 'glass border border-white/10 hover:border-primary-500/30 text-slate-400'}`}
                                                        >
                                                            <ThumbsUp className="w-3.5 h-3.5" />
                                                            Yes &nbsp;({r.helpful + (helpfulIds.includes(r.id) ? 1 : 0)})
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Related Products ── */}
                {related.length > 0 && (
                    <div className="mt-24">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="font-display font-bold text-2xl">You May Also Like</h2>
                                <p className="text-slate-400 text-sm mt-1">Handpicked from the same category</p>
                            </div>
                            <Link to={`/products/${product.category}`} className="text-sm text-primary-500 hover:underline font-semibold hidden sm:block">
                                View All →
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
