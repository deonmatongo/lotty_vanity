import Layout from "./Layout.jsx";

import About from "./About";

import Home from "./Home";

import ProductDetail from "./ProductDetail";

import Shop from "./Shop";

import Checkout from "./Checkout";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PAGES = {
    
    About: About,
    
    Home: Home,
    
    ProductDetail: ProductDetail,
    
    Shop: Shop,
    
    Checkout: Checkout,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// ScrollToTop component to scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Use 'instant' for immediate scroll, or 'smooth' for animated scroll
        });
    }, [pathname]);
    
    return null;
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <>
            <ScrollToTop />
            <Layout currentPageName={currentPage}>
                <Routes>            
                    
                        <Route path="/" element={<About />} />
                    
                    
                    <Route path="/About" element={<About />} />
                    
                    <Route path="/Home" element={<Home />} />
                    
                    <Route path="/ProductDetail" element={<ProductDetail />} />
                    
                    <Route path="/Shop" element={<Shop />} />
                    
                    <Route path="/Checkout" element={<Checkout />} />
                    
                </Routes>
            </Layout>
        </>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}