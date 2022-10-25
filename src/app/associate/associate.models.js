const _mongoose = require('mongoose');

const associateSchema = new _mongoose.Schema({
    type: { //Cliente ou Fornecedor
        type: String,
        require: true
    },
    name: { //Nome do cliente ou fornecedor
        type: String,
        require: true
    },
    cpnj: { //CNPJ do cliente ou fornecedor
        type: String,
        require: false
    },
    email: { //Email do cliente ou fornecedor
        type: String,
        require: false
    },
    phone: { //Telefone do cliente ou fornecedor
        type: String,
        require: false
    },
    observations: { //Observações
        type: String,
        require: false
    },
    create_at: { //Data de criação
        type: Date,
        default: Date.now
    }
})

const associate = _mongoose.model('associate', associateSchema);

module.exports = associate;
