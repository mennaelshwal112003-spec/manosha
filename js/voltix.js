/**
 * VOLTIX Unified Storefront Core JavaScript
 * State-driven persistent cart, Slide-over Drawer, Complete Page Interlinking,
 * Toast Notifications, and Light/Dark Theme Switcher.
 */

(function () {
  'use strict';

  const CART_STORAGE_KEY = 'voltix_shopping_cart_v1';
  const THEME_STORAGE_KEY = 'voltix_theme_preference';

  const DEFAULT_ITEMS = [
    {
      id: 'soundpulse-pro',
      name: 'Voltix SoundPulse Pro',
      desc: 'Matte Space Gray • Hi-Res LDAC',
      price: 349.00,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSuLZ1-K5dyK9SLljUdq7ryv9NE9WljqifUWQdWA2DK8C2SZA94sHCI2uPMSkMiprfRdBzxJoMhByuq65_Yn69XC1S-rS3OPA7NPblXNpRN-2gofPTR_lljo1emW6_gJWbDdj84Vbxn-T0iaqdJ_M59bcIqjQZQHH8bEPu5tGz_5xmk4NuS3HIKAgPOv7O8KnzdmHTiWhZApTH68KoFvVGftxXGfe0WUOvWHnpeDA'
    },
    {
      id: 'gan-ultra-140w',
      name: 'Voltix GaN Ultra 140W',
      desc: 'Midnight Black • Triple USB-C PD3.1',
      price: 69.00,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuFvI6OPIzJOm6IDEoxsJsYboeNCSEXpExh7KLEfOcK67AdEr8QmmweuzRXmBBJMczK6XJjykwYdeO_FimbVSIFhIjcwwS2F3kqLLwwQ48ueWBwypMRLOGDxxqtk362QSbtibQBP4sTT7BrvKQEvl3f9m9YD7Gpa9cRlVYmG4-be8FI864CFpPF5jd0GiOSDLhzqfyW_wAKDkwLlTXrp5VmhOkGFLJThFULK1A7hc'
    }
  ];

  function getRootPrefix() {
    return window.location.pathname.includes('stitch_electronics_e_commerce_storefront') ? '../../' : '';
  }

  window.Voltix = {
    getCart: function () {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.warn('Storage read error:', e);
      }
      return DEFAULT_ITEMS;
    },

    saveCart: function (cart) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.warn('Storage write error:', e);
      }
      this.updateCartUI();
    },

    addToCart: function (item) {
      const cart = this.getCart();
      const existing = cart.find(p => p.id === item.id);
      const qtyToAdd = parseInt(item.quantity, 10) || 1;

      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        cart.push({
          id: item.id || 'item-' + Date.now(),
          name: item.name || 'Voltix Device',
          desc: item.desc || 'Premium Hardware',
          price: parseFloat(item.price) || 99.00,
          quantity: qtyToAdd,
          image: item.image || DEFAULT_ITEMS[0].image
        });
      }
      this.saveCart(cart);
      this.showToast(`Added to Cart: ${item.name}`, 'success');
      this.toggleCartDrawer(true);
    },

    updateQuantity: function (id, delta) {
      const cart = this.getCart();
      const index = cart.findIndex(p => p.id === id);
      if (index !== -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
          this.showToast('Item removed from cart', 'info');
        }
        this.saveCart(cart);
      }
    },

    removeItem: function (id) {
      let cart = this.getCart();
      cart = cart.filter(p => p.id !== id);
      this.saveCart(cart);
      this.showToast('Item removed from cart', 'info');
    },

    toggleCartDrawer: function (open) {
      const backdrop = document.getElementById('cartDrawerBackdrop');
      const panel = document.getElementById('cartPanel');
      if (!backdrop || !panel) return;

      const isCurrentlyOpen = !backdrop.classList.contains('pointer-events-none');
      const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;

      if (shouldOpen) {
        backdrop.classList.remove('pointer-events-none', 'opacity-0');
        panel.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
      } else {
        panel.classList.add('translate-x-full');
        backdrop.classList.add('opacity-0');
        setTimeout(() => {
          backdrop.classList.add('pointer-events-none');
          document.body.style.overflow = '';
        }, 300);
      }
    },

    showToast: function (message, type = 'success') {
      let container = document.getElementById('voltix-toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'voltix-toast-container';
        container.className = 'voltix-toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = `voltix-toast voltix-toast-${type}`;
      const icon = type === 'success' ? 'check_circle' : 'info';
      toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px] ${type === 'success' ? 'text-emerald-400' : 'text-blue-400'}">${icon}</span>
        <span class="flex-1">${message}</span>
        <span class="material-symbols-outlined text-[16px] text-gray-400 cursor-pointer" onclick="this.parentElement.remove()">close</span>
      `;
      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 3500);
      }, 3500);
    },

    updateCartUI: function () {
      const cart = this.getCart();
      const prefix = getRootPrefix();
      const totalCount = cart.reduce((acc, p) => acc + p.quantity, 0);
      const subtotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
      const discount = subtotal > 0 ? (subtotal * 0.1) : 0;
      const estimatedShipping = subtotal >= 99 ? 0 : 15.00;
      const tax = (subtotal - discount) * 0.075;
      const finalTotal = Math.max(0, subtotal - discount + tax);

      // Header Cart Badges across all pages
      document.querySelectorAll('.header-cart-count, [data-cart-count], header button span.rounded-full').forEach(el => {
        if (el.parentElement?.innerHTML.includes('shopping_bag') || el.closest('button')?.innerHTML.includes('shopping_bag')) {
          el.textContent = totalCount;
          el.classList.remove('badge-bump');
          void el.offsetWidth;
          el.classList.add('badge-bump');
        }
      });

      document.querySelectorAll('header button div:has(.font-bold), .header-cart-total').forEach(el => {
        if (el.closest('button')?.innerHTML.includes('shopping_bag')) {
          const boldPart = el.querySelector('.font-bold');
          if (boldPart) boldPart.textContent = `$${subtotal.toFixed(2)}`;
          const subLabel = el.querySelector('.text-on-surface-variant');
          if (subLabel) subLabel.textContent = `Cart (${totalCount})`;
        }
      });

      // Free shipping progress bar
      const freeShipThreshold = 99;
      const remainingForFree = Math.max(0, freeShipThreshold - subtotal);
      const progressPercent = Math.min(100, Math.round((subtotal / freeShipThreshold) * 100));

      const freeShipText = document.getElementById('free-shipping-text');
      if (freeShipText) {
        if (remainingForFree > 0) {
          freeShipText.innerHTML = `You are <strong class="text-secondary font-bold">$${remainingForFree.toFixed(2)}</strong> away from <strong class="font-bold">FREE Express</strong>`;
        } else {
          freeShipText.innerHTML = `<strong class="text-secondary font-bold">🎉 You unlocked FREE Express Shipping!</strong>`;
        }
      }
      const freeShipPercent = document.getElementById('free-shipping-percent');
      if (freeShipPercent) freeShipPercent.textContent = `${progressPercent}%`;

      const freeShipBar = document.getElementById('free-shipping-bar');
      if (freeShipBar) freeShipBar.style.width = `${progressPercent}%`;

      // Drawer Items Container
      const cartItemsContainer = document.getElementById('cart-drawer-items-list');
      if (cartItemsContainer) {
        if (cart.length === 0) {
          cartItemsContainer.innerHTML = `
            <div class="py-12 flex flex-col items-center justify-center text-center">
              <span class="material-symbols-outlined text-[54px] text-outline opacity-40 mb-3">shopping_cart_off</span>
              <p class="font-headline-sm text-headline-sm font-bold text-on-surface">Your cart is empty</p>
              <p class="font-body-sm text-body-sm text-on-surface-variant max-w-xs mt-1 mb-6">Discover our latest ultra-gear and high performance hardware.</p>
              <a href="${prefix}catalog.html" class="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors">
                Browse Catalog
              </a>
            </div>
          `;
        } else {
          cartItemsContainer.innerHTML = cart.map(item => `
            <div class="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm transition-all hover:shadow-md" data-item-id="${item.id}">
              <div class="flex gap-space-md">
                <div class="w-20 h-20 rounded-lg bg-surface-container-lowest shrink-0 overflow-hidden relative border border-surface-container">
                  <img class="w-full h-full object-cover" src="${item.image}" alt="${item.name}">
                </div>
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-space-xs">
                      <h3 class="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight truncate">${item.name}</h3>
                      <button onclick="Voltix.removeItem('${item.id}')" class="text-outline hover:text-error transition-colors p-0.5 rounded" title="Remove item">
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">${item.desc}</p>
                  </div>
                  <div class="flex items-center justify-between mt-space-xs">
                    <!-- Stepper -->
                    <div class="inline-flex items-center bg-surface-container-lowest rounded-lg p-0.5 shadow-sm border border-surface-container">
                      <button onclick="Voltix.updateQuantity('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
                        <span class="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span class="w-8 text-center font-label-md text-label-md font-bold text-on-surface">${item.quantity}</span>
                      <button onclick="Voltix.updateQuantity('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
                        <span class="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    <div class="text-right">
                      <span class="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight tabular-nums">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between pt-space-xs text-label-sm font-label-sm">
                <button class="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[15px]">bookmark</span>
                  <span>Save for Later</span>
                </button>
                <div class="inline-flex items-center gap-1 text-secondary font-medium">
                  <span class="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>In Stock & Ready</span>
                </div>
              </div>
            </div>
          `).join('');
        }
      }

      // Summary Breakdown in Drawer
      const subtotalEl = document.getElementById('cart-subtotal-val');
      if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

      const discountEl = document.getElementById('cart-discount-val');
      if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;

      const shippingEl = document.getElementById('cart-shipping-val');
      if (shippingEl) shippingEl.textContent = subtotal >= 99 ? 'FREE (Qualified)' : `$${estimatedShipping.toFixed(2)}`;

      const taxEl = document.getElementById('cart-tax-val');
      if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;

      const totalEl = document.getElementById('cart-total-val');
      if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;

      const drawerHeaderCount = document.getElementById('drawer-items-count-badge');
      if (drawerHeaderCount) drawerHeaderCount.textContent = `${totalCount} items`;
    }
  };

  // Ensure Slide-Over Cart Drawer HTML exists on the page
  function ensureCartDrawerHTML() {
    if (document.getElementById('cartDrawerBackdrop')) return;

    const prefix = getRootPrefix();
    const drawerDiv = document.createElement('div');
    drawerDiv.innerHTML = `
      <!-- VOLTIX CART DRAWER OVERLAY -->
      <div class="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm transition-opacity duration-300 flex justify-end opacity-0 pointer-events-none" id="cartDrawerBackdrop">
        <!-- Tap backdrop to dismiss -->
        <div class="flex-1 cursor-pointer" onclick="Voltix.toggleCartDrawer(false)"></div>
        <!-- Slide-over Main Panel (480px width) -->
        <div class="w-full max-w-[480px] h-full bg-surface-container-lowest shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out translate-x-full relative z-10 overflow-hidden" id="cartPanel">
          <!-- 1. DRAWER HEADER -->
          <div class="px-space-lg pt-space-lg pb-space-sm bg-surface-container-lowest shrink-0 border-b border-surface-container">
            <div class="flex items-center justify-between pb-space-sm">
              <div class="flex items-center gap-space-sm">
                <h2 class="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Your Shopping Cart</h2>
                <span id="drawer-items-count-badge" class="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-md text-label-md font-bold">2 items</span>
              </div>
              <button aria-label="Close cart drawer" class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" onclick="Voltix.toggleCartDrawer(false)">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <!-- FREE SHIPPING PROGRESS BAR -->
            <div class="mt-space-sm p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1.5">
              <div class="flex items-center justify-between text-body-sm font-body-sm">
                <div id="free-shipping-text" class="flex items-center gap-1.5 text-on-surface font-medium">
                  <span class="material-symbols-outlined text-secondary text-[18px]">bolt</span>
                  <span>You are <strong class="text-secondary font-bold">$15.00</strong> away from <strong class="text-on-surface font-bold">FREE Express</strong></span>
                </div>
                <span id="free-shipping-percent" class="font-label-sm text-label-sm font-bold text-secondary">85%</span>
              </div>
              <div class="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div id="free-shipping-bar" class="h-full rounded-full bg-secondary transition-all duration-500 ease-out" style="width: 85%;"></div>
              </div>
            </div>
          </div>
          <!-- 2. SCROLLABLE CART CONTENT AREA -->
          <div class="flex-1 overflow-y-auto px-space-lg py-space-sm space-y-space-md" id="cart-drawer-items-list">
            <!-- Dynamic items rendered by Voltix.updateCartUI() -->
          </div>
          <!-- 3. ORDER SUMMARY BREAKDOWN & CHECKOUT ACTIONS -->
          <div class="px-space-lg py-space-md bg-surface-container-lowest shadow-[0_-8px_20px_rgba(0,0,0,0.04)] border-t border-surface-container shrink-0 flex flex-col gap-space-sm">
            <!-- Summary Rows -->
            <div class="space-y-1.5 font-body-sm text-body-sm">
              <div class="flex justify-between text-on-surface-variant">
                <span>Items Subtotal</span>
                <span id="cart-subtotal-val" class="font-semibold text-on-surface tabular-nums">$418.00</span>
              </div>
              <div class="flex justify-between text-secondary">
                <span class="flex items-center gap-1">
                  <span>Applied Promo Discount</span>
                  <span class="font-label-sm text-label-sm px-1 rounded bg-secondary-fixed/50 font-bold">10% OFF</span>
                </span>
                <span id="cart-discount-val" class="font-semibold tabular-nums">-$41.80</span>
              </div>
              <div class="flex justify-between text-on-surface-variant">
                <span>Estimated Shipping</span>
                <span id="cart-shipping-val" class="font-bold text-secondary">FREE (Qualified)</span>
              </div>
              <div class="flex justify-between text-on-surface-variant">
                <span>Estimated Sales Tax</span>
                <span id="cart-tax-val" class="font-semibold text-on-surface tabular-nums">$28.21</span>
              </div>
              <div class="pt-2 flex justify-between items-baseline border-t border-surface-container">
                <div>
                  <span class="font-headline-sm text-headline-sm font-bold text-on-surface">Total</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant ml-1 font-normal">USD</span>
                </div>
                <span id="cart-total-val" class="font-price-display text-price-display font-bold text-on-surface tracking-tight tabular-nums">$404.41</span>
              </div>
            </div>
            <!-- PRIMARY CHECKOUT BUTTON -->
            <a href="${prefix}checkout.html" class="w-full bg-primary-container hover:bg-primary text-on-primary py-3.5 px-space-lg rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-space-sm transition-all transform active:scale-[0.99] shadow-md hover:shadow-lg">
              <span class="material-symbols-outlined text-[20px]">lock</span>
              <span>Proceed to Secure Checkout</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <!-- Express Pay Options -->
            <div class="grid grid-cols-3 gap-space-xs pt-1">
              <button onclick="window.location.href='${prefix}checkout.html?express=applepay'" class="h-9 bg-on-surface text-surface-container-lowest hover:opacity-90 rounded-lg flex items-center justify-center font-bold text-body-sm transition-opacity">
                Apple Pay
              </button>
              <button onclick="window.location.href='${prefix}checkout.html?express=gpay'" class="h-9 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg flex items-center justify-center font-bold text-body-sm transition-colors">
                <span class="text-primary mr-0.5">G</span>Pay
              </button>
              <button onclick="window.location.href='${prefix}checkout.html?express=paypal'" class="h-9 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] rounded-lg flex items-center justify-center font-bold text-body-sm transition-colors">
                PayPal
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(drawerDiv);
  }

  // Setup dynamic page links and interactions
  function setupPageLinks() {
    const isDark = document.documentElement.classList.contains('dark') || window.location.pathname.includes('-dark');
    const prefix = getRootPrefix();
    const homePage = prefix + (isDark ? 'index-dark.html' : 'index.html');
    const catalogPage = prefix + (isDark ? 'catalog-dark.html' : 'catalog.html');
    const productPage = prefix + (isDark ? 'product-dark.html' : 'product.html');
    const checkoutPage = prefix + 'checkout.html';
    const gamingPage = prefix + 'gaming.html';

    // 1. Logo and Home links
    document.querySelectorAll('a[data-path="home"], a:has(img[alt*="Voltix"]), a.logo').forEach(a => {
      a.setAttribute('href', homePage);
    });

    // 2. Navigation category links
    document.querySelectorAll('a[data-path="laptops-and-computing"]').forEach(a => {
      a.setAttribute('href', catalogPage);
    });

    document.querySelectorAll('a[data-path="audio-and-headphones"]').forEach(a => {
      a.setAttribute('href', productPage);
    });

    document.querySelectorAll('a[data-path="gaming-gear"]').forEach(a => {
      a.setAttribute('href', gamingPage);
    });

    document.querySelectorAll('a[data-path="smartphones"]').forEach(a => {
      a.setAttribute('href', `${catalogPage}?category=smartphones`);
    });

    document.querySelectorAll('a[data-path="smart-home"]').forEach(a => {
      a.setAttribute('href', `${catalogPage}?category=smarthome`);
    });

    document.querySelectorAll('a[data-path="wearables"]').forEach(a => {
      a.setAttribute('href', `${catalogPage}?category=wearables`);
    });

    document.querySelectorAll('a[data-path="deals-and-clearance"]').forEach(a => {
      a.setAttribute('href', `${catalogPage}?category=deals`);
    });

    // 3. Category scroll pills
    document.querySelectorAll('section a:has(span)').forEach(a => {
      const text = a.textContent.trim();
      if (text.includes('Laptops & Computing')) {
        a.setAttribute('href', catalogPage);
      } else if (text.includes('Audio Gear') || text.includes('Audio & Headphones')) {
        a.setAttribute('href', productPage);
      } else if (text.includes('Gaming')) {
        a.setAttribute('href', gamingPage);
      } else if (text.includes('All 32 Categories')) {
        a.setAttribute('href', catalogPage);
      }
    });

    // 4. Hero buttons
    document.querySelectorAll('button:has(span)').forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('Shop Flagship')) {
        btn.onclick = () => window.location.href = catalogPage;
      }
    });

    // 5. Header Cart Buttons
    document.querySelectorAll('header button').forEach(btn => {
      if (btn.textContent.includes('Cart') || btn.querySelector('.material-symbols-outlined')?.textContent.trim() === 'shopping_bag') {
        btn.onclick = (e) => {
          e.preventDefault();
          Voltix.toggleCartDrawer(true);
        };
      }
    });

    // 6. Hook product cards and Quick Add buttons
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('Quick Add') || (text.includes('Add to Cart') && !btn.closest('#cartPanel'))) {
        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();

          const qtyInput = document.getElementById('item-quantity');
          const qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;

          const card = btn.closest('article, .product-card, [class*="rounded-xl"], [class*="rounded-2xl"], .grid');
          let title = card?.querySelector('h1, h2, h3, h4')?.textContent?.trim() || 'Voltix Device';
          let priceText = card?.querySelector('[class*="price-display"], .price, [class*="font-extrabold"], [class*="font-bold"]')?.textContent || '$99.00';
          let priceMatch = priceText.match(/\$([0-9,]+(?:\.[0-9]{2})?)/);
          let price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 99.00;
          let img = card?.querySelector('img')?.getAttribute('src') || DEFAULT_ITEMS[0].image;

          if (document.title.includes('SoundPulse') || window.location.pathname.includes('product')) {
            title = 'Voltix SoundPulse Pro';
            price = 349.00;
            img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSuLZ1-K5dyK9SLljUdq7ryv9NE9WljqifUWQdWA2DK8C2SZA94sHCI2uPMSkMiprfRdBzxJoMhByuq65_Yn69XC1S-rS3OPA7NPblXNpRN-2gofPTR_lljo1emW6_gJWbDdj84Vbxn-T0iaqdJ_M59bcIqjQZQHH8bEPu5tGz_5xmk4NuS3HIKAgPOv7O8KnzdmHTiWhZApTH68KoFvVGftxXGfe0WUOvWHnpeDA';
          }

          Voltix.addToCart({
            id: 'item-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30),
            name: title,
            desc: 'Verified High-Performance Hardware',
            price: price,
            quantity: qty,
            image: img
          });
        };
      } else if (text.includes('Buy Now with 1-Click')) {
        btn.onclick = (e) => {
          e.preventDefault();
          window.location.href = checkoutPage;
        };
      }
    });

    // 7. Make product card titles & images clickable to navigate to product page
    document.querySelectorAll('article, .product-card').forEach(card => {
      const titleEl = card.querySelector('h2, h3, h4');
      const imgEl = card.querySelector('img');
      const cardText = card.textContent;

      const clickHandler = () => {
        if (cardText.includes('Headphones') || cardText.includes('SoundPulse') || cardText.includes('Audio')) {
          window.location.href = productPage;
        } else {
          window.location.href = catalogPage;
        }
      };

      if (titleEl) {
        titleEl.classList.add('cursor-pointer', 'hover:text-primary');
        titleEl.addEventListener('click', clickHandler);
      }
      if (imgEl) {
        imgEl.classList.add('cursor-pointer');
        imgEl.addEventListener('click', clickHandler);
      }
    });

    // 8. Breadcrumb Navigation
    document.querySelectorAll('nav[aria-label="Breadcrumb"] a, .breadcrumb a').forEach(a => {
      const text = a.textContent.trim();
      if (text.includes('Home')) a.setAttribute('href', homePage);
      if (text.includes('Computing') || text.includes('Catalog') || text.includes('Laptops')) a.setAttribute('href', catalogPage);
      if (text.includes('Audio')) a.setAttribute('href', productPage);
    });

    // 9. Search Bar Inputs
    document.querySelectorAll('header input[type="text"]').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = encodeURIComponent(input.value.trim());
          if (query) window.location.href = `${catalogPage}?q=${query}`;
        }
      });
    });
    document.querySelectorAll('header button:has(.material-symbols-outlined)').forEach(btn => {
      if (btn.textContent.includes('Search')) {
        btn.onclick = () => {
          const input = btn.parentElement?.querySelector('input[type="text"]');
          if (input && input.value.trim()) {
            window.location.href = `${catalogPage}?q=${encodeURIComponent(input.value.trim())}`;
          } else {
            window.location.href = catalogPage;
          }
        };
      }
    });

    // 10. Inject Theme Switcher Button into Header
    injectThemeToggle();
  }

  // Modern Theme Toggle Button
  function injectThemeToggle() {
    if (document.getElementById('voltix-theme-toggle')) return;

    const headerActions = document.querySelector('header .h-\\[67px\\] > div:last-child');
    if (!headerActions) return;

    const isDark = document.documentElement.classList.contains('dark') || window.location.pathname.includes('-dark') || window.location.pathname.includes('gaming');
    const prefix = getRootPrefix();
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'voltix-theme-toggle';
    toggleBtn.className = 'flex items-center justify-center p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors';
    toggleBtn.title = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    toggleBtn.innerHTML = `
      <span class="material-symbols-outlined text-[20px] ${isDark ? 'text-amber-400' : 'text-primary'}">
        ${isDark ? 'light_mode' : 'dark_mode'}
      </span>
    `;

    toggleBtn.onclick = () => {
      const currentPath = window.location.pathname;
      const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

      let targetPage = prefix + 'index.html';
      if (filename.includes('catalog')) {
        targetPage = prefix + (isDark ? 'catalog.html' : 'catalog-dark.html');
      } else if (filename.includes('product')) {
        targetPage = prefix + (isDark ? 'product.html' : 'product-dark.html');
      } else if (filename.includes('checkout')) {
        targetPage = prefix + 'checkout.html';
      } else if (filename.includes('gaming')) {
        targetPage = prefix + 'index.html';
      } else {
        targetPage = prefix + (isDark ? 'index.html' : 'index-dark.html');
      }
      window.location.href = targetPage;
    };

    headerActions.insertBefore(toggleBtn, headerActions.firstChild);
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    ensureCartDrawerHTML();
    Voltix.updateCartUI();
    setupPageLinks();
  });

  // Global backward compatibility
  window.toggleCartDrawer = function (open) {
    Voltix.toggleCartDrawer(open);
  };
})();
