// Product service - replace with your own backend API
let productsCache = null;

// Mock products data - replace with actual API calls
const mockProducts = [
  {
    id: '1',
    name: 'Velvet Lipstick',
    category: 'lips',
    price: 29.99,
    description: 'Long-lasting matte lipstick with velvety finish',
    image_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
    in_stock: true,
    featured: true,
    created_date: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Foundation Plus',
    category: 'face',
    price: 45.00,
    description: 'Full coverage foundation for all skin types',
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    in_stock: true,
    featured: true,
    created_date: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Mascara Pro',
    category: 'eyes',
    price: 24.99,
    description: 'Volumizing mascara for dramatic lashes',
    image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500',
    in_stock: true,
    featured: true,
    created_date: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Beauty Essentials Kit',
    category: 'kits',
    price: 89.99,
    description: 'Complete makeup starter kit',
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
    in_stock: true,
    featured: true,
    created_date: new Date().toISOString()
  }
];

export const Product = {
  async list(sort = '-created_date') {
    // Load from localStorage if available, otherwise use mock data
    const stored = localStorage.getItem('products');
    if (stored) {
      productsCache = JSON.parse(stored);
    } else {
      productsCache = mockProducts;
      localStorage.setItem('products', JSON.stringify(mockProducts));
    }
    
    let sorted = [...productsCache];
    if (sort === '-created_date') {
      sorted.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    return sorted;
  },

  async filter(filters, sort = '-created_date') {
    const allProducts = await this.list(sort);
    return allProducts.filter(product => {
      for (const key in filters) {
        if (product[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  },

  async getById(id) {
    const allProducts = await this.list();
    return allProducts.find(p => p.id === id) || null;
  }
};

