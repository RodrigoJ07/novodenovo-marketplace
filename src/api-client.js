const ApiClient = {
    getProducts: async () => {
        return [
            { 
                id: 1, name: "iPhone 15 Pro Max", price: 1150, grade: "Grade A++",
                category: "Smartphones", // Categoria adicionada
                img: "https://vendas.mhr.pt/64834-large_default/apple-iphone-15-pro-max-256gb-titanio-natural.jpg",
                cpu: "A17 Pro", ram: "8GB", storage: "256GB", battery: "100%",
                testes: [
                    "📱 Exterior: Sem arranhões visíveis, Portas limpas",
                    "🖥️ Display: Brilho uniforme, Touch 100% responsivo",
                    "⚙️ Hardware: Face ID funcional, Microfone claro",
                    "🔋 Bateria: 100% capacidade, Carga rápida OK",
                    "🌐 Conectividade: 5G verificado, Wi-Fi 6 testado"
                ],
                reparos: ["Nenhum (Equipamento Selado)"]
            },
            { 
                id: 2, name: "Samsung S24 Ultra", price: 980, grade: "Como Novo",
                category: "Smartphones", // Categoria adicionada
                img: "https://img.global.news.samsung.com/pt/wp-content/uploads/2024/01/S24-Ultra-Review-1.jpg",
                cpu: "Snapdragon 8 Gen 3", ram: "12GB", storage: "512GB", battery: "100%",
                testes: [
                    "📱 Exterior: Estrutura intacta, Botões funcionais",
                    "🖥️ Display: Sem pixels mortos, Cores vibrantes",
                    "⚙️ Hardware: S-Pen funcional, Sensores OK",
                    "🔋 Bateria: Autonomia testada, Sem degradação",
                    "🌐 Conectividade: Bluetooth OK, GPS preciso"
                ],
                reparos: ["Substituição de Vidro Traseiro (Original)"]
            },
            { 
                id: 3, name: "MacBook Air M3", price: 1299, grade: "Grade A+",
                category: "Portáteis", // Categoria adicionada
                img: "https://www.apple.com/v/macbook-air/s/images/overview/m3_chip__bs648937l982_large.png",
                cpu: "Apple M3", ram: "16GB", storage: "512GB", battery: "100%",
                testes: [
                    "📱 Exterior: Carcaça sem marcas, Dobradiças firmes",
                    "🖥️ Display: Retina sem manchas, Brilho OK",
                    "⚙️ Hardware: Teclado verificado, Trackpad OK",
                    "🔋 Bateria: 0 ciclos, Saúde 100%",
                    "🌐 Conectividade: Wi-Fi 6E, MagSafe OK"
                ],
                reparos: ["Nenhum"]
            },
            { 
                id: 4, name: "Apple Watch Ultra 2", price: 750, grade: "Excelente",
                category: "Áudio", // Podes mudar para "Wearables" se adicionares essa categoria no index
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-ultra-digital-copy-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693521255535",
                cpu: "S9 SiP", ram: "N/A", storage: "64GB", battery: "100%",
                testes: [
                    "📱 Exterior: Caixa de Titânio sem riscos",
                    "🖥️ Display: Cristal de Safira intacto",
                    "⚙️ Hardware: ECG e Oxímetro OK, Sirene testada",
                    "🔋 Bateria: Carregamento magnético OK",
                    "🌐 Conectividade: GPS de dupla frequência OK"
                ],
                reparos: ["Nenhum"]
            },
            { 
                id: 5, name: "iPad Pro M2", price: 890, grade: "Grade A",
                category: "Portáteis", // No teu index não tens "Tablets", por isso usei Portáteis
                img: "https://www.istore.pt/media/catalog/product/i/p/ipad_pro_wi-fi_11_in_4th_generation_space_gray_pure_front_iphone_14_pro_space_black_front_lock_screen_2_3.jpg",
                cpu: "M2", ram: "8GB", storage: "128GB", battery: "98%",
                testes: [
                    "📱 Exterior: Sem mossas laterais",
                    "🖥️ Display: ProMotion 120Hz fluido",
                    "⚙️ Hardware: Face ID e Câmaras OK",
                    "🔋 Bateria: 98% de saúde real",
                    "🌐 Conectividade: Apple Pencil Hover testado"
                ],
                reparos: ["Limpeza Interna Profissional"]
            },
            { 
                id: 6, name: "AirPods Pro 2", price: 210, grade: "Selado",
                category: "Áudio", // Categoria adicionada
                img: "https://www.istore.pt/media/catalog/product/a/i/airpods_pro_2nd_gen_with_magsafe_case_usb-c_pure_back_white_1.jpg",
                cpu: "H2 Chip", ram: "N/A", storage: "N/A", battery: "100%",
                testes: [
                    "📱 Exterior: Estojo de carga sem marcas",
                    "⚙️ Hardware: Cancelamento de Ruído (ANC) OK",
                    "🔋 Bateria: Autonomia de 6h testada",
                    "🌐 Conectividade: Emparelhamento iCloud OK"
                ],
                reparos: ["Nenhum"]
            },
            { 
                id: 7, name: "Google Pixel 8 Pro", price: 820, grade: "Grade A",
                category: "Smartphones", // Categoria adicionada
                img: "https://lh3.googleusercontent.com/pw/ADCREHde68nQnQp-qW6nF-vB5S-K-P8Y-k8uP-P9S-Q", 
                cpu: "Tensor G3", ram: "12GB", storage: "128GB", battery: "95%",
                testes: [
                    "📱 Exterior: Vidro traseiro mate impecável",
                    "🖥️ Display: Painel LTPO sem burn-in",
                    "⚙️ Hardware: Sensor de temperatura OK",
                    "🔋 Bateria: Carregamento sem fios OK",
                    "🌐 Conectividade: Magic Eraser testado"
                ],
                reparos: ["Substituição de Módulo de Câmara (Original)"]
            },
            { 
                id: 8, name: "PS5 Slim", price: 450, grade: "Como Novo",
                category: "Gaming", // Categoria adicionada (Lembra-te de adicionar o botão "Gaming" no index.html se quiseres filtrar)
                img: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-disc-console-featured-hardware-image-block-01-en-18oct23?$facebook$",
                cpu: "Zen 2", ram: "16GB", storage: "1TB", battery: "N/A",
                testes: [
                    "📱 Exterior: Placas laterais brancas limpas",
                    "⚙️ Hardware: Leitor de discos Blu-ray OK",
                    "🔋 Bateria: N/A (Fonte Alimentação OK)",
                    "🌐 Conectividade: Portas HDMI 2.1 e USB-C OK"
                ],
                reparos: ["Nenhum (Garantia Ativa)"]
            },
            { 
                id: 9, name: "Sony WH-1000XM5", price: 280, grade: "Excelente",
                category: "Áudio", // Categoria adicionada
                img: "https://sony.scene7.com/is/image/sonyglobalsolutions/wh-1000xm5_primary_image_black?$S7Product$",
                cpu: "V1/QN1", ram: "N/A", storage: "N/A", battery: "99%",
                testes: [
                    "📱 Exterior: Almofadas de pele sintética novas",
                    "⚙️ Hardware: Sensores de proximidade OK",
                    "🔋 Bateria: 30 horas de autonomia real",
                    "🌐 Conectividade: Ligação multiponto testada"
                ],
                reparos: ["Higienização completa por UV"]
            },
            { 
                id: 10, name: "iPhone 13 Mini", price: 420, grade: "Grade B",
                category: "Smartphones", // Categoria adicionada
                img: "https://vendas.mhr.pt/51559-large_default/apple-iphone-13-mini-128gb-meia-noite.jpg",
                cpu: "A15 Bionic", ram: "4GB", storage: "128GB", battery: "88%",
                testes: [
                    "📱 Exterior: Pequenas marcas de uso no aro",
                    "🖥️ Display: Sem riscos profundos",
                    "⚙️ Hardware: Altifalantes e Microfones OK",
                    "🔋 Bateria: 88% de capacidade máxima",
                    "🌐 Conectividade: NFC para Apple Pay OK"
                ],
                reparos: ["Substituição de Ecrã (Peça Genuína Apple)"]
            }
        ];
    },
    // ... o resto do código do api-client.js mantém-se igual (getUserData, saveOrder, saveRepair)
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
