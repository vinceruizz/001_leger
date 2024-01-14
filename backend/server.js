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

function apiKeyMiddleware(req, res, next) {
    const apiKey = req.header('X-API-KEY');
    if (!apiKey || apiKey !== process.env.MY_API_KEY) {
        return res.status(401).send('Unauthorized');
    }
    next();
}

let connection;
