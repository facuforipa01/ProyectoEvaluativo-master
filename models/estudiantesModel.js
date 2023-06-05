const db = require('./../config/db');
const { Router } = require("express");
// tiene que ser asincronica porque todo se ejecuta al mismo tiempo y de esa manera anda
// el console log 
exports.obtenerEstudiantes = async () => {
    const [rows, fiels] = await db.execute('SELECT * FROM estudiantes')
    console.log(rows)
    return rows;
}

exports.getEstudianteById = async (id) => {
    const [rows, fields] = await db.execute('SELECT nombre, edad, grado FROM estudiantes WHERE id=?', [id]);
    console.log(rows)
    return rows;
}

exports.addEstudiante = async (nuevoestudiante) => {
    const [rows, fields] = await db.execute('INSERT INTO estudiantes (nombre, edad, grado) VALUES (?, ?, ?)', [nuevoestudiante.nombre, nuevoestudiante.edad, nuevoestudiante.grado]);
    return rows;
}
exports.updateEstudiante = async(estudiante)=>{
    const [rows, fields] = await db.execute('UPDATE estudiantes SET nombre = ?, edad = ?, grado = ? WHERE id = ?', [estudiante.nombre, estudiante.edad, estudiante.grado, estudiante.id]);
    return rows
}
exports.deleteEstudianteById = async (id) =>{
    const [rows, fields] = await db.execute('DELETE FROM estudiantes WHERE id = ?', [id]);
    return rows
} 
exports.getCursosDelEstudiante = async (id) => {
    const [rows, fields] = await db.execute('SELECT cursos.nombre, cursos.descripcion FROM estudiantes_cursos INNER JOIN cursos ON estudiantes_cursos.id_curso = cursos.id INNER JOIN estudiantes ON estudiantes_cursos.id_estudiante = estudiantes.id AND estudiantes.id = ?', [id]);
    console.log(rows)
    return rows;
}