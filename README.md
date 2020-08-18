# Lab
>
>Lab é uma API back-end em Node.js/JavaScript com médotos para manipulação das endidaes:
* labs - Laboratório
* exams - Exames
* examsbylabs - Exames por Laboratório

## Dependencias

npm<br>
node.js<br>
postgres

## PostgreSQL
<br>
Download e instalação no site oficial: https://www.postgresql.org/download/
<br><br>
Anote o usuário e senha.

Entre na linha de comando do PostgreSQL
```sh
psql -U <nome-do-usuario>
```

Crie o banco de dados
```sh
CREATE DATABASE <nome-do-banco>
```

## Instalação

```sh
git clone https://github.com/MarceloArnaldi/dasa-teste-lab
cd .../dasa-teste-lab/backend/
npm i
knex init
knex migrate:make create_table_labs
knex migrate:make create_table_exams
knex migrate:make create_table_examsbylabs

```
Atualize o arquivo `knexfile.js` na raiz do projeto com o nome do banco de dados, usuário e senha.

Copie e cole o conteúdo dos arquivos de `/entidades/` para os equivalentes em `/migrations/`
* create_table_labs.js --> em /migrations/<data-hora>create_table_labs.js
* create_table_exams.js --> em /migrations/<data-hora>create_table_exams.js
* create_table_examsbulabs.js --> em /migrations/<data-hora>create_table_examsbylabs.js

Cria as entidades:
```sh
knex migrate:latest
```

## Exemplo de uso

Para colocar o servidor no ar:

```sh
npm start
```

## TDD

Nos arquivos de teste mude o endereço e porta para a localização onde o servidor foi instalado. 
Para executar os teste use:

```sh
npm test
```

## Metodos

### Consulta de Laboratórios
```sh
GET:<endereço-servidor:<porta>/labs
GET:<endereço-servidor:<porta>/labs/:id
```

### Consulta de Laboratórios por Nome
```sh
GET:<endereço-servidor:<porta>/labByName/:nome
```

### Consulta de Exames do Laboratório
```sh
GET:<endereço-servidor:<porta>/getLabExams/:nome
```

### Incluir um Laboratório
```sh
POST:<endereço-servidor:<porta>/labs
```
Formato:
```sh
{
    nome: "",
    endereco: "",
    status: ""
}
```
Onde: status deve ser "ativo" ou "inativo"
A inclusão não será realizada se houver um laboratório com o mesmo nome.

### Alterar dados no Laboratório
```sh
PUT:<endereço-servidor:<porta>/labs/:id
```
Formato:
```sh
{
    nome: "",
    endereco: "",
    status: ""
}
```
Onde: status deve ser "ativo" ou "inativo"
se alterar o nome e houver um laboratório com o mesmo nome a alteração não será feita

### Excluir de Laboratório
```sh
DELETE:<endereço-servidor:<porta>/labs/:id
```
Um laboratõrio só será excluido se não houver exames associados à ele

### Associar um exame em um labotarório
```sh
POST:<endereço-servidor:<porta>/addExam/:labs_id,exams_id
```
Somente laboratórios e exames ativos podem ser associados

### Consulta de Exames
```sh
<endereço-servidor:<porta>/exams
<endereço-servidor:<porta>/exams/:id
```
#### Consulta de Exames por Nome
```sh
GET:<endereço-servidor:<porta>/examByName/:nome
```

### Consulta de Laboratórios que fazem o Exames
```sh
GET:<endereço-servidor:<porta>/getWhereExams/:nome
```

### Incluir um Exames
```sh
POST:<endereço-servidor:<porta>/exams
```
Formato:
```sh
{
    nome: "",
    tipo: "",
    status: ""
}
```
Onde: 
status deve ser "ativo" ou "inativo"
tipo deve ser "analise", "clinica", "imagem"
A inclusão não será realizada se houver um exame com o mesmo nome.

### Alterar dados no Exames
```sh
PUT:<endereço-servidor:<porta>/exams/:id
```
Formato:
```sh
{
    nome: "",
    tipo: "",
    status: ""
}
```
Onde: status deve ser "ativo" ou "inativo"
tipo deve ser "analise", "clinica", "imagem"
Se alterar o nome e houver um exame com o mesmo nome a alteração não será feita

### Excluir de Exame
```sh
DELETE:<endereço-servidor:<porta>/exams/:id
```
Um exame só será excluido se não laboratório com o exames associado

### Excluir uma Associação de Exame no Laboratório
```sh
DELETE:<endereço-servidor:<porta>/delAssoc/:labs_id,exams_id
```



## Informações

Marcelo Arnaldi – marcelo.arnaldi@gmail.com

[https://github.com/marceloarnaldi/github-link](https://github.com/MarceloArnaldi/)

[https://github.com/marceloarnaldi/github-link]:(https://github.com/MarceloArnaldi/)
[PostgreSQL]:(https://www.postgresql.org/download/)