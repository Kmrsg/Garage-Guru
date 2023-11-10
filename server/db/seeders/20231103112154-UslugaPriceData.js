'use strict';
const { UslugaPrice, Usluga } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const priceData = [
      {
        usluga_id: 1,
        service_id: 1,
        cost: 8000,
        mark_id: 1,
        carModel_id: 1,
      },
      {
        usluga_id: 2,
        service_id: 1,
        cost: 15000,
        mark_id: 2,
        carModel_id: 4,
      },
      {
        usluga_id: 12,
        service_id: 1,
        cost: 15000,
        mark_id: 2,
        carModel_id: 4,
      },
      {
        usluga_id: 1,
        service_id: 2,
        cost: 7500,
        mark_id: 1,
        carModel_id: 1,
      },
      {
        usluga_id: 8,
        service_id: 3,
        cost: 19000,
        mark_id: 5,
        carModel_id: 13,
      },
      {
        usluga_id: 10,
        service_id: 3,
        cost: 15000,
        mark_id: 6,
        carModel_id: 14,
      },
      {
        usluga_id: 9,
        service_id: 3,
        cost: 18000,
        mark_id: 6,
        carModel_id: 15,
      },
    ];
    await UslugaPrice.bulkCreate(priceData);
  },

  async down(queryInterface, Sequelize) {
    await UslugaPrice.destroy({ truncate: { cascade: true } });
  },
};
