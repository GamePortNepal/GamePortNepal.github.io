// Global variables
let cart = [];
let currentAmountModalProductId = null;

// Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1331661664654995476/bYhELKWspcO6yH-9otZ2EcQGqpJ9kVnkw5cD1Qx1M8ySEkdOeNfHy4nErJVG5HgmRdeE';

// Function to create interspersed product grid with product banners
function createInterspersedGrid(products, banners) {
    const result = [];
    const bannerInterval = 6; // Insert banner every 6 products
    let bannerIndex = 0;
    
    products.forEach((product, index) => {
        result.push({ type: 'product', data: product });
        
        // Insert banner after every bannerInterval products
        if ((index + 1) % bannerInterval === 0 && bannerIndex < banners.length) {
            result.push({ type: 'banner', data: banners[bannerIndex] });
            bannerIndex++;
        }
    });
    
    return result;
}

// Function to create product banner HTML
function createProductBannerHTML(banner) {
    return `
        <div class="product-banner" data-testid="product-banner-${banner.id}">
            <a href="${banner.link}" target="_blank" rel="noopener noreferrer">
                <img src="${banner.image}" alt="${banner.name}" class="product-banner-image">
                <div class="product-banner-overlay">
                    <div class="product-banner-text">${banner.name}</div>
                </div>
            </a>
        </div>
    `;
}

// Function to display products with interspersed banners
function displayProducts(productsToShow = productsDatabase.products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="loading">No products found</div>';
        return;
    }
    
    // Create interspersed grid with banners
    const interspersedItems = createInterspersedGrid(productsToShow, productsDatabase.productBanners);
    
    let html = '';
    
    interspersedItems.forEach(item => {
        if (item.type === 'banner') {
            html += createProductBannerHTML(item.data);
        } else {
            const product = item.data;
            const finalPrice = productsDatabase.calculatePrice(product);
            const originalPrice = product.basePrice;
            const hasDiscount = product.discount > 0;
            
            // Special handling for Roblox Gamepass
            let priceDisplay;
            if (product.name === 'Roblox Gamepass') {
                priceDisplay = `
                    <div class="conversion-rate">
                        <span style="color: #ff0000; font-weight: bold;">Rs. 1.7 per Robux</span>
                        <br><small style="color: #cccccc;">Min: 10 Robux</small>
                    </div>
                `;
            } else {
                priceDisplay = `
                    <span class="product-price">
                        NPR ${finalPrice}
                        ${hasDiscount ? `<span style="text-decoration: line-through; color: #888; font-size: 0.9rem; margin-left: 8px;">NPR ${originalPrice}</span>` : ''}
                    </span>
                `;
            }
            
            html += `
                <div class="product-card" data-testid="product-card-${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-meta">
                            ${priceDisplay}
                            <span class="product-category">${product.category}</span>
                        </div>
                        ${product.discount > 0 ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="action-btn" onclick="addToCart('${product.id}')" data-testid="add-to-cart-${product.id}">Add to Cart</button>
                        <button class="action-btn" onclick="buyNow('${product.id}')" data-testid="buy-now-${product.id}">Buy Now</button>
                    </div>
                </div>
            `;
        }
    });
    
    productsGrid.innerHTML = html;
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search function
function handleSearch(event) {
    const query = event.target.value.trim();
    let results;
    
    if (query === '') {
        results = productsDatabase.products;
    } else {
        results = productsDatabase.searchProducts(query);
        results = sortSearchResults(results, query);
    }
    
    displayProducts(results);
}

// Sort search results by relevance
function sortSearchResults(results, query) {
    const lowerQuery = query.toLowerCase();
    
    return results.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // Exact match at start gets highest priority
        const aStartsWithQuery = aName.startsWith(lowerQuery);
        const bStartsWithQuery = bName.startsWith(lowerQuery);
        
        if (aStartsWithQuery && !bStartsWithQuery) return -1;
        if (!aStartsWithQuery && bStartsWithQuery) return 1;
        
        // Then by position of match in name
        const aIndex = aName.indexOf(lowerQuery);
        const bIndex = bName.indexOf(lowerQuery);
        
        if (aIndex !== bIndex) {
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        }
        
        // Finally alphabetical
        return aName.localeCompare(bName);
    });
}

// Category filter function
function handleCategoryFilter(button) {
    // Remove active class from all buttons
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const category = button.getAttribute('data-category');
    const filteredProducts = productsDatabase.getProductsByCategory(category);
    displayProducts(filteredProducts);
}

// Cart management functions
function addToCart(productId) {
    const product = productsDatabase.getProductById(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Special handling for Roblox Gamepass
    if (product.name === 'Roblox Gamepass') {
        openAmountModal(productId);
        return;
    }
    
    const finalPrice = productsDatabase.calculatePrice(product);
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            finalPrice: finalPrice
        });
    }
    
    saveCartToStorage();
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

function buyNow(productId) {
    addToCart(productId);
    setTimeout(() => openCart(), 300);
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartModal();
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartModal();
    updateCartDisplay();
    showNotification('Item removed from cart', 'success');
}

// Cart modal functions
function openCart() {
    updateCartModal();
    document.getElementById('cartModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart" data-testid="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some items to get started!</p>
            </div>
        `;
        cartTotal.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.finalPrice * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item" data-testid="cart-item-${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity('${item.id}', -1)" data-testid="decrease-${item.id}">-</button>
                        <span>Qty: ${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)" data-testid="increase-${item.id}">+</button>
                        <button onclick="removeFromCart('${item.id}')" data-testid="remove-${item.id}" style="margin-left: 10px; color: #ff0000;">✗</button>
                    </div>
                </div>
                <div class="cart-item-price">NPR ${itemTotal}</div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = total;
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Checkout functions
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    closeCart();
    updateCheckoutSummary();
    document.getElementById('checkoutModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateCheckoutSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const finalTotal = document.getElementById('finalTotal');
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.finalPrice * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="summary-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>NPR ${itemTotal}</span>
            </div>
        `;
    });
    
    orderSummary.innerHTML = html;
    finalTotal.textContent = total;
}

// Order submission
function handleOrderSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = {
        customerInfo: {
            fullName: formData.get('fullName'),
            phoneNumber: formData.get('phoneNumber'),
            email: formData.get('email') || 'Not provided',
            address: formData.get('address'),
            notes: formData.get('notes') || 'None'
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0),
        orderDate: new Date().toISOString()
    };
    
    // Basic validation
    if (!orderData.customerInfo.fullName || !orderData.customerInfo.phoneNumber || !orderData.customerInfo.address) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    // Disable submit button and show loading state
    const submitBtn = event.target.querySelector('.send-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Order...';
    submitBtn.disabled = true;
    
    // Send order to Discord
    sendOrderToDiscord(orderData)
        .then(() => {
            // Clear cart
            cart = [];
            saveCartToStorage();
            updateCartDisplay();
            
            // Close checkout modal
            closeCheckout();
            
            // Show success message
            showNotification('Order sent successfully! Redirecting to Discord...', 'success');
            
            // Redirect to Discord after a short delay
            setTimeout(() => {
                window.open('https://discord.gg/KwCgTveabA', '_blank');
            }, 2000);
        })
        .catch(error => {
            console.error('Error sending order:', error);
            showNotification('Failed to send order. Please try again.', 'error');
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// Discord integration
function sendOrderToDiscord(orderData) {
    const embed = {
        title: '🛒 New Order from GamePort Nepal',
        color: 0xFF0000, // Red color
        fields: [
            {
                name: '👤 Customer Information',
                value: `**Name:** ${orderData.customerInfo.fullName}\n**Phone:** ${orderData.customerInfo.phoneNumber}\n**Email:** ${orderData.customerInfo.email}\n**Address:** ${orderData.customerInfo.address}`,
                inline: false
            },
            {
                name: '📦 Order Items',
                value: orderData.items.map(item => `• ${item.name} (x${item.quantity}) - NPR ${item.finalPrice * item.quantity}`).join('\n'),
                inline: false
            },
            {
                name: '💰 Total Amount',
                value: `**NPR ${orderData.total}**`,
                inline: true
            },
            {
                name: '📅 Order Date',
                value: new Date(orderData.orderDate).toLocaleString(),
                inline: true
            }
        ],
        footer: {
            text: 'GamePort Nepal - Premium Gaming Store'
        },
        timestamp: orderData.orderDate
    };
    
    if (orderData.customerInfo.notes !== 'None') {
        embed.fields.push({
            name: '📝 Notes',
            value: orderData.customerInfo.notes,
            inline: false
        });
    }
    
    const payload = {
        embeds: [embed]
    };
    
    return fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
}

// Amount modal for Roblox Gamepass
function openAmountModal(productId) {
    currentAmountModalProductId = productId;
    
    // Create modal if it doesn't exist
    if (!document.getElementById('amountModal')) {
        createAmountModal();
    }
    
    document.getElementById('amountModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.getElementById('robuxAmount').focus();
}

function closeAmountModal() {
    document.getElementById('amountModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentAmountModalProductId = null;
    
    // Reset form
    const input = document.getElementById('robuxAmount');
    if (input) {
        input.value = '';
        updateCalculatedPrice();
    }
}

function createAmountModal() {
    const modalHTML = `
        <div class="amount-modal" id="amountModal">
            <div class="amount-content">
                <div class="amount-header">
                    <h3>Enter Robux Amount</h3>
                    <button class="close-amount" onclick="closeAmountModal()">&times;</button>
                </div>
                <div class="amount-input-group">
                    <label for="robuxAmount">Robux Amount (Min: 10)</label>
                    <input type="number" id="robuxAmount" class="amount-input" min="10" placeholder="Enter amount..." oninput="updateCalculatedPrice()">
                </div>
                <div class="conversion-info">
                    <p>Conversion Rate: 1 Robux = Rs. 1.7</p>
                    <div class="calculated-price">Total: Rs. <span id="calculatedPrice">0</span></div>
                </div>
                <div class="amount-actions">
                    <button class="amount-btn cancel-btn" onclick="closeAmountModal()">Cancel</button>
                    <button class="amount-btn add-btn" id="addCustomRobux" onclick="addCustomRobux()" disabled>Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function updateCalculatedPrice() {
    const input = document.getElementById('robuxAmount');
    const priceSpan = document.getElementById('calculatedPrice');
    const addBtn = document.getElementById('addCustomRobux');
    
    if (!input || !priceSpan || !addBtn) return;
    
    const amount = parseInt(input.value) || 0;
    const price = Math.round(amount * 1.7);
    
    priceSpan.textContent = price;
    
    // Enable/disable button based on minimum amount
    if (amount >= 10) {
        addBtn.disabled = false;
        addBtn.style.opacity = '1';
    } else {
        addBtn.disabled = true;
        addBtn.style.opacity = '0.5';
    }
}

function addCustomRobux() {
    const input = document.getElementById('robuxAmount');
    const amount = parseInt(input.value);
    
    if (amount < 10) {
        showNotification('Minimum amount is 10 Robux', 'error');
        return;
    }
    
    const price = Math.round(amount * 1.7);
    
    // Create custom cart item
    const customItem = {
        id: `robux-${Date.now()}`,
        name: `${amount} Robux`,
        basePrice: price,
        finalPrice: price,
        quantity: 1,
        category: 'Game Currency',
        description: `Custom Robux amount: ${amount} Robux`,
        discount: 0
    };
    
    cart.push(customItem);
    saveCartToStorage();
    updateCartDisplay();
    closeAmountModal();
    
    showNotification(`${amount} Robux added to cart!`, 'success');
}

// Storage functions
function saveCartToStorage() {
    localStorage.setItem('gameport_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const stored = localStorage.getItem('gameport_cart');
    if (stored) {
        try {
            cart = JSON.parse(stored);
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            cart = [];
        }
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#1a5a1a' : '#5a1a1a'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        border: 2px solid ${type === 'success' ? '#00ff00' : '#ff0000'};
        box-shadow: 0 4px 20px rgba(${type === 'success' ? '0, 255, 0' : '255, 0, 0'}, 0.3);
        z-index: 3000;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        max-width: 300px;
        word-wrap: break-word;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Display all products initially
    displayProducts();
    
    // Load cart from storage
    loadCartFromStorage();
    updateCartDisplay();
    
    // Set up event listeners
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Category filter buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => handleCategoryFilter(button));
    });
    
    // Order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
    }
    
    // Close modals when clicking background
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('cart-modal')) {
            closeCart();
        }
        if (event.target.classList.contains('checkout-modal')) {
            closeCheckout();
        }
        if (event.target.classList.contains('amount-modal')) {
            closeAmountModal();
        }
    });
});

// Make functions globally available
window.addToCart = addToCart;
window.buyNow = buyNow;
window.openCart = openCart;
window.closeCart = closeCart;
window.proceedToCheckout = proceedToCheckout;
window.closeCheckout = closeCheckout;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.openAmountModal = openAmountModal;
window.closeAmountModal = closeAmountModal;
window.updateCalculatedPrice = updateCalculatedPrice;
window.addCustomRobux = addCustomRobux;
