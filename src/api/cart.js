// Cart service using localStorage
const CART_STORAGE_KEY = 'lottys_vanity_cart';

let cartCache = null;

const loadCart = () => {
  if (cartCache === null) {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    cartCache = stored ? JSON.parse(stored) : [];
  }
  return cartCache;
};

const saveCart = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartCache));
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const CartItem = {
  async list() {
    loadCart();
    return [...cartCache];
  },

  async create(itemData) {
    loadCart();
    const newItem = {
      id: generateId(),
      product_id: itemData.product_id,
      product_name: itemData.product_name,
      product_image: itemData.product_image,
      price: itemData.price,
      quantity: itemData.quantity || 1,
      created_at: new Date().toISOString()
    };
    
    // Check if item already exists in cart
    const existingIndex = cartCache.findIndex(
      item => item.product_id === newItem.product_id
    );
    
    if (existingIndex >= 0) {
      // Update quantity if item exists
      cartCache[existingIndex].quantity += newItem.quantity;
    } else {
      // Add new item
      cartCache.push(newItem);
    }
    
    saveCart();
    return newItem;
  },

  async update(id, updates) {
    loadCart();
    const index = cartCache.findIndex(item => item.id === id);
    if (index >= 0) {
      cartCache[index] = { ...cartCache[index], ...updates };
      saveCart();
      return cartCache[index];
    }
    return null;
  },

  async delete(id) {
    loadCart();
    const index = cartCache.findIndex(item => item.id === id);
    if (index >= 0) {
      cartCache.splice(index, 1);
      saveCart();
      return true;
    }
    return false;
  },

  async clear() {
    cartCache = [];
    saveCart();
  }
};

