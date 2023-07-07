const UsuariosModel = require('../models/usuariosModel') // traemos todo lo que tiene dentro 

exports.getUsuarios = async (req, res) => {
    //evaluamos el bloque dentro del try
    try {
        //obtenemos los datos desde el modelo
        const Usuarios = await UsuariosModel.obtenerUsuarios();

        //si todo va bien respondemos con los usuarios, del lado del cliente
        //lo obtenemos con json
        //status 200 que todo fue ok
        res.status(200).json({
            success: true,
            data: Usuarios
        })

    } catch (error) {
        //si las instrucciones dentro del bloque try fallan, 
        //capturamos el error, lo mostramos en consola
        //y devolvemos la info del error al cliente
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al obtener los datos'
        })
    }
}
exports.getUsuariosById = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const Usuarios = await UsuariosModel.getUsuariosById(idUsuario)

        if (Usuarios.length < 1) {
            res.status(404).json({
                success: false,
                msg: `nO EXISTE: ${idUsuario}`
            })

        }
        res.status(200).json({
            success: true,
            Usuarios

        })
    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al obtener los datos de los Usuarios'
        })
    }
}


exports.addUsuario = async (req, res) => {
    const nuevoUsuario = req.body;
    try {
        const id = await UsuariosModel.addUsuario(nuevoUsuario)
        res.status(201).json({
            success: true,
            message: "ANDUVO",
            nuevoUsuario
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al obtener los datos'
        })
    }
}


exports.updateUsuario = async (req, res) => {
    const id = req.params.id;
    const UsuarioActualizado = req.body;

    const Usuario = {
        id,
        ...UsuarioActualizado  //muestra todo lo que necesitamos de forma mas breve
    }
    console.log(Usuario)
    try {
        const listaActualizada = await UsuariosModel.updateUsuario(Usuario)
        if (listaActualizada < 1) {
            res.status(404).json({
                success: false,
                message: "datos no actualizados"
            })
        }
        res.status(200).json({
            success: true,
            message: "lista actualizada",
            Usuario
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "No andaaaaaaaaaaaaa"
        })
    }
}
exports.deleteUsuarioById = async (req, res) => {

    const idUsuario = req.params.id;
    try {
        const Usuario = await UsuariosModel.deleteUsuarioById(idUsuario)

        if (Usuario.length < 1) { //pregunto si existe el usuario
            res.status(404).json({
                success: false,
                mgs: `No existe usuario con el id: ${idUsuario}`
            })
        }
        //si todo va bien y existe el usuario =D
        res.status(200).json({
            success: true,
            msg: "El usuario fue eliminado con exito"
        })
    } catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al eliminar el usuario'
        })
    }
}

