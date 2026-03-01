import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid, List, Search, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Best Rated', value: 'rating' },
    { label: 'Most Reviews', value: 'reviews' },
    { label: 'Biggest Discount', value: 'discount' },
];

export default function ProductsPage() {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const sortParam = searchParams.get('sort') || 'featured';

    const [sort, setSort] = useState(sortParam);
    const [activeCategory, setActiveCategory] = useState(category || 'All');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        if (category) setActiveCategory(category);
        else setActiveCategory('All');
    }, [category]);

    const filtered = products
        .filter(p => {
            if (activeCategory !== 'All' && p.category !== activeCategory) return false;
            if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sort) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                case 'reviews': return b.reviews - a.reviews;
                case 'discount': return b.discount - a.discount;
                default: return 0;
            }
        });

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Page Header */}
            <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <h1 className="font-display font-black text-4xl md:text-5xl mb-2">
                        {searchQuery ? (
                            <>Results for "<span className="gradient-text">{searchQuery}</span>"</>
                        ) : activeCategory !== 'All' ? (
                            <><span className="gradient-text">{activeCategory}</span> Products</>
                        ) : (
                            <>All <span className="gradient-text">Products</span></>
                        )}
                    </h1>
                    <p className="text-slate-400">{filtered.length} products found</p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    {['All', ...categories.map(c => c.name)].map((cat) => (
                        <motion.button
                            key={cat}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'glass border border-white/20 hover:border-primary-500/50'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Filter & Sort Bar */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 glass border border-white/20 px-4 py-2.5 rounded-xl text-sm font-medium hover:border-primary-500/50 transition-all"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="glass border border-white/20 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    {searchQuery && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-sm">
                            <Search className="w-3 h-3" />
                            {searchQuery}
                            <button onClick={() => setSearchParams({})}><X className="w-3 h-3" /></button>
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'text-primary-500 bg-primary-50 dark:bg-primary-950/30' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'text-primary-500 bg-primary-50 dark:bg-primary-950/30' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Filter Panel */}
                {filterOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass rounded-2xl p-6 mb-6 border border-white/10"
                    >
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                        className="input-field text-sm py-2"
                                        placeholder="Min"
                                    />
                                    <span className="text-slate-400">-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                        className="input-field text-sm py-2"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm mb-3">Rating</h3>
                                <div className="flex gap-2">
                                    {[4, 3, 2].map(r => (
                                        <button key={r} className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass border border-white/20 text-sm hover:border-primary-500/50 transition-colors">
                                            {r}+ ⭐
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => { setPriceRange([0, 10000]); setActiveCategory('All'); }}
                                    className="text-sm text-accent-500 hover:text-accent-600 font-medium transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Products Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="font-display font-bold text-2xl mb-2">No products found</h3>
                        <p className="text-slate-400">Try adjusting your filters or search query</p>
                    </div>
                ) : (
                    <div className={viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                        : 'space-y-4'
                    }>
                        {filtered.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
