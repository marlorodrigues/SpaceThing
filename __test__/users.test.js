require('../src/database/mongodb/index');
const Users = require('../src/app/users/users.data');


var future_reference = undefined

describe('Users', () => {
    it('should create a new user', async () => {
        const user = await Users.create({
            complete_name: 'John Doe',
            login: 'john.doe',
            email: 'test@email.com.br',
            password: '123456'
        });

        future_reference = user

        expect(user).not.toBe(false)
        expect(user.email).toBe('test@email.com.br');
    });

    it('should find a user by login', async () => {
        const user = await Users.find_by_login_or_email('john.doe');

        expect(user).not.toBe(false)
        expect(user.login).toBe('john.doe');
    });

    it('should find a user by email', async () => {
        const user = await Users.find_by_login_or_email('test@email.com.br');

        expect(user).not.toBe(false)
        expect(user.email).toBe('test@email.com.br')
    });

    it('should find all users', async () => {
        const users = await Users.find_all();

        expect(users).not.toBe(false)
        expect(users).not.toHaveLength(0);
    });

    it('should find one user', async () => {
        const user = await Users.find_one(future_reference.id);

        expect(user).not.toBe(false)
        expect(user.id).toBe(future_reference.id);
    });

    it('should update a user', async () => {
        const user = await Users.update(future_reference.id, {
            complete_name: 'John Doe',
            login: 'john.doe',
            email: 'xurusbango@xurusbago.com.br'
        });

        expect(user).not.toBe(false)
        expect(user.email).toBe('xurusbango@xurusbago.com.br');
    });

    it('should delete a user', async () => {
        const user = await Users.delete(future_reference.id);

        expect(user).not.toBe(false)
        expect(user.deletedCount).toBe(1);
    });

})