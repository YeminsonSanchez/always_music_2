// 2 Hacer todas las consultas con un JSON como argumento definiendo la propiedad
// name para el Prepared Statement.

// 3. Hacer las consultas con texto parametrizado

// 5. Capturar los posibles errores en todas las consultas

// 6. Retornar por consola un mensaje de error en caso de haber problemas de conexión

// 7. Obtener el registro de los estudiantes registrados en formato de arreglos.

// Agregar un nuevo estudiante.

const newStudent = async (name, rut, course, level, client) => {
  // Query utilizando texto plano con parámetros
  const SQLQuery = {
    // Objeto JSON cómo argumento de consults
    name: "newStudent",
    text: `INSERT INTO student (name, rut, course, level) VALUES ($1, $2, $3, $4);`, //consultas con texto parametrizado
    values: [name, rut, course, level],
  };
  try {
    await client.query(SQLQuery);
    console.log(`Estudiante ${name} agregado con éxito`);
    //captura de errores en la consulta
  } catch (error_consult) {
    // retorna el error de la consulta por consola
    return console.log(error_consult.code, error_consult.message);
  }
};

// Consultar los estudiantes registrados
const allStudent = async (client) => {
  const SQLQuery = {
    name: "allStudent",
    text: `SELECT name, rut, course, level FROM student;`,
    rowMode: "array", //formato de arreglos.
  };
  try {
    const res = await client.query(SQLQuery);
    console.log("Registro total: ", res.rows);
  } catch (error_consult) {
    return console.log(error_consult.code, error_consult.message);
  }
};

// Consultar estudiante por rut.
const getStudent = async (rut, client) => {
  const SQLQuery = {
    name: "getStudent",
    text: `SELECT name, rut, course, level FROM student WHERE rut = $1;`,
    values: [rut],
    rowMode: "array",
  };
  try {
    const res = await client.query(SQLQuery);
    console.log(res.rows);
  } catch (error_consult) {
    return console.log(error_consult.code, error_consult.message);
  }
};

// Actualizar la información de un estudiante.
const updateStudent = async (name, rut, course, level, client) => {
  const SQLQuery = {
    name: "updateStudent",
    text: `UPDATE student SET name = $1, course = $3, level = $4 WHERE rut = $2;`,
    values: [name, rut, course, level],
  };
  try {
    await client.query(SQLQuery);
    console.log(`Estudiante ${name} editado con éxito`);
  } catch (error_consult) {
    return console.log(error_consult.code, error_consult.message);
  }
};

// Eliminar el registro de un estudiante.
const destroy = async (rut, client) => {
  const SQLQuery = {
    name: "destroy",
    text: `DELETE FROM student WHERE rut = $1`,
    values: [rut],
  };
  try {
    await client.query(SQLQuery);
    console.log(`Registro de estudiante con rut: ${rut} eliminado`);
  } catch (error_consult) {
    return console.log(error_consult.code, error_consult.message);
  }
};

export { newStudent, getStudent, allStudent, updateStudent, destroy };
