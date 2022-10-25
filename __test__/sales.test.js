require('../src/database/mongodb/index');
const Sales = require('../src/app/sales/sales.data');


var future_reference = undefined

describe('Sales', () => {
    it('should create a new sale', async () => {
        const sale = await Sales.create({
            type: 'entrada',
            origin: 'caixa',
            value: 100,
            associate: 'Coca-Cola',
            observations: 'Observações',
            received: 'dinheiro',
            quota: '1x',
            prediction_at: '2020-10-25',
        });

        future_reference = sale;

        expect(sale).not.toBe(false);
        expect(sale.type).toBe('entrada');
    });

    it('should find a sale', async () => {
        const sale = await Sales.find({_id: future_reference.id});

        expect(sale).not.toBe(false)
        expect(sale[0].id).toBe(future_reference.id);
    });

    it('should find all users', async () => {
        const _sales = await Sales.find({});

        expect(_sales).not.toBe(false)
        expect(_sales).not.toHaveLength(0);
    });

    it('should update a user', async () => {
        const sale = await Sales.update(future_reference.id, {
            type: 'entrada',
            origin: 'caixa',
            value: 200,
            associate: 'Coca-Cola',
            observations: 'Observações',
            received: 'dinheiro',
            quota: '1x',
            prediction_at: '2020-10-30',
        });

        expect(sale).not.toBe(false)
        expect(sale.type).toBe('entrada');
    });

    it('should delete a sale', async () => {
        const sale = await Sales.delete(future_reference.id);

        expect(sale).not.toBe(false)
        expect(sale.deletedCount).toBe(1);
    });

})