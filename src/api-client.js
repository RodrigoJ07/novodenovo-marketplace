const ApiClient = {
    // ==========================================
    // PARTE 1: BASE DE DADOS DE PRODUTOS (10 ITENS)
    // ==========================================
    getProducts: async () => {
        return [
            { 
                id: 1, 
                name: "iPhone 15 Pro Max", 
                price: 1150, 
                img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=500", 
                grade: "Grade A++", 
                cpu: "A17 Pro", ram: "8GB", storage: "256GB", battery: "100%",
                testes: ["Exterior: Sem arranhões", "Display: Brilho uniforme", "Hardware: Face ID funcional", "Bateria: 100% capacidade", "Conectividade: 5G verificado"],
                reparos: ["Nenhum (Selado)"]
            },
            { 
                id: 2, 
                name: "Samsung S24 Ultra", 
                price: 980, 
                img: "https://images.unsplash.com/photo-1707230557403-9602498f3957?auto=format&fit=crop&q=80&w=500", 
                grade: "Como Novo", 
                cpu: "Snapdragon 8 Gen 3", ram: "12GB", storage: "512GB", battery: "100%",
                testes: ["Exterior: Estrutura intacta", "Display: Touch 100% responsivo", "Hardware: S-Pen funcional", "Bateria: Carga rápida OK", "Conectividade: Wi-Fi 6 testado"],
                reparos: ["Substituição de Vidro Traseiro (Original)"]
            },
            { 
                id: 3, 
                name: "MacBook Air M3", 
                price: 1299, 
                img: "https://images.unsplash.com/photo-1517336714460-4c504a076a8d?auto=format&fit=crop&q=80&w=500", 
                grade: "Grade A+", 
                cpu: "Apple M3", ram: "16GB", storage: "512GB", battery: "99%",
                testes: ["Exterior: Portas limpas", "Display: Sem pixels mortos", "Hardware: Teclado verificado", "Bateria: Autonomia testada", "Conectividade: Bluetooth OK"],
                reparos: ["Nenhum"]
            },
            { 
                id: 4, 
                name: "Apple Watch Ultra 2", 
                price: 750, 
                img: "https://images.unsplash.com/photo-1696489704253-157945037f07?auto=format&fit=crop&q=80&w=500", 
                grade: "Excelente", 
                cpu: "S9 SiP", ram: "N/A", storage: "64GB", battery: "100%",
                testes: ["Exterior: Botões funcionais", "Display: Safira sem riscos", "Hardware: Sensores cardíacos OK", "Bateria: Sem degradação", "Conectividade: GPS preciso"],
                reparos: ["Nenhum"]
            },
            { 
                id: 5, 
                name: "iPad Pro M2", 
                price: 890, 
                img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500", 
                grade: "Grade A", 
                cpu: "M2", ram: "8GB", storage: "128GB", battery: "96%",
                testes: ["Exterior: Sem mossas", "Display: ProMotion OK", "Hardware: Microfone claro", "Bateria: 96% capacidade", "Conectividade: Wi-Fi OK"],
                reparos: ["Limpeza Interna"]
            },
            { 
                id: 6, 
                name: "AirPods Pro (2ª Gen)", 
                price: 210, 
                img: "https://images.unsplash.com/photo-1600294037681-980120eebe2d?auto=format&fit=crop&q=80&w=500", 
                grade: "Selado", 
                cpu: "H2 Chip", ram: "N/A", storage: "N/A", battery: "100%",
                testes: ["Exterior: Estojo intacto", "Display: N/A", "Hardware: Cancelamento ruído OK", "Bateria: 100% capacidade", "Conectividade: Emparelhamento rápido OK"],
                reparos: ["Nenhum"]
            },
            { 
                id: 7, 
                name: "Google Pixel 8 Pro", 
                price: 820, 
                img: "https://images.unsplash.com/photo-1696426431252-9426f43702f2?auto=format&fit=crop&q=80&w=500", 
                grade: "Grade B++", 
                cpu: "Tensor G3", ram: "12GB", storage: "128GB", battery: "94%",
                testes: ["Exterior: Pequenos sinais de uso", "Display: Sem manchas", "Hardware: Câmaras testadas", "Bateria: Autonomia OK", "Conectividade: 5G verificado"],
                reparos: ["Nenhum"]
            },
            { 
                id: 8, 
                name: "PlayStation 5 Slim", 
                price: 450, 
                img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=500", 
                grade: "Como Novo", 
                cpu: "Zen 2", ram: "16GB", storage: "1TB", battery: "N/A",
                testes: ["Exterior: Portas USB OK", "Display: N/A", "Hardware: Leitor discos OK", "Bateria: N/A", "Conectividade: PSN Login OK"],
                reparos: ["Nenhum"]
            },
            { 
                id: 9, 
                name: "Sony WH-1000XM5", 
                price: 280, 
                img: "https://images.unsplash.com/photo-1618366712277-70702700958e?auto=format&fit=crop&q=80&w=500", 
                grade: "Excelente", 
                cpu: "V1/QN1", ram: "N/A", storage: "N/A", battery: "98%",
                testes: ["Exterior: Almofadas novas", "Display: N/A", "Hardware: Touch lateral OK", "Bateria: 30h+ autonomia", "Conectividade: Multipoint OK"],
                reparos: ["Higienização completa"]
            },
            { 
                id: 10, 
                name: "iPhone 13 Mini", 
                price: 420, 
                img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=500", 
                grade: "Grade B", 
                cpu: "A15 Bionic", ram: "4GB", storage: "128GB", battery: "89%",
                testes: ["Exterior: Marcas leves", "Display: Brilho OK", "Hardware: Colunas testadas", "Bateria: 89% capacidade", "Conectividade: 4G/5G OK"],
                reparos: ["Bateria substituída (Original)"]
            }
        ];
    },

    // ==========================================
    // PARTE 2: GESTÃO DE UTILIZADOR E ENCOMENDAS
    // ==========================================
    getUserData: () => {
        return {
            nome: "Tiago Fernandes",
            email: "tiago.fernandes@email.com",
            encomendas: JSON.parse(localStorage.getItem('db_orders') || '[]'),
            reparacoes: JSON.parse(localStorage.getItem('db_requests') || '[]')
        };
    },

    saveOrder: async (items, total) => {
        let orders = JSON.parse(localStorage.getItem('db_orders') || '[]');
        orders.push({ 
            id: `ORD-${Math.floor(Math.random()*10000)}`, 
            date: new Date().toLocaleDateString(), 
            total: total, 
            status: 'A caminho' 
        });
        localStorage.setItem('db_orders', JSON.stringify(orders));
    },

    saveRepair: async (repair) => {
        let reqs = JSON.parse(localStorage.getItem('db_requests') || '[]');
        reqs.push({ 
            id: `REP-${Math.floor(Math.random()*10000)}`, 
            ...repair, 
            date: new Date().toLocaleDateString(), 
            status: 'Aguardar Dispositivo' 
        });
        localStorage.setItem('db_requests', JSON.stringify(reqs));
    }
};
