/* ==========================================================================
   MAISON DE DOUCE - JAVASCRIPT APPLICATION LOGIC
   CRACKYYY.TECH Web Developer Internship Project (Porutselvi A)
   ========================================================================== */

// Product Dataset (8+ Fictional Artisanal Products)
const products = [
    {
        id: "MDD-CK-01",
        name: "Royal Belgian Opera Cake",
        category: "Cakes",
        price: 1850,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
        description: "Layers of almond sponge soaked in coffee syrup, rich French buttercream, and dark Belgian chocolate ganache.",
        fullDescription: "Our signature Royal Belgian Opera Cake is an artisanal masterpiece. Featuring alternating layers of delicate Joconde biscuit soaked in single-origin espresso syrup, decadent coffee French buttercream, and lustrous dark chocolate ganache made from 72% Belgian cacao. Finished with a mirror glaze and edible gold leaf."
    },
    {
        id: "MDD-PS-02",
        name: "Madagascar Vanilla Bean Éclair",
        category: "Pastries",
        price: 320,
        image: "https://images.unsplash.com/photo-1612204052529-02c385b6d444?auto=format&fit=crop&w=800&q=80",
        description: "Crisp choux pastry filled with velvety Madagascar vanilla diplomat cream and glazed with dark caramel.",
        fullDescription: "A classic French patisserie staple elevated to perfection. Crisp golden choux pastry piped generously with a rich diplomat cream infused with scraped Madagascar vanilla pods. Topped with a glossy mirror amber caramel glaze and toasted almond shards."
    },
    {
        id: "MDD-BR-03",
        name: "Aged Sourdough Country Loaf",
        category: "Breads",
        price: 450,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        description: "Naturally fermented artisanal sourdough with a caramelized crust, open crumb, and subtle tang.",
        fullDescription: "Crafted using our 120-year-old wild yeast sourdough starter, stone-ground organic flour, and filtered spring water. Fermented slowly over 36 hours to develop deep complex flavours, a blistered caramelized crust, and an airy, gelatinous crumb."
    },
    {
        id: "MDD-PS-04",
        name: "Artisanal Pistachio Raspberry Tart",
        category: "Pastries",
        price: 380,
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
        description: "Buttery sweet shortcrust pastry filled with Sicilian pistachio frangipane and fresh ruby raspberries.",
        fullDescription: "A breathtaking union of nutty warmth and tart freshness. Buttery sablé breton crust filled with rich Sicilian pistachio frangipane cream, baked to golden perfection, and topped with fresh organic raspberries and crushed pistachios."
    },
    {
        id: "MDD-CK-05",
        name: "Truffle Ganache Celebration Cake",
        category: "Cakes",
        price: 2100,
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
        description: "Decadent dark chocolate sponge coated in silky smooth chocolate truffle ganache and cocoa nibs.",
        fullDescription: "Designed for true chocolate connoisseurs. Moist dark cacao sponge layered with rich dark chocolate truffle ganache. Encased in a velvety chocolate glaze and garnished with roasted cocoa nibs and handcrafted chocolate curls."
    },
    {
        id: "MDD-CK-06",
        name: "Classic French Butter Croissant",
        category: "Pastries",
        price: 250,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
        description: "Flaky, golden-brown laminated pastry made with pure cultured French butter and multi-layered dough.",
        fullDescription: "Basked in the authentic traditions of Parisian boulangeries. Laminated with 84% fat French cultured butter to create 27 delicate, honeycomb layers that shatter delicately upon the first bite with a buttery aroma."
    },
    {
        id: "MDD-CK-07",
        name: "Valrhona Double Chocolate Cookies",
        category: "Cookies",
        price: 290,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
        description: "Chewy gourmet cookies packed with Valrhona dark chocolate chunks and sea salt flakes.",
        fullDescription: "Gourmet cookies baked crisp on the edges and luxuriously chewy in the centre. Loaded with premium Valrhona chocolate chunks and sprinkled with delicate flaky Maldon sea salt to balance the deep cocoa sweetness."
    },
    {
        id: "MDD-CK-08",
        name: "Wild Blueberry Lemon Muffin",
        category: "Muffins",
        price: 220,
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
        description: "Fluffy citrus-infused muffin bursting with wild blueberries and a crunchy streusel topping.",
        fullDescription: "Zesty Meyer lemon sponge studded with plump wild blueberries and crowned with a buttery cinnamon-sugar streusel crunch. Baked fresh daily for an invigorating morning treat."
    }
];

// State Management
let filteredProducts = [...products];
let favourites = JSON.parse(localStorage.getItem('mdd_favourites')) || [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const resetBtn = document.getElementById('resetBtn');
const emptyResetBtn = document.getElementById('emptyResetBtn');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const favBadge = document.getElementById('favBadge');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Modals
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const modalContent = document.getElementById('modalContent');

const favModal = document.getElementById('favModal');
const openFavModal = document.getElementById('openFavModal');
const closeFavModal = document.getElementById('closeFavModal');
const favListContainer = document.getElementById('favListContainer');
const clearAllFavs = document.getElementById('clearAllFavs');

const docModal = document.getElementById('docModal');
const closeDocModal = document.getElementById('closeDocModal');
const docModalTitle = document.getElementById('docModalTitle');
const docModalBody = document.getElementById('docModalBody');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(filteredProducts);
    updateFavBadge();
    setupEventListeners();
});

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Mobile Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // Search input event
    searchInput.addEventListener('input', handleSearchAndFilter);

    // Category filter change event
    categoryFilter.addEventListener('change', handleSearchAndFilter);

    // Reset buttons
    resetBtn.addEventListener('click', resetAllFilters);
    emptyResetBtn.addEventListener('click', resetAllFilters);

    // Favourites modal toggle
    openFavModal.addEventListener('click', () => {
        renderFavouritesList();
        favModal.classList.add('active');
    });
    closeFavModal.addEventListener('click', () => favModal.classList.remove('active'));
    favModal.addEventListener('click', (e) => {
        if (e.target === favModal) favModal.classList.remove('active');
    });

    // Clear all favourites
    clearAllFavs.addEventListener('click', () => {
        favourites = [];
        saveFavourites();
        updateFavBadge();
        renderProducts(filteredProducts);
        renderFavouritesList();
    });

    // Product Modal close
    closeProductModal.addEventListener('click', () => productModal.classList.remove('active'));
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.classList.remove('active');
    });

    // Document Viewer Modal close & triggers
    closeDocModal.addEventListener('click', () => docModal.classList.remove('active'));
    docModal.addEventListener('click', (e) => {
        if (e.target === docModal) docModal.classList.remove('active');
    });

    document.querySelectorAll('.view-doc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const docType = btn.getAttribute('data-doc');
            openDocumentModal(docType);
        });
    });

    // Enquiry Form Validation & Submission
    const enquiryForm = document.getElementById('enquiryForm');
    enquiryForm.addEventListener('submit', handleFormSubmit);

    document.getElementById('resetFormBtn').addEventListener('click', () => {
        document.getElementById('successPreview').classList.add('hidden');
        enquiryForm.reset();
        enquiryForm.style.display = 'block';
    });
}

// --- Render Products ---
function renderProducts(items) {
    productGrid.innerHTML = '';
    
    if (items.length === 0) {
        emptyState.classList.remove('hidden');
        resultCount.textContent = 'Showing 0 products';
        return;
    }

    emptyState.classList.add('hidden');
    resultCount.textContent = `Showing ${items.length} ${items.length === 1 ? 'product' : 'products'}`;

    items.forEach(prod => {
        const isFav = favourites.includes(prod.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <span class="product-category-tag">${prod.category}</span>
                <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'">
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavourite('${prod.id}')" aria-label="Add to favourites">
                    <i class="${isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-meta-row">
                    <span class="product-id">${prod.id}</span>
                    <span class="product-price">₹${prod.price.toLocaleString('en-IN')}</span>
                </div>
                <h3 class="product-title">${prod.name}</h3>
                <p class="product-desc">${prod.description}</p>
                <button class="btn btn-secondary btn-sm" onclick="openProductDetails('${prod.id}')">View Details</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// --- Search and Filter Logic ---
function handleSearchAndFilter() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    filteredProducts = products.filter(prod => {
        const matchesSearch = prod.name.toLowerCase().includes(searchTerm) || 
                              prod.description.toLowerCase().includes(searchTerm) ||
                              prod.id.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
}

function resetAllFilters() {
    searchInput.value = '';
    categoryFilter.value = 'all';
    filteredProducts = [...products];
    renderProducts(filteredProducts);
}

function filterByCategory(categoryName) {
    categoryFilter.value = categoryName;
    handleSearchAndFilter();
    document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth' });
}

// --- Favourites Management ---
function toggleFavourite(productId) {
    const index = favourites.indexOf(productId);
    if (index > -1) {
        favourites.splice(index, 1);
    } else {
        favourites.push(productId);
    }
    saveFavourites();
    updateFavBadge();
    renderProducts(filteredProducts);
    if (favModal.classList.contains('active')) {
        renderFavouritesList();
    }
}

function saveFavourites() {
    localStorage.setItem('mdd_favourites', JSON.stringify(favourites));
}

function updateFavBadge() {
    favBadge.textContent = favourites.length;
}

function renderFavouritesList() {
    favListContainer.innerHTML = '';
    if (favourites.length === 0) {
        favListContainer.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 2rem 0;">No favourite items saved yet. Click the heart icon on any product to save it here.</p>';
        return;
    }

    favourites.forEach(id => {
        const prod = products.find(p => p.id === id);
        if (prod) {
            const item = document.createElement('div');
            item.className = 'fav-item';
            item.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}">
                <div class="fav-item-info">
                    <h4>${prod.name}</h4>
                    <span>₹${prod.price.toLocaleString('en-IN')}</span>
                </div>
                <button class="remove-fav-item" onclick="toggleFavourite('${prod.id}')" title="Remove"><i class="fa-solid fa-trash-can"></i></button>
            `;
            favListContainer.appendChild(item);
        }
    });
}

// --- Product Details Modal ---
function openProductDetails(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    modalContent.innerHTML = `
        <div class="modal-product-img">
            <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="modal-details">
            <span class="product-category-tag" style="position:static; display:inline-block; margin-bottom:0.75rem;">${prod.category}</span>
            <div class="product-meta-row" style="margin-bottom:0.5rem;">
                <span class="product-id">Product ID: ${prod.id}</span>
                <span class="modal-price-tag">₹${prod.price.toLocaleString('en-IN')}</span>
            </div>
            <h2>${prod.name}</h2>
            <p class="modal-full-desc">${prod.fullDescription}</p>
            <div style="display:flex; gap:1rem;">
                <button class="btn btn-primary" onclick="selectForEnquiry('${prod.name}')">Enquire About This Item</button>
                <button class="btn btn-secondary" onclick="toggleFavourite('${prod.id}'); openProductDetails('${prod.id}');">
                    <i class="${favourites.includes(prod.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}" style="${favourites.includes(prod.id) ? 'color: var(--error);' : ''}"></i> 
                    ${favourites.includes(prod.id) ? 'Saved in Favourites' : 'Add to Favourites'}
                </button>
            </div>
        </div>
    `;
    productModal.classList.add('active');
}

function selectForEnquiry(productName) {
    productModal.classList.remove('active');
    const selectEl = document.getElementById('productInterest');
    selectEl.value = productName;
    document.getElementById('enquiry').scrollIntoView({ behavior: 'smooth' });
}

// --- Enquiry Form Validation & Submission ---
function handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('custName');
    const emailInput = document.getElementById('custEmail');
    const productSelect = document.getElementById('productInterest');
    const messageInput = document.getElementById('custMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const productError = document.getElementById('productError');
    const messageError = document.getElementById('messageError');

    // Reset errors
    [nameInput, emailInput, productSelect, messageInput].forEach(el => el.classList.remove('error'));
    [nameError, emailError, productError, messageError].forEach(el => el.textContent = '');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        nameError.textContent = 'Please enter your full name.';
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address format (e.g. name@example.com).';
        isValid = false;
    }

    // Validate Product Selection
    if (!productSelect.value) {
        productSelect.classList.add('error');
        productError.textContent = 'Please select a product of interest.';
        isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        messageError.textContent = 'Please provide a message or dietary requirements.';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageInput.classList.add('error');
        messageError.textContent = 'Message must be at least 10 characters long.';
        isValid = false;
    }

    if (isValid) {
        // Show success preview
        document.getElementById('previewName').textContent = nameInput.value.trim();
        document.getElementById('previewProduct').textContent = productSelect.value;
        
        document.getElementById('enquiryForm').style.display = 'none';
        document.getElementById('successPreview').classList.remove('hidden');
    }
}

// --- Document Viewer Content Generator ---
const docContents = {
    project_plan: `
        <h3>1. Project Plan & Audience Analysis</h3>
        <p><strong>Project Title:</strong> Maison de Douce - Bakery Product Catalogue</p>
        <p><strong>Intern:</strong> Porutselvi A (CRACKYYY.TECH Web Developer Intern, Ref ID: CT/INT/2026/OCT/009)</p>
        
        <h4>Target Audience</h4>
        <ul>
            <li>Dessert enthusiasts, food lovers, and local patrons seeking artisanal bakery items.</li>
            <li>Event organizers and families looking for custom celebration cakes and catering.</li>
            <li>Discerning customers who appreciate high-end aesthetics, transparent pricing, and quality ingredients.</li>
        </ul>

        <h4>Five Key User Needs</h4>
        <ul>
            <li><strong>Immediate Visual Appeal:</strong> High-resolution imagery and luxurious patisserie branding.</li>
            <li><strong>Efficient Discovery:</strong> Case-insensitive search and category filters (Cakes, Pastries, Breads, Cookies, Muffins).</li>
            <li><strong>Detailed Information:</strong> Clear prices in INR (₹), ingredients, and product descriptions via modal views.</li>
            <li><strong>Saved Preferences:</strong> Ability to save and review favourite items using local storage.</li>
            <li><strong>Seamless Communication:</strong> An intuitive enquiry form with instant validation and clear submission previews.</li>
        </ul>

        <h4>Page Map</h4>
        <ul>
            <li><strong>Home:</strong> Navigation bar, Hero banner, Value highlights, Featured catalogue preview, Heritage story, Enquiry section, Footer.</li>
            <li><strong>Catalogue Section:</strong> Interactive search bar, category dropdown, reset button, responsive product cards grid.</li>
            <li><strong>Interactive Modals:</strong> Product Details Modal, Favourites Drawer Modal, Internship Document Viewer Modal.</li>
        </ul>
    `,
    wireframes: `
        <h3>2. Wireframe & Layout Specifications</h3>
        <p>The website layout was meticulously planned for three standard viewport tiers to ensure full responsiveness without horizontal overflow.</p>

        <h4>Desktop View (1366px and above)</h4>
        <ul>
            <li>Fixed luxury header with brand logo, right-aligned navigation links, and favorite counter badge.</li>
            <li>Immersive full-width hero banner with dark overlay and prominent call-to-action buttons.</li>
            <li>3-column grid for highlights, 4-column responsive grid for product cards.</li>
            <li>Balanced spacing (2rem padding) with generous negative space reinforcing the luxury patisserie brand identity.</li>
        </ul>

        <h4>Tablet View (768px)</h4>
        <ul>
            <li>2-column responsive product card grid.</li>
            <li>Flexible filter toolbar with stacked search and dropdown selectors.</li>
            <li>Optimized font scales and touch-friendly button targets (minimum 44x44px).</li>
        </ul>

        <h4>Mobile View (360px and above)</h4>
        <ul>
            <li>Single-column product card layout with zero horizontal overflow.</li>
            <li>Collapsible hamburger navigation menu with smooth slide-in transition.</li>
            <li>Stacked form inputs and full-width buttons for comfortable thumb-reach on mobile screens.</li>
        </ul>
    `,
    checklist: `
        <h3>3. Mandatory Task Completion Checklist</h3>
        <table>
            <thead>
                <tr>
                    <th>Task #</th>
                    <th>Requirement Description</th>
                    <th>Status</th>
                    <th>Evidence / Verification</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Website planning: audience, 5 user needs & page map</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>Documented in Project Plan</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Desktop & mobile wireframe documentation</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>Documented in Wireframe Notes</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Semantic HTML5 pages with 8 sample products</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>index.html & JS dataset</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Responsive styling tested at 360px, 768px, 1366px</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>style.css media queries</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Dynamic product cards & empty state handling</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>script.js render engine</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Search, category filter, reset button & count</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>Active toolbar logic</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Form validation with inline errors & success preview</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>enquiryForm validation</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>LocalStorage favourite persistence & clear action</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>localStorage integration</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>10 functional usability tests & accessibility checks</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>Detailed in Test Report</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>Complete code, README & internship submission package</td>
                    <td><span style="color:var(--success); font-weight:bold;">Completed</span></td>
                    <td>Porutselvi_A_October2026.zip</td>
                </tr>
            </tbody>
        </table>
    `,
    test_report: `
        <h3>4. Test Report & Usability Audit (10 Checks)</h3>
        <table>
            <thead>
                <tr>
                    <th>Test ID</th>
                    <th>Test Objective</th>
                    <th>Expected Result</th>
                    <th>Actual Result</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>TC-01</td>
                    <td>Responsive Navbar & Menu</td>
                    <td>Hamburger toggle functions correctly on mobile screens</td>
                    <td>Menu opens and closes smoothly with icon transition</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-02</td>
                    <td>Dynamic Product Rendering</td>
                    <td>All 8 products render correctly from JS array</td>
                    <td>Cards display image, title, category, price, and buttons</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-03</td>
                    <td>Case-Insensitive Search</td>
                    <td>Typing 'cake' or 'OPERA' filters matching products</td>
                    <td>Instant filtering working seamlessly</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-04</td>
                    <td>Category Dropdown Filter</td>
                    <td>Selecting 'Pastries' shows only pastry items</td>
                    <td>Grid updates accurately with correct count</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-05</td>
                    <td>Empty State Handling</td>
                    <td>Searching non-existent item shows empty state & reset</td>
                    <td>Displays 'No products found' box with reset button</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-06</td>
                    <td>Product Details Modal</td>
                    <td>Clicking 'View Details' shows full description</td>
                    <td>Modal opens with high-res image and complete specs</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-07</td>
                    <td>LocalStorage Favourites</td>
                    <td>Clicking heart toggles state and persists on reload</td>
                    <td>State saved in localStorage; badge updates instantly</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-08</td>
                    <td>Enquiry Form Validation</td>
                    <td>Empty or invalid email shows inline error messages</td>
                    <td>Errors highlighted correctly with helpful messages</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-09</td>
                    <td>Success Preview Notice</td>
                    <td>Valid form submission displays success box & no-backend note</td>
                    <td>Success preview shown with local notice</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
                <tr>
                    <td>TC-10</td>
                    <td>Viewport Responsiveness</td>
                    <td>No horizontal overflow at 360px, 768px, and 1366px</td>
                    <td>Layout adapts gracefully across all tested breakpoints</td>
                    <td><span style="color:var(--success); font-weight:bold;">PASS</span></td>
                </tr>
            </tbody>
        </table>
    `,
    progress_report: `
        <h3>5. Internship Progress Report</h3>
        <p><strong>Intern Name:</strong> Porutselvi A (அக்கா)</p>
        <p><strong>Company:</strong> CRACKYYY.TECH &bull; <strong>Reference ID:</strong> CT/INT/2026/OCT/009</p>
        
        <h4>Weekly Milestones Achieved</h4>
        <ul>
            <li><strong>Week 1:</strong> Requirements analysis, brand identity conceptualization, wireframing, and project planning.</li>
            <li><strong>Week 2:</strong> Semantic HTML5 structure implementation and luxury CSS styling using warm cream, ivory, chocolate, and muted gold palette.</li>
            <li><strong>Week 3:</strong> Vanilla JavaScript development of dynamic product rendering, search algorithms, category filtering, and modal dialogs.</li>
            <li><strong>Week 4:</strong> LocalStorage favourite persistence, form validation engine, comprehensive usability testing, documentation, and ZIP packaging.</li>
        </ul>

        <h4>Key Learnings</h4>
        <p>Mastered DOM manipulation, event-driven state management, responsive CSS Flexbox/Grid layouts, and professional documentation standards required for commercial web engineering projects.</p>
    `,
    readme: `
        <h3>6. Project README.md</h3>
        <p><strong>Project Name:</strong> Maison de Douce - Bakery Product Catalogue</p>
        <p><strong>Internship:</strong> CRACKYYY.TECH Web Developer Internship (October 2026)</p>
        <p><strong>Developer:</strong> Porutselvi A (Reference ID: CT/INT/2026/OCT/009)</p>

        <h4>Project Overview</h4>
        <p>A luxury, fully responsive bakery product catalogue web application designed with a sophisticated Parisian patisserie aesthetic. Features dynamic product rendering, robust search and filtering, local storage persistence for favourites, and an interactive enquiry form with client-side validation.</p>

        <h4>Technologies Used</h4>
        <ul>
            <li>HTML5 (Semantic markup)</li>
            <li>CSS3 (Flexbox, Grid, Custom Properties, Media Queries)</li>
            <li>Vanilla JavaScript (ES6+, DOM API, LocalStorage)</li>
            <li>FontAwesome & Google Fonts (Playfair Display & Inter)</li>
        </ul>

        <h4>Instructions to Run Locally</h4>
        <ol>
            <li>Extract the downloaded <code>Porutselvi_A_October2026.zip</code> file.</li>
            <li>Navigate into the <code>Porutselvi_A_October2026/Project/</code> folder.</li>
            <li>Double-click <code>index.html</code> to open it in any modern web browser (Chrome, Firefox, Edge, Safari). Alternatively, open it using VS Code Live Server.</li>
        </ol>

        <h4>Limitations</h4>
        <p>As this is a frontend web development internship project, there is no server-side backend or database. Enquiry form submissions are handled via local client-side preview without transmitting data over the internet.</p>
    `
};

function openDocumentModal(docType) {
    const titles = {
        project_plan: "Project Plan - Maison de Douce",
        wireframes: "Wireframe Notes - Layout Specifications",
        checklist: "Task Checklist - 10 Mandatory Requirements",
        test_report: "Test Report & Usability Audit (10 Checks)",
        progress_report: "Internship Progress Report",
        readme: "Project README.md & Setup Guide"
    };

    docModalTitle.textContent = titles[docType] || "Project Documentation";
    docModalBody.innerHTML = docContents[docType] || "<p>Document content not available.</p>";
    docModal.classList.add('active');
}
