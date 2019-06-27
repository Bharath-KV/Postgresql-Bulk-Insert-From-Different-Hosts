`use strict`;

const promise = require('bluebird');

const pgp = require('pg-promise')({promiseLib: promise});

const dbCon1 = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.Database
};

const dbCon2 = {
    host: process.env.HOST1,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.Database1
};


const db1 = pgp(dbCon1);
const db2 = pgp(dbCon2);

module.exports = {
    pgp: pgp,
    db1: db1,
    db2: db2,
    SCHEMA: 'source',
    TABLE: 'EmployeeDetail',
    LIMIT: process.env.LIMIT
}