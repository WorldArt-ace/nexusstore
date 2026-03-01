import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, Heart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { categories } from '../data/products';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products', hasSubmenu: true },
    { label: 'Collections', to: '/products' },
    { label: 'About', to: '/about' },
    { label: 'Journal', to: '/about' },
];

export default function Navbar() {
    const { itemCount, setIsOpen: openCart } = useCart();
    const { isDark, toggle } = useTheme();
    const { user } = useAuth();
    const { items: wishlist } = useWishlist();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setMegaOpen(false);
        setSearchOpen(false);
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchVal.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchVal)}`);
            setSearchOpen(false);
            setSearchVal('');
        }
    };

    return (
        <>
            {/* Top bar - thin announcement */}
            <div className="bg-charcoal-800 text-cream-200 text-center py-2 px-4 text-xs font-sans tracking-widest uppercase" style={{ letterSpacing: '0.12em' }}>
                Complimentary Shipping on Orders Over $150 &nbsp;·&nbsp; Use Code <span className="text-gold-400 font-medium">SAVE10</span>
            </div>

            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-cream-100/95 shadow-sm backdrop-blur-md border-b border-brand-border'
                    : 'bg-cream-100 border-b border-brand-border'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center h-16 md:h-20">

                        {/* Left nav - desktop (1/3) */}
                        <nav className="hidden lg:flex items-center gap-8 flex-1">
                            {navLinks.slice(0, 2).map((link) => (
                                <div key={link.label} className="relative">
                                    {link.hasSubmenu ? (
                                        <button
                                            onMouseEnter={() => setMegaOpen(true)}
                                            onMouseLeave={() => setMegaOpen(false)}
                                            className="nav-item flex items-center gap-1"
                                        >
                                            {link.label}
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    ) : (
                                        <Link to={link.to} className="nav-item">{link.label}</Link>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Brand Name - CENTER (always, non-overlapping) */}
                        <div className="flex-1 flex justify-center lg:flex-none">
                            <Link to="/" className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-charcoal-800 hover:text-charcoal-600 transition-colors whitespace-nowrap">
                                NEXUS.
                            </Link>
                        </div>

                        {/* Right nav - desktop (1/3) */}
                        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
                            {navLinks.slice(2, 5).map((link) => (
                                <Link key={link.label} to={link.to} className="nav-item">{link.label}</Link>
                            ))}
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center gap-3 ml-4 lg:ml-6">
                            {/* Search */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Theme */}
                            <button
                                onClick={toggle}
                                className="p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors text-xs font-medium tracking-widest uppercase hidden sm:block"
                                style={{ letterSpacing: '0.1em', fontSize: '10px' }}
                            >
                                {isDark ? 'Light' : 'Dark'}
                            </button>

                            {/* Wishlist */}
                            <Link to="/account/wishlist" className="p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors relative hidden sm:block">
                                <Heart className="w-4 h-4" />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-gold-400 text-charcoal-900 text-xs rounded-full flex items-center justify-center font-semibold" style={{ fontSize: '8px' }}>
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <button
                                onClick={() => openCart(true)}
                                className="p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors relative"
                                aria-label="Cart"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-charcoal-800 text-cream-100 text-xs rounded-full flex items-center justify-center font-medium" style={{ fontSize: '9px' }}>
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* Account */}
                            <Link to={user ? '/account' : '/login'} className="p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors hidden sm:block">
                                <User className="w-4 h-4" />
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu */}
                <AnimatePresence>
                    {megaOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setMegaOpen(true)}
                            onMouseLeave={() => setMegaOpen(false)}
                            className="absolute top-full left-0 right-0 bg-cream-100 border-t border-b border-brand-border shadow-lg"
                        >
                            <div className="max-w-7xl mx-auto px-8 py-10">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            to={`/products/${cat.name}`}
                                            className="group text-center"
                                        >
                                            <div className="aspect-square rounded-none overflow-hidden img-zoom-wrap mb-3 bg-cream-300">
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="nav-item text-center text-charcoal-600 group-hover:text-gold-500">{cat.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div className="absolute inset-0 bg-charcoal-900/40" onClick={() => setMobileOpen(false)} />
                        <div className="absolute right-0 top-0 bottom-0 w-72 bg-cream-100 flex flex-col p-8 overflow-y-auto">
                            <button onClick={() => setMobileOpen(false)} className="self-end mb-8 text-charcoal-500">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="font-serif text-2xl font-semibold text-charcoal-800 mb-8">NEXUS.</div>
                            <nav className="space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        className="block py-3 border-b border-brand-border text-xs font-sans font-medium tracking-widest uppercase text-charcoal-700 hover:text-gold-500 transition-colors"
                                        style={{ letterSpacing: '0.12em' }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-8 space-y-4">
                                <Link to={user ? '/account' : '/login'} className="block text-xs nav-item">
                                    {user ? `Hello, ${user.name}` : 'Sign In'}
                                </Link>
                                <button onClick={toggle} className="block text-xs nav-item">
                                    {isDark ? 'Light Mode' : 'Dark Mode'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-6"
                    >
                        <div className="absolute inset-0 bg-charcoal-900/60" onClick={() => setSearchOpen(false)} />
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="relative w-full max-w-2xl bg-cream-100 p-8 shadow-2xl"
                        >
                            <p className="section-label mb-4 text-center">Search</p>
                            <form onSubmit={handleSearch} className="flex items-end gap-4 border-b-2 border-charcoal-800 pb-2">
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchVal}
                                    onChange={(e) => setSearchVal(e.target.value)}
                                    placeholder="Search products, collections…"
                                    className="flex-1 bg-transparent text-xl font-serif font-medium placeholder-charcoal-300 text-charcoal-800 outline-none"
                                />
                                <button type="submit" className="text-charcoal-600 hover:text-charcoal-900 pb-0.5">
                                    <Search className="w-5 h-5" />
                                </button>
                                <button type="button" onClick={() => setSearchOpen(false)} className="text-charcoal-300 hover:text-charcoal-600 pb-0.5">
                                    <X className="w-5 h-5" />
                                </button>
                            </form>
                            <div className="flex gap-3 mt-4 flex-wrap">
                                {['Electronics', 'Fashion', 'Accessories', 'Watches'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => { navigate(`/products/${t}`); setSearchOpen(false); }}
                                        className="text-xs font-sans text-charcoal-500 hover:text-gold-500 tracking-wider uppercase transition-colors"
                                        style={{ letterSpacing: '0.1em' }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
