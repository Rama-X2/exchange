// Inisialisasi keranjang belanja dari localStorage
let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Fungsi untuk langsung membeli produk (tambah ke keranjang + redirect ke checkout)
function handleDirectAddToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (product) {
    addToCart(product, 1);
    window.location.href = "checkout.html";
  }
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product, quantity) {
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex > -1) {
    // Item sudah ada di keranjang, update kuantitas
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Tambahkan item baru ke keranjang
    cart.push({ ...product, quantity: quantity });
  }
  saveCart();
  updateCartDisplay(); // Perbarui tampilan ikon keranjang di header
}

// Fungsi untuk memperbarui kuantitas item di keranjang
function updateCartItemQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    if (item.quantity <= 0) {
      removeFromCart(productId); // Hapus jika kuantitas 0 atau kurang
    }
    saveCart();
    updateCartDisplay();
  }
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartDisplay();
}

// Fungsi untuk memperbarui tampilan jumlah item di ikon keranjang header
function updateCartDisplay() {
  const cartCountElement = document.getElementById("cart-item-count");
  if (cartCountElement) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? "flex" : "none"; // Tampilkan/sembunyikan berdasarkan jumlah
  }
}

// Panggil updateCartDisplay saat DOM selesai dimuat untuk inisialisasi
document.addEventListener("DOMContentLoaded", updateCartDisplay);

// --- Logika untuk Halaman Produk (product.html) dan Beranda (index.html) ---
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk membuat HTML card produk
  function createProductCard(product) {
    return `
      <div class="premium-card flex flex-col group transition-all duration-300">
        <!-- Image Container (Frameless clean look) -->
        <div class="premium-card-img-wrapper aspect-square bg-[#FAF9F6] border border-stone-200/50 relative rounded-[32px] overflow-hidden">
          <a href="product-detail.html?id=${product.id}" class="block w-full h-full">
            <img class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                 src="${product.image}"
                 alt="${product.name}">
          </a>
          <!-- Category Tag -->
          <span class="absolute top-4 left-4 text-[9px] font-bold bg-[#A88E75]/10 text-[#A88E75] py-1 px-3 rounded-full uppercase tracking-wider">${product.category || 'Bubuk Minuman'}</span>
        </div>

        <!-- Product info section below the image -->
        <div class="py-4 space-y-2 flex-grow flex flex-col justify-between">
          <div class="space-y-1">
            <h3 class="font-bold text-base text-[#1B1917] group-hover:text-[#A88E75] transition-colors duration-200">
              ${product.name}
            </h3>
            <p class="text-[11px] text-stone-500 font-medium">
              Notes: ${product.tastingNotes}
            </p>
          </div>
          
          <div class="flex flex-col gap-3 pt-3 border-t border-stone-100">
            <div class="flex items-center justify-between">
              <span class="text-base font-black text-[#1B1917]">
                Rp ${product.price.toLocaleString("id-ID")}
              </span>
            </div>
            
            <!-- Quick buy or view -->
            <div class="grid grid-cols-2 gap-2 w-full">
              <button onclick="handleDirectAddToCart('${product.id}')" class="py-2 px-3 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#1B1917] hover:bg-[#A88E75] text-[#FAF8F5] transition-all text-center cursor-pointer">
                Beli
              </button>
              <a class="py-2 px-3 text-[10px] font-bold uppercase tracking-wider rounded-full bg-transparent border border-stone-300 hover:border-stone-500 text-[#1B1917] transition-all text-center"
                 href="product-detail.html?id=${product.id}">
                Detail
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Fungsi untuk memuat produk ke dalam container yang ditentukan
  function loadProducts(containerId, productsToLoad) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = ""; // Bersihkan konten yang ada
      productsToLoad.forEach((product) => {
        container.insertAdjacentHTML("beforeend", createProductCard(product));
      });
    }
  }

  // --- Logika untuk index.html ---
  const homeProductListContainer = document.getElementById("product-list-home");
  if (homeProductListContainer) {
    // Muat subset produk untuk halaman beranda (misalnya, 6 produk pertama)
    const featuredProducts = productsData.slice(0, 6);
    loadProducts("product-list-home", featuredProducts);
  }

  // --- Logika untuk product.html ---
  const allProductListContainer = document.getElementById("all-products-grid");
  if (allProductListContainer) {
    // Muat semua produk untuk halaman daftar produk
    loadProducts("all-products-grid", productsData);

    const searchInput = document.getElementById("search-input") || document.querySelector('input[placeholder="Cari produk..."]');
    const filterSelect = document.getElementById("sort-select") || document.querySelector("select");
    
    let selectedCategory = "all";
    const categoryButtons = document.querySelectorAll("#category-filter-list button");
    
    if (categoryButtons.length > 0) {
      categoryButtons.forEach(btn => {
        btn.addEventListener("click", function() {
          categoryButtons.forEach(b => {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          selectedCategory = btn.getAttribute("data-category");
          applyFilters();
        });
      });
    }

    function applyFilters() {
      let filteredProducts = [...productsData]; // Mulai dengan salinan baru dari semua produk

      // Terapkan filter kategori
      if (selectedCategory && selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      // Terapkan filter pencarian
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) => product.name.toLowerCase().includes(searchTerm) || product.tastingNotes.toLowerCase().includes(searchTerm) || product.origin.toLowerCase().includes(searchTerm) || product.region.toLowerCase().includes(searchTerm)
        );
      }

      // Terapkan filter sortir
      const sortOption = filterSelect ? filterSelect.value : "";
      if (sortOption === "Harga: Rendah ke Tinggi") {
        filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sortOption === "Harga: Tinggi ke Rendah") {
        filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      } else if (sortOption === "Populer") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      }

      loadProducts("all-products-grid", filteredProducts);
    }

    // Tambahkan event listener untuk pencarian dan filter
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (filterSelect) filterSelect.addEventListener("change", applyFilters);
  }
});

// // --- Logika untuk Halaman Blog (blog.html dan blog-detail.html) ---


// Fungsi untuk membuat card blog
function createBlogCard(post) {
  return `
    <div class="group flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div class="relative">
        <div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-xl">
          <img class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
               src="${post.image}"
               alt="${post.title}">
        </div>
      </div>
      <div class="p-5 flex-grow">
        <h3 class="font-serif text-base text-[#1B1917] mb-2 leading-snug">
          <a href="blog-detail.html?id=${post.id}" class="hover:text-[#A88E75] transition-colors">
            ${post.title}
          </a>
        </h3>
        <p class="text-xs text-stone-500 mb-4 font-light leading-relaxed">
          ${post.excerpt}
        </p>
        <p class="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
          Oleh: ${post.author} | ${post.date}
        </p>
      </div>
      <div class="p-5 pt-0">
        <a class="block w-full text-center btn-premium"
           href="blog-detail.html?id=${post.id}">
          Baca Selengkapnya
        </a>
      </div>
    </div>
  `;
}

// Logika untuk blog.html
// HAPUS BAGIAN INI (akan dipindahkan ke blog.html):
/*
document.addEventListener("DOMContentLoaded", function () {
  const blogListGrid = document.getElementById("blog-list-grid");
  if (blogListGrid) {
    blogListGrid.innerHTML = ""; // Clear existing content
    blogPostsData.forEach((post) => {
      blogListGrid.insertAdjacentHTML("beforeend", createBlogCard(post));
    });
  }
});
*/

// Logika untuk blog-detail.html
// HAPUS BAGIAN INI (akan dipindahkan ke blog-detail.html):
/*
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const post = blogPostsData.find((p) => p.id === postId);

  if (post) {
    const blogImage = document.getElementById("blog-image");
    const blogTitle = document.getElementById("blog-title");
    const blogAuthor = document.getElementById("blog-author");
    const blogDate = document.getElementById("blog-date");
    const blogContent = document.getElementById("blog-content");

    if (blogImage) blogImage.src = post.image;
    if (blogImage) blogImage.alt = post.title;
    if (blogTitle) blogTitle.textContent = post.title;
    if (blogAuthor) blogAuthor.textContent = post.author;
    if (blogDate) blogDate.textContent = post.date;
    if (blogContent) blogContent.innerHTML = post.content; // Menggunakan innerHTML untuk konten HTML
  } else {
    const blogPostContainer = document.getElementById("blog-post-container");
    if (blogPostContainer) {
      blogPostContainer.innerHTML = '<p class="text-center text-xl text-red-500">Artikel tidak ditemukan.</p>';
    }
  }
});
*/
