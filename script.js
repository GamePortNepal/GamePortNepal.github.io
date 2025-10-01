// Shopping cart functionality
let cart = [];
let currentCategory = 'all';

// Discord webhook URL (from user requirements)
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1406851782096846910/npe0FHRlNnqEDQ-NUFssyMn9Y_rqDB_wPXompXYmXwFK6H4eoBwF7wHV6hAJ_-plYxYl';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Display initial products (all products)
    displayProducts(productsDatabase.products);
    // Set up all event listeners for user interactions
    setupEventListeners();
    // Load any previously saved cart items from local storage
    loadCartFromStorage();
    // Update the cart count display in the header
    updateCartDisplay();
});

// Set up all event listeners for interactive elements
function setupEventListeners() {
    // Search functionality: Listen for input events on the search bar and debounce the handler
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 300)); // Wait 300ms after last input to avoid excessive calls
    
    // Category filters: Add click listeners to all category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => handleCategoryFilter(button));
    });
    
    // Order form submission: Listen for the submit event on the order form
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', handleOrderSubmission);
    
    // Close modals when clicking outside: Add a global click listener to detect clicks outside modals
    document.addEventListener('click', (e) => {
        // If the click is on the cart modal background, close the cart
        if (e.target.classList.contains('cart-modal')) {
            closeCart();
        }
        // If the click is on the checkout modal background, close the checkout
        if (e.target.classList.contains('checkout-modal')) {
            closeCheckout();
        }
        // If the click is on the amount modal background, close the amount modal
        if (e.target.classList.contains('amount-modal')) {
            closeAmountModal();
        }
    });
}

// Search functionality: Filters products based on user's search query
function handleSearch(event) {
    const query = event.target.value.toLowerCase(); // Get the search query and convert to lowercase
    // Use the productsDatabase to search for matching products
    const searchResults = productsDatabase.searchProducts(query);
    // Sort search results by relevance
    const sortedResults = sortSearchResults(searchResults, query);
    // Display the filtered search results
    displayProducts(sortedResults);
}

// Sort search results by relevance
function sortSearchResults(results, query) {
    if (!query.trim()) return results;
    
    const searchTerm = query.toLowerCase();
    
    return results.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // Exact match at start gets highest priority
        const aStartsWithQuery = aName.startsWith(searchTerm);
        const bStartsWithQuery = bName.startsWith(searchTerm);
        
        if (aStartsWithQuery && !bStartsWithQuery) return -1;
        if (!aStartsWithQuery && bStartsWithQuery) return 1;
        
        // Check if name contains the query (closer to start = higher priority)
        const aIndex = aName.indexOf(searchTerm);
        const bIndex = bName.indexOf(searchTerm);
        
        if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex; // Earlier position wins
        }
        if (aIndex !== -1 && bIndex === -1) return -1;
        if (aIndex === -1 && bIndex !== -1) return 1;
        
        // For partial matches (like "terr" matching "Terraria")
        const aPartialMatch = searchTerm.length >= 3 && aName.includes(searchTerm);
        const bPartialMatch = searchTerm.length >= 3 && bName.includes(searchTerm);
        
        if (aPartialMatch && !bPartialMatch) return -1;
        if (!aPartialMatch && bPartialMatch) return 1;
        
        // Default alphabetical sort
        return aName.localeCompare(bName);
    });
}

// Category filter functionality: Filters products by the selected category
function handleCategoryFilter(button) {
    // Update the visual state of category buttons to show the active one
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Get the category attribute from the clicked button
    const category = button.getAttribute('data-category');
    // Update the global currentCategory variable
    currentCategory = category;
    
    // Get products belonging to the selected category
    const filteredProducts = productsDatabase.getProductsByCategory(category);
    // Display the filtered products
    displayProducts(filteredProducts);
}

// Display products in the grid layout
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid'); // Get the container for product cards
    
    // If no products are found, display a "No products found" message
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="loading">No products found matching your criteria.</div>';
        return;
    }
    
    // Map each product to an HTML card structure
    productsGrid.innerHTML = productsToShow.map(product => {
        // Calculate the final price considering any discounts
        const finalPrice = productsDatabase.calculatePrice(product);
        // Check if the product has a discount
        const hasDiscount = product.discount > 0;
        
        // Special handling for Roblox Gamepass - don't show price, show conversion info instead
        let priceDisplay = '';
        if (product.id === '8') { // Roblox Gamepass
            priceDisplay = `<div style="color: #ff0000; font-weight: 600;">1 Robux = 1.7 RS</div><div style="color: #cccccc; font-size: 0.9rem;">Minimum: 10 Robux</div>`;
        } else {
            priceDisplay = hasDiscount ? 
                `<span style="text-decoration: line-through; color: #888; margin-right: 10px;">NPR ${product.basePrice}</span>
                 <span>NPR ${finalPrice}</span>
                 <span style="color: #00ff00; font-size: 0.9rem; margin-left: 5px;">(${product.discount}% OFF)</span>` 
                : `NPR ${finalPrice}`;
        }
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop'">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <div class="product-price">
                            ${priceDisplay}
                        </div>
                        <span class="product-category">${product.category}</span>
                    </div>
                    <div style="color: #888; font-size: 0.9rem; margin-top: 5px;">
                        Platform: ${product.platform}
                    </div>
                </div>
                <div class="product-actions">
                    <button class="action-btn" onclick="buyNow('${product.id}')">Buy Now</button>
                    <button class="action-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        `;
    }).join(''); // Join all the generated HTML strings into a single string
}

// Add product to the shopping cart
function addToCart(productId) {
    // Special handling for Roblox Gamepass
    if (productId === '8') {
        openAmountModal();
        return;
    }
    
    // Find the product in the database
    const product = productsDatabase.products.find(p => p.id === productId);
    if (!product) return; // If product not found, do nothing
    
    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // If it exists, increment its quantity
        existingItem.quantity += 1;
    } else {
        // If it doesn't exist, add it to the cart with quantity 1 and calculate its final price
        cart.push({
            ...product, // Spread operator copies all properties of the product
            quantity: 1,
            finalPrice: productsDatabase.calculatePrice(product) // Store the final price per item
        });
    }
    
    // Save the updated cart to local storage
    saveCartToStorage();
    // Update the cart count displayed in the header
    updateCartDisplay();
    // Show a notification to the user
    showNotification(`${product.name} added to cart!`);
}

// Direct purchase functionality: Adds to cart and immediately opens the cart
function buyNow(productId) {
    // Special handling for Roblox Gamepass
    if (productId === '8') {
        openAmountModal();
        return;
    }
    
    addToCart(productId); // First, add the item to the cart
    openCart(); // Then, open the cart modal
}

// Amount modal functions for Roblox Gamepass
function openAmountModal() {
    // Create the modal if it doesn't exist
    if (!document.getElementById('amountModal')) {
        createAmountModal();
    }
    document.getElementById('amountModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on the input field
    const input = document.getElementById('robuxAmount');
    input.focus();
    input.value = ''; // Clear any previous value
    updateCalculatedPrice(); // Update the calculated price display
}

function closeAmountModal() {
    const modal = document.getElementById('amountModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function createAmountModal() {
    const modalHTML = `
        <div class="amount-modal" id="amountModal">
            <div class="amount-content">
                <div class="amount-header">
                    <h3>Roblox Gamepass</h3>
                    <button class="close-amount" onclick="closeAmountModal()">&times;</button>
                </div>
                <div class="amount-input-group">
                    <label for="robuxAmount">Enter Robux Amount:</label>
                    <input type="number" id="robuxAmount" class="amount-input" placeholder="Minimum 10 Robux" min="10" oninput="updateCalculatedPrice()">
                </div>
                <div class="conversion-info">
                    <p>Conversion Rate: 1 Robux = 1.7 RS</p>
                    <div class="calculated-price" id="calculatedPrice">Total: NPR 0</div>
                </div>
                <div class="amount-actions">
                    <button class="amount-btn cancel-btn" onclick="closeAmountModal()">Cancel</button>
                    <button class="amount-btn add-btn" onclick="addCustomRobux()" id="addRobuxBtn" disabled>Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function updateCalculatedPrice() {
    const input = document.getElementById('robuxAmount');
    const calculatedPrice = document.getElementById('calculatedPrice');
    const addBtn = document.getElementById('addRobuxBtn');
    
    const robuxAmount = parseInt(input.value) || 0;
    const priceInRS = robuxAmount * 1.7;
    
    if (robuxAmount >= 10) {
        calculatedPrice.textContent = `Total: NPR ${Math.round(priceInRS)}`;
        calculatedPrice.style.color = '#ff0000';
        addBtn.disabled = false;
        addBtn.style.opacity = '1';
        input.style.borderColor = '#ff0000';
    } else {
        calculatedPrice.textContent = robuxAmount > 0 ? 'Minimum 10 Robux required' : 'Total: NPR 0';
        calculatedPrice.style.color = '#888';
        addBtn.disabled = true;
        addBtn.style.opacity = '0.5';
        input.style.borderColor = robuxAmount > 0 && robuxAmount < 10 ? '#ff4444' : '#333333';
    }
}

function addCustomRobux() {
    const robuxAmount = parseInt(document.getElementById('robuxAmount').value);
    
    if (robuxAmount < 10) {
        showNotification('Minimum 10 Robux required!', 'error');
        return;
    }
    
    const priceInRS = Math.round(robuxAmount * 1.7);
    
    // Create a custom cart item for the Roblox Gamepass
    const customItem = {
        id: '8-custom-' + Date.now(), // Unique ID for this custom item
        parentId: '8', // Reference to the original product
        name: `Roblox Gamepass - ${robuxAmount} Robux`,
        basePrice: priceInRS,
        finalPrice: priceInRS,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Robux_2019_Logo_gold.svg/1024px-Robux_2019_Logo_gold.svg.png?20201227051146',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: `${robuxAmount} Robux at 1.7 RS per Robux`,
        quantity: 1,
        robuxAmount: robuxAmount // Store the robux amount for reference
    };
    
    // Add to cart
    cart.push(customItem);
    
    // Save and update displays
    saveCartToStorage();
    updateCartDisplay();
    
    // Close modal and show notification
    closeAmountModal();
    showNotification(`${robuxAmount} Robux added to cart!`);
}

// Cart modal functions: Control the visibility and content of the cart modal
function openCart() {
    updateCartModal(); // Ensure the cart modal content is up-to-date
    document.getElementById('cartModal').style.display = 'block'; // Show the cart modal
    document.body.style.overflow = 'hidden'; // Prevent background scrolling when modal is open
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none'; // Hide the cart modal
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Update the cart count display in the header/navigation
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    // Calculate the total number of items (sum of quantities) in the cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems; // Update the text content of the cart count element
}

// Update the content of the cart modal with current cart items
function updateCartModal() {
    const cartItems = document.getElementById('cartItems'); // Container for cart items
    const cartTotal = document.getElementById('cartTotal'); // Element to display the total price
    
    // If the cart is empty, display a message
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><h3>Your cart is empty</h3><p>Add some awesome products to get started!</p></div>';
        cartTotal.textContent = '0'; // Set total to 0
        return;
    }
    
    let total = 0; // Initialize total price
    // Map each item in the cart to its HTML representation
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.finalPrice * item.quantity; // Calculate total for this item
        total += itemTotal; // Add to the overall total
        
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p style="color: #888;">Quantity: ${item.quantity}</p>
                    <div style="margin-top: 5px;">
                        <button onclick="updateQuantity('${item.id}', -1)" style="background: #ff0000; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 5px;">-</button>
                        <span style="margin: 0 10px;">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)" style="background: #ff0000; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 5px;">+</button>
                        <button onclick="removeFromCart('${item.id}')" style="background: #666; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 15px;">Remove</button>
                    </div>
                </div>
                <div class="cart-item-price">NPR ${itemTotal}</div>
            </div>
        `;
    }).join(''); // Join all item HTML strings
    
    cartTotal.textContent = total; // Update the total price display
}

// Update the quantity of an item in the cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId); // Find the item
    if (!item) return;
    
    item.quantity += change; // Adjust the quantity
    
    // If quantity becomes zero or less, remove the item from the cart
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    saveCartToStorage(); // Save the updated cart
    updateCartModal(); // Refresh the cart modal display
    updateCartDisplay(); // Refresh the cart count display
}

// Remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // Filter out the item to be removed
    saveCartToStorage(); // Save the updated cart
    updateCartModal(); // Refresh the cart modal display
    updateCartDisplay(); // Refresh the cart count display
}

// Proceed to checkout: Show checkout summary and open checkout modal
function proceedToCheckout() {
    // Prevent checkout if cart is empty
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    updateCheckoutSummary(); // Populate the checkout summary
    closeCart(); // Close the cart modal
    document.getElementById('checkoutModal').style.display = 'block'; // Open the checkout modal
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close the checkout modal
function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none'; // Hide the checkout modal
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Update the order summary displayed in the checkout modal
function updateCheckoutSummary() {
    const orderSummary = document.getElementById('orderSummary'); // Container for order items summary
    const finalTotal = document.getElementById('finalTotal'); // Element for the final total price
    
    let total = 0; // Initialize total price
    
    // Map each item in the cart to a summary line
    orderSummary.innerHTML = cart.map(item => {
        const itemTotal = item.finalPrice * item.quantity; // Calculate total for this item
        total += itemTotal; // Add to the overall total
        
        return `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>${item.name} (x${item.quantity})</span>
                <span>NPR ${itemTotal}</span>
            </div>
        `;
    }).join(''); // Join all summary line HTML strings
    
    finalTotal.textContent = total; // Update the final total display
}

// Handle the submission of the order form
async function handleOrderSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(event.target); // Get form data
    const orderData = { // Create an object with order details
        fullName: formData.get('fullName'),
        phoneNumber: formData.get('phoneNumber'),
        email: formData.get('email'),
        address: formData.get('address'),
        notes: formData.get('notes')
    };
    
    // Basic validation for required fields
    if (!orderData.fullName || !orderData.phoneNumber || !orderData.address) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    // Disable the submit button and change its text to indicate submission
    const submitButton = event.target.querySelector('.send-order-btn');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending Order...';
    
    try {
        // Attempt to send the order details to the Discord webhook
        await sendOrderToDiscord(orderData);
        
        // If successful, clear the cart and related UI elements
        cart = [];
        saveCartToStorage(); // Clear cart from local storage
        updateCartDisplay(); // Update header cart count
        closeCheckout(); // Close the checkout modal
        
        // Notify the user and redirect to Discord after a delay
        showNotification('Order sent successfully! Redirecting to Discord...', 'success');
        setTimeout(() => {
            window.open('https://discord.gg/XjuaQBFD8W', '_blank'); // Open Discord link in a new tab
        }, 2000); // Delay of 2 seconds
        
    } catch (error) {
        // If an error occurs during submission
        console.error('Error sending order:', error);
        showNotification('Error sending order. Please try again.', 'error');
    } finally {
        // Re-enable the submit button regardless of success or failure
        submitButton.disabled = false;
        submitButton.textContent = 'Send Order via Discord';
    }
}

// Send the order details to the configured Discord webhook
async function sendOrderToDiscord(orderData) {
    // Calculate the total price of the order
    const total = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    
    // Format the order items into a string for the Discord embed
    const orderItems = cart.map(item => 
        `${item.name} - Quantity: ${item.quantity} - NPR ${item.finalPrice * item.quantity}`
    ).join('\n');
    
    // Construct the Discord embed message object
    const embedMessage = {
        embeds: [{
            title: "🎮 New Order from GamePort Nepal", // Title of the embed
            color: 0xFF0000, // Red color for the embed
            fields: [ // Array of fields to display in the embed
                { name: "👤 Customer Name", value: orderData.fullName, inline: true }, // Customer's full name
                { name: "📱 Phone Number", value: orderData.phoneNumber, inline: true }, // Customer's phone number
                { name: "📧 Email", value: orderData.email || "Not provided", inline: true }, // Customer's email (optional)
                { name: "📍 Delivery Address", value: orderData.address, inline: false }, // Customer's address
                { name: "📦 Order Items", value: orderItems, inline: false }, // List of ordered items
                { name: "💰 Total Amount", value: `NPR ${total}`, inline: true }, // Total order amount
                { name: "📝 Notes", value: orderData.notes || "None", inline: false } // Any special notes
            ],
            timestamp: new Date().toISOString(), // Timestamp of the order
            footer: { text: "GamePort Nepal Order System" } // Footer text
        }]
    };
    
    // Make a POST request to the Discord webhook URL
    const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(embedMessage) // Send the embed message as a JSON string
    });
    
    // If the response from the server is not OK (e.g., error status code)
    if (!response.ok) {
        throw new Error('Failed to send order to Discord'); // Throw an error
    }
}

// Local storage functions: For persisting the cart across sessions
function saveCartToStorage() {
    localStorage.setItem('gameport_cart', JSON.stringify(cart)); // Save the cart array as a JSON string
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('gameport_cart'); // Retrieve the cart from local storage
    if (savedCart) {
        cart = JSON.parse(savedCart); // Parse the JSON string back into an array and assign to cart
    }
}

// Utility functions: Helper functions for common tasks

// Debounce: Delays the execution of a function until after a specified period of inactivity
function debounce(func, wait) {
    let timeout; // Variable to hold the timeout ID
    return function executedFunction(...args) { // Returns a new function that wraps the original
        const later = () => { // Function to be executed after the delay
            clearTimeout(timeout); // Clear the previous timeout
            func(...args); // Call the original function with its arguments
        };
        clearTimeout(timeout); // Clear the existing timeout (if any)
        timeout = setTimeout(later, wait); // Set a new timeout
    };
}

// Show Notification: Displays a temporary message to the user
function showNotification(message, type = 'success') {
    // Create a new div element for the notification
    const notification = document.createElement('div');
    // Apply CSS styles for positioning, appearance, and animation
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : '#00aa00'}; /* Red for error, green for success */
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000; /* Ensure it's on top of other elements */
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transform: translateX(100%); /* Start off-screen to the right */
        transition: transform 0.3s ease; /* Smooth transition for sliding effect */
    `;
    notification.textContent = message; // Set the message text
    
    document.body.appendChild(notification); // Add the notification to the DOM
    
    // Slide in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)'; // Move it into view
    }, 100); // Slight delay to ensure initial styles are applied
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)'; // Slide it back out
        // Wait for the slide-out transition to complete before removing from DOM
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300); // Match the transition duration
    }, 3000); // Total duration including animation
}

// Make specific functions globally available so they can be called from inline HTML attributes (e.g., onclick)
window.addToCart = addToCart;
window.buyNow = buyNow;
window.openCart = openCart;
window.closeCart = closeCart;
window.closeCheckout = closeCheckout;
window.proceedToCheckout = proceedToCheckout;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.openAmountModal = openAmountModal;
window.closeAmountModal = closeAmountModal;
window.updateCalculatedPrice = updateCalculatedPrice;
window.addCustomRobux = addCustomRobux;
