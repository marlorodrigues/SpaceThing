require('../src/database/mongodb/index');
const Associates = require('../src/app/associate/associate.data');

var future_reference = undefined

describe('Sales', () => {
    it('should create a new associate', async () => {
        const associate = await Associates.create({
            type: 'cliente',
            name: 'Coca-Cola',
            email: 'cocacola@cocacola.com.br',
            phone: '62 9 848-848-984',
            observations: 'Pagamento em dinheiro'
        });

        future_reference = associate;

        expect(associate).not.toBe(false);
        expect(associate.type).toBe('cliente');
    });

    it('should find all associates', async () => {
        const associates = await Associates.find_all();

        expect(associates).not.toBe(false)
        expect(associates).not.toHaveLength(0);
    });

    it('should find a associate', async () => {
        const associate = await Associates.find_one(future_reference.id);

        expect(associate).not.toBe(false)
        expect(associate.type).toBe('cliente');
    });

    it('should update a associate', async () => {
        const associate = await Associates.update(future_reference.id, {
            type: 'cliente',
            name: 'Coca-Cola',
            email: 'coca-cola@coca-cola.com',
            phone: '62 9 848-848-984',
            observations: 'Pagamento em dinheiro'
        });

        expect(associate).not.toBe(false)
        expect(associate.email).toBe('coca-cola@coca-cola.com');
    });

    it('should delete a associate', async () => {
        const associate = await Associates.delete(future_reference.id);

        expect(associate).not.toBe(false)
        expect(associate.deletedCount).toBe(1);
    });
});



