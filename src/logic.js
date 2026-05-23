let allProducts = [];
let cart = [];
let currentFilters = { category: "Todas", grade: "Todas" };

// ==========================================
// INIT
// ==========================================
async function init() {
    allProducts = await ApiClient.getProducts();
    renderProducts(allProducts);
    updateCartUI();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// ==========================================
// PRODUTOS - GRID
// ==========================================
function renderProducts(list) {
    const container = document.getElementById('lista-produtos');
    if (!list.length) {
        container.innerHTML = '<p style="padding:40px; text-align:center; color:#94a3b8;">Nenhum produto encontrado.</p>';
        return;
    }
    container.innerHTML = list.map(p => {
        const savings = p.originalPrice - p.price;
        const stars = renderStars(p.rating);
        return `
        <div class="card" onclick="openProductDetail(${p.id})">
            <div class="card-img-wrap">
                <span class="grade-tag">${p.grade}</span>
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <div class="card-info">
                <h4>${p.name}</h4>
                <div class="card-rating">${stars} <small>${p.rating} (${p.reviews})</small></div>
                <div class="card-price-row">
                    <span class="price-main">${p.price}€</span>
                    <span class="price-old">${p.originalPrice}€</span>
                    <span class="price-save">-${Math.round(savings/p.originalPrice*100)}%</span>
                </div>
            </div>
        </div>`;
    }).join('');
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= Math.round(rating) ? 'filled' : ''}">★</span>`;
    }
    return stars;
}

// ==========================================
// FILTROS
// ==========================================
function setFilter(type, value, el) {
    el.parentElement.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    currentFilters[type] = value;
    aplicarFiltrosCombinados();
}

function filtrarProdutos() {
    aplicarFiltrosCombinados();
}

function aplicarFiltrosCombinados() {
    let filtrados = allProducts;
    const searchQ = document.getElementById('search-bar').value.toLowerCase();
    if (searchQ) filtrados = filtrados.filter(p => p.name.toLowerCase().includes(searchQ));
    if (currentFilters.category !== "Todas") filtrados = filtrados.filter(p => p.category === currentFilters.category);
    if (currentFilters.grade !== "Todas") filtrados = filtrados.filter(p => p.grade.includes(currentFilters.grade));
    renderProducts(filtrados);
}

// ==========================================
// DETALHE DO PRODUTO (página completa)
// ==========================================
function openProductDetail(id) {
    const p = allProducts.find(x => x.id === id);
    const savings = p.originalPrice - p.price;
    const stars = renderStars(p.rating);

    const specsEntries = [
        ['CPU', p.cpu], ['Memória RAM', p.ram], ['Armazenamento', p.storage],
        ['Bateria', p.battery], ['Ecrã', p.screen], ['Câmara', p.camera]
    ].filter(([,v]) => v && v !== 'N/A');

    const page = document.getElementById('product-detail-page');
    page.innerHTML = `
        <div class="detail-back" onclick="goHome(null)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Voltar
        </div>

        <div class="detail-layout">
            <div class="detail-img-col">
                <div class="detail-img-wrap">
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <div class="img-dots"><span class="dot active"></span><span class="dot"></span><span class="dot"></span></div>
            </div>

            <div class="detail-info-col">
                <span class="grade-tag">${p.grade}</span>
                <h1 class="detail-name">${p.name}</h1>
                <div class="detail-rating">${stars} <span>${p.rating} (${p.reviews} avaliações)</span></div>

                <div class="detail-price-block">
                    <span class="detail-price">€${p.price}</span>
                    <span class="detail-price-old">€${p.originalPrice}</span>
                </div>
                <div class="detail-savings">Poupa €${savings}</div>

                <div class="detail-card">
                    <div class="detail-card-label">Condição</div>
                    <div class="detail-condition">${p.condition}</div>
                    <div class="detail-cert">Testado e certificado através da nossa inspeção rigorosa de 20 pontos</div>
                </div>

                <div class="detail-card">
                    <div class="detail-card-label">Especificações</div>
                    <div class="specs-list">
                        ${specsEntries.map(([k,v]) => `
                            <div class="spec-row">
                                <span class="spec-key">${k}</span>
                                <span class="spec-val">${v}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="detail-actions">
                    <button class="btn-ficha" onclick="openFicha(${p.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        Ver Ficha Técnica
                    </button>
                    <button class="btn-primary btn-comprar" onclick="addToCart(${p.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        Comprar Agora
                    </button>
                </div>
            </div>
        </div>
    `;

    // Esconder marketplace, mostrar detalhe
    document.getElementById('marketplace-section').style.display = 'none';
    document.getElementById('product-detail-section').style.display = 'block';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.filters-section').style.display = 'none';
    window.scrollTo(0, 0);
}

// ==========================================
// FICHA TÉCNICA (modal)
// ==========================================
function openFicha(id) {
    const p = allProducts.find(x => x.id === id);
    const specsEntries = [
        ['CPU', p.cpu], ['Memória RAM', p.ram], ['Armazenamento', p.storage],
        ['Bateria', p.battery], ['Ecrã', p.screen], ['Câmara', p.camera]
    ].filter(([,v]) => v && v !== 'N/A');

    const testesHTML = Object.entries(p.testes).map(([cat, items]) => `
        <div class="ficha-test-group">
            <div class="ficha-test-cat">${cat}</div>
            <div class="ficha-test-grid">
                ${items.map(t => `<div class="ficha-test-item"><span class="check">✓</span> ${t}</div>`).join('')}
            </div>
        </div>
    `).join('');

    document.getElementById('ficha-content').innerHTML = `
        <h2 class="ficha-title">Ficha Técnica Completa</h2>
        <div class="ficha-name">${p.name}</div>
        <span class="grade-tag">${p.grade} - ${p.condition}</span>

        <h3 class="ficha-section-title">Especificações Técnicas</h3>
        <div class="ficha-specs-grid">
            ${specsEntries.map(([k,v]) => `
                <div class="ficha-spec-card">
                    <small>${k}</small>
                    <strong>${v}</strong>
                </div>
            `).join('')}
        </div>

        <h3 class="ficha-section-title">Inspeção de 20 Pontos ✓</h3>
        ${testesHTML}

        <div class="ficha-reparos">
            <strong>🛠️ Reparos efetuados:</strong> ${p.reparos.join(', ')}
        </div>
    `;

    document.getElementById('ficha-modal').style.display = 'block';
}

// ==========================================
// CARRINHO
// ==========================================
function addToCart(id) {
    cart.push(allProducts.find(x => x.id === id));
    updateCartUI();
    // Feedback visual
    const btn = document.querySelector('.btn-comprar');
    if (btn) {
        btn.textContent = '✓ Adicionado!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Comprar Agora`;
            btn.style.background = '';
        }, 1500);
    }
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-count').style.display = cart.length ? 'flex' : 'none';
}

function openCart() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cart.length ? cart.map((i, idx) => `
        <div class="list-item">
            <img src="${i.img}" style="width:48px;height:48px;object-fit:cover;border-radius:10px;">
            <span style="flex:1; padding:0 12px;">${i.name}</span>
            <div style="display:flex;align-items:center;gap:10px;">
                <strong>${i.price}€</strong>
                <button onclick="removeFromCart(${idx})" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:1.1rem;">✕</button>
            </div>
        </div>
    `).join('') : '<p style="padding:30px; text-align:center; color:#94a3b8;">O carrinho está vazio.</p>';
    const total = cart.reduce((acc, c) => acc + c.price, 0);
    document.getElementById('cart-total-price').innerText = `Total: ${total}€`;
    document.getElementById('cart-modal').style.display = 'block';
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
    openCart();
}

async function checkout() {
    if (!cart.length) return;
    const total = cart.reduce((acc, c) => acc + c.price, 0);
    await ApiClient.saveOrder(cart, total);
    cart = [];
    updateCartUI();
    closeModal('cart-modal');
    alert("Pagamento Seguro Concluído! Consulta as tuas encomendas no perfil.");
}

// ==========================================
// NAVEGAÇÃO
// ==========================================
function goHome(el) {
    ['product-detail-section', 'reparar-section', 'perfil-section'].forEach(s => {
        const t = document.getElementById(s);
        if (t) t.style.display = 'none';
    });
    document.getElementById('marketplace-section').style.display = 'block';
    document.querySelector('.search-container').style.display = 'block';
    document.querySelector('.filters-section').style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const homeNav = document.querySelector('.nav-item');
    if (homeNav) homeNav.classList.add('active');
}

function showSection(id, el) {
    ['marketplace-section', 'product-detail-section', 'reparar-section', 'perfil-section'].forEach(s => {
        const t = document.getElementById(s);
        if (t) t.style.display = (s === id) ? 'block' : 'none';
    });
    const searchBar = document.querySelector('.search-container');
    const filtersSection = document.querySelector('.filters-section');
    if (searchBar) searchBar.style.display = (id === 'marketplace-section') ? 'block' : 'none';
    if (filtersSection) filtersSection.style.display = (id === 'marketplace-section') ? 'block' : 'none';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (el) el.classList.add('active');
    if (id === 'perfil-section') switchProfileTab('info', document.querySelector('.tab-btn'));
}

// ==========================================
// PERFIL
// ==========================================
function switchProfileTab(tab, btn) {
    const user = ApiClient.getUserData();
    const container = document.getElementById('tab-content');
    if (btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    if (tab === 'info') {
        container.innerHTML = `
            <div class="list-item"><span>Nome</span><strong>${user.nome}</strong></div>
            <div class="list-item"><span>Email</span><strong>${user.email}</strong></div>`;
    } else if (tab === 'encomendas') {
        container.innerHTML = user.encomendas.length
            ? user.encomendas.map(o => `<div class="list-item"><div><strong>${o.id}</strong><br><small>${o.date}</small></div><div style="text-align:right"><span>${o.total}€</span><br><small style="color:var(--primary)">${o.status}</small></div></div>`).join('')
            : '<p style="padding:20px;text-align:center;color:#94a3b8;">Sem encomendas.</p>';
    } else {
        container.innerHTML = user.reparacoes.length
            ? user.reparacoes.map(r => `<div class="list-item"><div><strong>${r.model}</strong><br><small>${r.date}</small></div><span style="color:var(--primary)">${r.status}</span></div>`).join('')
            : '<p style="padding:20px;text-align:center;color:#94a3b8;">Sem reparações.</p>';
    }
}

async function submeterPedido() {
    const model = document.getElementById('model').value;
    const diag = document.getElementById('diag').value;
    if (!model || !diag) return alert("Preenche os dados do recondicionamento!");
    await ApiClient.saveRepair({ model, diag });
    alert("Taxa paga! Enviaremos as instruções por email.");
    goHome(null);
}

init();
