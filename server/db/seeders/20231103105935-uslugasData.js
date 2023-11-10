'use strict';
const { Usluga } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const uslugasData = [
      { title: 'Техническое обслуживание' },
      { title: 'Замена топливного фильтра ' },
      { title: 'Замена сцепления DSG 7' },
      { title: 'Промывка тормозной системы' },
      { title: 'Ремонт радиатора автомобиля' },
      { title: 'Ремонт двигателя' },
      { title: 'Ремонт пневмоподвески' },
      { title: 'Ремонт редуктора' },
      { title: 'Замена цепи ГРМ' },
      { title: 'Ремонт выхлопной системы' },
      { title: 'Диагностика автомобиля' },
      { title: 'Замена лобового стекла' },
      { title: 'Замена ступичного подшипника' },
    ];
    await Usluga.bulkCreate(uslugasData);
  },

  async down(queryInterface, Sequelize) {
    await Usluga.destroy({ truncate: { cascade: true } });
  },
};
