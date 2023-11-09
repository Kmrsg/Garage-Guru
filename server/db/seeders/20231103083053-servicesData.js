'use strict';
const { Service } = require('../models');
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const servicesData = [
      {
        title: 'СуперСервис',
        email: '4@4',
        password: await bcrypt.hash('123', 10),
        phone: '89212140449',
        img: 'https://rarus.ru/upload/iblock/63e/oc289zq3lot59s0h7f4q5jm0ulb2mfuf/Avtoservis_-STO_-dilery_-zapchasti-1-prevyu.jpg',
        tarif: 5500,
        adress: 'Санкт-Петербург, лиговский п-т, 140',
        isChecked: true,
      },
      {
        title: 'Рольф-лахта',
        email: '5@5',
        password: await bcrypt.hash('123', 10),
        phone: '89212145000',
        img: 'https://img.freepik.com/free-vector/car-service-abstract-concept-illustration-car-repair-shop-vehicle-detailing-and-maintenance-business-automobile-fixing-service-motor-diagnostics-transport-mending_335657-373.jpg',
        tarif: 5500,
        adress: 'Санкт-Петербург, улица Савушкина, 103',
        isChecked: true,
      },
      {
        title: 'Евро-авто',
        email: '6@6',
        password: await bcrypt.hash('123', 10),
        phone: '89212140400',
        img: 'https://f.partnerkin.com/uploads/storage/files/file_1641292778.gif',
        tarif: 5500,
        adress: 'Санкт-Петербург, левашовский п-т, 15',
        isChecked: true,
      },
      {
        title: 'СуперПуперСервис',
        email: '7@7',
        password: await bcrypt.hash('123', 10),
        phone: '89212148449',
        img: 'https://rarus.ru/upload/iblock/63e/oc289zq3lot59s0h7f4q5jm0ulb2mfuf/Avtoservis_-STO_-dilery_-zapchasti-1-prevyu.jpg',
        tarif: 5500,
        adress: 'Москва, лиговский п-т, 140',
        isChecked: true,
      },
      {
        title: 'Рольф-вахта',
        email: '8@8',
        password: await bcrypt.hash('123', 10),
        phone: '89212145999',
        img: 'https://img.freepik.com/free-vector/car-service-abstract-concept-illustration-car-repair-shop-vehicle-detailing-and-maintenance-business-automobile-fixing-service-motor-diagnostics-transport-mending_335657-373.jpg',
        tarif: 5500,
        adress: 'Москва, улица Савушкина, 103',
        isChecked: true,
      },
      {
        title: 'Мега-авто',
        email: '9@9',
        password: await bcrypt.hash('123', 10),
        phone: '89212140499',
        img: 'https://f.partnerkin.com/uploads/storage/files/file_1641292778.gif',
        tarif: 5500,
        adress: 'Москва, левашовский п-т, 15',
        isChecked: true,
      },
    ];
    await Service.bulkCreate(servicesData);
  },

  async down(queryInterface, Sequelize) {
    await Service.destroy({ truncate: { cascade: true } });
  },
};
