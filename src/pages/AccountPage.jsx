import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, Star, ChevronRight, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

const mockOrders = [
    { id: 'NSX-482910', date: 'Feb 28, 2026', status: 'Delivered', total: 349.99, items: 1, product: 'Sony WH-1000XM5' },
    { id: 'NSX-361245', date: 'Feb 15, 2026', status: 'Shipped', total: 2499.99, items: 2, product: 'MacBook Pro 16"' },
    { id: 'NSX-201847', date: 'Jan 30, 2026', status: 'Processing', total: 189.99, items: 1, product: 'Nike Air Jordan 1' },
];

const statusColors = {
    Delivered: 'bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400',
    Shipped: 'bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
    Processing: 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400',
};

export default function AccountPage() {
    const { user, logout } = useAuth();
    const { items: wishlist } = useWishlist();
    const [tab, setTab] = useState('overview');
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-display font-bold text-2xl mb-4">Please log in to view your account</h2>
                    <Link to="/login" className="btn-primary">Sign In</Link>
                </div>
            </div>
        );
    }

    const handleLogout = () => { logout(); navigate('/'); };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-2xl p-6 border border-white/10 sticky top-24"
                        >
                            {/* Avatar */}
                            <div className="text-center mb-6">
                                <div className="relative w-20 h-20 mx-auto mb-3">
                                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover ring-4 ring-primary-500/30" />
                                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg">
                                        <Edit2 className="w-3 h-3" />
                                    </button>
                                </div>
                                <h3 className="font-display font-bold text-lg">{user.name}</h3>
                                <p className="text-xs text-slate-400">{user.email}</p>
                                <div className="mt-2 badge bg-gold-400/20 text-gold-500 mx-auto">
                                    <Star className="w-3 h-3 fill-gold-400" /> Premium Member
                                </div>
                            </div>

                            {/* Nav */}
                            <nav className="space-y-1">
                                {tabs.map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        onClick={() => setTab(id)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${tab === id
                                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                                : 'hover:bg-primary-50 dark:hover:bg-primary-950/30 text-slate-600 dark:text-slate-300'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                        <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                                    </button>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-accent-500 hover:bg-accent-500/10 transition-all duration-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </nav>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Stats */}
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Orders', value: mockOrders.length, icon: Package, color: 'from-blue-500 to-cyan-400' },
                                            { label: 'Wishlist', value: wishlist.length, icon: Heart, color: 'from-pink-500 to-rose-400' },
                                            { label: 'Reviews', value: 8, icon: Star, color: 'from-amber-500 to-orange-400' },
                                        ].map(({ label, value, icon: Icon, color }) => (
                                            <div key={label} className="glass rounded-2xl p-5 border border-white/10">
                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <p className="font-display font-black text-3xl">{value}</p>
                                                <p className="text-sm text-slate-400">{label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Orders */}
                                    <div className="glass rounded-2xl p-6 border border-white/10">
                                        <div className="flex items-center justify-between mb-5">
                                            <h3 className="font-display font-bold text-lg">Recent Orders</h3>
                                            <button onClick={() => setTab('orders')} className="text-sm text-primary-500 hover:text-primary-400">View all</button>
                                        </div>
                                        <div className="space-y-3">
                                            {mockOrders.slice(0, 2).map(order => (
                                                <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">{order.product}</p>
                                                        <p className="text-xs text-slate-400">{order.id} · {order.date}</p>
                                                    </div>
                                                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                                                    <span className="font-bold text-sm">${order.total}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Profile */}
                                    <div className="glass rounded-2xl p-6 border border-white/10">
                                        <h3 className="font-display font-bold text-lg mb-4">Profile Info</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                                                <input defaultValue={user.name} className="input-field" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Email</label>
                                                <input defaultValue={user.email} type="email" className="input-field" />
                                            </div>
                                        </div>
                                        <button className="btn-primary mt-4">Save Changes</button>
                                    </div>
                                </div>
                            )}

                            {tab === 'orders' && (
                                <div className="glass rounded-2xl p-6 border border-white/10">
                                    <h2 className="font-display font-bold text-xl mb-6">Order History</h2>
                                    <div className="space-y-4">
                                        {mockOrders.map(order => (
                                            <div key={order.id} className="p-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <p className="font-bold">{order.id}</p>
                                                        <p className="text-sm text-slate-400">{order.date}</p>
                                                    </div>
                                                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                                                </div>
                                                <p className="text-sm text-slate-500 mb-3">{order.product} ({order.items} item{order.items > 1 ? 's' : ''})</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold">${order.total}</span>
                                                    <button className="text-sm text-primary-500 hover:text-primary-400 font-medium">View Details</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tab === 'wishlist' && (
                                <div>
                                    <h2 className="font-display font-bold text-xl mb-6">My Wishlist ({wishlist.length})</h2>
                                    {wishlist.length === 0 ? (
                                        <div className="text-center py-16 glass rounded-2xl border border-white/10">
                                            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                            <p className="text-slate-400">No items in wishlist yet</p>
                                            <Link to="/products" className="btn-primary inline-flex mt-4">Start Shopping</Link>
                                        </div>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                                        </div>
                                    )}
                                </div>
                            )}

                            {tab === 'addresses' && (
                                <div className="glass rounded-2xl p-6 border border-white/10">
                                    <h2 className="font-display font-bold text-xl mb-6">Saved Addresses</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[{ label: 'Home', address: '123 Main St, San Francisco, CA 94102' }, { label: 'Work', address: '456 Market St, Suite 100, San Francisco, CA 94105' }].map(a => (
                                            <div key={a.label} className="p-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <MapPin className="w-4 h-4 text-primary-400" />
                                                    <span className="font-semibold">{a.label}</span>
                                                </div>
                                                <p className="text-sm text-slate-400">{a.address}</p>
                                                <div className="flex gap-2 mt-3">
                                                    <button className="text-xs text-primary-500 font-medium hover:underline">Edit</button>
                                                    <button className="text-xs text-accent-500 font-medium hover:underline">Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                        <button className="p-4 rounded-xl border-2 border-dashed border-white/20 text-slate-400 hover:border-primary-500/50 hover:text-primary-500 transition-all text-sm font-medium">
                                            + Add New Address
                                        </button>
                                    </div>
                                </div>
                            )}

                            {tab === 'payment' && (
                                <div className="glass rounded-2xl p-6 border border-white/10">
                                    <h2 className="font-display font-bold text-xl mb-6">Payment Methods</h2>
                                    <div className="space-y-3">
                                        {[{ type: 'Visa', last4: '4242', expiry: '12/27' }, { type: 'Mastercard', last4: '8888', expiry: '06/26' }].map(card => (
                                            <div key={card.last4} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all">
                                                <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                                                    <CreditCard className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{card.type} •••• {card.last4}</p>
                                                    <p className="text-xs text-slate-400">Expires {card.expiry}</p>
                                                </div>
                                                <button className="ml-auto text-xs text-accent-500 hover:underline">Remove</button>
                                            </div>
                                        ))}
                                        <button className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 text-slate-400 hover:border-primary-500/50 hover:text-primary-500 transition-all text-sm font-medium">
                                            + Add Payment Method
                                        </button>
                                    </div>
                                </div>
                            )}

                            {tab === 'settings' && (
                                <div className="glass rounded-2xl p-6 border border-white/10 space-y-6">
                                    <h2 className="font-display font-bold text-xl">Account Settings</h2>
                                    {[
                                        { label: 'Email Notifications', desc: 'Receive emails for orders, deals, and updates' },
                                        { label: 'SMS Alerts', desc: 'Get order status updates via text message' },
                                        { label: 'Push Notifications', desc: 'Browser push notifications for new deals' },
                                        { label: 'Newsletter', desc: 'Weekly curated product recommendations' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{s.label}</p>
                                                <p className="text-xs text-slate-400">{s.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-white/10 peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                            </label>
                                        </div>
                                    ))}
                                    <div className="border-t border-white/10 pt-4">
                                        <button className="text-sm text-accent-500 font-medium hover:underline">Delete Account</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
