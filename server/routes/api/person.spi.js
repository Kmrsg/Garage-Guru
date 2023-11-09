const router = require('express').Router();
const { Service } = require('../../db/models');

router.put("/person/:serviceId", async (req, res) => {
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
    const service = await Service.findOne({ where: { id: +serviceId } });
    service.isChecked = !service.isChecked;
    service.save();
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
