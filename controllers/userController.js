const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  // Login
  async buscarUsers(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({
          sucesso: false,
          erro: 'E-mail e senha são obrigatórios',
        });
      }

      const resposta = await userModel.buscarUserPorEmail(email);

      if (!resposta || resposta.length === 0) {
        return res.status(404).json({
          sucesso: false,
          erro: 'Usuário não encontrado',
        });
      }

      const usuario = resposta[0];
      // const senhaValida = await bcrypt.compare(String(password), usuario.senha);

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        sucesso: true,
        usuario,
        value: {
          token,
          expiration: new Date(Date.now() + 1000 * 60 * 60 * 1),
        },
      });
    } catch (erro) {
      console.error('Erro ao buscar usuário:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }

  // Cadastro
  async cadastrarUser(req, res) {
    const { name, email, password, phone } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          sucesso: false,
          erro: 'Campos obrigatórios não preenchidos',
        });
      }

      const jaExiste = await userModel.buscarUserPorEmail(email);
      if (jaExiste.length > 0) {
        return res
          .status(409)
          .json({ sucesso: false, erro: 'Usuário já existe' });
      }

      const senhaCriptografada = await bcrypt.hash(password, 10);
      await userModel.cadastrarUser(name, email, senhaCriptografada, phone);

      return res
        .status(201)
        .json({ sucesso: true, mensagem: 'Usuário cadastrado com sucesso' });
    } catch (erro) {
      console.error('Erro ao cadastrar usuário:', erro);
      return res.status(500).json({
        sucesso: false,
        erro: erro.message,
      });
    }
  }
}

module.exports = new UserController();
