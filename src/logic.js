// ==========================================
// ESTADO GLOBAL
// ==========================================
let allProducts = [];
let cart = [];
let currentFilters = { category: "Todas", grade: "Todas" };
let selectedDeviceType = 'Smartphone';
let selectedCondition = 'Excelente';
let selectedPaymentMethod = 'mbway';
let selectedCheckoutPayment = 'mbway';
let repairData = {};

const ALL_SECTIONS = ['marketplace-section','product-detail-section','reparar-section','vender-section','perfil-section'];

// ==========================================
// INIT
// ==========================================
async function init() {
    allProducts = await ApiClient.getProducts();
    renderProducts(allProducts);
    updateCartUI();
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// ==========================================
// PRODUTOS - GRID
// ==========================================
function renderProducts(list) {
    const container = document.getElementById('lista-produtos');
    if (!list.length) {
        container.innerHTML = `
            <div class="empty-results" id="empty-results-msg">
                <div class="empty-icon">🔍</div>
                <h3>Não foram encontrados resultados para a sua pesquisa</h3>
                <p>Tenta ajustar os filtros ou pesquisar por outro modelo.</p>
                <button class="btn-primary" onclick="limparFiltros()" style="margin-top:16px;padding:12px 24px;">
                    Limpar filtros e ver todos
                </button>
            </div>`;
        return;
    }
    container.innerHTML = list.map(p => {
        const savings = p.originalPrice - p.price;
        return `
        <div class="card" onclick="openProductDetail(${p.id})">
            <div class="card-img-wrap">
                <span class="grade-tag">${p.grade}</span>
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <div class="card-info">
                <h4>${p.name}</h4>
                <div class="card-rating">${renderStars(p.rating)} <small>${p.rating} (${p.reviews})</small></div>
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
    return Array.from({length:5}, (_,i) =>
        `<span class="star ${i < Math.round(rating) ? 'filled' : ''}">★</span>`
    ).join('');
}

// ==========================================
// FILTROS (US3.1)
// ==========================================
function setFilter(type, value, el) {
    el.parentElement.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    currentFilters[type] = value;
    aplicarFiltrosCombinados();
}

function filtrarProdutos() { aplicarFiltrosCombinados(); }

function aplicarFiltrosCombinados() {
    let filtrados = allProducts;
    const searchQ = document.getElementById('search-bar').value.toLowerCase();
    if (searchQ) filtrados = filtrados.filter(p => p.name.toLowerCase().includes(searchQ));
    if (currentFilters.category !== "Todas") filtrados = filtrados.filter(p => p.category === currentFilters.category);
    if (currentFilters.grade !== "Todas") filtrados = filtrados.filter(p => p.grade.includes(currentFilters.grade));
    renderProducts(filtrados);
}

function limparFiltros() {
    // Resetar barra de pesquisa
    document.getElementById('search-bar').value = '';
    // Resetar chips de categoria
    document.querySelectorAll('#filter-category .chip').forEach(b => b.classList.remove('active'));
    document.querySelector('#filter-category .chip').classList.add('active');
    // Resetar chips de grade
    document.querySelectorAll('#filter-grade .chip').forEach(b => b.classList.remove('active'));
    document.querySelector('#filter-grade .chip').classList.add('active');
    currentFilters = { category: "Todas", grade: "Todas" };
    renderProducts(allProducts);
}

// ==========================================
// DETALHE DO PRODUTO
// ==========================================
function openProductDetail(id) {
    const p = allProducts.find(x => x.id === id);
    const savings = p.originalPrice - p.price;
    const specsEntries = [
        ['CPU', p.cpu], ['Memória RAM', p.ram], ['Armazenamento', p.storage],
        ['Bateria', p.battery], ['Ecrã', p.screen], ['Câmara', p.camera]
    ].filter(([,v]) => v && v !== 'N/A');

    document.getElementById('product-detail-page').innerHTML = `
        <div class="detail-back" onclick="goHome(null)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Voltar
        </div>
        <div class="detail-layout">
            <div class="detail-img-col">
                <div class="detail-img-wrap"><img src="${p.img}" alt="${p.name}"></div>
                <div class="img-dots"><span class="dot active"></span><span class="dot"></span><span class="dot"></span></div>
            </div>
            <div class="detail-info-col">
                <span class="grade-tag">${p.grade}</span>
                <h1 class="detail-name">${p.name}</h1>
                <div class="detail-rating">${renderStars(p.rating)} <span>${p.rating} (${p.reviews} avaliações)</span></div>
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
                        ${specsEntries.map(([k,v]) => `<div class="spec-row"><span class="spec-key">${k}</span><span class="spec-val">${v}</span></div>`).join('')}
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
        </div>`;

    ALL_SECTIONS.forEach(s => { const t = document.getElementById(s); if(t) t.style.display='none'; });
    document.getElementById('product-detail-section').style.display = 'block';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.filters-section').style.display = 'none';
    window.scrollTo(0,0);
}

function openFicha(id) {
    const p = allProducts.find(x => x.id === id);
    const specsEntries = [
        ['CPU', p.cpu], ['Memória RAM', p.ram], ['Armazenamento', p.storage],
        ['Bateria', p.battery], ['Ecrã', p.screen], ['Câmara', p.camera]
    ].filter(([,v]) => v && v !== 'N/A');

    document.getElementById('ficha-content').innerHTML = `
        <h2 class="ficha-title">Ficha Técnica Completa</h2>
        <div class="ficha-name">${p.name}</div>
        <span class="grade-tag">${p.grade} - ${p.condition}</span>
        <h3 class="ficha-section-title">Especificações Técnicas</h3>
        <div class="ficha-specs-grid">
            ${specsEntries.map(([k,v]) => `<div class="ficha-spec-card"><small>${k}</small><strong>${v}</strong></div>`).join('')}
        </div>
        <h3 class="ficha-section-title">Inspeção de 20 Pontos ✓</h3>
        ${Object.entries(p.testes).map(([cat, items]) => `
            <div class="ficha-test-group">
                <div class="ficha-test-cat">${cat}</div>
                <div class="ficha-test-grid">
                    ${items.map(t => `<div class="ficha-test-item"><span class="check">✓</span> ${t}</div>`).join('')}
                </div>
            </div>`).join('')}
        <div class="ficha-reparos"><strong>🛠️ Reparos efetuados:</strong> ${p.reparos.join(', ')}</div>`;
    document.getElementById('ficha-modal').style.display = 'block';
}

// ==========================================
// CARRINHO & CHECKOUT (US3.2)
// ==========================================
function addToCart(id) {
    cart.push(allProducts.find(x => x.id === id));
    updateCartUI();
    const btn = document.querySelector('.btn-comprar');
    if (btn) {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Adicionado!`;
        btn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
        setTimeout(() => {
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Comprar Agora`;
            btn.style.background = '';
        }, 1500);
    }
}

function updateCartUI() {
    const count = document.getElementById('cart-count');
    count.innerText = cart.length;
    count.style.display = cart.length ? 'flex' : 'none';
}

function openCart() {
    const list = document.getElementById('cart-items-list');
    const footer = document.getElementById('cart-footer-content');
    const total = cart.reduce((acc,c) => acc + c.price, 0);

    list.innerHTML = cart.length ? cart.map((i,idx) => `
        <div class="list-item">
            <img src="${i.img}" style="width:48px;height:48px;object-fit:cover;border-radius:10px;flex-shrink:0;">
            <span style="flex:1;padding:0 12px;">${i.name}</span>
            <div style="display:flex;align-items:center;gap:10px;">
                <strong>${i.price}€</strong>
                <button onclick="removeFromCart(${idx})" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:1.1rem;">✕</button>
            </div>
        </div>`).join('') : '<p style="padding:30px;text-align:center;color:#94a3b8;">O carrinho está vazio.</p>';

    footer.innerHTML = cart.length ? `
        <h3>Total: ${total}€</h3>
        <button class="btn-primary full-width" onclick="abrirCheckout()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Finalizar Compra Segura
        </button>` : '';

    document.getElementById('cart-modal').style.display = 'block';
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
    openCart();
}

function abrirCheckout() {
    closeModal('cart-modal');
    const total = cart.reduce((acc,c) => acc + c.price, 0);
    document.getElementById('checkout-summary').innerHTML = `
        <div class="checkout-summary-box">
            <div style="font-size:0.85rem;color:#64748b;margin-bottom:8px;">${cart.length} artigo(s)</div>
            ${cart.map(i => `<div class="list-item" style="padding:8px 0;"><span style="flex:1;">${i.name}</span><strong>${i.price}€</strong></div>`).join('')}
            <div class="list-item" style="padding:12px 0 0;border-top:2px solid #e2e8f0;margin-top:4px;"><span><strong>Total</strong></span><strong style="color:var(--primary);font-size:1.1rem;">${total}€</strong></div>
        </div>`;
    document.getElementById('mb-ref-amount').textContent = total + '€';
    document.getElementById('checkout-modal').style.display = 'block';
}

function selectCheckoutPayment(el, method) {
    selectedCheckoutPayment = method;
    el.closest('.payment-methods').querySelectorAll('.payment-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('checkout-mbway-fields').style.display = method === 'mbway' ? 'block' : 'none';
    document.getElementById('checkout-card-fields').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('checkout-mb-fields').style.display = method === 'mb' ? 'block' : 'none';
}

async function confirmarCheckout() {
    if (!cart.length) return;
    const total = cart.reduce((acc,c) => acc + c.price, 0);
    await ApiClient.saveOrder(cart, total);
    cart = [];
    updateCartUI();
    closeModal('checkout-modal');
    mostrarConfirmacaoCompra(total);
}

function mostrarConfirmacaoCompra(total) {
    const ref = `ORD-${Math.floor(Math.random()*90000+10000)}`;
    alert(`✅ Pagamento confirmado!\n\nEncomenda ${ref} — ${total}€\nReceberás a confirmação por email com a data de entrega prevista.`);
}

// ==========================================
// ÉPICO 2 — REPARAR (multi-step)
// ==========================================
function selectDeviceType(el, type) {
    el.closest('.device-type-grid').querySelectorAll('.device-type-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    selectedDeviceType = type;
}

function toggleProblem(el) { el.classList.toggle('active'); }

function avancarParaEstimativa() {
    const model = document.getElementById('repair-model').value.trim();
    if (!model) { alert('Por favor indica o modelo do dispositivo.'); return; }
    const problems = [...document.querySelectorAll('#repair-step-1 .problem-chip.active')].map(b => b.textContent.trim());
    if (!problems.length) { alert('Seleciona pelo menos um problema.'); return; }
    const diag = document.getElementById('repair-diag').value;

    repairData = { model, type: selectedDeviceType, problems, diag };

    // Calcular estimativa
    const estimates = {
        'Ecrã partido': [80, 180], '🖥️ Ecrã partido': [80, 180],
        'Bateria fraca': [40, 90], '🔋 Bateria fraca': [40, 90],
        'Danos por água': [60, 150], '💧 Danos por água': [60, 150],
        'Não carrega': [30, 70], '🔌 Não carrega': [30, 70],
        'Microfone/Som': [40, 80], '🎙️ Microfone/Som': [40, 80],
        'Câmara': [50, 120], '📷 Câmara': [50, 120],
        'Botões': [25, 60], '🔘 Botões': [25, 60],
        'Software': [20, 50], '⚙️ Software': [20, 50]
    };

    let minTotal = 0, maxTotal = 0;
    const rows = problems.map(prob => {
        const key = Object.keys(estimates).find(k => prob.includes(k.replace(/[^\w\s]/g,'').trim().split(' ').pop()));
        const [min, max] = estimates[key] || [30, 80];
        minTotal += min; maxTotal += max;
        return `<div class="spec-row"><span class="spec-key">${prob}</span><span class="spec-val">${min}–${max}€</span></div>`;
    }).join('');

    document.getElementById('estimate-device-info').innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
            <div class="perfil-item-icon" style="width:44px;height:44px;">📱</div>
            <div><strong style="font-size:1rem;">${model}</strong><br><small style="color:#64748b;">${selectedDeviceType} • ${problems.length} problema(s)</small></div>
        </div>`;

    document.getElementById('estimate-breakdown').innerHTML = `
        <div class="detail-card-label" style="margin-bottom:8px;">Estimativa por reparação</div>
        <div class="specs-list">${rows}</div>
        <div class="spec-row" style="border-top:2px solid #e2e8f0;margin-top:4px;padding-top:8px;">
            <span class="spec-key" style="font-weight:700;">Logística (recolha + envio)</span>
            <span class="spec-val">9,99€</span>
        </div>`;

    document.getElementById('estimate-total').innerHTML = `
        <div class="repair-price-banner" style="margin-top:12px;">
            <div><strong>Estimativa total</strong><span>Sujeita a confirmação após inspeção</span></div>
            <div class="repair-price-tag">${minTotal + 10}–${maxTotal + 10}€</div>
        </div>`;

    document.getElementById('repair-step-1').style.display = 'none';
    document.getElementById('repair-step-2').style.display = 'block';
    window.scrollTo(0,0);
}

function voltarStep1() {
    document.getElementById('repair-step-2').style.display = 'none';
    document.getElementById('repair-step-1').style.display = 'block';
}

function avancarParaPagamento() {
    document.getElementById('repair-step-2').style.display = 'none';
    document.getElementById('repair-step-3').style.display = 'block';
    window.scrollTo(0,0);
}

function voltarStep2() {
    document.getElementById('repair-step-3').style.display = 'none';
    document.getElementById('repair-step-2').style.display = 'block';
}

function selectPayment(el, method) {
    selectedPaymentMethod = method;
    el.closest('.payment-methods').querySelectorAll('.payment-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('mbway-fields').style.display = method === 'mbway' ? 'block' : 'none';
    document.getElementById('card-fields').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('mb-fields').style.display = method === 'mb' ? 'block' : 'none';
}

async function confirmarPagamentoReparacao() {
    await ApiClient.saveRepair({ model: repairData.model, diag: repairData.problems.join(', '), type: repairData.type });
    // Reset form
    document.getElementById('repair-step-3').style.display = 'none';
    document.getElementById('repair-step-1').style.display = 'block';
    document.getElementById('repair-model').value = '';
    document.getElementById('repair-diag').value = '';
    document.querySelectorAll('#repair-step-1 .problem-chip').forEach(b => b.classList.remove('active'));
    goHome(null);
    alert(`✅ Pagamento da taxa confirmado!\n\nO teu pedido de recondicionamento foi registado.\nReceberás um email com as instruções de recolha gratuita em breve.`);
}

// Alias para compatibilidade
async function submeterPedido() { avancarParaEstimativa(); }

// ==========================================
// VENDER
// ==========================================
function selectCondition(el, condition) {
    el.closest('.condition-grid').querySelectorAll('.condition-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    selectedCondition = condition;
    updateSellEstimate();
}

function updateSellEstimate() {
    const model = (document.getElementById('sell-model')?.value || '').toLowerCase();
    const el = document.getElementById('estimate-value-display');
    if (!el) return;
    if (!model) { el.textContent = '—'; return; }
    const ranges = {
        'iphone 15':[800,1100],'iphone 14':[550,800],'iphone 13':[350,550],'iphone 12':[250,400],
        'samsung s24':[600,900],'samsung s23':[400,650],'macbook':[700,1200],
        'ipad':[300,700],'pixel':[300,600],'airpods':[80,180],'ps5':[250,400]
    };
    const mult = {'Como Novo':1.0,'Excelente':0.85,'Bom Estado':0.65,'A Reparar':0.35}[selectedCondition] || 0.85;
    let range = [80,200];
    for (const [key,r] of Object.entries(ranges)) { if (model.includes(key)) { range=r; break; } }
    el.textContent = `${Math.round(range[0]*mult)}–${Math.round(range[1]*mult)}€`;
}

async function submeterVenda() {
    const model = document.getElementById('sell-model')?.value;
    if (!model) { alert('Indica o modelo do dispositivo!'); return; }
    alert(`Proposta de venda enviada para ${model}!\nEntraremos em contacto em breve.`);
    goHome(null);
}

// ==========================================
// ÉPICO 4 — GARANTIAS (US4.1)
// ==========================================
function openProfileTab(tab) {
    const user = ApiClient.getUserData();
    const container = document.getElementById('tab-content');
    container.style.display = 'block';
    container.style.cssText = 'display:block;margin:0 20px 20px;background:white;border-radius:16px;border:1.5px solid #e2e8f0;padding:16px;';

    const closeBtn = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <strong style="font-size:1rem;">${tab === 'info' ? 'Dados Pessoais' : tab === 'encomendas' ? 'Minhas Compras' : tab === 'reparacoes' ? 'Reparações' : 'Garantias'}</strong>
        <button onclick="document.getElementById('tab-content').style.display='none'" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:1.2rem;">✕</button>
    </div>`;

    if (tab === 'info') {
        container.innerHTML = closeBtn + `
            <div class="list-item"><span>Nome</span><strong>${user.nome}</strong></div>
            <div class="list-item"><span>Email</span><strong>${user.email}</strong></div>`;

    } else if (tab === 'encomendas') {
        container.innerHTML = closeBtn + (user.encomendas.length
            ? user.encomendas.map(o => `
                <div class="list-item">
                    <div><strong>${o.id}</strong><br><small>${o.date}</small></div>
                    <div style="text-align:right;">
                        <span>${o.total}€</span><br>
                        <small style="color:var(--primary)">${o.status}</small>
                    </div>
                </div>`).join('')
            : '<p style="padding:16px;text-align:center;color:#94a3b8;">Sem compras ainda.</p>');

    } else if (tab === 'reparacoes') {
        container.innerHTML = closeBtn + (user.reparacoes.length
            ? user.reparacoes.map(r => `
                <div class="list-item">
                    <div><strong>${r.model}</strong><br><small>${r.date}</small></div>
                    <span style="color:var(--primary)">${r.status}</span>
                </div>`).join('')
            : '<p style="padding:16px;text-align:center;color:#94a3b8;">Sem reparações ainda.</p>');

    } else if (tab === 'garantias') {
        // US4.1 — Consulta de garantias por encomenda
        const encomendas = user.encomendas;
        if (!encomendas.length) {
            container.innerHTML = closeBtn + '<p style="padding:16px;text-align:center;color:#94a3b8;">Sem garantias ativas. Faz uma compra para activar a garantia de 3 anos.</p>';
            return;
        }
        container.innerHTML = closeBtn + encomendas.map(o => {
            const dataCompra = new Date(o.date.split('/').reverse().join('-'));
            const dataFim = new Date(dataCompra);
            dataFim.setFullYear(dataFim.getFullYear() + 3);
            const hoje = new Date();
            const dentroGarantia = hoje < dataFim;
            const diasRestantes = Math.ceil((dataFim - hoje) / (1000*60*60*24));

            return `
            <div class="garantia-card" onclick="abrirDetalheGarantia('${o.id}', '${o.date}', ${o.total})">
                <div class="garantia-header">
                    <div>
                        <strong>${o.id}</strong>
                        <div style="font-size:0.78rem;color:#64748b;">Compra: ${o.date} • ${o.total}€</div>
                    </div>
                    <span class="garantia-badge ${dentroGarantia ? 'ativa' : 'expirada'}">
                        ${dentroGarantia ? '✓ Ativa' : '✗ Expirada'}
                    </span>
                </div>
                <div class="garantia-datas">
                    <div><small>Válida até</small><strong>${dataFim.toLocaleDateString('pt-PT')}</strong></div>
                    <div><small>${dentroGarantia ? 'Dias restantes' : 'Estado'}</small><strong>${dentroGarantia ? diasRestantes + ' dias' : 'Expirada'}</strong></div>
                </div>
                ${dentroGarantia ? `<button class="btn-acionar" onclick="event.stopPropagation();abrirAcionarGarantia('${o.id}')">⚠️ Acionar Garantia</button>` : ''}
            </div>`;
        }).join('');
    }
}

function abrirDetalheGarantia(orderId, dateStr, total) {
    const dataCompra = new Date(dateStr.split('/').reverse().join('-'));
    const dataFim = new Date(dataCompra);
    dataFim.setFullYear(dataFim.getFullYear() + 3);
    const dentroGarantia = new Date() < dataFim;

    document.getElementById('garantia-content').innerHTML = `
        <h2 style="margin-bottom:4px;">Certificado de Garantia</h2>
        <p style="color:#64748b;margin-bottom:20px;">Encomenda ${orderId}</p>
        <div class="garantia-cert-box">
            <div class="garantia-cert-icon">🛡️</div>
            <h3>Garantia NovoDeNovo</h3>
            <div class="garantia-cert-grid">
                <div><small>Data de compra</small><strong>${dateStr}</strong></div>
                <div><small>Duração</small><strong>3 Anos</strong></div>
                <div><small>Válida até</small><strong>${dataFim.toLocaleDateString('pt-PT')}</strong></div>
                <div><small>Estado</small><strong style="color:${dentroGarantia ? '#16a34a' : '#ef4444'}">${dentroGarantia ? 'Ativa ✓' : 'Expirada ✗'}</strong></div>
            </div>
            <div class="garantia-covers">
                <div class="garantia-cover-item">✓ Avarias técnicas não provocadas</div>
                <div class="garantia-cover-item">✓ Defeitos de fabrico</div>
                <div class="garantia-cover-item">✓ Substituição ou reparação gratuita</div>
                <div class="garantia-cover-item">✓ Recolha e entrega grátis</div>
            </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:16px;">
            <button class="btn-ficha" onclick="downloadCertificadoPDF('${orderId}', '${dateStr}', '${dataFim.toLocaleDateString('pt-PT')}')" style="flex:1;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descarregar PDF
            </button>
            ${dentroGarantia ? `<button class="btn-primary" style="flex:1;" onclick="closeModal('garantia-modal');abrirAcionarGarantia('${orderId}')">⚠️ Acionar Garantia</button>` : ''}
        </div>`;
    document.getElementById('garantia-modal').style.display = 'block';
}

function downloadCertificadoPDF(orderId, dateStr, dataFim) {
    // Gera um PDF simples via data URI (sem dependências externas)
    const conteudo = `CERTIFICADO DE GARANTIA - NOVODENOVO\n\nEncomenda: ${orderId}\nData de compra: ${dateStr}\nVálida até: ${dataFim}\nDuração: 3 Anos\n\nCOBERTURA:\n- Avarias técnicas não provocadas\n- Defeitos de fabrico\n- Substituição ou reparação gratuita\n- Recolha e entrega grátis\n\nNovoDeNovo - Certificado Oficial`;
    const blob = new Blob([conteudo], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Garantia_${orderId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function abrirAcionarGarantia(orderId) {
    document.getElementById('garantia-order-id').value = orderId;
    document.getElementById('garantia-avaria').value = '';
    document.getElementById('acionar-garantia-modal').style.display = 'block';
}

function confirmarAcionarGarantia() {
    const orderId = document.getElementById('garantia-order-id').value;
    const avaria = document.getElementById('garantia-avaria').value.trim();
    if (!avaria) { alert('Por favor descreve a avaria.'); return; }
    const numProcesso = `GAR-${Math.floor(Math.random()*90000+10000)}`;
    closeModal('acionar-garantia-modal');
    alert(`✅ Pedido de garantia submetido!\n\nNúmero de processo: ${numProcesso}\nEncomenda: ${orderId}\n\nReceberás um email com as instruções de recolha gratuita do dispositivo.`);
}

// ==========================================
// NAVEGAÇÃO
// ==========================================
function goHome(el) {
    ALL_SECTIONS.forEach(s => { const t = document.getElementById(s); if(t) t.style.display='none'; });
    document.getElementById('marketplace-section').style.display = 'block';
    document.querySelector('.search-container').style.display = 'block';
    document.querySelector('.filters-section').style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item').classList.add('active');
    // Reset repair steps
    const s1 = document.getElementById('repair-step-1');
    const s2 = document.getElementById('repair-step-2');
    const s3 = document.getElementById('repair-step-3');
    if(s1) s1.style.display = 'block';
    if(s2) s2.style.display = 'none';
    if(s3) s3.style.display = 'none';
}

function showSection(id, el) {
    ALL_SECTIONS.forEach(s => { const t = document.getElementById(s); if(t) t.style.display = (s===id)?'block':'none'; });
    const isHome = id === 'marketplace-section';
    document.querySelector('.search-container').style.display = isHome ? 'block' : 'none';
    document.querySelector('.filters-section').style.display = isHome ? 'block' : 'none';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (el) el.classList.add('active');
    window.scrollTo(0,0);
}

// Compatibilidade
function switchProfileTab(tab, btn) { openProfileTab(tab); }

init();
