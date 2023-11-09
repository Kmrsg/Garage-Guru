const { Usluga, UslugaPrice } = require('../../db/models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const uslugas = await Usluga.findAll();
    res.json(uslugas);
  } catch ({ message }) {
    res.json({ message });
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
      res.json(uslugaPrice);
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
