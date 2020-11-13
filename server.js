const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const fs = require('fs');



const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', require('./src/routes/things.routes'))


// const credentials = fs.readFileSync('<path_to_certificate>');

// const client = new MongoClient('mongodb+srv://admin:admin123@cluster0.nwsy1.mongodb.net/teste?retryWrites=true&w=majority', {
// });

// async function run() {
//     try {
//         await client.connect().catch(e => console.log("Erro -> " + e));
//         const database = client.db("testDB");
//         const collection = database.collection("testCol");
//         const docCount = await collection.countDocuments({}).catch(e => console.log("Erro -> " + e));;
//         console.log(docCount);
//         // perform actions using client
//     }
//     catch (error) {
//         console.log("Erro -> " + error)
//     }
//     finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }


app.listen(process.env.PORT || 3000, function () {
    // run().catch(console.dir);
    console.log("Servidor pronto");

})

//Criar uma tag privada q seja somente acessada por duas senhas
// -> Uma ira abrir o conteudo das things privadas (Nome Configuracoes)
//      a mesma senha usada para fechar, ser usada para des/critografar
// -> O outro ira abrir algo que esteja vazio
