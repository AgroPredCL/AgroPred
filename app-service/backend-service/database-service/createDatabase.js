const { Client } = require('pg');
const config = require('./configDatabase');

// Configure connection to your PostgreSQL server
const client = new Client(config);

// Connect to the PostgreSQL server
client.connect();

const queries = [];

// SQL query to create a new database
const createDatabaseQuery = `
   CREATE DATABASE agropred;
`;

// append the queries to the queries array
queries.push(createDatabaseQuery); 

// Execute the SQL queries
for(let i = 0; i < queries.length; i++) {
    client.query(queries[i], (err, res) => {
        if (err) {
            console.error(`Error executing query ${i}:`, err);
        } else {
            console.log(`Query ${i} executed successfully`);
        }
    });
}


//client.end();