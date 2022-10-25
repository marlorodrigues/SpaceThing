const _mongoose = require('mongoose');

const accountSchema = new _mongoose.Schema({
    type: { //Tipo de conta (Caixa, Banco, etc)
        type: String,
        require: true
    },
    value: { //Valor
        type: Number,
        require: true
    },
    description: { //Observações
        type: String,
        require: false
    },
    create_at: { //Data de criação
        type: Date,
        default: Date.now
    },
    update_at: { //Data de atualização
        type: Date,
        default: Date.now
    },
})

const account = _mongoose.model('account', accountSchema);

module.exports = account;
