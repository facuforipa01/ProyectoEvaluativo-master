const express = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('./../middlewares/validarCampos')
const router = express.Router();
const estudiantesController = require('./../controllers/estudiantesController')
// definimos las rutas y derivamos al controlador correspondiente. Una interfaz que dice donde se manejan estas cosas

// le decimos cual se encarga de resolver el GET

router.get('/', estudiantesController.getEstudiantes);
router.get('/:id', estudiantesController.getEstudianteById);
//router.post('/', estudiantesController.addEstudiante);
//router.put('/:id', estudiantesController.updateEstudiante)
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', "La edad es obligatoria").not().isEmpty(),
    check('grado', 'El grado es obligatorio').not().isEmpty(),
    validarCampos
    ]
    ,
    estudiantesController.updateEstudiante)

router.delete('/:id', estudiantesController.deleteEstudianteById)
router.get('/:id/cursos', estudiantesController.getCursosDelEstudiante)
router.post('/',
    [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', "La edad es obligatoria").not().isEmpty(),
    check('grado', 'El grado es obligatorio').not().isEmpty(),
    validarCampos
    ]
    ,
    estudiantesController.addEstudiante
)


module.exports = router;


