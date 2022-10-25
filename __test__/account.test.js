require('../src/database/mongodb/index');
const Accounts = require('../src/app/account/account.data');

var future_reference = undefined

describe('Account', () => {
    it('should create a new account', async () => {
        const account = await Accounts.create({
            type: 'itau',
            value: 1560.93,
            description: 'Valor no Itau'
        });

        future_reference = account;

        expect(account).not.toBe(false);
        expect(account.type).toBe('cash');
    });

    it('should find all accounts', async () => {
        const accounts = await Accounts.find();

        expect(accounts).not.toBe(false)
        expect(accounts).not.toHaveLength(0);
    });

    it('should find a account', async () => {
        const account = await Accounts.find({_id: future_reference.id});

        expect(account).not.toBe(false)
        expect(account[0].type).toBe('cash');
    });

    it('should update a account', async () => {
        const account = await Accounts.update(future_reference.id, {
            value: 0.0,
        });

        expect(account).not.toBe(false)
        expect(account.value).toBe(0.0);
    });

    it('should delete a account', async () => {
        const account = await Accounts.delete(future_reference.id);

        expect(account).not.toBe(false)
        expect(account.deletedCount).toBe(1);
    });

});