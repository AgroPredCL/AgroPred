const { Client } = require('pg');
const config = require('./configTables');

// Configure connection to your PostgreSQL server
const client = new Client(config);

// Connect to the PostgreSQL server
client.connect();

// SQL query to test
const testQuery = `
    SELECT * FROM Ubicacion WHERE comuna = 'Viña' ;
`;

// Execute the SQL query
client.query(testQuery, (err, res) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('Query executed successfully');
        console.log(res.rows); // Display query results
    }
    // Close the connection to the PostgreSQL server
    client.end();
});
