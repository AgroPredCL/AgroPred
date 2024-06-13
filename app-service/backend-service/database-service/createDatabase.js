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

<<<<<<< HEAD
=======
// SQL query to define tables

//---------------------Tablas verdes-----------------
const createTablaPredio = `
    CREATE TABLE Predio (
        nombre  VARCHAR(45)  NOT NULL,
        area FLOAT,
        
        PRIMARY KEY (nombre)
    );
`;

const createTablaUbicacion = `
    CREATE TABLE Ubicacion (
        id              INTEGER GENERATED ALWAYS AS IDENTITY,
        region          VARCHAR(60),
        comuna          VARCHAR(60),
        calle           VARCHAR(45),
        numero          INT,
        codigo_postal   INT,
        nom_predio      VARCHAR(45) NOT NULL,
        
        PRIMARY KEY (id),
        FOREIGN KEY (nom_predio) REFERENCES Predio (nombre)
    );
`;
//---------------------Tablas azules-----------------
 // ESTO ES UN COMENTARIO
const createTablaUsuarios = `
    CREATE TABLE Usuario (
        email           VARCHAR(320)    NOT NULL,
        full_name       VARCHAR(60),
        password        VARCHAR(256),
        num_telefono    INT,
        nom_predio      VARCHAR(45),
        
        PRIMARY KEY (email),
        FOREIGN KEY (nom_predio) REFERENCES Predio (nombre)
    );
`;

const createTablaRol_Usuario =  `
    CREATE TABLE Rol_Usuario(
        email VARCHAR(320)  NOT NULL,
        Rol   VARCHAR(20)   NOT NULL,
        
        PRIMARY KEY(email, rol),  
        FOREIGN KEY(email) REFERENCES Usuario (email),
        FOREIGN KEY(rol) REFERENCES Rol (rol)
`;

const createTablaRol = `
    CREATE TABLE Rol (
        rol         VARCHAR(20) NOT NULL,
        PRIMARY KEY (rol)
    );
`;

//---------------------Tablas amarillas-----------------


//---------------------Tablas celestes -----------------

>>>>>>> 13b761018c0fc0ec12ce9b4203754de7785c2da3
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