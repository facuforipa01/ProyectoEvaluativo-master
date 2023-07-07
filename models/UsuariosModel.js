const db = require('../config/db');
const{ Router} = require("express");
const bcrypt = require('bcryptjs');

// tiene que ser asincronica porque todo se ejecuta al mismo tiempo y de esa manera anda
// el console log 
exports.obtenerUsuarios = async () => {
    const [rows, fields] = await db.execute('SELECT * FROM usuarios')
    console.log(rows)
    return rows;
}
exports.getUsuariosById = async (id) => {
   const [rows, fields] = await db.execute('SELECT username, password FROM Usuarios WHERE id=?', [id]);
    console.log(rows)
    return rows;
}

exports.addUsuario = async (nuevoUsuario) => {
     //encryptado de contrasenia
    const contrasenia = nuevoUsuario.password
    const saltRounds = 10
    const passwordEncrypted = bcrypt.hashSync(contrasenia, saltRounds);
    
    const [rows, fields] = await db.execute('INSERT INTO usuarios (username, password) VALUES (?, ?)', [nuevoUsuario.username, passwordEncrypted]);
    return rows;
}
exports.updateUsuario = async(Usuario)=>{
//encryptado de contrasenia
    const contrasenia = Usuario.password
    const saltRounds = 10
    const passwordEncrypted = bcrypt.hashSync(contrasenia, saltRounds);

    const [rows, fields] = await db.execute('UPDATE usuarios SET username = ?, password = ? WHERE id = ?', [Usuario.username, passwordEncrypted, Usuario.id]);
    return rows
}
exports.deleteUsuarioById = async (id) =>{
    const [rows, fields] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return rows
} 