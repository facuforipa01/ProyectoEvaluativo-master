const express = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('./../middlewares/validarCampos')
const router = express.Router();
const cursosController = require('./../controllers/cursosController');
// Definimos las rutas para derivar al controlador correspondiente

router.get('/', cursosController.getCursos);
router.get('/:id', cursosController.getCursosById);
//router.post('/', cursosController.addCurso);
//router.put('/:id', cursosController.updateCurso);
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', "La descripcion es obligatoria").not().isEmpty(),
    validarCampos
    ]
    ,
    cursosController.updateCurso);
router.delete('/:id',cursosController.deleteCursoById);
router.get('/:id/estudiantes',cursosController.getEstudiantesDelCurso)
router.post('/:id/estudiantes', cursosController.addEstudianteAUnCurso);
router.post('/',
    [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', "La descripcion es obligatoria").not().isEmpty(),
    validarCampos
    ]
    ,
    cursosController.addCurso
)

module.exports = router;
    
