const {
  UslugaPrice,
  CarModel,
  Mark,
  Usluga,
  Service,
} = require('../../db/models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const uslugasPrices = await UslugaPrice.findAll({
      include: [CarModel, Mark, Usluga, Service],
    });
    res.json(uslugasPrices);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
router.delete('/:uslugaPriceId', async (req, res) => {
  try {
    const { uslugaPriceId } = req.params;
    const serviceUsluga = await UslugaPrice.findOne({
      where: { id: +uslugaPriceId },
    });
    if (req.session.serviceId === serviceUsluga.service_id) {
      const result = await UslugaPrice.destroy({
        where: { id: +uslugaPriceId },
      });
      if (result > 0) {
        res.json(+uslugaPriceId);
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
router.put('/:uslugaPriceId', async (req, res) => {
  try {
    const { uslugaPriceId } = req.params;
    const { mark_id, carModel_id, cost, usluga_id } = req.body;
    const serviceUsluga = await UslugaPrice.findOne({
      where: { id: +uslugaPriceId },
    });
    if (req.session.serviceId === serviceUsluga.service_id) {
      const [result] = await UslugaPrice.update(
        { mark_id, carModel_id, cost, usluga_id },
        { where: { id: +uslugaPriceId } }
      );
      if (result > 0) {
        const price = await UslugaPrice.findOne({
          where: { id: +uslugaPriceId },
          include: [CarModel, Mark, Usluga],
        });
        res.json(price);
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.session.serviceId) {
      const { carModel_id, mark_id, service_id, cost, usluga_id } = req.body;
      const uslugaPrice = await UslugaPrice.create({
        carModel_id,
        mark_id,
        service_id,
        cost: +cost,
        usluga_id,
      });
      const price = await UslugaPrice.findOne({
        where: { id: uslugaPrice.id },
        include: [CarModel, Mark, Usluga],
      });
      res.json(price);
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = router;
