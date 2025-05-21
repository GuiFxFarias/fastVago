const conexao = require('../conexao.js');

class LeisureAreaModel {
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

  buscarPorId(id) {
    const sql = 'SELECT * FROM leisure_areas WHERE id = ?';
    return this.executaQuery(sql, [id]);
  }

  buscarTodas() {
    const sql = 'SELECT * FROM leisure_areas';
    return this.executaQuery(sql);
  }

  cadastrar(leisureArea) {
    const {
      user_id,
      title,
      description,
      address,
      city,
      state,
      price_per_hour,
      max_guests,
      has_pool,
      has_bbq,
    } = leisureArea;

    const sql = `
      INSERT INTO leisure_areas (
        user_id, title, description, address, city, state, 
        price_per_hour, max_guests, has_pool, has_bbq
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return this.executaQuery(sql, [
      user_id,
      title,
      description,
      address,
      city,
      state,
      price_per_hour,
      max_guests,
      has_pool,
      has_bbq,
    ]);
  }
}

module.exports = new LeisureAreaModel();
