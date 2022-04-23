'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Profiles', [
      {
      userId: '1',
      icon: `/profile-icons/robot_face.png`,
      name: 'Chad',
      createdAt: 'Wed May 01 2019',
      updatedAt:  'Tue Feb 01 2022'
      },
      {
      userId: '1',
      icon: `/profile-icons/red_chicken.png`,
      name: 'WombatLuvr',
      createdAt: 'Wed May 01 2019',
      updatedAt:  'Tue Feb 01 2022'
      },
      {
      userId: '1',
      icon: `/profile-icons/super_woman.png`,
      name: 'Trixie',
      createdAt: 'Wed May 01 2019',
      updatedAt:  'Tue Feb 01 2022'
      },
      {
      userId: '1',
      icon: `/profile-icons/number_5_bandit.png`,
      name: '5-Head',
      createdAt: 'Wed May 01 2019',
      updatedAt:  'Tue Feb 01 2022'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
    await queryInterface.bulkDelete('Profiles', null, {});

  }
};
