// Products Data
const products = [
    { id: 1, name: 'Fresh Apples', emoji: '🍎', price: 80 },
    { id: 2, name: 'Bananas', emoji: '🍌', price: 40 },
    { id: 3, name: 'Oranges', emoji: '🍊', price: 60 },
    { id: 4, name: 'Watermelon', emoji: '🍉', price: 120 },
    { id: 5, name: 'Broccoli', emoji: '🥦', price: 50 },
    { id: 6, name: 'Carrots', emoji: '🥕', price: 35 },
    { id: 7, name: 'Tomatoes', emoji: '🍅', price: 45 },
    { id: 8, name: 'Cucumber', emoji: '🥒', price: 30 },
    { id: 9, name: 'Peppers', emoji: '🫑', price: 55 },
    { id: 10, name: 'Avocado', emoji: '🥑', price: 100 },
];

let cart = [];

// Display Products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">₹${product.price}/kg</p>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Display Cart
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    
    cartItemsDiv.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        totalDiv.textContent = '0';
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.emoji} ${item.name}</strong>
                <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
            </div>
            <button class="btn" style="padding: 0.5rem 1rem; background: #ff6b6b;" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });
    
    totalDiv.textContent = total;
}

// Cart Modal Functions
function openCart() {
    displayCart();
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order!\nTotal: ₹${total}\nOrder will be delivered within 24 hours.`);
    cart = [];
    updateCartCount();
    closeCart();
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 300;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    
    // Close modal when X is clicked
    document.querySelector('.close').addEventListener('click', closeCart);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cart-modal');
        if (event.target === modal) {
            closeCart();
        }
    });
    
    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
    });
    
    // Contact form submit
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Message sent! We will contact you soon.');
        contactForm.reset();
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);