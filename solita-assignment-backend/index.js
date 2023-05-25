const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors())

const database_name = "helsinki_city_bike_db";
const table_name = "trips";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: database_name,
    connectionLimit: 10, // Adjust the value as per your requirements
});

app.get('/', (req, res) => {
    res.send('Test Endpoint!');
});

app.get('/trips', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameter, default to 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Get the page size from query parameter, default to 10
    const offset = (page - 1) * pageSize;

    pool.getConnection((err, connection) => {
        if (err) {
            // Handle connection error
            console.error('Error connecting from pool', err);
            return res.status(500).json({ error: 'Error connecting to database' });
        }

        connection.query(`SELECT * FROM ${table_name} LIMIT ${pageSize} OFFSET ${offset}`, (err, results) => {
            connection.release();

            if (err) {
                // Handle query error
                console.error('Error executing query', err);
                return res.status(500).json({ error: 'Error executing query' });
            }

            res.setHeader('Content-Type', 'application/json');
            res.json(results);
        });
    });
});

app.get('/trips/:id', (req, res) => {
    const { params: { id } } = req;

    pool.getConnection((err, connection) => {
        if (err) {
            // Handle connection error
            console.error('Error connecting from pool', err);
            return res.status(500).json({ error: 'Error connecting to database' });
        }

        connection.query(`SELECT * FROM ${table_name} WHERE id = ?`, [id], (error, results) => {
            connection.release();

            if (err) {
                // Handle query error
                console.error('Error executing query', err);
                return res.status(500).json({ error: 'Error executing query' });
            }

            if (results.length === 0) {
                // Handle no matching entry found
                return res.status(404).json({ error: 'Entry not found' });
            }

            // Send the retrieved data as JSON response
            res.json(results[0]);
        });
    });
})

app.listen(4000, () => {
    console.log("Server listening on port: " + 4000);
})