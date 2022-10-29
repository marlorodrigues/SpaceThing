BackEnd em NodeJs e MongoDB, que armazena coisas ("things") no banco de dados utilizando-se de rotas expostas via ExpressJS e utilizando o design pattern Factory para organização do código, é feito também um relacionamento simples entre as 'Things' e 'Tags'. Futuramente pretendo adicionar um mecanismo de login criptografado e de busca. Ainda, transferir o banco para a nuvem através do Atlas e o subir o backend com docker via EC2 da AWS.


Used: 

 - ExpressJS
 - MongoDB
 - Sqlite
 - HTTPS e HTTP1.1
 - Politica de Cache 
 - Comunicação entre serviços via RedisDB
 - Politica de cors
 - Testes com JEST
 - Criptografia Salt and Pepper
 - Upload de arquivos
 - Cluster
 - Jest

Future: 

 - HTTP2
 - Mais testes
 - Integrar .env
 - Integrar sequelize
 - Separar helpers de utils
 - Usar ETag na resposta
 - Substituir dotenv por arquivo json
 - Refresh token
 - Migrations
 - Load balancer
