const { Router } = require('express');
const {
    listar,
    listarDeptos,
    listarCentros,
    listarEscuelas,
    crearPostulante,
    datoEmpresa,
    datoGastos,
    listaDirectorio,
    updateEmpresa,
    updateGastos
} = require('../controllers/dashboard.controller')
const { validarJWT } = require('../middlewares/validador-jwt');
const router = Router();
router.get('/listar', listar);
router.get('/listarDeptos', listarDeptos);
router.get('/listarCentros/:tipo', listarCentros);
router.get('/listarEscuelas', listarEscuelas);
router.post('/postulante', crearPostulante);
router.get('/datoEmpresa/:codigo', datoEmpresa);
router.get('/datoGastos/:id/:gestion',datoGastos);
router.get('/listaDirectorio/:gestion',listaDirectorio);
router.post('/updateEmpresa',updateEmpresa);
router.post('/updateGastos',updateGastos);
module.exports = router;
