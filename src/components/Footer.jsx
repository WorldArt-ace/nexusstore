import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Youtube } from 'lucide-react';

const links = {
    Shop: [
        { label: 'All Products', to: '/products' },
        { label: 'New Arrivals', to: '/products' },
        { label: 'Best Sellers', to: '/products' },
        { label: 'Electronics', to: '/products/Electronics' },
        { label: 'Fashion', to: '/products/Fashion' },
        { label: 'Accessories', to: '/products/Accessories' },
    ],
    Help: [
        { label: 'Shipping & Returns', to: '/about' },
        { label: 'Order Tracking', to: '/account/orders' },
        { label: 'Size Guide', to: '/about' },
        { label: 'Contact Us', to: '/about' },
        { label: 'FAQs', to: '/about' },
    ],
};

export default function Footer() {
    return (
        <footer>
            {/* Dark footer — matches Lumière */}
            <div className="bg-charcoal-800 text-cream-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <h3 className="font-serif text-2xl font-semibold text-cream-100 mb-4">NEXUS.</h3>
                            <p className="text-xs font-sans font-light text-charcoal-300 leading-relaxed mb-6">
                                Elevating everyday living through curated craftsmanship and modern design.
                            </p>
                            <div className="flex gap-3">
                                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        whileHover={{ y: -2 }}
                                        className="w-8 h-8 border border-charcoal-600 flex items-center justify-center text-charcoal-300 hover:border-gold-400 hover:text-gold-400 transition-colors"
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {Object.entries(links).map(([title, items]) => (
                            <div key={title}>
                                <h4 className="text-xs font-sans font-semibold text-gold-400 uppercase tracking-widest mb-5" style={{ letterSpacing: '0.2em' }}>
                                    {title}
                                </h4>
                                <ul className="space-y-3">
                                    {items.map((item) => (
                                        <li key={item.label}>
                                            <Link to={item.to} className="text-xs font-sans font-light text-charcoal-300 hover:text-gold-400 transition-colors">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-xs font-sans font-semibold text-gold-400 uppercase tracking-widest mb-5" style={{ letterSpacing: '0.2em' }}>
                                Newsletter
                            </h4>
                            <p className="text-xs font-sans font-light text-charcoal-300 leading-relaxed mb-4">
                                Receive exclusive offers and curated inspiration directly in your inbox.
                            </p>
                            <form className="flex items-end gap-0 border-b border-charcoal-500 pb-2 focus-within:border-gold-400 transition-colors" onSubmit={e => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 bg-transparent text-xs font-sans text-cream-300 placeholder-charcoal-400 outline-none pb-0"
                                />
                                <button type="submit" className="text-charcoal-400 hover:text-gold-400 transition-colors ml-2">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                            <p className="text-xs text-charcoal-500 mt-2 font-light">No spam, ever. Unsubscribe anytime.</p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-charcoal-700 py-5">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs font-sans font-light text-charcoal-400">
                            © {new Date().getFullYear()} NexusStore. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                                <Link key={l} to="/about" className="text-xs font-sans font-light text-charcoal-400 hover:text-gold-400 transition-colors">
                                    {l}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
