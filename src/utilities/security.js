const crypto = require('crypto');

const sha512 = (senha, salt) => {
    var hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
    hash.update(senha);
    
    var hash = hash.digest('hex');
    
    return {
        salt,
        hash,
    };
}

const generate_salt = (randomBytes = 20) => {
    return crypto.randomBytes(randomBytes).toString('hex');
}

module.exports = {
    generate_salt,

    generate_password: (password) => {
        const salt = generate_salt(16);
        const pass_and_salt = sha512(password, salt);

        return {
            salt,
            hash: pass_and_salt.hash,
        };
    },

    make_login: (senhaDoLogin, saltNoBanco, hashNoBanco) => {
        var senhaESalt = sha512(senhaDoLogin, saltNoBanco)
        return hashNoBanco === senhaESalt.hash;
    }
}