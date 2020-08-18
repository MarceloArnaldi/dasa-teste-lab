let request = require('supertest');
const express = require('express');

request = request('http://localhost:3000');
 
const app = express();

let id = 0;

const newExam = {
    nome: "isso eh um exame de teste",
    tipo: "analise",
    status: "ativo"
}

test('Deve inserir exame com sucesso', () => {
    return request.post('/exams')
        .send(newExam)
        .then(res => {
            expect(res.status).toBe(204)            
        })
})

test('Deve recuperar o exame', () => {
    return request.get('/exams')
     .expect(200)
     .then((res) => {
         expect(res.body[0]).toHaveProperty('nome');
         expect(res.body[0]).toHaveProperty('tipo');
         expect(res.body[0]).toHaveProperty('status');
     });
});


test('Deve recuperar o exame pelo NOME', () => {    
    return request.get(`/examByName/${newExam.nome}`)
    .expect(200)
    .then((res) => {
        id = res.body.id;        
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('tipo');
        expect(res.body).toHaveProperty('status');
        expect(res.body.nome).toBe(newExam.nome);
        expect(res.body.tipo).toBe(newExam.tipo);
        expect(res.body.status).toBe(newExam.status);                
        
    });
});

test('Deve recuperar so UM exame pelo ID', () => {    
    return request.get(`/exams/${id}`)
     .expect(200)
     .then((res) => {
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('tipo');
        expect(res.body).toHaveProperty('status');
        expect(res.body.nome).toBe(newExam.nome);
        expect(res.body.tipo).toBe(newExam.tipo);
        expect(res.body.status).toBe(newExam.status);        
     });
});

newExam.tipo = 'imagem'

test('Deve ALTERAR exame com sucesso', () => {
    return request.put(`/exams/${id}`)
        .send(newExam)
        .then(res => {
            expect(res.status).toBe(204)            
        })
})

test('Deve recuperar o exame pelo NOME e a Alteracao deve estar OK', () => {        
    return request.get(`/examByName/${newExam.nome}`)
    .expect(200)
    .then((res) => {
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('tipo');
        expect(res.body).toHaveProperty('status');
        expect(res.body.nome).toBe(newExam.nome);
        expect(res.body.tipo).toBe(newExam.tipo);
        expect(res.body.status).toBe(newExam.status);                
        
    });
});


test('Deve excluir o exame', () => {    
    return request.delete(`/exams/${id}`)
        .expect(204)        
})

const newExamComErro = {
    nome: "isso eh um ezame de teste II",
    tipo: "tipo",
    status: "STATUS errado"
}

test('NAO Deve inserir exame com sucesso - STATUS errado', () => {
    return request.post('/exams')
        .send(newExamComErro)
        .then(res => {
            expect(res.status).toBe(400)            
        })
})

newExamComErro.nome = ''
newExamComErro.status = 'ativo'

test('NAO Deve inserir exame com sucesso - NOME vazio', () => {
    return request.post('/exams')
        .send(newExamComErro)
        .then(res => {
            expect(res.status).toBe(400)            
        })
})

test('NAO Deve excluir o exame', () => {    
    return request.delete(`/exams/${id}`)
        .expect(400)
})

