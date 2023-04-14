// Imports
const express = require('express');
const bodyParser = require('body-parser')
const { Pool } = require('pg');

// Global variables
const app = express(); // Express server app
const port = 3000; // Express server app port

const postgresConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'q1w2e3r4',
    port: 5432,
}
const pool = new Pool(postgresConfig); // Postgres Client pool used to perform queries

// Apply HTTP body parser
app.use(bodyParser.json());

/**
 * REST  API Routes
 */
// Example without parameters
app.get('/movies', async (req, res) => {
    const result = await pool.query('SELECT * FROM movies');
    res.send(result.rows);
});

// Example with parameter
app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const text = 'SELECT * FROM movies WHERE id = $1';
    const values = [movieId];
    const result = await pool.query(text, values);
    res.send(result.rows);
});

// INSERT example
app.post('/movies', async (req, res) => {
    const newMovie = req.body;
    const text = 'INSERT INTO movies(title, year) VALUES ($1, $2) RETURNING *';
    const values = [newMovie.title, newMovie.year];
    const result = await pool.query(text, values);
    res.send(result.rows[0]); // Returns arrays of rows but we have only inserted one so we take the first element
});

// Update example
app.put('/movies', async (req, res) => {
    const updatedMovie = req.body;
    const text = 'UPDATE movies SET title=$1, year=$2 WHERE id = $3 RETURNING *';
    const values = [updatedMovie.title, updatedMovie.year, updatedMovie.id];
    const result = await pool.query(text, values);
    res.send(result.rows[0]); // Returns arrays of rows but we have only inserted one so we take the first element
});

// Delete example
app.delete('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const text = 'DELETE FROM movies WHERE id = $1';
    const values = [movieId];
    const result = await pool.query(text, values);
    res.send(result.rowCount);
});


// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

