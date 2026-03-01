import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) { setError('Please fill in all fields'); return; }
        setLoading(true);
        setTimeout(() => { login(email, password); setLoading(false); navigate('/account'); }, 1000);
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* Left — image panel */}
            <div className="hidden md:block relative overflow-hidden bg-charcoal-800">
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                    alt="Store"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 to-charcoal-900/80" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <Link to="/" className="font-serif text-3xl font-semibold text-cream-100 mb-4">NEXUS.</Link>
                    <p className="font-serif italic text-xl font-light text-cream-300 leading-relaxed max-w-xs">
                        "Elevating everyday living through timeless design."
                    </p>
                </div>
            </div>

            {/* Right — form */}
            <div className="flex items-center justify-center px-8 py-16 bg-cream-100">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm"
                >
                    {/* Mobile logo */}
                    <Link to="/" className="block md:hidden font-serif text-2xl font-semibold text-charcoal-800 mb-8">NEXUS.</Link>

                    <p className="section-label">Welcome Back</p>
                    <h1 className="font-serif text-3xl font-medium text-charcoal-800 mb-2">Sign In</h1>
                    <p className="text-xs font-sans text-charcoal-400 mb-8">Access your account and orders.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 font-sans border-l-2 border-red-500 pl-3">
                                {error}
                            </motion.p>
                        )}

                        <div>
                            <label className="block text-xs font-sans font-medium text-charcoal-600 uppercase tracking-widest mb-2" style={{ letterSpacing: '0.1em' }}>Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="input-lumiere"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-sans font-medium text-charcoal-600 uppercase tracking-widest mb-2" style={{ letterSpacing: '0.1em' }}>Password</label>
                            <div className="relative flex items-end">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input-lumiere pr-8"
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 bottom-2 text-charcoal-400 hover:text-charcoal-700">
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-xs font-sans text-charcoal-500 cursor-pointer">
                                <input type="checkbox" className="w-3 h-3 accent-charcoal-800" />
                                Remember me
                            </label>
                            <a href="#" className="text-xs font-sans text-charcoal-500 hover:text-gold-500 transition-colors">Forgot password?</a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full btn-dark flex items-center justify-center gap-3 py-4"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-cream-400/40 border-t-cream-100 rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-3.5 h-3.5" /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-brand-border" />
                        <span className="text-xs font-sans text-charcoal-400">or</span>
                        <div className="flex-1 h-px bg-brand-border" />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {['Google', 'Apple', 'Facebook'].map(p => (
                            <button key={p} className="w-full py-3 border border-brand-border text-xs font-sans font-medium text-charcoal-600 hover:border-charcoal-400 hover:text-charcoal-800 transition-all tracking-wider uppercase" style={{ letterSpacing: '0.1em' }}>
                                {p}
                            </button>
                        ))}
                    </div>

                    <p className="text-center text-xs font-sans text-charcoal-400 mt-6">
                        New to NEXUS?{' '}
                        <Link to="/signup" className="text-charcoal-800 font-medium hover:text-gold-500 transition-colors underline underline-offset-2">
                            Create an account
                        </Link>
                    </p>
                </motion.div>
            </div >
        </div >
    );
}
