const router = require("express").Router();
const { UslugaPrice } = require("../../db/models");
const { Order } = require("../../db/models");
const { User } = require("../../db/models");
const { Usluga } = require("../../db/models");
const { CarModel } = require("../../db/models");
const { Mark } = require("../../db/models");
const { OrderItem } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    // console.log(req.session.serviceId);
    const orders = await UslugaPrice.findAll({
      where: { service_id: req.session.serviceId },

      include: [
        { model: Usluga },
        { model: CarModel },
        { model: Mark },
        {
          model: OrderItem,
          include: { model: Order, include: { model: User } },
        },
      ],
    });
    // console.log(orders);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// router.get("/", async (req, res) => {
//     try {
//       const orders = await Order.findAll({
//         include: {
//           model: OrderItem,
//           include: { model: UslugaPrice, include: [Usluga, CarModel, Mark] },
//         },
//       });
//       console.log(orders);
//       res.json(orders);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json(error);
//     }
//   });

module.exports = router;
