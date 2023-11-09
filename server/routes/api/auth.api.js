const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const {
  Service,
  Sale,
  UslugaPrice,
  Mark,
  CarModel,
  Usluga,
  Comment,
  Rate,
  OrderItem,
  Order,
} = require('../../db/models');

router.post('/sign-up', async (req, res) => {
  try {
    if (!req.session.userId && !req.session.serviceId) {
      const { name, email, password, phone } = req.body;
      console.log(req.body);
      let user = await User.findOne({ where: { email } });
      if (!name || !email || !password || !phone) {
        res.json({ message: 'Заполните  все поля' });
        return;
      }
      if (user) {
        res.json({ message: 'Такой емайл уже занят' });
        return;
      }
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email,
        phone,
        password: hash,
      });
      req.session.userId = user.id;
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    if (!req.session.userId && !req.session.serviceId) {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.json({ message: 'Такого юзера не существует или пароль неверный' });
        return;
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        res.json({ message: 'Такого юзера не существует или пароль неверный' });
        return;
      }
      if (!email.trim() || !password.trim()) {
        res.json({ message: 'Заполните все поля' });
        return;
      }
      req.session.userId = user.id;

      res.json({ message: 'succes', user });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/sign-up/service', async (req, res) => {
  try {
    if (!req.session.userId && !req.session.serviceId) {
      const { title, email, password, phone, adress, tarif } = req.body;
      console.log(req.body);
      let service = await Service.findOne({ where: { email } });
      if (!title || !email || !password || !phone || !adress || !tarif) {
        res.status(501).json({ message: 'Заполните  все поля' });
        return;
      }
      if (service) {
        res.status(501).json({ message: 'Такой емайл уже занят' });
        return;
      }
      const hash = await bcrypt.hash(password, 10);
      service = await Service.create({
        title: title,
        email: email,
        phone: phone,
        password: hash,
        adress: adress,
        tarif: tarif,
        isChecked: false,
      });
      req.session.serviceId = service.id;
      const serviceAuth = await Service.findOne({
        where: { id: service.id },
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
      res.status(200).json(serviceAuth);
    }
  } catch (error) {
    console.log(error, '----------');
    res.status(500).json({ message: error.message });
  }
});

router.post('/sign-in/service', async (req, res) => {
  try {
    if (!req.session.userId && !req.session.serviceId) {
      const { email, password } = req.body;
      const seervice = await Service.findOne({
        where: { email: email },
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
      if (!seervice) {
        res.json({
          message: 'Такого сервиса не существует или пароль неверный',
        });
        return;
      }
      if (!email.trim() || !password.trim()) {
        res.json({ message: 'Заполните все поля' });
        return;
      }

      req.session.serviceId = seervice.id;
      res.json({ message: 'succes', service: seervice });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }
    res.clearCookie('service_sid').json({ message: 'success' });
  });
});

router.get('/check', async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findOne({ where: { id: req.session.userId } });
      res.json({ message: 'success', user });
      return;
    }
    res.status(401).json({ message: 'false' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/check/service', async (req, res) => {
  try {
    if (req.session.serviceId) {
      const service = await Service.findOne({
        where: { id: req.session.serviceId },
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
      res.status(200).json({ message: 'success', service });
      return;
    }
    res.status(401).json({ message: 'false' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
