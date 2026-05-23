const ApiClient = {
    getProducts: async () => {
        return [
            { id: 1, name: "iPhone 15 Pro Max", price: 1350, grade: "Grade A++", cpu: "A17 Pro", ram: "8GB", storage: "256GB", battery: "100%", img: "https://picsum.photos/seed/ip15/600" },
            { id: 2, name: "Samsung S24 Ultra", price: 1100, grade: "Como Novo", cpu: "Snapdragon G3", ram: "12GB", storage: "512GB", battery: "99%", img: "https://picsum.photos/seed/s24/600" },
            { id: 3, name: "MacBook Air M3", price: 1499, grade: "Selado", cpu: "Apple M3", ram: "16GB", storage: "256GB", battery: "100%", img: "https://picsum.photos/seed/m3air/600" },
            { id: 4, name: "Apple Watch Ultra 2", price: 799, grade: "Excelente", cpu: "S9 SiP", ram: "N/A", storage: "64GB", battery: "98%", img: "https://picsum.photos/seed/watchu/600" },
            { id: 5, name: "iPad Air M2", price: 699, grade: "Grade A+", cpu: "Apple M2", ram: "8GB", storage: "128GB", battery: "100%", img: "https://picsum.photos/seed/ipadair/600" }
        ];
    },

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
