const { request } = require("express");
const { response } = require("express");
const express = require("express");
const uuid = require("uuid")

const app = express()
const port = 3000
app.use(express.json())

const users = [] // Variavel de usuarios

const checkUserId = (request, response, next) => { //middlewares
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "user not found" })
    }
    request.userIndex = index
    request.userId = id

    next()
}

/*projeto parte 1:
- [x] Criar array para armazenar usuários;
- [x] Ciar e Configurar rota(get) que exiba todos os usuários armazenados no array;
- [x] Criar rota(post) que insira usuários no array:
---(x) Envio pelo Body;
---(x) Cada usuário deverá ter uma ID única/Usar Biblioteca uuid;
---(x) Retornar status 201 pós criação de dados pela segunda rota.
*/

app.get('/users', (request, response) => {

    response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    response.status(201).json(user)
})

/*projeto parte 2:
- [x] Criar Rota(put):
---[x] Configurar nova requisição(insomnia, ou similar);
---[x] Obter o id;
---[x] Obter informações a serem atualizadas (name e age) pelo body;
---[x] Criar objeto com as informações atualizadas;
---[x] Descobrir o index do id fornecido;
---[x] Retornar status 404 e mensagem de "User not found", no caso de o id não existir dentro do array;
---[x] Inserir usuário atualizado dentro do array;
---[x] Retornar usuário atualizado. */

app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body

    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser
    response.json(updatedUser)
})

/*Pojeto parte 3

---[x] Deletar um usuario
*/

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🟢 server started on port ${port}`)
})
