'use strict';

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser= require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const PORT = 8080;
const HOST = "0.0.0.0";

const db_config = {
    host: 'db',
    user: 'root',
    password: 'admin',
    multipleStatements: true
};

let connection;
