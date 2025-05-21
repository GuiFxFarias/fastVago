const mysql = require('mysql2');

const conexao = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Farias!123',
  database: 'nome_do_banco',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Testa a conexão
conexao.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } else {
    console.log('Conectado ao banco de dados com sucesso!');
    connection.release(); // Libera a conexão de volta para o pool
  }
});

module.exports = conexao;
