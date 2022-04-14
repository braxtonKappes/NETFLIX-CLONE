'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Profiles', [{
      userId: '1',
      icon: `../../../frontend/src/imgs/Profile-Icons/robot_face.png`,
      name: 'Chad',
      createdAt: 'Wed May 01 2019',
      updatedAt:  'Tue Feb 01 2022'
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
    await queryInterface.bulkDelete('Profiles', null, {});
    
  }
};
