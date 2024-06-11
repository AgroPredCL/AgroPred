const { Client } = require('pg');
const config = require('./config');

// Configure connection to your PostgreSQL server
const client = new Client(config);

// Connect to the PostgreSQL server
client.connect();

// SQL query to create a new database
const createDatabaseQuery = `
    CREATE DATABASE new_database;
`;

// SQL query to define tables
const createTablesQuery = `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
    );
    -- Add more CREATE TABLE statements for additional tables if needed
`;

// Execute the SQL queries
client.query(createDatabaseQuery, (err, res) => {
    if (err) {
        console.error('Error creating database:', err);
    } else {
        console.log('Database created successfully');
        // Switch to the newly created database
        client.query('USE new_database;');
        // Create tables
        client.query(createTablesQuery, (err, res) => {
            if (err) {
                console.error('Error creating tables:', err);
            } else {
                console.log('Tables created successfully');
            }
            // Close the connection to the PostgreSQL server
            client.end();
        });
    }
});
