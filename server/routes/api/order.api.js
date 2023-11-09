const router = require('express').Router();
const { Order } = require('../../db/models');
const { OrderItem } = require('../../db/models');
const { User } = require('../../db/models');
const { UslugaPrice } = require('../../db/models');
const { Usluga } = require('../../db/models');
const { CarModel } = require('../../db/models');
const { Mark } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    if (req.session.userId) {
//       const { user_id, service_id, data, uslugaPrice_id } = req.body;
//       console.log(req.body);

//       const activeOrder = await Order.findOne({
//         where: {
//           user_id: user_id,
//         },
//       });
//       if (!activeOrder) {
//         console.log('0000000');
//         const order = await Order.create({
//           user_id: user_id,
//         });
    const { user_id, service_id, data, uslugaPrice_id } = req.body;
    // console.log(req.body);

    const activeOrder = await Order.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (!activeOrder) {
      // console.log("0000000");
      const order = await Order.create({
        user_id: user_id,
      });
      // console.log(order);
      const orderItem = await OrderItem.create({
        order_id: order.id,
        uslugaPrice_id: uslugaPrice_id,
        date: data,
        service_id,
      });
      const item = await Order.findOne({
        where: { id: order.id },
        include: {
          model: OrderItem,
          include: { model: UslugaPrice, include: [Usluga, CarModel, Mark] },
        },
      });
      res.status(200).json(item);
    }

    if (activeOrder) {
      // console.log("/////");
      const active = await OrderItem.findOne({
        where: { order_id: activeOrder.id, uslugaPrice_id, isClosed: false },
      });

      if (active) {
        console.log("=======");
        res.json({ message: "У вас уже есть активная запись на эту услугу" });
      } else {
        const orderItem = await OrderItem.create({
          order_id: order.id,
          uslugaPrice_id: uslugaPrice_id,
          date: data,
          service_id,
        });
        const item = await Order.findOne({
          where: { id: order.id },
          include: {
            model: OrderItem,
            include: { model: UslugaPrice, include: [Usluga, CarModel, Mark] },
          },
        });
        res.status(200).json(item);
      }

      if (activeOrder) {
        const active = await OrderItem.findOne({
          where: { order_id: activeOrder.id, uslugaPrice_id, isClosed: false },
        });

        if (active) {
          res.json({ message: 'У вас уже есть активная запись на эту услугу' });
        } else {
          const orderItem = await OrderItem.create({
            order_id: activeOrder.id,
            service_id,
            uslugaPrice_id: uslugaPrice_id,
            date: data,
          });
          const item = await Order.findOne({
            where: { id: activeOrder.id },
            include: {
              model: OrderItem,
              include: {
                model: UslugaPrice,
                include: [Usluga, CarModel, Mark],
              },
            },
          });
          res.status(200).json(item);
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderItem,
        include: { model: UslugaPrice, include: [Usluga, CarModel, Mark] },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
