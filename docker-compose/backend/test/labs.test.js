let request = require('supertest');
const express = require('express');

request = request('http://localhost:3000');
 
const app = express();

let id = 0;

const newLab = {
    nome: "isso eh um lab de teste",
    endereco: "endereço",
    status: "ativo"
}

test('Deve inserir laboratorio com sucesso', () => {
    return request.post('/labs')
        .send(newLab)
        .then(res => {
            expect(res.status).toBe(204)            
        })
})

test('Deve recuperar o labotarório', () => {
    return request.get('/labs')
     .expect(200)
     .then((res) => {
         expect(res.body[0]).toHaveProperty('nome');
         expect(res.body[0]).toHaveProperty('endereco');
         expect(res.body[0]).toHaveProperty('status');
     });
});

test('Deve recuperar o labotarório pelo NOME', () => {    
    return request.get(`/labByName/${newLab.nome}`)
    .expect(200)
    .then((res) => {
        id = res.body.id;        
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('endereco');
        expect(res.body).toHaveProperty('status');
        expect(res.body.nome).toBe(newLab.nome);
        expect(res.body.endereco).toBe(newLab.endereco);
        expect(res.body.status).toBe(newLab.status);                
        
    });
});

test('Deve recuperar so UM labotarório pelo ID', () => {    
    return request.get(`/labs/${id}`)
     .expect(200)
     .then((res) => {
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('endereco');
        expect(res.body).toHaveProperty('status');
        expect(res.body.nome).toBe(newLab.nome);
        expect(res.body.endereco).toBe(newLab.endereco);
        expect(res.body.status).toBe(newLab.status);        
     });
});

newLab.endereco = 'ENDEREÇO correto'

test('Deve ALTERAR laboratorio com sucesso', () => {
    return request.put(`/labs/${id}`)
        .send(newLab)
        .then(res => {
            expect(res.status).toBe(204)            
        })
})

test('Deve recuperar o labotarório pelo NOME e a Alteracao deve estar OK', () => {        
    return request.get(`/labByName/${newLab.nome}`)
    .expect(200)
    .then((res) => {
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('endereco');
        expect(res.body).toHaveProperty('status');
        expect(res.body.nome).toBe(newLab.nome);
        expect(res.body.endereco).toBe(newLab.endereco);
        expect(res.body.status).toBe(newLab.status);                
        
    });
});


test('Deve excluir o laboratorio', () => {    
    return request.delete(`/labs/${id}`)
        .expect(204)        
})

const newLabComErro = {
    nome: "isso eh um lab de teste II",
    endereco: "endereco",
    status: "STATUS errado"
}

test('NAO Deve inserir laboratorio com sucesso - STATUS errado', () => {
    return request.post('/labs')
        .send(newLabComErro)
        .then(res => {
            expect(res.status).toBe(400)            
        })
})

newLabComErro.nome = ''

test('NAO Deve inserir laboratorio com sucesso - NOME vazio', () => {
    return request.post('/labs')
        .send(newLabComErro)
        .then(res => {
            expect(res.status).toBe(400)            
        })
})

test('NAO Deve excluir o laboratorio', () => {    
    return request.delete(`/labs/${id}`)
        .expect(400)
})

