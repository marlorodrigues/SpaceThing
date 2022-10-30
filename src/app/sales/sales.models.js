const _mongoose = require('mongoose');

const salesSchema = new _mongoose.Schema({
    type: { //Entrada ou Saída
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
    associate: { //A quem se refere (Cliente, Fornecedor, etc)
        type: String,
        require: true
    },
    origin: { //dinheiro, cartão, boleto, etc
        type: String,
        require: true
    },
    received_on: { //Onde o dinheiro foi recevido
        type: String,
        require: true
    },
    quota: { //Parcelado, à vista, etc
        type: String,
        require: false,
        default: "1x"
    },
    prediction_at: { //Previsão de pagamento
        type: Date,
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

const sales = _mongoose.model('sales', salesSchema);

module.exports = sales;
