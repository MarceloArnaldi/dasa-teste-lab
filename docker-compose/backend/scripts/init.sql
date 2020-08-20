create database dasa;

\c dasa

create table labs (
    id serial not null,
    nome varchar(100) not null,
    endereco varchar(250) not null,
    status varchar(10) not null
);

create table exams (
    id serial not null,
    nome varchar(100) not null,
    tipo varchar(250) not null,
    status varchar(10) not null
);

create table examsbylabs (
    labs_id integer not null,
    exams_id integer not null,
    UNIQUE(labs_id, exams_id)
);



