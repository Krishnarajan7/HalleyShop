import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import PageLoader from "@/components/ui/PageLoader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Lazy load pages for better performance
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Auth = lazy(() => import("./pages/Auth"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Deals = lazy(() => import("./pages/Deals"));
const NewArrivals = lazy(() => import("./pages/NewArrivals"));
const Brands = lazy(() => import("./pages/Brands"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));


const MIN_LOADER_TIME = 700;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutesWithLoader />
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

function AppRoutesWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setPrevPath(location.pathname);
      return;
    }
    if (location.pathname !== prevPath) {
      setLoading(true);
      setPrevPath(location.pathname);
      const timer = setTimeout(() => setLoading(false), MIN_LOADER_TIME);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Always scroll to top and disable browser scroll restoration on route change/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [location.pathname]);

  if (loading) return <PageLoader />;
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/wishlist" element={<Wishlist/>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
