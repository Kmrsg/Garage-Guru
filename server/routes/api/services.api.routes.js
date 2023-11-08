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
} = require('../../db/models');
router.get('/', async (req, res) => {
  const services = await Service.findAll({
    include: [
      { model: Sale },
      { model: Rate },
      { model: Comment, include: [User] },
      { model: UslugaPrice, include: [Mark, CarModel, Usluga] },
    ],
  });
  res.json(services);
});

module.exports = router;
