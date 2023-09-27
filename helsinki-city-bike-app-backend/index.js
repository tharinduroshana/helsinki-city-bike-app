const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

/*
 * This file opens up the server required by solita dev assessment frontend.
 */

const app = express();
app.use(cors())

// Name of the database
const database_name = "helsinki_city_bike_db";
// Name of the trips table
const table_name = "trips";
// Database credentials. These must be replaced by developer's database credentials
const db_username = 'root';
const db_password = 'root';

const pool = mysql.createPool({
    host: 'localhost',
    user: db_username,
    password: db_password,
    database: database_name,
    connectionLimit: 10, // Adjust the value as per your requirements
});

app.get('/', (req, res) => {
    res.send('Test Endpoint!');
});

/*
* This endpoint returns a list of trips from trips table.
* Query params
* - page: Calculates the offset based on the page number
* - pageSize: Number of records which needs to be sent as the response
* */
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

            if (err) {
                // Handle query error
                console.error('Error executing query', err);
                return res.status(500).json({ error: 'Error executing query' });
            }

            connection.query(`SELECT COUNT(*) AS total FROM ${table_name}`, (error, count) => {
                connection.release();

                if (error) {
                    // Handle query error
                    console.error('Error executing query', err);
                    return res.status(500).json({ error: 'Error executing query' });
                }

                res.setHeader('Content-Type', 'application/json');
                res.json({ trips: results, pageCount: count[0].total });
            });
        });
    });
});

/*
* This endpoint returns a trip retrieved from trip ID
* Request params
* - id: ID of the trip
* */
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
});

/*
* This endpoint returns a list of stations from trips table.
* Query params
* - page: Calculates the offset based on the page number
* - pageSize: Number of records which needs to be sent as the response
* */
app.get('/stations', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameter, default to 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Get the page size from query parameter, default to 10
    const offset = (page - 1) * pageSize;

    pool.getConnection((err, connection) => {
        if (err) {
            // Handle connection error
            console.error('Error connecting from pool', err);
            return res.status(500).json({ error: 'Error connecting to database' });
        }

        connection.query(`SELECT DISTINCT id, name, adress, operaattor from stations LIMIT ${pageSize} OFFSET ${offset}`, (err, results) => {

            if (err) {
                // Handle query error
                console.error('Error executing query', err);
                return res.status(500).json({ error: 'Error executing query' });
            }

            connection.query(`SELECT COUNT(DISTINCT id) AS total FROM stations`, (error, count) => {
                connection.release();

                if (error) {
                    // Handle query error
                    console.error('Error executing query', err);
                    return res.status(500).json({ error: 'Error executing query' });
                }

                res.setHeader('Content-Type', 'application/json');
                res.json({ stations: results, pageCount: count[0].total });
            });
        });
    });
});

/*
* This endpoint returns a station retrieved from station ID
* Request params
* - id: ID of the station
* */
app.get('/stations/:id', (req, res) => {
    const { params: { id } } = req;

    pool.getConnection((err, connection) => {
        if (err) {
            // Handle connection error
            console.error('Error connecting from pool', err);
            return res.status(500).json({ error: 'Error connecting to database' });
        }

        connection.query(`SELECT id, name, adress from stations WHERE id = ${id}`, (err, stationInfo) => {

            if (err) {
                // Handle query error
                console.error('Error executing query', err);
                return res.status(500).json({ error: 'Error executing query' });
            }

            connection.query(`SELECT COUNT(*) from ${table_name} WHERE departure_station_id = ${id}`, (err, departures) => {

                if (err) {
                    // Handle query error
                    console.error('Error executing query', err);
                    return res.status(500).json({ error: 'Error executing query' });
                }

                connection.query(`SELECT COUNT(*) from ${table_name} WHERE return_station_id = ${id}`, (err, returns) => {
                    connection.release();

                    if (err) {
                        // Handle query error
                        console.error('Error executing query', err);
                        return res.status(500).json({ error: 'Error executing query' });
                    }

                    res.json({
                        details: stationInfo[0],
                        departure_count: departures[0]['COUNT(*)'],
                        returns_count: returns[0]['COUNT(*)']
                    });
                });
            });
        });
    });
});

app.listen(4000, () => {
    console.log("Server listening on port: " + 4000);
})