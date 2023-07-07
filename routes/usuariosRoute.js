const express = require ('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validarCampos')
const router = express.Router();
const usuariosController = require ('./../controllers/usuariosController')
// definimos las rutas y derivamos al controlador correspondiente. Una interfaz que dice donde se manejan estas cosas

// le decimos cual se encarga de resolver el GET

router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuariosById)
//router.post('/', usuariosController.addUsuario);
//router.put('/:id', usuariosController.updateUsuario)
router.put('/:id', [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', "La password es obligatoria").not().isEmpty(),
    validarCampos
    ]
    ,
    usuariosController.updateUsuario)
router.delete('/:id',usuariosController.deleteUsuarioById)
router.post('/',
    [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', "La password es obligatoria").not().isEmpty(),
    validarCampos
    ]
    ,
    usuariosController.addUsuario
)

module.exports = router;

    
