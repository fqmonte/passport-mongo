
var mongoose = require('mongoose');

module.exports = mongoose.model('Empresa', {
    id: String,
    nome: String,
    cnpj: String,
    endereco: String,
    telefone: String,
    email: String,
    senha: String,
    contato: [{
        nome: String,
        email: String,
        telefone: String
    }],
    responsavel: [{
        nome: String,
        sobrenome: String,
        email: String,
        telefone: String,
        cpfcnpj: Number,
        senha: String,
        tipo: {
            type: String,
            default: "Colaborador"
        },
        is_Active: {
            type: Boolean,
            default: false
        }
    }],
    is_Active: {
        type: Boolean,
        default: false
    }
});