let allProducts = [];
let cart = [];

async function init() {
    allProducts = await ApiClient.getProducts();
    renderProducts(allProducts);
    updateCartUI();
    switchProfileTab('info', null);
}

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
    renderProducts(allProducts.filter(p => p.name.toLowerCase().includes(q)));
}

function openProductDetail(id) {
    const p = allProducts.find(x => x.id === id);
    const content = document.getElementById('product-detail-content');
    content.innerHTML = `
        <img src="${p.img}" style="width:100%; border-radius:25px; margin-bottom:20px;">
        <span class="grade-tag">${p.grade}</span>
        <h2 style="margin: 10px 0;">${p.name}</h2>
        <div style="background:#f8fafc; padding:20px; border-radius:20px; margin:20px 0; font-size:0.9rem; line-height:1.8;">
            <p>⚙️ <strong>Processador:</strong> ${p.cpu}</p>
            <p>⚡ <strong>RAM:</strong> ${p.ram}</p>
            <p>💾 <strong>Armazenamento:</strong> ${p.storage}</p>
            <p>🔋 <strong>Saúde Bateria:</strong> ${p.battery}</p>
        </div>
        <button class="btn-primary full-width" onclick="addToCart(${p.id})">Adicionar ao Carrinho • ${p.price}€</button>
    `;
    document.getElementById('product-modal').style.display = 'block';
}

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

async function submeterPedido() {
    const model = document.getElementById('model').value;
    const diag = document.getElementById('diag').value;
    if(!model || !diag) return alert("Preenche os dados!");
    
    await ApiClient.saveRepair({ model, diag });
    alert("Taxa de análise paga! Enviaremos as instruções por email.");
    showSection('marketplace-section', document.querySelector('.nav-item'));
}

function switchProfileTab(tab, btn) {
    const user = ApiClient.getUserData();
    const container = document.getElementById('tab-content');
    
    if(btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    if(tab === 'info') {
        container.innerHTML = `
            <div class="list-item"><span>Nome</span> <strong>${user.nome}</strong></div>
            <div class="list-item"><span>Email</span> <strong>${user.email}</strong></div>
            <div class="list-item"><span>Localidade</span> <strong>Lisboa, PT</strong></div>
        `;
    } else if(tab === 'encomendas') {
        container.innerHTML = user.encomendas.length ? user.encomendas.map(o => `
            <div class="list-item">
                <div><strong>${o.id}</strong><br><small>${o.date}</small></div>
                <div style="text-align:right"><span>${o.total}€</span><br><small style="color:var(--primary)">${o.status}</small></div>
            </div>
        `).join('') : '<p>Sem encomendas recentes.</p>';
    } else {
        container.innerHTML = user.reparacoes.length ? user.reparacoes.map(r => `
            <div class="list-item">
                <div><strong>${r.model}</strong><br><small>${r.date}</small></div>
                <span style="color:var(--primary)">${r.status}</span>
            </div>
        `).join('') : '<p>Sem pedidos de reparação.</p>';
    }
}

function showSection(id, el) {
    ['marketplace-section', 'reparar-section', 'perfil-section'].forEach(s => {
        document.getElementById(s).style.display = (s === id) ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    if(id === 'perfil-section') switchProfileTab('info', document.querySelector('.tab-btn'));
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

init();
