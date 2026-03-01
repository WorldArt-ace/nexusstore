import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ChevronLeft, ChevronRight, ArrowUpRight, Leaf, Sparkles, Truck } from 'lucide-react';
import { products, categories, heroSlides, promoOffers } from '../data/products';
import ProductCard from '../components/ProductCard';

// Scroll-reveal wrapper
function Reveal({ children, delay = 0, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Hero Section — full-bleed editorial
function HeroSection() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 6000);
        return () => clearInterval(id);
    }, []);

    const slide = heroSlides[current];

    return (
        <section className="relative min-h-[580px] h-[88vh] md:h-screen md:max-h-[900px] overflow-hidden">
            {/* Background image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    {/* Stronger bottom gradient on mobile for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/40 to-charcoal-900/10 md:bg-gradient-to-r md:from-charcoal-900/75 md:via-charcoal-900/30 md:to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content — anchored to bottom on mobile, centered vertically on desktop */}
            <div className="relative z-10 h-full flex items-end md:items-center pb-20 md:pb-0">
                <div className="max-w-7xl mx-auto px-5 md:px-8 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-lg"
                        >
                            <p className="text-xs font-sans font-medium text-gold-400 uppercase mb-3" style={{ letterSpacing: '0.25em' }}>
                                {slide.badge}
                            </p>
                            <h1
                                className="font-serif font-semibold text-white leading-tight mb-4"
                                style={{ fontSize: 'clamp(1.85rem, 7vw, 5rem)', lineHeight: '1.1' }}
                            >
                                {slide.title}<br />
                                <em className="font-serif-italic font-normal">{slide.subtitle}</em>
                            </h1>
                            <p className="text-cream-300 text-sm font-sans font-light leading-relaxed mb-5 max-w-sm hidden sm:block">
                                {slide.description}
                            </p>
                            {/* Buttons: side-by-side and compact on mobile */}
                            <div className="flex items-center gap-3">
                                <Link
                                    to={slide.ctaLink}
                                    className="btn-dark flex-1 sm:flex-none justify-center"
                                >
                                    {slide.cta}
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    to="/products"
                                    className="btn-outline-light flex-1 sm:flex-none justify-center text-center"
                                >
                                    View All
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Slide dots — always visible at bottom centre */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-400 ${i === current ? 'w-8 h-1.5 bg-gold-400' : 'w-2 h-1.5 bg-white/40'}`}
                    />
                ))}
            </div>

            {/* Slide nav arrows — desktop only (hidden on mobile to avoid overlap) */}
            <button
                onClick={() => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length)}
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/30 text-white hover:bg-white/10 items-center justify-center transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button
                onClick={() => setCurrent(c => (c + 1) % heroSlides.length)}
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/30 text-white hover:bg-white/10 items-center justify-center transition-colors"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </section>
    );
}

// Trust bar — like Lumière's 3-column feature strip
function TrustBar() {
    const features = [
        { icon: Leaf, title: 'Sustainable Sourcing', text: 'Ethically made, globally conscious.' },
        { icon: Sparkles, title: 'Premium Quality', text: 'Curated for the discerning few.' },
        { icon: Truck, title: 'Free Shipping', text: 'On all orders over $150.' },
    ];

    return (
        <div className="bg-cream-200 border-b border-brand-border">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-3 divide-x divide-brand-border">
                    {features.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="flex flex-col items-center text-center py-5 md:py-8 px-3 md:px-6 gap-1.5">
                            <Icon className="w-4 h-4 md:w-5 md:h-5 text-gold-500 mb-1" strokeWidth={1.5} />
                            <p className="text-xs font-sans font-semibold text-charcoal-600 uppercase hidden md:block" style={{ letterSpacing: '0.1em' }}>{title}</p>
                            <p className="text-xs font-sans font-semibold text-charcoal-600 uppercase md:hidden" style={{ letterSpacing: '0.08em', fontSize: '9px' }}>{title.split(' ')[0]}</p>
                            <p className="text-xs font-sans text-charcoal-400 font-light hidden sm:block">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Featured Products — editorial grid, like Lumière
function FeaturedSection() {
    return (
        <section className="py-20 md:py-28 bg-cream-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <Reveal className="text-center mb-14">
                    <p className="section-label">New Arrivals</p>
                    <h2 className="section-heading">Curated Selection</h2>
                    <span className="hr-gold" />
                    <p className="text-sm font-sans text-charcoal-400 font-light max-w-md mx-auto">Discover pieces crafted with intention, designed to elevate every space.</p>
                </Reveal>

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {products.slice(0, 4).map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.08}>
                            <ProductCard product={p} />
                        </Reveal>
                    ))}
                </div>

                {/* CTA */}
                <Reveal className="text-center mt-14">
                    <Link to="/products" className="btn-dark">
                        View All Products
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}

// Editorial banner — full-width alternating image + text
function EditorialBanner() {
    return (
        <section className="bg-cream-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-0 items-center">
                    {/* Image */}
                    <div className="img-zoom-wrap aspect-[4/3] bg-cream-300">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                            alt="Collection"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Text */}
                    <Reveal className="px-8 md:px-14 py-12">
                        <p className="section-label">The Craft</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal-800 leading-tight mb-6">
                            Where Tradition Meets<br />
                            <em className="font-serif-italic font-normal">Modern Elegance</em>
                        </h2>
                        <p className="text-sm font-sans text-charcoal-500 font-light leading-relaxed mb-8">
                            Each piece in our collection tells a story — born from artisan hands, shaped by years of tradition, and designed for those who appreciate the extraordinary in the everyday.
                        </p>
                        <Link to="/products" className="btn-outline inline-flex">
                            Explore Collections <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

// Categories grid
function CategoriesSection() {
    return (
        <section className="py-20 bg-cream-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <Reveal className="text-center mb-12">
                    <p className="section-label">Browse</p>
                    <h2 className="section-heading">Shop by Category</h2>
                    <span className="hr-gold" />
                </Reveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, i) => (
                        <Reveal key={cat.id} delay={i * 0.06}>
                            <Link to={`/products/${cat.name}`} className="group block text-center">
                                <div className="aspect-square overflow-hidden img-zoom-wrap bg-cream-200 mb-3">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="nav-item group-hover:text-gold-500 transition-colors">{cat.name}</p>
                                <p className="text-xs font-sans text-charcoal-400 mt-0.5">{cat.count} items</p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Second product row
function MoreProducts() {
    return (
        <section className="py-20 bg-cream-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <Reveal className="text-center mb-14">
                    <p className="section-label">Best Sellers</p>
                    <h2 className="section-heading">Timeless Favourites</h2>
                    <span className="hr-gold" />
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {products.slice(4, 8).map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.08}>
                            <ProductCard product={p} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Promo cards — Lumière editorial style
function PromoSection() {
    const promos = [
        { title: 'Flash Sale', sub: 'Up to 70% off', text: 'Limited time deals on top picks.', bg: 'bg-charcoal-800', link: '/products', label: 'Shop Sale' },
        { title: 'Free Shipping', sub: 'On orders $150+', text: 'No minimum on select items.', bg: 'bg-gold-500', link: '/products', label: 'Shop Now' },
        { title: 'New Season', sub: 'Spring Arrivals', text: 'Fresh collections just dropped.', bg: 'bg-charcoal-700', link: '/products', label: 'Discover' },
    ];

    return (
        <section className="py-12 md:py-20 bg-cream-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                    {promos.map((p, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <Link to={p.link}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className={`${p.bg} p-7 md:p-10 flex flex-col gap-2 md:gap-3`}
                                >
                                    <p className="text-xs font-sans font-medium uppercase tracking-widest text-cream-400" style={{ letterSpacing: '0.15em' }}>{p.sub}</p>
                                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-cream-100">{p.title}</h3>
                                    <p className="text-xs md:text-sm text-cream-400 font-light">{p.text}</p>
                                    <div className="flex items-center gap-2 mt-2 border-t border-white/10 pt-3">
                                        <span className="text-xs font-sans font-medium text-cream-300 tracking-wider uppercase" style={{ letterSpacing: '0.12em' }}>{p.label}</span>
                                        <ArrowRight className="w-3 h-3 text-cream-300" />
                                    </div>
                                </motion.div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// AI recommendations
function AISection() {
    return (
        <section className="py-20 bg-charcoal-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <Reveal className="text-center mb-12">
                    <p className="text-xs font-sans font-medium text-gold-400 uppercase tracking-widest mb-3" style={{ letterSpacing: '0.25em' }}>AI Curated</p>
                    <h2 className="font-serif text-3xl md:text-5xl font-medium text-cream-100">Recommended For You</h2>
                    <span className="block w-12 h-px bg-gold-400 mx-auto mt-5" />
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.08}>
                            <Link to={`/product/${p.id}`} className="block group">
                                <div className="img-zoom-wrap aspect-[3/4] bg-charcoal-700 mb-3">
                                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-xs font-sans font-medium text-gold-400 uppercase tracking-wider mb-1" style={{ letterSpacing: '0.1em' }}>{p.category}</p>
                                <p className="font-serif text-sm text-cream-200 group-hover:text-gold-400 transition-colors">{p.name}</p>
                                <p className="text-gold-400 text-sm font-sans mt-1">${p.price}</p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Customer Reviews
function ReviewsSection() {
    const reviews = [
        { id: 1, name: "Sarah J.", rating: 5, comment: "Absolutely stunning quality. The craftsmanship exceeded every expectation.", product: "Sony Headphones" },
        { id: 2, name: "Marcus W.", rating: 5, comment: "My favourite purchase this year. The packaging alone tells a beautiful story.", product: "MacBook Pro" },
        { id: 3, name: "Elena R.", rating: 4, comment: "Timeless, elegant, and exactly as described. Will shop here again.", product: "Air Jordan 1" },
        { id: 4, name: "James P.", rating: 5, comment: "Fast shipping and incredible attention to detail. A truly premium experience.", product: "Gaming Chair" },
    ];

    return (
        <section className="py-20 bg-cream-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <Reveal className="text-center mb-12">
                    <p className="section-label">Testimonials</p>
                    <h2 className="section-heading">Our Patrons Speak</h2>
                    <span className="hr-gold" />
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {reviews.map((r, i) => (
                        <Reveal key={r.id} delay={i * 0.08}>
                            <div className="bg-cream-100 p-8 border-t-2 border-gold-400">
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className={`w-3 h-3 ${j < r.rating ? 'text-gold-400 fill-gold-400' : 'text-cream-400'}`} />
                                    ))}
                                </div>
                                <p className="font-serif italic text-charcoal-600 text-sm leading-relaxed mb-4">"{r.comment}"</p>
                                <div className="border-t border-brand-border pt-4">
                                    <p className="font-sans font-semibold text-xs text-charcoal-700 uppercase tracking-wider" style={{ letterSpacing: '0.1em' }}>{r.name}</p>
                                    <p className="text-xs text-charcoal-400 mt-0.5">Purchased: {r.product}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <TrustBar />
            <FeaturedSection />
            <EditorialBanner />
            <CategoriesSection />
            <MoreProducts />
            <PromoSection />
            <AISection />
            <ReviewsSection />
        </div>
    );
}
