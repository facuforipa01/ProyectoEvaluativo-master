const express = require ('express')
const {check} = require('express-validator')
const {validarCampos} = require('./../middlewares/validarCampos')
const router = express.Router();
const profesoresController = require ('./../controllers/profesoresController')
// definimos las rutas y derivamos al controlador correspondiente. Una interfaz que dice donde se manejan estas cosas

// le decimos cual se encarga de resolver el GET

router.get('/', profesoresController.getProfesores);
router.get('/:id', profesoresController.getProfesoresById)
//router.post('/', profesoresController.addProfesor);
//router.put('/:id', profesoresController.updateProfesor)
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('especialidad', "La edad es obligatoria").not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    validarCampos
    ]
    ,
    profesoresController.updateProfesor)
router.delete('/:id',profesoresController.deleteProfesorById)
router.post('/',
    [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('especialidad', "La edad es obligatoria").not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    validarCampos
    ]
    ,
    profesoresController.addProfesor
)

module.exports = router;

    
