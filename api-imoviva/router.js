const express = require('express');
const router = express.Router();

const imoveisControllers = require('./controllers/imoveisControllers');
const uploadImg = require('./middlewares/uploadimage');
const ValidateMiddleware = require('./middlewares/validateMiddlewares');
const loginController = require('./controllers/loginController');
const validateController = require('./controllers/validateController');

router.post('/register', loginController);

//Rota de validanção
router.post('/validate', ValidateMiddleware, validateController);

router.get('/imoveis', imoveisControllers.getAll);
router.post('/apartamentos', uploadImg.array('fotos', 5), imoveisControllers.createImoveis);
/* router.post('/casas', uploadImg.array('fotos', 5), imoveisControllers.createImoveis);
router.post('/comerciais', uploadImg.array('fotos', 5), imoveisControllers.createImoveis);
router.post('/terrenos', uploadImg.array('fotos', 5), imoveisControllers.createImoveis); */

module.exports = router;