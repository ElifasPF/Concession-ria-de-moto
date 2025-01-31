// Importando o fastify
import { fastify } from "fastify";
// Importando DatabaseMemory
import { DatabaseMemory } from "./database-memory.js";
// Criando nosso servidor
const server = fastify()
// Criando database
const database = new DatabaseMemory()

// Listando motos
server.get('/motos', (request) => {
    const search = request.query.search;
    const motos = database.list(search);
    return motos;
});

// Criando uma moto
server.post('/motos', (request, reply) => {
    const { modelo, marca, cilindrada, ano, preco, cor } = request.body;
    
    database.create({
        modelo,
        marca,
        cilindrada,
        ano,
        preco,
        cor
    });
    
    return reply.status(201).send();
});

// Atualizar com PUT (todos os atributos)
server.put('/motos/:id', (request, reply) => {
    const motoId = request.params.id;
    const { modelo, marca, cilindrada, ano, preco, cor } = request.body;
    database.update(motoId, { modelo, marca, cilindrada, ano, preco, cor });
    return reply.status(204).send();
});

// Atualizar com PATCH (apenas os atributos necessários)
server.patch('/motos/:id', (request, reply) => {
    const motoId = request.params.id;
    const update = request.body;
    const motoExistente = database.getById(motoId);
    if (!motoExistente) {
        return reply.status(404).send({ message: 'Moto não encontrada' });
    }
    const motoAtualizada = { ...motoExistente, ...update };
    database.update(motoId, motoAtualizada);
    return reply.status(204).send();
});

// Excluir uma moto
server.delete('/motos/:id', (request, reply) => {
    const motoId = request.params.id;
    database.delete(motoId);
    return reply.status(204).send();
});

// Definindo a porta que vai rodar
server.listen({
    port: 3333,
});
