const _mongoose = require('mongoose');

const balanceSchema = new _mongoose.Schema({
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
    origin: { //dinheiro, cartão, boleto, etc (De onde saiu o dinheiro)
        type: String,
        require: true
    },
    received_on: { //Onde o dinheiro foi recebido (SE VENDA)
        type: String,
        require: false
    },
    quota: { //Parcelado, à vista, etc
        type: String,
        require: false,
        default: "1"
    },
    prediction_at: { //Previsão de pagamento
        type: Date,
        require: true,
        default: Date.now
    },
    created_at: { //Data de criação
        type: Date,
        default: Date.now
    },
    updated_at: { //Data de atualização
        type: Date,
        default: Date.now
    },
})

const balance = _mongoose.model('balance', balanceSchema);

module.exports = balance;
