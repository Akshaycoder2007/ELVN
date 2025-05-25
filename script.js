// Simple user storage (simulate auth)
let users = [];
let loggedInUser = null;
let cart = [];

// Show/hide forms
function showLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('cart-section').classList.add('hidden');
}

function showSignup() {
  document.getElementById('signup-form').classList.remove('hidden');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('cart-section').classList.add('hidden');
}

function showCart() {
  if (!loggedInUser) {
    alert("Please login first.");
    return;
  }
  document.getElementById('cart-section').classList.remove('hidden');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.add('hidden');
  renderCart();
}

function closeCart() {
  document.getElementById('cart-section').classList.add('hidden');
}

// Auth functions
function signupUser() {
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-pass').value.trim();

  if (!email || !pass) {
    alert('Please fill all fields');
    return;
  }

  if (users.find(u => u.email === email)) {
    alert('Email already registered');
    return;
  }

  users.push({email, pass});
  alert('Signup successful! Please login.');
  showLogin();
}

function loginUser() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value.trim();

  if (!email || !pass) {
    alert('Please fill all fields');
    return;
  }

  const user = users.find(u => u.email === email && u.pass === pass);
  if (!user) {
    alert('Invalid credentials');
    return;
  }
  loggedInUser = user;
  alert('Login successful! Welcome to ELVN.');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('cart-section').classList.add('hidden');
}

// Cart functions
function addToCart(id) {
  if (!loggedInUser) {
    alert("Please login to add products to your cart.");
    return;
  }
  const productCard = document.querySelector(`.card[data-id="${id}"]`);
  if (!productCard) return;

  const product = {
    id,
    name: productCard.dataset.name,
    price: parseFloat(productCard.dataset.price),
  };

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({...product, qty: 1});
  }

  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
    cartItems.appendChild(div);
  });
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }
  alert(`Thank you for your purchase of $${cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}!`);
  cart = [];
  updateCartCount();
  renderCart();
}

// NeuroMood Wear Selector - simulate detecting mood
function detectMood() {
  const moods = ['Focused', 'Energetic', 'Relaxed', 'Creative', 'Calm'];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  document.getElementById('mood-status').textContent = `Your current mood: ${mood}. We recommend ${recommendByMood(mood)}.`;
}

function recommendByMood(mood) {
  const recs = {
    Focused: 'Jet Black Hoodie',
    Energetic: 'Galaxy Drip Tee',
    Relaxed: 'CyberWhite Longsleeve',
    Creative: 'Neon Pulse Tracksuit',
    Calm: 'Astral Glow Hoodie'
  };
  return recs[mood] || 'Check out our latest collection!';
}

// AuraFit Engine - camera access and fake aura analysis
async function startAuraFit() {
  const video = document.getElementById('camera');
  const auraResult = document.getElementById('aura-result');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({video: true});
    video.srcObject = stream;

    // Fake aura analysis every 5 seconds
    setInterval(() => {
      const auras = ['Blue - Calm', 'Red - Energetic', 'Green - Balanced', 'Purple - Creative', 'Yellow - Happy'];
      const aura = auras[Math.floor(Math.random() * auras.length)];
      auraResult.textContent = `Aura detected: ${aura}`;
    }, 5000);

  } catch (err) {
    auraResult.textContent = 'Camera access denied or not available.';
  }
}

// SoundFit Player - play sounds related to products
const soundMap = {
  'jet-black-hoodie': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'galaxy-drip-tee': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
};

function playSoundfit(productKey) {
  const url = soundMap[productKey];
  if (!url) return alert('Sound not available');
  const audio = new Audio(url);
  audio.play();
}

// Initialize
window.onload = () => {
  detectMood();
  startAuraFit();
};
