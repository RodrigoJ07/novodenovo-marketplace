// ==========================================
// PARTE 1: VARIÁVEIS GLOBAIS E ESTADO
// ==========================================
let allProducts = [];
let cart = [];

// ==========================================
// PARTE 2: INICIALIZAÇÃO DO SITE
// ==========================================
async function init() {
    allProducts = await ApiClient.getProducts();
    renderProducts(allProducts);
    updateCartUI();
    switchProfileTab('info', null);
}

// ==========================================
// PARTE 3: GESTÃO DE PRODUTOS E FILTROS
// ==========================================
function renderProducts(list) {
    const container = document.getElementById('lista-produtos');
    container.innerHTML = list.map(p => `
        <div class="card" onclick="openProductDetail(${p.id})">
            <span class="grade-tag">${p.grade}</span>
            <img src="${p.img}">
            <div class="card-info">
                <h4>${p.name}</h4>
                <p style="color:var(--primary); font-weight:800; font-size:1.2rem;">${p.price}€</p>
            </div>
        </div>
    `).join('');
}

function filtrarProdutos() {
    const q = document.getElementById('search-bar').value.toLowerCase();
    const filtrados = allProducts.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.grade.toLowerCase().includes(q)
    );
    renderProducts(filtrados);
}

// ==========================================
// PARTE 4: DETALHES DO PRODUTO (FICHA TÉCNICA)
// ==========================================
function openProductDetail(id) {
    const p = allProducts.find(x => x.id === id);
    const content = document.getElementById('product-detail-content');
    
    content.innerHTML = `
        <img src="${p.img}" style="width:100%; border-radius:25px; margin-bottom:20px;">
        <span class="grade-tag">${p.grade}</span>
        <h2 style="margin: 10px 0;">${p.name}</h2>
        
        <div style="background:#f8fafc; padding:20px; border-radius:20px; margin:20px 0; font-size:0.9rem; text-align:left;">
            <h4 style="color:var(--primary); margin-bottom:10px;">📋 Ficha Técnica e Testes</h4>
            <p><strong>⚙️ Hardware:</strong> ${p.cpu} | ${p.ram} | ${p.storage}</p>
            <hr style="border:0; border-top:1px solid #eee; margin:10px 0;">
            <p><strong>✅ Testes realizados:</strong></p>
            <ul style="margin: 5px 0 10px 20px;">
                ${p.testes.map(t => `<li>${t}</li>`).join('')}
            </ul>
            <p><strong>🛠️ Reparos efetuados:</strong> ${p.reparos.join(', ')}</p>
        </div>
        
        <button class="btn-primary full-width" onclick="addToCart(${p.id})">Adicionar ao Carrinho • ${p.price}€</button>
    `;
    document.getElementById('product-modal').style.display = 'block';
}

// ==========================================
// PARTE 5: SISTEMA DO CARRINHO
// ==========================================
function addToCart(id) {
    cart.push(allProducts.find(x => x.id === id));
    updateCartUI();
    closeModal('product-modal');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
}

function openCart() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cart.length ? cart.map(i => `
        <div class="list-item">
            <span>${i.name}</span>
            <strong>${i.price}€</strong>
        </div>
    `).join('') : '<p style="padding:20px; text-align:center;">Vazio...</p>';
    
    const total = cart.reduce((acc, c) => acc + c.price, 0);
    document.getElementById('cart-total-price').innerText = `Total: ${total}€`;
    document.getElementById('cart-modal').style.display = 'block';
}

async function checkout() {
    if(!cart.length) return;
    const total = cart.reduce((acc, c) => acc + c.price, 0);
    await ApiClient.saveOrder(cart, total);
    cart = [];
    updateCartUI();
    closeModal('cart-modal');
    alert("Pagamento Seguro Concluído! Consulta as tuas encomendas no perfil.");
}

// ==========================================
// PARTE 6: FORMULÁRIOS (VENDA E RECONDICIONAR)
// ==========================================
async function submeterVenda() {
    const model = document.getElementById('v-model').value;
    const price = document.getElementById('v-price').value;
    if(!model || !price) return alert("Preenche todos os campos de venda!");
    alert(`Proposta de venda para ${model} enviada!`);
    showSection('marketplace-section', document.querySelector('.nav-item'));
}

async function submeterPedido() {
    const model = document.getElementById('model').value;
    const diag = document.getElementById('diag').value;
    if(!model || !diag) return alert("Preenche os dados do recondicionamento!");
    await ApiClient.saveRepair({ model, diag });
    alert("Taxa paga! Enviaremos as instruções por email.");
    showSection('marketplace-section', document.querySelector('.nav-item'));
}

// ==========================================
// PARTE 7: GESTÃO DO PERFIL E TABS
// ==========================================
function switchProfileTab(tab, btn) {
    const user = ApiClient.getUserData();
    const container = document.getElementById('tab-content');
    if(btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    if(tab === 'info') {
        container.innerHTML = `<div class="list-item"><span>Nome</span> <strong>${user.nome}</strong></div><div class="list-item"><span>Email</span> <strong>${user.email}</strong></div>`;
    } else if(tab === 'encomendas') {
        container.innerHTML = user.encomendas.length ? user.encomendas.map(o => `<div class="list-item"><div><strong>${o.id}</strong><br><small>${o.date}</small></div><div style="text-align:right"><span>${o.total}€</span><br><small style="color:var(--primary)">${o.status}</small></div></div>`).join('') : '<p>Sem encomendas.</p>';
    } else {
        container.innerHTML = user.reparacoes.length ? user.reparacoes.map(r => `<div class="list-item"><div><strong>${r.model}</strong><br><small>${r.date}</small></div><span style="color:var(--primary)">${r.status}</span></div>`).join('') : '<p>Sem reparações.</p>';
    }
}
// ==========================================
// PARTE 8: NAVEGAÇÃO ENTRE SECÇÕES (ABAS)
// ==========================================
function showSection(id, el) {
    // 1. Controlar a visibilidade das secções
    ['marketplace-section', 'reparar-section', 'vender-section', 'perfil-section'].forEach(s => {
        const target = document.getElementById(s);
        if(target) target.style.display = (s === id) ? 'block' : 'none';
    });

    // 2. MOSTRAR/ESCONDER A BARRA DE PESQUISA
    const searchBar = document.querySelector('.search-container');
    if (searchBar) {
        // Só aparece se estivermos na Home (Marketplace)
        searchBar.style.display = (id === 'marketplace-section') ? 'block' : 'none';
    }

    // 3. Atualizar o aspeto dos botões da navegação inferior
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if(el) el.classList.add('active');

    // 4. Se for o perfil, carregar os dados iniciais
    if(id === 'perfil-section') switchProfileTab('info', document.querySelector('.tab-btn'));
}

init();
