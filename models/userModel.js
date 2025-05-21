const conexao = require('../conexao.js');

class UserModel {
  executaQuery(sql, parametros) {
    return new Promise((res, rej) => {
      conexao.query(sql, parametros, (error, results) => {
        if (error) {
          console.log('Erro na query: ' + error);
          return rej(error);
        }
        return res(results);
      });
    });
  }

  buscarUserPorEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return this.executaQuery(sql, [email]);
  }

  cadastrarUser(name, email, senha, telefone) {
    const sql = `
    INSERT INTO users (name, email, password, phone)
    VALUES (?, ?, ?, ?)
  `;
    return this.executaQuery(sql, [name, email, senha, telefone]);
  }
}

module.exports = new UserModel();
