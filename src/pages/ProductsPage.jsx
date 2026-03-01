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
            <div className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <h1 className="font-serif text-3xl md:text-5xl font-medium text-charcoal-800 mb-1">
                        {searchQuery ? (
                            <>Results for "<span style={{ color: '#C5A880' }}>{searchQuery}</span>"</>
                        ) : activeCategory !== 'All' ? (
                            <><span style={{ color: '#C5A880' }}>{activeCategory}</span> Products</>
                        ) : (
                            <>All <span style={{ color: '#C5A880' }}>Products</span></>
                        )}
                    </h1>
                    <p className="text-sm font-sans text-charcoal-400 font-light">{filtered.length} products found</p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {['All', ...categories.map(c => c.name)].map((cat) => (
                        <motion.button
                            key={cat}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 border ${activeCategory === cat
                                    ? 'bg-charcoal-800 text-cream-100 border-charcoal-800'
                                    : 'bg-transparent text-charcoal-600 border-charcoal-300 hover:border-charcoal-600 hover:text-charcoal-800'
                                }`}
                            style={{ letterSpacing: '0.1em' }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Filter & Sort Bar */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 border border-charcoal-300 px-3 py-2 text-xs font-sans font-medium text-charcoal-600 hover:border-charcoal-600 transition-all uppercase tracking-wider"
                        style={{ letterSpacing: '0.1em' }}
                    >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Filters
                    </button>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-charcoal-300 px-3 py-2 text-xs font-sans font-medium text-charcoal-600 focus:outline-none focus:border-charcoal-700 cursor-pointer bg-transparent"
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    {searchQuery && (
                        <div className="flex items-center gap-1.5 px-3 py-2 border border-gold-400 text-gold-600 text-xs font-sans">
                            <Search className="w-3 h-3" />
                            {searchQuery}
                            <button onClick={() => setSearchParams({})}><X className="w-3 h-3" /></button>
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-1.5">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 transition-colors ${viewMode === 'grid' ? 'text-charcoal-800' : 'text-charcoal-400 hover:text-charcoal-600'}`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 transition-colors ${viewMode === 'list' ? 'text-charcoal-800' : 'text-charcoal-400 hover:text-charcoal-600'}`}
                        >
                            <List className="w-4 h-4" />
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
