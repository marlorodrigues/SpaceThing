const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const token_hash = "0AkzpulBWJsfML82QNTKlRh71ofw3gxBRut5Wq8ZZNjAzZOB3ZOZSypNh5z1GMGk6BBxLADpiNaQc6WVj6KBf";


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

const generate_token = (data) => {
    return jwt.sign(data, token_hash, {
        expiresIn: '1h'
    })
}

module.exports = {
    generate_salt,

    generate_password: (password) => {
        const salt = generate_salt(20);
        const pass_and_salt = sha512(password, salt);

        return {
            salt,
            hash: pass_and_salt.hash,
        };
    },

    make_login: (given_pass, salt, crypted) => {
        var pass_and_salt = sha512(given_pass, salt)
        return crypted === pass_and_salt.hash;
    },

    generate_token,

    verify_token: (token) => {
        return jwt.decode(token, token_hash);
    }
}