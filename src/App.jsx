import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));

// 3D Loading Spinner
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-300">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-500/20 rounded-full" />
        <div className="w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin absolute inset-0" />
        <div className="w-10 h-10 border-4 border-transparent border-t-accent-500 rounded-full animate-spin absolute top-3 left-3" style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Page wrapper with transition
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Layout for pages with navbar and footer
function Layout({ children, noFooter = false }) {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-dark-300 min-h-screen transition-colors duration-300">
        {children}
      </main>
      {!noFooter && <Footer />}
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Auth pages - no navbar/footer */}
                    <Route path="/login" element={
                      <PageWrapper>
                        <LoginPage />
                      </PageWrapper>
                    } />
                    <Route path="/signup" element={
                      <PageWrapper>
                        <SignupPage />
                      </PageWrapper>
                    } />

                    {/* Main pages */}
                    <Route path="/" element={
                      <Layout>
                        <PageWrapper><HomePage /></PageWrapper>
                      </Layout>
                    } />
                    <Route path="/products" element={
                      <Layout>
                        <PageWrapper><ProductsPage /></PageWrapper>
                      </Layout>
                    } />
                    <Route path="/products/:category" element={
                      <Layout>
                        <PageWrapper><ProductsPage /></PageWrapper>
                      </Layout>
                    } />
                    <Route path="/product/:id" element={
                      <Layout>
                        <PageWrapper><ProductDetailPage /></PageWrapper>
                      </Layout>
                    } />
                    <Route path="/checkout" element={
                      <Layout>
                        <PageWrapper><CheckoutPage /></PageWrapper>
                      </Layout>
                    } />
                    <Route path="/account" element={
                      <Layout>
                        <PageWrapper><AccountPage /></PageWrapper>
                      </Layout>
                    } />
                    <Route path="/account/:tab" element={
                      <Layout>
                        <PageWrapper><AccountPage /></PageWrapper>
                      </Layout>
                    } />

                    {/* 404 */}
                    <Route path="*" element={
                      <Layout>
                        <div className="min-h-screen flex items-center justify-center text-center px-4 pt-24">
                          <div>
                            <div className="text-8xl font-black gradient-text mb-4">404</div>
                            <h2 className="font-display font-bold text-2xl mb-2">Page Not Found</h2>
                            <p className="text-slate-400 mb-6">Sorry, we couldn't find what you're looking for.</p>
                            <a href="/" className="btn-primary inline-flex">Go Home</a>
                          </div>
                        </div>
                      </Layout>
                    } />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
