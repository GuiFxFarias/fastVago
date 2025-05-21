const LeisureAreaModel = require('../models/leisureAreaModel');

class LeisureAreaController {
  async listarTodas(req, res) {
    try {
      const areas = await LeisureAreaModel.buscarTodas();
      return res.status(200).json(areas);
    } catch (error) {
      console.error('Erro ao buscar áreas de lazer:', error);
      return res
        .status(500)
        .json({ sucesso: false, erro: 'Erro interno do servidor' });
    }
  }

  async buscarPorId(req, res) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ sucesso: false, erro: 'ID inválido' });
    }

    try {
      const area = await LeisureAreaModel.buscarPorId(id);
      if (!area || area.length === 0) {
        return res
          .status(404)
          .json({ sucesso: false, erro: 'Área de lazer não encontrada' });
      }

      return res.status(200).json(area[0]);
    } catch (error) {
      console.error('Erro ao buscar área por ID:', error);
      return res
        .status(500)
        .json({ sucesso: false, erro: 'Erro interno do servidor' });
    }
  }

  async cadastrar(req, res) {
    const {
      user_id,
      title,
      description,
      address,
      city,
      state,
      price_per_hour,
      max_guests,
      has_pool = false,
      has_bbq = false,
    } = req.body;

    // Verificação básica
    if (
      !user_id ||
      !title ||
      !price_per_hour ||
      !max_guests ||
      !city ||
      !state
    ) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Campos obrigatórios: user_id, title, price_per_hour, max_guests, city, state',
      });
    }

    try {
      const novaArea = {
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
      };

      await LeisureAreaModel.cadastrar(novaArea);
      return res
        .status(201)
        .json({
          sucesso: true,
          mensagem: 'Área de lazer cadastrada com sucesso',
        });
    } catch (error) {
      console.error('Erro ao cadastrar área de lazer:', error);
      return res
        .status(500)
        .json({ sucesso: false, erro: 'Erro ao cadastrar área de lazer' });
    }
  }
}

module.exports = new LeisureAreaController();
