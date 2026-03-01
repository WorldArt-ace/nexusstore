import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Zap, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) { setError('Please fill all fields'); return; }
        if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
        setLoading(true);
        setTimeout(() => { signup(form.name, form.email, form.password); setLoading(false); navigate('/account'); }, 1000);
    };

    const strength = form.password.length > 8 ? 3 : form.password.length > 5 ? 2 : form.password.length > 0 ? 1 : 0;
    const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-400'];
    const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-dark-200 to-dark-300" />
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="orb w-80 h-80 bg-primary-500 top-10 -right-10" />
            <div className="orb w-64 h-64 bg-accent-400 bottom-10 -left-10" style={{ animationDelay: '2s' }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md glass rounded-3xl p-8 shadow-2xl border border-white/10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <span className="font-display font-bold text-xl text-white"><span className="gradient-text">Nexus</span>Store</span>
                    </Link>
                    <h1 className="font-display font-black text-3xl text-white mb-2">Create account</h1>
                    <p className="text-slate-400 text-sm">Join millions of happy shoppers</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-sm text-accent-400 bg-accent-500/10 border border-accent-500/20 rounded-xl px-4 py-3">{error}</div>
                    )}
                    {[
                        { k: 'name', icon: User, type: 'text', placeholder: 'Full name', label: 'Full Name' },
                        { k: 'email', icon: Mail, type: 'email', placeholder: 'you@example.com', label: 'Email' },
                    ].map(({ k, icon: Icon, type, placeholder, label }) => (
                        <div key={k}>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                            <div className="relative">
                                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={type}
                                    value={form[k]}
                                    onChange={(e) => update(k, e.target.value)}
                                    placeholder={placeholder}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                />
                            </div>
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) => update('password', e.target.value)}
                                placeholder="Create a strong password"
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {form.password && (
                            <div className="mt-2 flex gap-1 items-center">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColors[strength] : 'bg-white/10'} transition-all`} />
                                ))}
                                <span className={`text-xs ml-2 font-medium`} style={{ color: ['', '#f87171', '#facc15', '#4ade80'][strength] }}>
                                    {strengthLabels[strength]}
                                </span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="password"
                                value={form.confirm}
                                onChange={(e) => update('confirm', e.target.value)}
                                placeholder="Repeat your password"
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            />
                            {form.password && form.confirm && (
                                <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center ${form.password === form.confirm ? 'bg-green-500' : 'bg-red-400'}`}>
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                    </div>

                    <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer">
                        <input type="checkbox" className="mt-0.5 rounded flex-shrink-0" required />
                        <span>I agree to the <a href="#" className="text-primary-400">Terms of Service</a> and <a href="#" className="text-primary-400">Privacy Policy</a></span>
                    </label>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                    </motion.button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
}
