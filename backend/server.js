'use strict';

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { query } = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8080;
const HOST = "0.0.0.0";

const db_config = {
    host: 'db',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

function apiKeyMiddleware(req, res, next) {
    const apiKey = req.header('X-API-KEY');
    if (!apiKey || apiKey !== process.env.MY_API_KEY) {
        return res.status(401).send('Unauthorized');
    }
    next();
}

const pool = mysql.createPool(db_config);

// ============= ENDPOINTS =============
app.route('/project')
    .get(apiKeyMiddleware, (req, res) => { // get all projects
        const query = `SELECT * FROM projects`;
        pool.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "server error" });
            }
            if (result.length < 1) {
                return res.status(204).send({ message: 'No posts to display' });
            }
            res.status(200).json(result);
        });
    })
    .post(apiKeyMiddleware, (req, res) => { // create new project
        const { title, working_name, preview_description, full_description, img_url, github } = req.body;

        const query = `INSERT INTO projects (title, working_name, preview_description, full_description, img_url, github) VALUES (?, ?, ?, ?, ?, ?)`;
        pool.query(query, [title, working_name, preview_description, full_description, img_url, github], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "server error" });
            }
            res.status(200).send({ message: 'Project added successfully' });
        });
    });

app.route('/project/:id')
    .get(apiKeyMiddleware, (req, res) => { // get project by id
        const id = req.params.id;
        const query = `SELECT * FROM projects WHERE id = ?`;
        pool.query(query, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "server error" });
            }
            if (result.length < 1) {
                return res.status(404).send({ message: 'Project not found' });
            }
            res.status(200).json(result[0]);
        });
    })
    .put(apiKeyMiddleware, (req, res) => { // update project
        const id = req.params.id;
        const { title, working_name, preview_description, full_description, img_url, github } = req.body;

        const query = `UPDATE projects SET title = ?, working_name = ?, preview_description = ?, full_description = ?, img_url = ?, github = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        pool.query(query, [title, working_name, preview_description, full_description, img_url, github, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "server error" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).send({ message: 'Project not found' });
            }
            res.status(200).send({ message: 'Project updated successfully' });
        });
    })
    .delete(apiKeyMiddleware, (req, res) => { // delete project
        const id = req.params.id;

        const query = `DELETE FROM projects WHERE id = ?`;
        pool.query(query, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "server error" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).send({ message: 'Project not found' });
            }
            res.status(200).send({ message: 'Project deleted successfully' });
        });
    });

app.listen(PORT, HOST);
console.log('Server is up and running...');
