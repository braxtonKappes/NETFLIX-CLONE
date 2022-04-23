'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Channels', [{
      profileId: '1',
      name: 'Lucifer, is a movie I need to watch!',
      createdAt: 'Wed May 01 2019',
      updatedAt:  'Tue Feb 01 2022'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete('Channels', null, {});

  }
};
