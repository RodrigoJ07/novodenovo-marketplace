const ApiClient = {
    getProducts: async () => {
        return [
            { 
                id: 1, name: "iPhone 15 Pro Max", price: 1150, originalPrice: 1599, grade: "Grade A++", condition: "Excelente",
                category: "Smartphones",
                img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
                cpu: "A17 Pro", ram: "8GB", storage: "256GB", battery: "100%",
                screen: "6.7\" Super Retina XDR", camera: "48MP Principal + 12MP Ultra-Wide",
                rating: 4.9, reviews: 234,
                testes: {
                    "Exterior": ["Sem arranhões visíveis", "Estrutura intacta", "Botões funcionais", "Portas limpas"],
                    "Display": ["Brilho uniforme", "Touch 100% responsivo", "Sem pixels mortos"],
                    "Hardware": ["Face ID funcional", "Microfone claro", "Altifalantes OK"],
                    "Bateria": ["100% capacidade", "Carga rápida OK", "Carga sem fios OK"],
                    "Conectividade": ["5G verificado", "Wi-Fi 6 testado", "Bluetooth OK"]
                },
                reparos: ["Nenhum (Equipamento Selado)"]
            },
            { 
                id: 2, name: "Samsung S24 Ultra", price: 980, originalPrice: 1399, grade: "Como Novo", condition: "Como Novo",
                category: "Smartphones",
                img: "https://images.unsplash.com/photo-1706219741879-8e2af764db87?w=600&q=80",
                cpu: "Snapdragon 8 Gen 3", ram: "12GB", storage: "512GB", battery: "100%",
                screen: "6.8\" Dynamic AMOLED 2X", camera: "200MP Principal + 12MP Ultra-Wide",
                rating: 4.8, reviews: 187,
                testes: {
                    "Exterior": ["Estrutura intacta", "Botões funcionais", "S-Pen OK"],
                    "Display": ["Sem pixels mortos", "Cores vibrantes", "120Hz OK"],
                    "Hardware": ["S-Pen funcional", "Sensores OK"],
                    "Bateria": ["Autonomia testada", "Sem degradação"],
                    "Conectividade": ["Bluetooth OK", "GPS preciso"]
                },
                reparos: ["Substituição de Vidro Traseiro (Original)"]
            },
            { 
                id: 3, name: "MacBook Air M3", price: 1299, originalPrice: 1799, grade: "Grade A+", condition: "Excelente",
                category: "Portáteis",
                img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
                cpu: "Apple M3", ram: "16GB", storage: "512GB", battery: "100%",
                screen: "13.6\" Liquid Retina", camera: "1080p FaceTime HD",
                rating: 5.0, reviews: 312,
                testes: {
                    "Exterior": ["Carcaça sem marcas", "Dobradiças firmes"],
                    "Display": ["Retina sem manchas", "Brilho OK"],
                    "Hardware": ["Teclado verificado", "Trackpad OK"],
                    "Bateria": ["0 ciclos", "Saúde 100%"],
                    "Conectividade": ["Wi-Fi 6E", "MagSafe OK"]
                },
                reparos: ["Nenhum"]
            },
            { 
                id: 4, name: "Apple Watch Ultra 2", price: 750, originalPrice: 999, grade: "Excelente", condition: "Excelente",
                category: "Wearables",
                img: "https://images.unsplash.com/photo-1717105377407-88f57e0f7dde?w=600&q=80",
                cpu: "S9 SiP", ram: "N/A", storage: "64GB", battery: "100%",
                screen: "49mm LTPO OLED", camera: "N/A",
                rating: 4.7, reviews: 98,
                testes: {
                    "Exterior": ["Caixa de Titânio sem riscos"],
                    "Display": ["Cristal de Safira intacto"],
                    "Hardware": ["ECG e Oxímetro OK", "Sirene testada"],
                    "Bateria": ["Carregamento magnético OK"],
                    "Conectividade": ["GPS de dupla frequência OK"]
                },
                reparos: ["Nenhum"]
            },
            { 
                id: 5, name: "iPad Pro M2", price: 890, originalPrice: 1199, grade: "Grade A", condition: "Excelente",
                category: "Portáteis",
                img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
                cpu: "M2", ram: "8GB", storage: "128GB", battery: "98%",
                screen: "11\" Liquid Retina ProMotion", camera: "12MP Ultra Wide",
                rating: 4.6, reviews: 143,
                testes: {
                    "Exterior": ["Sem mossas laterais"],
                    "Display": ["ProMotion 120Hz fluido"],
                    "Hardware": ["Face ID e Câmaras OK"],
                    "Bateria": ["98% de saúde real"],
                    "Conectividade": ["Apple Pencil Hover testado"]
                },
                reparos: ["Limpeza Interna Profissional"]
            },
            { 
                id: 6, name: "AirPods Pro 2", price: 210, originalPrice: 299, grade: "Selado", condition: "Novo",
                category: "Áudio",
                img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
                cpu: "H2 Chip", ram: "N/A", storage: "N/A", battery: "100%",
                screen: "N/A", camera: "N/A",
                rating: 4.9, reviews: 421,
                testes: {
                    "Exterior": ["Estojo de carga sem marcas"],
                    "Hardware": ["Cancelamento de Ruído (ANC) OK"],
                    "Bateria": ["Autonomia de 6h testada"],
                    "Conectividade": ["Emparelhamento iCloud OK"]
                },
                reparos: ["Nenhum"]
            },
            { 
                id: 7, name: "Google Pixel 8 Pro", price: 820, originalPrice: 1099, grade: "Grade A", condition: "Excelente",
                category: "Smartphones",
                img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
                cpu: "Tensor G3", ram: "12GB", storage: "128GB", battery: "95%",
                screen: "6.7\" LTPO OLED", camera: "50MP Principal + 48MP Ultra-Wide",
                rating: 4.5, reviews: 76,
                testes: {
                    "Exterior": ["Vidro traseiro mate impecável"],
                    "Display": ["Painel LTPO sem burn-in"],
                    "Hardware": ["Sensor de temperatura OK"],
                    "Bateria": ["Carregamento sem fios OK"],
                    "Conectividade": ["Magic Eraser testado"]
                },
                reparos: ["Substituição de Módulo de Câmara (Original)"]
            },
            { 
                id: 8, name: "PS5 Slim", price: 450, originalPrice: 549, grade: "Como Novo", condition: "Como Novo",
                category: "Gaming",
                img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80",
                cpu: "Zen 2", ram: "16GB", storage: "1TB", battery: "N/A",
                screen: "N/A", camera: "N/A",
                rating: 4.8, reviews: 205,
                testes: {
                    "Exterior": ["Placas laterais brancas limpas"],
                    "Hardware": ["Leitor de discos Blu-ray OK"],
                    "Bateria": ["Fonte Alimentação OK"],
                    "Conectividade": ["Portas HDMI 2.1 e USB-C OK"]
                },
                reparos: ["Nenhum (Garantia Ativa)"]
            },
            { 
                id: 9, name: "Sony WH-1000XM5", price: 280, originalPrice: 399, grade: "Excelente", condition: "Excelente",
                category: "Áudio",
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
                cpu: "V1/QN1", ram: "N/A", storage: "N/A", battery: "99%",
                screen: "N/A", camera: "N/A",
                rating: 4.7, reviews: 318,
                testes: {
                    "Exterior": ["Almofadas de pele sintética novas"],
                    "Hardware": ["Sensores de proximidade OK"],
                    "Bateria": ["30 horas de autonomia real"],
                    "Conectividade": ["Ligação multiponto testada"]
                },
                reparos: ["Higienização completa por UV"]
            },
            { 
                id: 10, name: "iPhone 13 Mini", price: 420, originalPrice: 699, grade: "Grade B", condition: "Bom Estado",
                category: "Smartphones",
                img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&q=80",
                cpu: "A15 Bionic", ram: "4GB", storage: "128GB", battery: "88%",
                screen: "5.4\" Super Retina XDR", camera: "12MP Principal + 12MP Ultra-Wide",
                rating: 4.3, reviews: 89,
                testes: {
                    "Exterior": ["Pequenas marcas de uso no aro"],
                    "Display": ["Sem riscos profundos"],
                    "Hardware": ["Altifalantes e Microfones OK"],
                    "Bateria": ["88% de capacidade máxima"],
                    "Conectividade": ["NFC para Apple Pay OK"]
                },
                reparos: ["Substituição de Ecrã (Peça Genuína Apple)"]
            }
        ];
    },
    getUserData: () => {
        return {
            nome: "Tiago Fernandes", email: "tiago.fernandes@email.com",
            encomendas: JSON.parse(localStorage.getItem('db_orders') || '[]'),
            reparacoes: JSON.parse(localStorage.getItem('db_requests') || '[]')
        };
    },
    saveOrder: async (items, total) => {
        let orders = JSON.parse(localStorage.getItem('db_orders') || '[]');
        orders.push({ id: `ORD-${Math.floor(Math.random()*10000)}`, date: new Date().toLocaleDateString(), total, status: 'A caminho' });
        localStorage.setItem('db_orders', JSON.stringify(orders));
    },
    saveRepair: async (repair) => {
        let reqs = JSON.parse(localStorage.getItem('db_requests') || '[]');
        reqs.push({ id: `REP-${Math.floor(Math.random()*10000)}`, ...repair, date: new Date().toLocaleDateString(), status: 'Pendente' });
        localStorage.setItem('db_requests', JSON.stringify(reqs));
    }
};
