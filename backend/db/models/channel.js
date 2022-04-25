'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Channel.belongsTo(models.Profile, { foreignKey: 'profileId' })
      Channel.belongsToMany(models.Movie, {
        through: "channel_movie",
        as: "movies",
        otherKey: "movieId",
        foreignKey: "channelId",
      });
    }
  };
  Channel.init({
    profileId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Channel',
  });
  return Channel;
};
