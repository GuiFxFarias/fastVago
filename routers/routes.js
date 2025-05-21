const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const leisureAreaController = require('../controllers/leisureAreaController');

router.post('/register', userController.cadastrarUser);

router.post('/login', userController.buscarUsers);

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(200).json({ sucesso: true, mensagem: 'Logout efetuado' });
});

router.get('/searchLeisureArea', leisureAreaController.listarTodas);

router.get('/search/:id', leisureAreaController.buscarPorId);

router.post('/registerLeisureArea', leisureAreaController.cadastrar);

module.exports = router;
