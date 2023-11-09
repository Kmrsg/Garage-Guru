const router = require('express').Router();
const { Sale, Service } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const sales = await Sale.findAll({ include: { model: Service } });
    res.json(sales);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, img, text } = req.body;
    if (req.session.serviceId) {
      if ((img.trim(), text.trim())) {
        const sale = await Sale.create({ service_id: id, img, text });
        res.status(200).json(sale);
      } else {
        res.json('Заполните все поля');
      }
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:saleId', async (req, res) => {
  try {
    const { saleId } = req.params;
    const sale = await Sale.findOne({ where: { id: +saleId } });
    if (sale) {
      if (req.session.serviceId === sale.service_id) {
        const service_id = sale.service_id;
        console.log(sale);
        const result = await Sale.destroy({ where: { id: +saleId } });
        if (result > 0) {
          res.json({ saleId: +saleId, service_id });
        }
      }
    }
  } catch ({ message }) {
    res.json({ message });
  }
});
router.put('/:saleId', async (req, res) => {
  try {
    const { saleId } = req.params;
    const { img, text, service_id } = req.body;
    const sale = await Sale.findOne({ where: { id: +saleId } });
    if (sale && req.session.serviceId === sale.service_id) {
      const result = await Sale.update(
        { img, text },
        { where: { id: +saleId } }
      );
      if (result > 0) {
        const updSale = await Sale.findOne({ where: { id: +saleId } });
        res.json(updSale);
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = router;
