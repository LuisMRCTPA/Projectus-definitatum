// Datos de productos con imágenes reales
const products = [
    {
        id: 1,
        name: "Estatuilla de Barro Precolombina",
        price: 45.99,
        category: "statues",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Réplica exacta de una estatuilla precolombina encontrada en nuestras excavaciones.",
        popular: true
    },
    {
        id: 2,
        name: "Camiseta Museo Exclusiva",
        price: 24.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        description: "Camiseta de algodón orgánico con el logo exclusivo del museo.",
        popular: true
    },
    {
        id: 3,
        name: "Dije Réplica Artefacto Antiguo",
        price: 18.50,
        category: "jewelry",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Dije de plata con réplica de artefacto arqueológico del museo.",
        popular: false
    },
    {
        id: 4,
        name: "Libro de Arte del Museo",
        price: 32.75,
        category: "books",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Libro con fotografías de alta calidad de nuestras colecciones más importantes.",
        popular: true
    },
    {
        id: 5,
        name: "Poster Exposición Temporal",
        price: 12.99,
        category: "art",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Póster de alta calidad de nuestra exposición temporal actual.",
        popular: false
    },
    {
        id: 6,
        name: "Taza con Logo del Museo",
        price: 15.25,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1577937927131-a6c407dd6c55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Taza de cerámica con el logo oficial del museo.",
        popular: true
    },
    {
        id: 7,
        name: "Réplica de Moneda Antigua",
        price: 28.99,
        category: "statues",
        image: "https://images.unsplash.com/photo-1605825217270-4be2d0f60d8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Réplica exacta de moneda antigua encontrada en excavaciones.",
        popular: false
    },
    {
        id: 8,
        name: "Bufanda Cultural",
        price: 22.50,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        description: "Bufanda de lana con patrones inspirados en artefactos del museo.",
        popular: false
    }
];

// Estado de la aplicación
let cart = [];
let wishlist = [];
let currentFilter = 'all';
let currentSort = 'name';

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const wishlistItems = document.getElementById('wishlist-items');
const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');
const cartTotal = document.getElementById('cart-total');
const subtotalAmount = document.getElementById('subtotal-amount');
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const emptyCart = document.getElementById('empty-cart');
const emptyWishlist = document.getElementById('empty-wishlist');
const cartPanel = document.getElementById('cart-panel');
const wishlistPanel = document.getElementById('wishlist-panel');
const sidebar = document.getElementById('sidebar');
const checkoutModal = document.getElementById('checkout-modal');
const successModal = document.getElementById('success-modal');
const checkoutForm = document.getElementById('checkout-form');
const orderSummary = document.getElementById('order-summary');
const orderDetails = document.getElementById('order-details');
const notificationContainer = document.getElementById('notification-container');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    updateCartCount();
    updateWishlistCount();
});

// Configurar event listeners
function setupEventListeners() {
    // Botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            loadProducts();
        });
    });

    // Ordenamiento
    document.getElementById('sort-select').addEventListener('change', (e) => {
        currentSort = e.target.value;
        loadProducts();
    });

    // Búsqueda
    document.querySelector('.search-btn').addEventListener('click', handleSearch);
    document.querySelector('.srch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Botones del carrito y lista de deseos
    document.getElementById('cart-btn').addEventListener('click', () => togglePanel('cart'));
    document.getElementById('wishlist-btn').addEventListener('click', () => togglePanel('wishlist'));
    document.getElementById('close-cart').addEventListener('click', () => togglePanel('cart'));
    document.getElementById('close-wishlist').addEventListener('click', () => togglePanel('wishlist'));

    // Checkout
    checkoutBtn.addEventListener('click', openCheckoutModal);
    document.getElementById('close-checkout').addEventListener('click', closeCheckoutModal);
    document.getElementById('back-to-cart').addEventListener('click', closeCheckoutModal);
    checkoutForm.addEventListener('submit', handleCheckout);

    // Continuar comprando
    document.getElementById('continue-shopping').addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckoutModal();
        if (e.target === successModal) successModal.style.display = 'none';
    });
}

// Cargar productos
function loadProducts() {
    let filteredProducts = [...products];

    // Aplicar filtro
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentFilter);
    }

    // Aplicar ordenamiento
    filteredProducts.sort((a, b) => {
        switch (currentSort) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'popular':
                return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
            default:
                return a.name.localeCompare(b.name);
        }
    });

    // Renderizar productos
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        ${product.popular ? '<span class="product-badge">Popular</span>' : ''}
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="quantity-selector">
                <button class="quantity-btn minus" data-id="${product.id}">-</button>
                <input type="number" class="quantity-input" value="1" min="1" max="10" data-id="${product.id}">
                <button class="quantity-btn plus" data-id="${product.id}">+</button>
            </div>
            <div class="product-actions">
                <button class="btn-primary add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Añadir
                </button>
                <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    // Event listeners para esta tarjeta
    const addToCartBtn = card.querySelector('.add-to-cart');
    const wishlistBtn = card.querySelector('.wishlist-btn');
    const minusBtn = card.querySelector('.quantity-btn.minus');
    const plusBtn = card.querySelector('.quantity-btn.plus');
    const quantityInput = card.querySelector('.quantity-input');

    addToCartBtn.addEventListener('click', () => addToCart(product.id, parseInt(quantityInput.value)));
    wishlistBtn.addEventListener('click', () => toggleWishlist(product.id));
    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) quantityInput.value = currentValue - 1;
    });
    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) quantityInput.value = currentValue + 1;
    });
    quantityInput.addEventListener('change', (e) => {
        let value = parseInt(e.target.value);
        if (value < 1) value = 1;
        if (value > 10) value = 10;
        e.target.value = value;
    });

    return card;
}

// Funciones del carrito
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCart();
    showNotification(`${product.name} añadido al carrito`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Producto eliminado del carrito', 'info');
}

function updateCart() {
    // Actualizar elementos del carrito
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartTotal.style.display = 'none';
        checkoutBtn.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartTotal.style.display = 'block';
        checkoutBtn.style.display = 'block';

        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="cart-quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="cart-quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        // Actualizar totales
        const shipping = 5.00;
        const total = subtotal + shipping;
        
        subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
        totalAmount.textContent = `$${total.toFixed(2)}`;

        // Event listeners para elementos del carrito
        cartItems.querySelectorAll('.cart-quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = cart.find(item => item.id === id);
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCart();
                }
            });
        });

        cartItems.querySelectorAll('.cart-quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = cart.find(item => item.id === id);
                if (item.quantity < 10) {
                    item.quantity++;
                    updateCart();
                }
            });
        });

        cartItems.querySelectorAll('.cart-quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = cart.find(item => item.id === id);
                let quantity = parseInt(e.target.value);
                if (quantity < 1) quantity = 1;
                if (quantity > 10) quantity = 10;
                item.quantity = quantity;
                updateCart();
            });
        });

        cartItems.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.remove-btn').dataset.id);
                removeFromCart(id);
            });
        });
    }

    updateCartCount();
}

// Funciones de la lista de deseos
function toggleWishlist(productId) {
    const index = wishlist.findIndex(id => id === productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showNotification('Añadido a la lista de deseos', 'success');
    } else {
        wishlist.splice(index, 1);
        showNotification('Eliminado de la lista de deseos', 'info');
    }
    
    updateWishlist();
    loadProducts(); // Para actualizar el estado del botón de corazón
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    updateWishlist();
    showNotification('Eliminado de la lista de deseos', 'info');
}

function updateWishlist() {
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        emptyWishlist.style.display = 'block';
    } else {
        emptyWishlist.style.display = 'none';

        wishlist.forEach(productId => {
            const product = products.find(p => p.id === productId);
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlist-item';
            wishlistItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="wishlist-item-image">
                <div class="wishlist-item-details">
                    <h4 class="wishlist-item-title">${product.name}</h4>
                    <div class="wishlist-item-price">$${product.price.toFixed(2)}</div>
                    <button class="btn-primary add-to-cart-from-wishlist" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Añadir al Carrito
                    </button>
                </div>
                <button class="remove-btn" data-id="${product.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            wishlistItems.appendChild(wishlistItem);
        });

        // Event listeners
        wishlistItems.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.add-to-cart-from-wishlist').dataset.id);
                addToCart(id);
            });
        });

        wishlistItems.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.remove-btn').dataset.id);
                removeFromWishlist(id);
            });
        });
    }

    updateWishlistCount();
}

// Funciones auxiliares
function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
    wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
}

function togglePanel(panel) {
    const isCart = panel === 'cart';
    const currentPanel = isCart ? cartPanel : wishlistPanel;
    const otherPanel = isCart ? wishlistPanel : cartPanel;
    
    if (currentPanel.style.display === 'block') {
        currentPanel.style.display = 'none';
        sidebar.style.display = 'none';
    } else {
        otherPanel.style.display = 'none';
        currentPanel.style.display = 'block';
        sidebar.style.display = 'block';
        
        if (isCart) {
            updateCart();
        } else {
            updateWishlist();
        }
    }
}

function handleSearch() {
    const searchTerm = document.querySelector('.srch').value.toLowerCase();
    if (searchTerm) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        productsGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<div class="empty-cart"><p>No se encontraron productos</p></div>';
        } else {
            filteredProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });
        }
        
        showNotification(`Se encontraron ${filteredProducts.length} productos`, 'info');
    } else {
        loadProducts();
    }
}

// Checkout
function openCheckoutModal() {
    if (cart.length === 0) return;
    
    // Actualizar resumen del pedido
    orderSummary.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        orderSummary.appendChild(orderItem);
    });
    
    const shipping = 5.00;
    const total = subtotal + shipping;
    
    orderSummary.innerHTML += `
        <div class="order-item">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="order-item">
            <span>Envío:</span>
            <span>$${shipping.toFixed(2)}</span>
        </div>
        <div class="order-item" style="font-weight: bold; border-top: 1px solid #ccc; padding-top: 10px;">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
    
    checkoutModal.style.display = 'block';
}

function closeCheckoutModal() {
    checkoutModal.style.display = 'none';
}

function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const orderData = {
        name: formData.get('name') || document.getElementById('name').value,
        email: formData.get('email') || document.getElementById('email').value,
        phone: formData.get('phone') || document.getElementById('phone').value,
        country: formData.get('country') || document.getElementById('country').value,
        address: formData.get('address') || document.getElementById('address').value,
        city: formData.get('city') || document.getElementById('city').value,
        zip: formData.get('zip') || document.getElementById('zip').value,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5.00,
        orderId: 'ORD-' + Date.now()
    };
    
    // Simular envío de confirmación por correo
    sendConfirmationEmail(orderData);
    
    // Simular envío del pedido a la empresa
    sendOrderToCompany(orderData);
    
    // Mostrar modal de éxito
    showOrderSuccess(orderData);
    
    // Limpiar carrito
    cart = [];
    updateCart();
    closeCheckoutModal();
}

function sendConfirmationEmail(orderData) {
    console.log('=== CONFIRMACIÓN DE PEDIDO ENVIADA ===');
    console.log(`Para: ${orderData.email}`);
    console.log(`Asunto: Confirmación de pedido ${orderData.orderId}`);
    console.log(`Hola ${orderData.name},`);
    console.log('Gracias por tu compra en el Museo Cultural. Tu pedido ha sido recibido:');
    orderData.items.forEach(item => {
        console.log(`- ${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`);
    });
    console.log(`Total: $${orderData.total.toFixed(2)}`);
    console.log('Tu pedido será enviado a:');
    console.log(`${orderData.address}, ${orderData.city}, ${orderData.zip}, ${orderData.country}`);
    console.log('Te notificaremos cuando tu pedido sea enviado.');
    console.log('====================================');
}

function sendOrderToCompany(orderData) {
    console.log('=== PEDIDO ENVIADO A LA EMPRESA ===');
    console.log(`Pedido ID: ${orderData.orderId}`);
    console.log(`Cliente: ${orderData.name}`);
    console.log(`Email: ${orderData.email}`);
    console.log(`Teléfono: ${orderData.phone}`);
    console.log('Detalles del pedido:');
    orderData.items.forEach(item => {
        console.log(`- ${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`);
    });
    console.log(`Total del pedido: $${orderData.total.toFixed(2)}`);
    console.log('Dirección de envío:');
    console.log(`${orderData.address}, ${orderData.city}, ${orderData.zip}, ${orderData.country}`);
    console.log('====================================');
}

function showOrderSuccess(orderData) {
    orderDetails.innerHTML = `
        <p><strong>Número de pedido:</strong> ${orderData.orderId}</p>
        <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
        <p><strong>Enviar a:</strong> ${orderData.address}, ${orderData.city}, ${orderData.zip}</p>
        <p>Se ha enviado una confirmación a <strong>${orderData.email}</strong></p>
    `;
    successModal.style.display = 'block';
}

// Notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Ocultar y eliminar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}