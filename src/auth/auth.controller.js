const logger = require("../services/logger");
const { currentDate } = require("../helpers/index");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { token_hash } = require('../../src/.secrets/secrets.json');
const pool = require("../../src/database/v1");
const nodemailer = require('../services/mailer');

//#region Authentication
    function gerarSalt(){
        return  crypto.randomBytes(20).toString('hex');
    };

    function sha512(senha, salt){
        var hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
        hash.update(senha);
        var hash = hash.digest('hex');
        return {
            salt,
            hash,
        };
    };

    function generatePassword(senha) {
        var salt = gerarSalt(16);
        var senhaESalt = sha512(senha, salt);

        return {
            salt,
            hash: senhaESalt.hash,
        };
    }

    function makeLogin(senhaDoLogin, saltNoBanco, hashNoBanco) {
        var senhaESalt = sha512(senhaDoLogin, saltNoBanco)
        return hashNoBanco === senhaESalt.hash;
    }
//#endregion


module.exports = {
    async authorize_user(req, res, next) {
        try {
            var { login, password } = req.body

            login = login.toLowerCase()

            if (!login || !password)
                return res.status(400).send({ message: "Preencha todos os campos", auth: false })

            var response = await pool.executeQuery(`SELECT id, password_salt, crypted_password FROM main.users WHERE login = '${login}'`)

            if (response.rows.length === 0) {
                return res.status(400).send({ message: "Usuário/Senha invalidos" })
            }

            var { password_salt, crypted_password } = response.rows[0]   

            const canLogin = makeLogin(password, password_salt, crypted_password)

            if (!canLogin) {
                return res.status(404).send({ message: "Usuário/Senha invalidos", auth: canLogin })
            }

            const token = jwt.sign({ login }, token_hash, {
                expiresIn: '2h'
            })

            response = undefined
            password_salt = undefined
            crypted_password = undefined

            return res.status(200).send({
                auth: canLogin,
                token
            });

        } catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
            return res.status(500).send({ message: "Erro ao autenticar" })
        }
    },

    async update_password(req, res, next) {
        try {
            var { id, password, password_update_token: token_update, password_confirmation } = req.body

            if (!id || !password || !password_confirmation || !token_update) {
                // await pool.close()
                return res.status(400).send({ message: "Preencha todos os campos", auth: false })
            }
            
            var response = await pool.executeQuery(`SELECT id, login, password_update_token FROM main.users WHERE id = '${id}'`)

            if (response.rowCount === 0) {
                response = undefined
                // await pool.close()
                return res.status(400).send({ message: "Usuário/Senha invalidos", auth: false})
            }
            
            if (!(token_update !== response.rows[0].password_update_token)) {
                response = undefined
                return res.status(400).send({ message: "Token de atualização de senha inválido", auth: false})
            }

            const new_values = generatePassword(password)
            await pool.executeQuery(`update main.users set password_salt = '${new_values.salt}', crypted_password = '${new_values.hash}', password_update_token = 'NULL' where id = '${id}'`)
            
            response = undefined
            // await pool.close()
      
            logger.info(`${currentDate()} - update_password: user_id ${id} atualizado com sucesso`)
            return res.send({ message: "Senha atualizada com sucesso" })
        } catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
            return res.status(500).send({ message: "Erro ao executar authorize_user", auth: false})
        }
    },

    async forgot_password(req, res, next) {
        try {
            const { email, rota } = req.body

            if (!email || !rota)
                return res.status(400).send({ message: "Preencha todos os campos" })

            var response = await pool.executeQuery(`SELECT id, login, password_update_token FROM main.users WHERE email = '${email}'`)
            // await pool.close()


            if (response.rows.length === 0) {
                response = undefined
                return res.status(404).send({ message: "Email Invalido" })
            }

            const new_salt = await gerarSalt()
            const msg = `<h5>Clique aqui para rescurar sua senha => </h5><a href='${rota}?token=${new_salt}&user_id=${response.rows[0].id}'> Recuperar Senha </a>`

            await nodemailer.sendEmail(email, "Recuperar Senha - ATMOSFERA", msg, res)

            response = undefined

            logger.info(`${ currentDate() } - forgot_password: email enviado com sucesso para ${email}`)
            return res.send({ message: "Senha criada com sucesso", msg, rota })
        } catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
            return res.status(500).send({ message: "Erro ao recuperar senha" })
        }
    }
}
