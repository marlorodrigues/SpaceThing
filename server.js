const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', require('./src/routes/things.routes'))

app.listen(3000)


//Criar uma tag privada q seja somente acessada por duas senhas
// -> Uma ira abrir o conteudo das things privadas (Nome Configuracoes)
//      a mesma senha usada para fechar, ser usada para des/critografar
// -> O outro ira abrir algo que esteja vazio
