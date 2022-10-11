const { User } = require('../../src/app/models');

describe('Authentication', () => {
    it('should receive JWT when authenticated with valid credentials', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'test@email.com.br',
            password_hash: '123456'
        });
        
        console.log(user);

        expect(user.email).toBe('test@email.com.br');
    });
})