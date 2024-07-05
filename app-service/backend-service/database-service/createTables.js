const { Client } = require('pg');
const config = require('./configTables');

// Configure connection to your PostgreSQL server
const client = new Client(config);

// Connect to the PostgreSQL server
client.connect();

const queries = [];

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
        rol   VARCHAR(20)   NOT NULL,
        
        PRIMARY KEY(email, rol),  
        FOREIGN KEY(email) REFERENCES Usuario (email),
        FOREIGN KEY(rol) REFERENCES Rol (rol)
    );
`;

const createTablaRol = `
    CREATE TABLE Rol (
        rol VARCHAR(20) NOT NULL,
        PRIMARY KEY (rol)
    );
`;

//---------------------Tablas amarillas-----------------
const createTablaInventario = `
    CREATE TABLE Inventario (
        categoria  VARCHAR(30) NOT NULL,
        nom_predio VARCHAR(45),

        PRIMARY KEY(categoria),
        FOREIGN KEY(nom_predio) REFERENCES Predio (nombre)
    );
`;

const createTablaProducto = `
    CREATE TABLE Producto (
        id       INTEGER GENERATED ALWAYS AS IDENTITY,
        nombre   VARCHAR(25),
        marca    VARCHAR(25),
        cantidad INT,
        descripcion VARCHAR(100),
        costo INT,
        vencimiento TIMESTAMP,
        categoria   VARCHAR(30),

        PRIMARY KEY (id),
        FOREIGN KEY(categoria) REFERENCES Inventario (categoria)
    );

`;

const createTablaContratista = `
    CREATE TABLE Contratista (
        rut VARCHAR(10) NOT NULL,
        full_name VARCHAR(60),
        num_telefono INT,
        email VARCHAR(320),
        nom_empresa VARCHAR(45),
        descripcion VARCHAR(200),
        cant_empleados INT,
        costo INT,
        categoria VARCHAR(30),

        PRIMARY KEY(rut),
        FOREIGN KEY(categoria) REFERENCES Inventario (categoria)
    );

`;

//---------------------Tablas celestes -----------------

const createTablaCuartel = `
    CREATE TABLE Cuartel (
        id VARCHAR(5) NOT NULL,
        area INT,
        descripcion VARCHAR(400),
        cant_paltos INT,
        nom_predio VARCHAR(45),

        PRIMARY KEY(id),
        FOREIGN KEY(nom_predio) REFERENCES Predio (nombre)
    );
`;

const createTablaEstado = `
    CREATE TABLE Estado (
        fecha TIMESTAMP NOT NULL,
        cuartel_id VARCHAR(5),
        conductividad INT,
        humedad INT,
        ph INT,
        temperatura INT,
        nitrogeno INT,
        fosforo INT,
        potasio INT,

        PRIMARY KEY(fecha, cuartel_id),
        UNIQUE(fecha, cuartel_id), -- Añadir restricción UNIQUE
        FOREIGN KEY(cuartel_id) REFERENCES Cuartel (id)
    );
`;

const createTablaRecomendacion = `
    CREATE TABLE Recomendacion(
        nombre VARCHAR(30) NOT NULL,
        recomendacion JSON,
        estado_fecha TIMESTAMP NOT NULL,
        estado_cuartel_id VARCHAR(5) NOT NULL,

        PRIMARY KEY(nombre),
        FOREIGN KEY(estado_fecha, estado_cuartel_id) REFERENCES Estado (fecha, cuartel_id)
    );
`;

const createTablaEnfermedad = `
    CREATE TABLE Enfermedad (
        nombre VARCHAR(30) NOT NULL,
        descripcion VARCHAR(200),

        PRIMARY KEY(nombre)
    );
 
`;

const createTablaEstadoEnfermedad = `
    CREATE TABLE Estado_Enfermedad(
        fecha_estado TIMESTAMP NOT NULL,
        nom_enfermedad VARCHAR(30) NOT NULL,
        estado_cuartel_id VARCHAR(5) NOT NULL,

        PRIMARY KEY(fecha_estado, nom_enfermedad, estado_cuartel_id),
        FOREIGN KEY(fecha_estado, estado_cuartel_id) REFERENCES Estado(fecha, cuartel_id),
        FOREIGN KEY(nom_enfermedad) REFERENCES Enfermedad(nombre)
    );
`;

const createTablaUsoRecursos = `
    CREATE TABLE Uso_Recursos (
        id INTEGER GENERATED ALWAYS AS IDENTITY,
        fecha TIMESTAMP,
        tipo VARCHAR(30),
        observacion VARCHAR(400),
        cuartel_id VARCHAR(5),

        PRIMARY KEY(id),
        FOREIGN KEY(cuartel_id) REFERENCES Cuartel(id)
    );
`;

queries.push(createTablaPredio);  // 0
queries.push(createTablaUbicacion);  //1
queries.push(createTablaUsuarios);  //2
queries.push(createTablaRol);  //3
queries.push(createTablaRol_Usuario); //4
queries.push(createTablaInventario); //5
queries.push(createTablaProducto); //6
queries.push(createTablaContratista); //7
queries.push(createTablaCuartel); //8
queries.push(createTablaEstado);  //9
queries.push(createTablaUsoRecursos); //10
queries.push(createTablaEnfermedad); //11
queries.push(createTablaEstadoEnfermedad); //12
queries.push(createTablaRecomendacion); //13


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
