import pkg from "pg";
const { Pool } = pkg;
const arg = process.argv.slice(2);

import {
  newStudent,
  getStudent,
  allStudent,
  updateStudent,
  destroy,
} from "./consult.js"; // modulos importados

// 1. Realizar la conexión con PostgreSQL, utilizando la clase Pool y definiendo un
// máximo de 20 clientes, 5 segundos como tiempo máximo de inactividad de un
// cliente y 2 segundos de espera de un newStudent cliente.

const config = {
  user: "", // usuario
  host: "localhost",
  password: "", // contraseña
  database: "", // nombre de la base de datos
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

const typeFuncion = arg[0];
const param1 = arg[1];
const param2 = arg[2];
const param3 = arg[3];
const param4 = arg[4];

pool.connect(async (error_conection, client, release) => {
  if (error_conection) {
    // si hay error en la conxión

    console.error(error_conection.code, error_conection.message);
  } else {
    switch (
      typeFuncion // selección de argumentos
    ) {
      case "allStudent":
        await allStudent(client);
        break;
      case "newStudent":
        await newStudent(param1, param2, param3, param4, client);
        break;
      case "updateStudent":
        await updateStudent(param1, param2, param3, param4, client);
        break;
      case "getStudent":
        await getStudent(param1, client);
        break;
      case "destroy":
        await destroy(param1, client);
        break;
      default:
        console.log("no se reconoce el primer argumento ingresado");
        break;
    }
    // 4. Liberar a un cliente al concluir su consulta.

    release();
    pool.end();
  }
});
