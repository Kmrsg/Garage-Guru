const router = require('express').Router();
const { OrderItem } = require('../../db/models');

router.put('/:orderItemId', async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const { uslugaPrice_id } = req.body;
    const orderItem = await OrderItem.findOne({ where: { id: +orderItemId } });
    if (
      req.session.serviceId &&
      req.session.serviceId === orderItem.service_id
    ) {
      orderItem.isClosed = true;
      orderItem.save();
      res.json({ message: 'success', orderItem, uslugaPrice_id });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/', async (req, res) => {
  console.log('--------------', req.session.serviceId);
  try {
    const orderItems = await OrderItem.findAll({
      where: { service_id: req.session.serviceId },
    });

    console.log(orderItems);
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
