const router = require('express').Router();
const {
  Service,
  Sale,
  UslugaPrice,
  Mark,
  CarModel,
  Usluga,
  Comment,
  User,
  Rate,
  OrderItem,
  Order,
} = require('../../db/models');

router.put('/person/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { img } = req.body;
    const service = await Service.findOne({ where: { id: +serviceId } });
    if (req.session.serviceId === service.id) {
      service.img = img;
      service.save();
      res.json({ message: 'success', service });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/person/status/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findOne({
      where: { id: +serviceId },
      include: [
        { model: Sale },
        { model: Rate },
        { model: Comment, include: [User] },
        {
          model: UslugaPrice,
          include: [
            Mark,
            CarModel,
            Usluga,
            {
              model: OrderItem,
              include: { model: Order, include: { model: User } },
            },
          ],
        },
      ],
    });
    service.isChecked = !service.isChecked;
    service.save();
    console.log(service);
    res.json({ message: 'success', service: service });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/person/delete/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.destroy({ where: { id: +serviceId } });
    res.json({ message: 'success', id: +serviceId });
  } catch ({ message }) {
    res.json({ message });
  }
});
module.exports = router;
